let c = color; // color class

class board
{
    constructor(id, color = c.w)
    {
        this.id = id;
        this.squares = [];
        this.container = document.getElementById(id); if(this.container == null) console.log("invalid div id : \""+containerId+"\"");
        this.color = color;
        
        this.initialize();
    }
    
    initialize()
    {
        this.variables();
        
        this.clear();
        this.assemble();
    }
    
    /*  ----------  initialize  ----------  */
    
    variables()
    {
        this.ui = new ui(this);
        this.logic = new logic(this);
        
        this.resetCurrentSquare();
    }
    
    resetCurrentSquare()
    {
        this.currentSquare = null;
        this.currentMoves = [];
    }
    
    /*  ----------  square  ----------  */
    
    getSquare(intXY)
    {
        let xy = get.int2ray(intXY);
        return this.squares[xy[0]][xy[1]];
    }
    
    placePiece(piece, intXY)
    {
        this.ui.setPiece(piece, intXY);
        this.getSquare(intXY).piece = piece;
    }
    
    testPlace(piece, intXY)
    {
        // no changes in ui 
        this.getSquare(intXY).piece = piece;
    }
    
    getPiece(intXY)
    {
        return this.getSquare(intXY).piece;
    }
    
    hasPiece(intXY)
    {
        return this.getSquare(intXY).piece.name != w.blank;
    }
    
    /*  ----------  board  ----------  */
    
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
        //console.log("current pieces :"+"\nw: "+this.wPieces.map((val) => {return val.name[1]})+"\nb: "+this.bPieces.map((val) => {return val.name[1]}));
    }
    
    assemble()
    {
        this.importFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    }
    
    importFEN(FEN)
    {
        this.importFenPieces(FEN);
        this.updateFenState(FEN);
    }
    
    importFenPieces(FEN)
    {
        let fen = FEN.split("/");
        
        let x = 0, y = 7;
        
        for(let line of fen)
        {
            for(let chr of line)
            {
                if(/\d/.test(chr))
                {
                    let times = parseInt(chr);
                    
                    for(let a = 0; a < times; a++)
                    {
                        this.logic.setPiece(w.Blank(), get.ray2int(x, y));
                        ++x;
                    }
                }
                else
                {
                    this.logic.setPiece(Piece.name2piece(chr), get.ray2int(x, y));
                    ++x;
                }
                if(x > 7) break;
            }
            if(y < 0) break;
            
            --y;
            x = 0;
        }
    }
    
    updateFenState(FEN)
    {
        // FEN = ( b KQkq e3 0 1)
        let fen = FEN.split(" ");
        if(fen.length != 6) return;
        
        this.logic.turn = fen[1] == "b" ? c.b : c.w;
        
        this.logic.wsCastle = fen[2].includes("K") ? true : false;
        this.logic.wlCastle = fen[2].includes("Q") ? true : false;
        this.logic.bsCastle = fen[2].includes("k") ? true : false;
        this.logic.blCastle = fen[2].includes("q") ? true : false;
        
        if(get.str2int(fen[3]) != string.invalid)
        {
            let pCap = get.str2int(fen[3]);
            this.logic.lastPawnMove = pCap % 10 == 3 ? pCap + 1 : null;
            this.logic.lastPawnMove = pCap % 10 == 6 ? pCap - 1 : null;
        }
        
        this.logic.shortMoves = fen[4];
    }
    
    /*  ----------  move  ----------  */
    
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
        
        var moves = this.logic.getMovesList(fromXY);
        this.ui.setMoves(fromXY, moves);
    }
    
    resetMoves()
    {
        this.resetCurrentSquare();
        this.ui.resetMoves();
    }
    
    /*  ----------  helper  ----------  */
    
    movesShowing()
    {
        return this.currentMoves.length != 0;
    }
    
    isCurrentSquare(intXY)
    {
        return intXY == this.currentSquare;
    }
    
    isOutOfBoard(intXY)
    {
        return get.int2str(intXY) == string.invalid;
    }
}