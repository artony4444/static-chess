

class logic
{
    
    constructor(board)
    {
        this.board = board;
        
        this.variables();
    }
    
    /*  ----------  initialize  ----------  */
    
    variables()
    {
        this.resetGameVar();
        this.resetPieceList();
        this.resetSpecialMoves();
    }
    
    resetGameVar()
    {
        this.resetTurn();
        this.resetState();
    }
    
    resetTurn()
    {
        this.turn = c.w;
    }
    
    resetState()
    {
        this.stalemate = false;
        this.checkmate = false;
        this.draw = false;
        this.insufficientMaterial = false;
    }
    
    resetPieceList()
    {
        this.wPieces = [];
        this.bPieces = [];
        
        this.wKing = null;
        this.bKing = null;
        
        this.movesMap = new Map();
    }
    
    resetSpecialMoves()
    {
        this.resetPawnVars();
        this.resetKingVars();
    }
    
    resetPawnVars()
    {
        this.lastPawnMove = null;
        this.pawnPromote = null;
        this.shortMoves = 0;
    }
    
    resetKingVars()
    {
        let initial = true;
        
        this.wsCastle = initial;
        this.wlCastle = initial;
        
        this.bsCastle = initial;
        this.blCastle = initial;
        
        this.isCheck();
    }
    
    /*  ----------  square  ----------  */
    
    setPiece(piece, intXY)
    {
        let pc = piece;
        pc.pos = intXY;
        let killed = this.board.getPiece(intXY);
        
        let self = this;
        updatePieceList(pc, killed);
        this.board.placePiece(pc, intXY);
        
        function updatePieceList(add, remove)
        {
            self.listRemovePiece(killed);
            self.listAddPiece(pc);
        }
    }
    
    testPlace(piece, intXY)
    {
        let pc = piece;
        pc.pos = intXY;
        this.board.testPlace(pc, intXY);
    }
    
    /*  ----------  move  ----------  */
    
    move(toXY)
    {
        let fromXY = this.board.currentSquare;
        let pieceMoved = this.board.getPiece(fromXY);
        let pieceKilled = this.board.getPiece(toXY);
        
        let addPawnMove = null;
        let isPawnPromotion = false;
        
        if(this.board.currentMoves.includes(toXY))
        {
            let move = toXY - fromXY;
            
            if(pieceMoved instanceof king)
            {
                if(move == 20)
                {
                    let rook = this.board.getPiece(toXY + 10);
                    
                    this.setPiece(w.Blank(), toXY + 10);
                    this.setPiece(rook, toXY - 10);
                }
                else if(move == -20)
                {
                    let rook = this.board.getPiece(toXY - 20);
                    
                    this.setPiece(w.Blank(), toXY - 20);
                    this.setPiece(rook, toXY + 10);
                }
            }
            else if(pieceMoved instanceof pawn)
            {
                let enPassantPos = pieceMoved.color == c.w ? -1 : 1;
                
                if(move == 2 || move == -2)
                {
                    addPawnMove = toXY;
                }
                else if(toXY % 10 == 8 || toXY % 10 == 1)
                {
                    isPawnPromotion = true;
                    
                    if(this.pawnPromote == null)
                    {
                        this.askPawnPromote(toXY);
                        return;
                    }
                }
                else if(toXY + enPassantPos == this.lastPawnMove)
                {
                    this.setPiece(w.Blank(), this.lastPawnMove);
                }
            }
            
            if(isPawnPromotion)
            {
                this.setPiece(w.Blank(), fromXY);
                this.setPiece(this.pawnPromote, toXY);
                this.pawnPromote = null;
            }
            else
            {
                this.setPiece(w.Blank(), fromXY);
                this.setPiece(pieceMoved, toXY);
            }
        }
        else
        {
            console.log("invalid move!");
            return;
        }
        
        this.lastPawnMove = addPawnMove;
        this.updateStates(pieceMoved, pieceKilled, fromXY, toXY);
    }
   
