let c = color; // color class


class board
{
    
    
    
    constructor(id, containerId, color = c.w)
    {
        this.squares = [];
        this.id = id;
        this.container = document.getElementById(containerId);
        this.color = color;
        
        this.initialize();
    }
    
    
    
    
    initialize()
    {
        this.variables();
        
        this.clear();
        this.assemble();
    }
    
    variables()
    {
        this.ui = new ui(this);
        
        this.resetCurrentSquare();
        this.resetPieceList();
        this.resetSpecialMoves();
    }
    
    resetCurrentSquare()
    {
        this.currentSquare = null;
        this.currentMoves = [];
    }
    
    resetPieceList()
    {
        this.wPieces = [];
        this.bPieces = [];
    }
    
    
    resetSpecialMoves()
    {
        this.resetPawnVars();
        this.resetKingVars();
    }
    
    resetPawnVars()
    {
        this.lastPawnMove = null;
    }
    
    resetKingVars()
    {
        let initial = false
        
        this.wsCastle = initial;
        this.wlCastle = initial;
        
        this.bsCastle = initial;
        this.blCastle = initial;
    }
    
    
    
    
    
    
    
    
    
    
    
    getSquare(intXY)
    {
        let xy = get.int2ray(intXY);
        return this.squares[xy[0]][xy[1]];
    }
    
    setPiece(piece, intXY)
    {
        let pc = piece;
        let killed = this.getPiece(intXY);
        
        pc.pos = intXY;
        let self = this;
        
        updatePieceList(pc, killed);
        placePiece(pc, intXY);
        
        
        function updatePieceList(add, remove)
        {
            if(killed.name != w.blank) self.listRemovePiece(killed);
            if(pc.name != w.blank) self.listAddPiece(pc);
        }
        
        function placePiece(pc, intXY)
        {
            self.ui.setPiece(pc, intXY);
            self.getSquare(intXY).piece = pc;
        }
    }
    
    getPiece(intXY)
    {
        return this.getSquare(intXY).piece;
    }
    
