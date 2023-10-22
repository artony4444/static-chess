let c = color; // color class

class board
{
    constructor(id, containerId, color = c.w)
    {
        this.id = id;
        this.squares = [];
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
    
    setPiece(piece, intXY)
    {
        this.logic.setPiece(piece, intXY);
    }
    
    placePiece(piece, intXY)
    {
        this.ui.setPiece(piece, intXY);
        this.getSquare(intXY).piece = piece;
    }
    
    testPlace(piece, intXY)
    {
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
    
    sayHi()
    {
        console.log("hello");
    }
}