    updateStates(pieceMoved, pieceKilled, fromXY, toXY)
    {
        this.castleAffected(pieceMoved, pieceKilled, fromXY, toXY);
        this.addShortMove(pieceMoved, pieceKilled);
        this.moveMarkAdd(fromXY, toXY);
        this.switchTurn();
    }
    
    castleAffected(pieceMoved, pieceKilled, fromXY, toXY)
    {
        if(pieceMoved instanceof king)
        {
            if(pieceMoved.color == color.w)
            {
                this.wsCastle = false;
                this.wlCastle = false;
            }
            if(pieceMoved.color == color.b)
            {
                this.bsCastle = false;
                this.blCastle = false;
            }
        }
        else if(pieceMoved instanceof rook)
        {
            if(pieceMoved.color == color.w)
            {
                if(fromXY == 81)
                {
                    this.wsCastle = false;
                }
                if(fromXY == 11)
                {
                    this.wlCastle = false;
                }
            }
            if(pieceMoved.color == color.b)
            {
                if(fromXY == 88)
                {
                    this.bsCastle = false;
                }
                if(fromXY == 18)
                {
                    this.blCastle = false;
                }
            }
        }
        
        
        if(pieceKilled instanceof rook)
        {
            if(pieceKilled.color == color.w)
            {
                if(toXY == 81)
                {
                    this.wsCastle = false;
                }
                if(toXY == 11)
                {
                    this.wlCastle = false;
                }
            }
            if(pieceKilled.color == color.b)
            {
                if(toXY == 88)
                {
                    this.bsCastle = false;
                }
                if(toXY == 18)
                {
                    this.blCastle = false;
                }
            }
        }
    }
    
    addShortMove(pieceMoved, pieceKilled)
    {
        // 50 moves draw state
        if(pieceMoved instanceof pawn) this.shortMoves = 0;
        else if(!(pieceKilled instanceof blank)) this.shortMoves = 0;
        else this.shortMoves += 1;
    }
    
    moveMarkAdd(fromXY, toXY)
    {
        this.board.ui.squareHighlightRemove("moveMark");
        this.board.ui.squareHighlightAdd("moveMark", fromXY);
        this.board.ui.squareHighlightAdd("moveMark", toXY);
    }
    
    switchTurn()
    {
        this.turn = this.turn == c.w ? c.b : c.w;
        
        this.board.resetMoves();
        this.movesMap.clear();
        
        this.is50MoveDraw();
        this.isInsufficientMaterial();
        this.isStalemate();
        this.isCheck();
    }
    
    // --- draw
    
    makeDraw()
    {
        this.board.ui.boardCenterAnimation("DRAW");
        this.draw = true;
    }
    
    askDraw()
    {
        // to add ui.askDraw()
    }
    
    is50MoveDraw()
    {
        if(this.shortMoves >= 100) this.makeDraw();
    }
    
    isInsufficientMaterial()
    {
        let isDraw = this.checkIsInsufficientMaterial();
        if(isDraw)
        {
            this.makeDraw();
            this.insufficientMaterial = true;
            return true;
        }
        return false;
    }
    
    checkIsInsufficientMaterial()
    {
        let wP = this.wPieces;
        let bP = this.bPieces;
        
        if(wP.length <= 3 && bP.length <= 3)
        {
            for(let p of wP)
            {
                if(isOtherPiece(p)) return false;
            }
            for(let p of bP)
            {
                if(isOtherPiece(p)) return false;
            }
            
            let wBishop = 0;
            let wKnight = 0;
            let bBishop = 0;
            let bKnight = 0;
            
            wP.forEach((p) => {
                if(p instanceof bishop) wBishop += 1;
                else if(p instanceof knight) wKnight += 1;
            });
            
            bP.forEach((p) => {
                if(p instanceof bishop) bBishop += 1;
                else if(p instanceof knight) bKnight += 1;
            });
            
            /*
            
            USCF Rule
            
            k-bb       - no draw
            k-nn K-B   - no draw
            k-bn       - no draw
            
            k-nn - draw
            k-b  - draw
            k-n  - draw
            k    - draw
            
            */
            
            if(wBishop == 2 || bBishop == 2) return false;
            if((wKnight == 2 && bBishop == 1) || (bKnight == 2 && wBishop == 1)) return false; 
            if((wBishop == 1 && wKnight == 1) || (bBishop == 1 && bKnight == 1)) return false; 
            
            /* enable this to draw only k vs k
            if(wBishop == 0 && wKnight == 0 && bBishop == 0 && bKnight == 0) return true;
            else return false;
            */
            
            return true;
        }
        return false;
        
        function isOtherPiece(p)
        {
            if(!(p instanceof king || 
                 p instanceof bishop || 
                 p instanceof knight)) return true;
        }
    }
    