    hasPiece(intXY)
    {
        return this.getSquare(intXY).piece.name != w.blank;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    clear()
    {
        this.ui.clear(this.id, this.color == c.w, true);
        
        let sqrs = [];
        
        for(let x = 0; x < 8; x++)
        {
            sqrs[x] = [];
            
            for(let y = 0; y < 8; y++)
            {
                sqrs[x][y] = new square(get.ray2str(x, y));
            }
        }
        
        this.squares = sqrs;
    }
    
    
    
    getBoard()
    {
        let board = "";
        
        let black = (this.color == c.b);
        
        for(let x = 0; x < 8; x++)
        {
            for(let y = 0; y < 8; y++)
            {
                let fy = black ? 7-y : y; // reverse y - black
                let fx = black ? x : 7-x; // reverse x - white
                
                board += this.squares[fy][fx].id + this.squares[fy][fx].piece.name[1] + "   ";
            }
            
            board += "\n";
        }
        
        console.log(board);
        console.log("current square :"+get.int2str(this.currentSquare)+ "\nmoves :" + get.int22str(this.currentMoves));
        console.log("current pieces :"+"\nw: "+this.wPieces.map((val) => {return val.name[1]})+"\nb: "+this.bPieces.map((val) => {return val.name[1]}));
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    assemble()
    {
        this.importFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    }
    
    
    importFEN(FEN)
    {
        let fen = FEN.split("/");
        
        let x = 0, y = 7;
        
        for(let line of fen)
        {
            for(let chr of line)
            {
                if(/\d/.test(chr))
                {
                    for(let a = 0; a < parseInt(chr); a++)
                    {
                        this.setPiece(w.Blank(), get.ray2int(x, y));
                        ++x;
                    }
                }
                else
                {
                    this.setPiece(Piece.name2piece(chr), get.ray2int(x, y));
                    ++x;
                }
                if(x > 7) break;
            }
            if(y < 0) break;
            
            --y;
            x = 0;
        }
    }    
    
    
    
    
    
    
    
    
    
    
    
    
    setResetMoves(fromXY)
    {
        if(this.isCurrentSquare(fromXY))
        {
            this.resetMoves();
        }
        else
        {
            this.setMoves(fromXY);
        }
    }
    
    setMoves(fromXY)
    {
        this.resetMoves();
        
        var moves = this.getMovesList(fromXY);
        this.ui.setMoves(fromXY, moves);
    }
    
    resetMoves()
    {
        this.resetCurrentSquare();
        this.ui.resetMoves();
    }
    
    movesShowing()
    {
        return this.currentMoves.length != 0;
    }
    
    isCurrentSquare(intXY)
    {
        return intXY == this.currentSquare;
    }
    
    
    
    
    
    
    
    
    
    listAddPiece(piece)
    {
        if(piece.name == w.blank) return;
        
        if(this.listHasPiece(piece)) return;
        
        if(piece.color == c.w)
        {
            this.wPieces.push(piece);
        }
        else if(piece.color == c.b)
        {
            this.bPieces.push(piece);
        }
    }
    
    listRemovePiece(piece)
    {
        if(piece.name == w.blank) return;
        
        let i = this.listGetPieceIndex(piece);
        
        if(piece.color == c.w)
        {
            this.wPieces.splice(i, 1);
        }
        else if(piece.color == c.b)
        {
            this.bPieces.splice(i, 1);
        }
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
                if(piece == pieces[i]) return i;
            }
        }
        else if(piece.color == c.b)
        {
            let pieces = this.bPieces;
            
            for(let i in pieces)
            {
                if(piece == pieces[i]) return i;
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    move(toXY)
    {
        let fromXY = this.currentSquare;
        let pieceMoved = this.getPiece(fromXY);
        
        if(this.currentMoves.includes(toXY))
        {
            this.setPiece(w.Blank(), fromXY);
            this.setPiece(pieceMoved, toXY);
        }
        else console.log("invalid move!");
        
        this.resetMoves();
    }
    
    
    
    
    
    
    
    
    
    getMovesList(fromXY)
    {
        this.currentMoves = this.getPieceMoves(this.getPiece(fromXY), fromXY);
        this.currentSquare = fromXY;
        
        return this.currentMoves;
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
                
                if(this.isOutOfBoard(toXY)) break;
                
                let killed = this.getPiece(toXY);
                
                if(killed.color == piece.color) break;
                
                if(this.hasPiece(toXY))
                {
                    pieceObstructed = true;
                }
                
                // Pawn
                
                if(piece instanceof pawn)
                {
                    if(piece.moves[0].includes(move))
                    {
                        if(this.hasPiece(toXY))
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
                        if(false && isEnPassant)
                        {
                            
                        }
                        if(!(this.hasPiece(toXY)))
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
                        }
                        if(move == -20) // long
                        {
                            if(!(this.wlCastle)) break;
                        }
                    }
                    else if(piece.color == c.b)
                    {
                        if(move == 20) // short
                        {
                            if(!(this.bsCastle)) break;
                        }
                        if(move == -20) // long
                        {
                            if(!(this.blCastle)) break;
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
    
    // 
    
    getAttackers(intXY)
    {
        let attackers = [];
        
        let allPieces = piece.color == c.w ? this.wPieces : this.bPieces;
        let duplicateRemoved = Array.from(new Set(allPieces));
        
        this.attacker2victim(intXY);
        
        return attackers;
    }
    
    victim2attacker(intXY)
    {
        let attackers = [];
        let piece = this.getPiece(intXY);
        
        if(piece.name == w.blank) return;
        
        let atkrs = piece.color == c.w ? this.wPieces : this.bPieces;
        let pAttackers = Array.from(new Set(atkrs));
        
        for(let attackingPiece of pAttackers)
        {
            let moves = this.getPieceMoves(attackingPiece, intXY);
            
            for(let m of moves)
            {
                if(this.getPiece(m) == attackingPiece)
                {
                    attackers.push(attackingPiece);
                }
            }
        }
        
        return attackers;
    }
    
    
    attacker2victim(intXY)
    {
        let attackers = [];
        let piece = this.getPiece(intXY);
        
        if(piece.name == w.blank) return;
        
        let pAttackers = piece.color == c.w ? this.wPieces : this.bPieces;
        
        for(let attackingPiece of pAttackers)
        {
            let moves = this.getPieceMoves(attackingPiece, attackingPiece.pos);
            
            for(let m of moves)
            {
                if(this.getPiece(m) == piece)
                {
                    attackers.push(attackingPiece);
                }
            }
        }
        
        return attackers;
    }
    
    
    isCheck(){}
    
    
    getPieceByName(name)
    {
        let piece = null;
        
        this.wPieces.forEach((p) => {if(p.name == name) piece = p;});
        this.bPieces.forEach((p) => {if(p.name == name) piece = p;});
        
        return piece;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    isOutOfBoard(intXY)
    {
        return get.int2str(intXY) == string.invalid;
    }
}