    isStalemate()
    {
        if(this.checkStalemate())
        {
            this.makeDraw();
            this.board.ui.boardCenterAnimation("STALEMATE");
            this.stalemate = true;
            return true;
        }
        else this.stalemate = false;
        return false;
    }
    
    checkStalemate()
    {
        let pieces = this.getPiecesByTurn();
        
        for(let piece of pieces)
        {
            if(this.getTestMovesList(piece.pos).length != 0)
            {
                return false;
            }
        }
        return true;
    }
    
    checkTest(color = this.turn)
    {
        let king = null;
        
        if(this[color+"King"] != null) king = this[color+"King"];
        else
        {
            let kingName = color == c.w ? w.king : b.king;
            king = this.getPieceByName(kingName);
            this[color+"King"] = king;
        }
        if(king == null) return;
        
        let isCheck = this.getAttackers(king.pos).length > 0;
        return isCheck;
    }
    
    isCheck(color = this.turn)
    {
        this.board.ui.checkRemove();
        
        let king = null;
        
        if(this[color+"King"] != null) king = this[color+"King"];
        else
        {
            let kingName = color == c.w ? w.king : b.king;
            king = this.getPieceByName(kingName);
            this[color+"King"] = king;
        }
        if(king == null) return;
        
        let isCheck = this.getAttackers(king.pos).length > 0;
        
        if(isCheck)
        {
            this.board.ui.checkAdd(king.pos);
            
            if(this.stalemate) // checkmate
            {
                this.board.ui.boardCenterAnimation("CHECKMATE");
                this.stalemate = false;
                this.checkmate = true;
            }
        }
        
        return isCheck;
    }
    
    // --- Pawn Promotion
    
    askPawnPromote(toXY)
    {
        this.board.ui.askPawnPromote(toXY);
    }
    
    promotePawnTo(piece, toXY)
    {
        if(piece.color == this.turn && this.board.currentMoves.includes(toXY))
        {
            this.pawnPromote = piece;
            this.move(toXY);
        }
        else console.log("invalid")
    }
    
    /*  ----------  moves generation  ----------  */
    
    getTestMovesList(fromXY)
    {
        let piece = this.board.getPiece(fromXY);
        if(piece.color != this.turn) return [];
        
        if(this.movesMap.has(fromXY)) return this.movesMap.get(fromXY);
        
        let pieceMoves = this.getPieceMoves(piece, fromXY);
        let moves = this.filterLegalMoves(pieceMoves, fromXY);
        
        this.movesMap.set(fromXY, moves);
        
        return moves;
    }
    
    getMovesList(fromXY)
    {
        if(this.draw || this.checkmate) return [];
        
        let piece = this.board.getPiece(fromXY);
        if(piece.color != this.turn) return [];
        
        if(this.movesMap.has(fromXY))
        {
            this.board.currentSquare = fromXY;
            this.board.currentMoves = this.movesMap.get(fromXY);
            return this.movesMap.get(fromXY);
        }
        
        let pieceMoves = this.getPieceMoves(piece, fromXY);
        let moves = this.filterLegalMoves(pieceMoves, fromXY);
        
        this.board.currentSquare = fromXY;
        this.board.currentMoves = moves;
        
        this.movesMap.set(fromXY, moves);
        
        return this.board.currentMoves;
    }
    
    getPieceMoves(piece, fromXY)
    {
        let moves = [];
        
        for(let direction of piece.moves)
        {
            for(let move of direction)
            {
                let toXY = fromXY + move;
                let isValid = true;
                let pieceObstructed = false;
                
                // Besic Filters
                
                if(this.board.isOutOfBoard(toXY)) break;
                
                let killed = this.board.getPiece(toXY);
                
                if(killed.color == piece.color) break;
                
                if(this.board.hasPiece(toXY))
                {
                    pieceObstructed = true;
                }
                
                // Pawn
                
                if(piece instanceof pawn)
                {
                    if(piece.moves[0].includes(move))
                    {
                        if(this.board.hasPiece(toXY))
                        {
                            break;
                        }
                        if(move == piece.moves[0][1])
                        {
                            let pawnY = fromXY % 10;
                            if(pawnY == 7 || pawnY == 2) {} else break;
                        }
                    }
                    else
                    {
                        let enPassantPos = piece.color == c.w ? -1 : 1;
                        
                        if(toXY + enPassantPos == this.lastPawnMove) // EnPassant
                        {
                        }
                        else if(!(this.board.hasPiece(toXY)))
                        {
                            break;
                        }
                    }
                }
                
                // King
                
                if(piece instanceof king)
                {
                    if(piece.color == c.w)
                    {
                        if(move == 20) // short
                        {
                            if(!(this.wsCastle)) break;
                            if(this.board.hasPiece(toXY)) break; // added to ignore this move while using getAttackers() to look for check.
                        }
                        if(move == -20) // long
                        {
                            if(!(this.wlCastle)) break;
                            if(this.board.hasPiece(toXY)) break;
                        }
                    }
                    else if(piece.color == c.b)
                    {
                        if(move == 20) // short
                        {
                            if(!(this.bsCastle)) break;
                            if(this.board.hasPiece(toXY)) break;
                        }
                        if(move == -20) // long
                        {
                            if(!(this.blCastle)) break;
                            if(this.board.hasPiece(toXY)) break;
                        }
                    }
                }
                if(pieceObstructed && isValid)
                {
                    moves.push(toXY);
                    break;
                }
                if(isValid) moves.push(toXY);
            }
        }
        
        return moves;
    }
    
    filterLegalMoves(pieceMoves, fromXY)
    {
        let validMoves = pieceMoves;
        let legalMoves = [];
        
        let piece = this.board.getPiece(fromXY);
        
        for(let toXY of validMoves)
        {
            let isValid = false;
            
            let killedPiece = this.board.getPiece(toXY);
            
            let self = this;
            
            
            if(piece instanceof pawn && this.lastPawnMove != null)
            {
                let epm = piece.color == c.w ? -1 : 1;
                let killPos = toXY + epm;
                let isEnPassant = killPos == this.lastPawnMove;
                
                if(isEnPassant)
                {
                    let enPassantPiece = this.board.getPiece(killPos);
                    
                    this.testPlace(piece, toXY);
                    this.testPlace(w.Blank(), killPos);
                    this.testPlace(w.Blank(), fromXY);
                    
                    if(!(this.checkTest(piece.color))) isValid = true;
                    
                    this.testPlace(piece, fromXY);
                    this.testPlace(enPassantPiece, killPos);
                    this.testPlace(killedPiece, toXY);
                }
                else
                {
                    if(isNotCheckAfterMove()) isValid = true;
                }
                
            }
            else
            {
                if(isNotCheckAfterMove()) isValid = true;
            }
            
            function isNotCheckAfterMove()
            {
                let notCheck = false;
                
                self.testPlace(piece, toXY);
                self.testPlace(w.Blank(), fromXY);
                
                if(!(self.checkTest(piece.color))) notCheck = true;
                
                self.testPlace(piece, fromXY);
                self.testPlace(killedPiece, toXY);
                
                return notCheck;
            }
            
            
            if(piece instanceof king)
            {
                // short & long castle
                if(toXY - fromXY == 20 || toXY - fromXY == -20)
                {
                    if(Math.floor(piece.pos / 10) != 5) continue; // not at e file
                    
                    if(this.checkTest())
                    {
                        continue;
                    }
                    else
                    {
                        if(toXY - fromXY == 20) // short
                        {
                            if(!(this.board.getPiece(toXY + 10) instanceof rook)) continue;
                            
                            let attackers = this.getAttackers(fromXY + 10, this.getOppositeColor(piece.color));
                            if(attackers.length != 0) continue;
                        }
                        else if(toXY - fromXY == -20) // long
                        {
                            if(!(this.board.getPiece(toXY - 20) instanceof rook)) continue;
                            
                            let attackers = this.getAttackers(fromXY - 10, this.getOppositeColor(piece.color));
                            if(attackers.length != 0) continue;
                            if(this.board.hasPiece(toXY - 10)) continue;
                        }
                    }
                }
                
            }
            
            
            if(isValid) legalMoves.push(toXY);
        }
        return legalMoves;
    }
    
    /*  ----------  attackers  ----------  */
    
    getAttackers(intXY, color)
    {
        return this.victim2attacker(intXY, color);
    }
    
    
    victim2attacker(intXY, color)
    {
        let attackers = [];
        let victim = this.board.getPiece(intXY);
        
        let col = color
        
        if(col == undefined) col = victim.color == c.w ? c.b : c.w;
        
        let allPiece = col == c.w ? this.wPieces : this.bPieces;
        let pieces = Array.from(new Set(allPiece));  // filter duplicate pieces, potential attackers list
        
        for(let piece of pieces)
        {
            let attacker = piece;
            let pieceMover = Piece.switchColor(piece);
            
            let moves = this.getPieceMoves(pieceMover, intXY);
            
            for(let move of moves)
            {
                let foundPiece = this.board.getPiece(move);
                
                if(foundPiece.name == attacker.name)
                {
                    attackers.push(foundPiece);
                }
            }
        }
        return attackers;
    }
    
    /*  ----------  piece list  ----------  */
    
    listAddPiece(piece)
    {
        if(piece.name == w.blank || this.listHasPiece(piece)) return;
        if(piece.color == c.w) this.wPieces.push(piece);
        else if(piece.color == c.b) this.bPieces.push(piece);
    }
    
    listRemovePiece(piece)
    {
        if(piece.name == w.blank) return;
        
        let i = this.listGetPieceIndex(piece);
        if(i < 0) return;
        
        if(piece.color == c.w) this.wPieces.splice(i, 1);
        else if(piece.color == c.b) this.bPieces.splice(i, 1);
    }
    
    listHasPiece(piece)
    {
        if(piece.color == c.w)
        {        
            return this.wPieces.forEach(function (val) {if(val == piece) return true;});
        }
        else if(piece.color == c.b)
        {
            return this.bPieces.forEach(function (val) {if(val == piece) return true;});
        }
    }
    
    listGetPieceIndex(piece)
    {
        if(piece.color == c.w)
        {
            let pieces = this.wPieces;
            
            for(let i in pieces)
            {
                if(piece.pos == pieces[i].pos) return i;
            }
        }
        else if(piece.color == c.b)
        {
            let pieces = this.bPieces;
            
            for(let i in pieces)
            {
                if(piece.pos == pieces[i].pos) return i;
            }
        }
        return -1;
    }
    
    listResetAllPieces()
    {
        this.resetPieceList();
        
        for(let file of this.squares)
        {
            for(let square of file)
            {
                this.listAddPiece(square.piece);
            }
        }
    }
    
    /*  ----------  helper  ----------  */
    
    getPieceByName(name)
    {
        let piece = null;
        
        this.wPieces.forEach((p) => {if(p.name == name) piece = p;});
        this.bPieces.forEach((p) => {if(p.name == name) piece = p;});
        
        return piece;
    }
    
    getPiecesByTurn()
    {
        return this.turn == c.w ? this.wPieces : this.bPieces;
    }
    
    getOppositeColor(color)
    {
        if(color == c.w)
        {
            return c.b;
        }
        else if(color == c.b)
        {
            return c.w;
        }
        else return c.blank;
    }
}
