class string
{
    static invalid = "invalid";
    
    static piecesFolder = "assets/pieces/wiki/";
    static extension = ".png";
    
    static boardClass = "board";
}

class color
{
    static w = 'w';
    static b = 'b';
    static blank = '-';
}

class piece
{
    constructor()
    {
        this.name = w.blank;
        this.color = color.blank;
        this.src = "";
        this.pos = null;
        this.moves = [];
    }
}


class blank extends piece
{
    constructor()
    {
        super();
        
        this.name = w.blank;
        this.color = color.blank;
        this.src = string.piecesFolder + name[0] + string.extension; 
        this.moves = [];
    }
}


class king extends piece
{
    constructor(col)
    {
        super();
        
        this.color = col;
        this.name = col == color.w ? w.king : b.king;
        this.src = string.piecesFolder + this.name[0] + string.extension;
        this.moves = king.movesList;
    }
    
    // castle // (-20) Long // (20) Short
    
    static movesList = [
        [-9], [-10, -20], [-11], [-1], [1], [9], [10, 20], [11]
    ];
}


class queen extends piece
{
    constructor(col)
    {
        super();
        
        this.color = col;
        this.name = col == color.w ? w.queen : b.queen;
        this.src = string.piecesFolder + this.name[0] + string.extension;
        this.moves = queen.movesList;
    }
    
    static movesList = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [-1, -2, -3, -4, -5, -6, -7, -8],
        [10, 20, 30, 40, 50, 60, 70, 80],
        [-10, -20, -30, -40, -50, -60, -70, -80],
        [11, 22, 33, 44, 55, 66, 77, 88],
        [-11, -22, -33, -44, -55, -66, -77, -88],
        [9, 18, 27, 36, 45, 54, 63, 72],
        [-9, -18, -27, -36, -45, -54, -63, -72]
    ];
}


class rook extends piece
{
    constructor(col)
    {
        super();
        
        this.color = col;
        this.name = col == color.w ? w.rook : b.rook;
        this.src = string.piecesFolder + this.name[0] + string.extension;
        this.moves = rook.movesList;
    }
    
    static movesList = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [-1, -2, -3, -4, -5, -6, -7, -8],
        [10, 20, 30, 40, 50, 60, 70, 80],
        [-10, -20, -30, -40, -50, -60, -70, -80]
    ];
}


class bishop extends piece
{
    constructor(col)
    {
        super();
        
        this.color = col;
        this.name = col == color.w ? w.bishop : b.bishop;
        this.src = string.piecesFolder + this.name[0] + string.extension;
        this.moves = bishop.movesList;
    }
    
    static movesList = [
        [11, 22, 33, 44, 55, 66, 77, 88],
        [-11, -22, -33, -44, -55, -66, -77, -88],
        [9, 18, 27, 36, 45, 54, 63, 72],
        [-9, -18, -27, -36, -45, -54, -63, -72]
    ];
}


class knight extends piece
{
    constructor(col)
    {
        super();
        
        this.color = col;
        this.name = col == color.w ? w.knight : b.knight;
        this.src = string.piecesFolder + this.name[0] + string.extension;
        this.moves = knight.movesList;
    }
    
    static movesList = [
        [-8], [12], [21], [19], [8], [-12], [-21], [-19]
    ];
}


class pawn extends piece
{
    constructor(col)
    {
        super();
        
        this.color = col;
        this.name = col == color.w ? w.pawn : b.pawn;
        this.src = string.piecesFolder + this.name[0] + string.extension;
        this.moves = col == color.w ? pawn.wPawnMoves : pawn.bPawnMoves;
    }
    
    // move (1)
    // start (2)
    // kill (~11, ~9)
    // promotion
    
    static wPawnMoves = [
        [1, 2], [11], [-9]
    ];
    static bPawnMoves = [
        [-1, -2], [-11], [9]
    ];
}




class w
{
    static blank =  ["w_blank",   '-'];
    
    static king =   ["w_king",    'K'];
    static queen =  ["w_queen",   'Q'];
    static rook =   ["w_rook",    'R'];
    static bishop = ["w_bishop",  'B'];
    static knight = ["w_knight",  'N'];
    static pawn =   ["w_pawn",    'P'];
    
    static Blank()
    {
        return new blank(color.w);
    }
    static King()
    {
        return new king(color.w);
    }
    static Queen()
    {
        return new queen(color.w);
    }
    static Rook()
    {
        return new rook(color.w);
    }
    static Bishop()
    {
        return new bishop(color.w);
    }
    static Knight()
    {
        return new knight(color.w);
    }
    static Pawn()
    {
        return new pawn(color.w);
    }
}

class b
{
    static blank =  ["w_blank",   '-'];
    
    static king =   ["b_king",    'k'];
    static queen =  ["b_queen",   'q'];
    static rook =   ["b_rook",    'r'];
    static bishop = ["b_bishop",  'b'];
    static knight = ["b_knight",  'n'];
    static pawn =   ["b_pawn",    'p'];
    
    static Blank()
    {
        return new blank(color.b);
    }
    static King()
    {
        return new king(color.b);
    }
    static Queen()
    {
        return new queen(color.b);
    }
    static Rook()
    {
        return new rook(color.b);
    }
    static Bishop()
    {
        return new bishop(color.b);
    }
    static Knight()
    {
        return new knight(color.b);
    }
    static Pawn()
    {
        return new pawn(color.b);
    }
}

class Piece
{
    static w = [ w.Blank(), w.King(), w.Queen(), w.Rook(), w.Bishop(), w.Knight(), w.Pawn()];
    static b = [ b.Blank(), b.King(), b.Queen(), b.Rook(), b.Bishop(), b.Knight(), b.Pawn()];
    
    static name2piece(name)
    {
        if(name == w.pawn[0] || name == w.pawn[1]) return w.Pawn();
        if(name == w.knight[0] || name == w.knight[1]) return w.Knight();
        if(name == w.bishop[0] || name == w.bishop[1]) return w.Bishop();
        if(name == w.rook[0] || name == w.rook[1]) return w.Rook();
        if(name == w.queen[0] || name == w.queen[1]) return w.Queen();
        if(name == w.king[0] || name == w.king[1]) return w.King();
        
        if(name == b.pawn[0] || name == b.pawn[1]) return b.Pawn();
        if(name == b.knight[0] || name == b.knight[1]) return b.Knight();
        if(name == b.bishop[0] || name == b.bishop[1]) return b.Bishop();
        if(name == b.rook[0] || name == b.rook[1]) return b.Rook();
        if(name == b.queen[0] || name == b.queen[1]) return b.Queen();
        if(name == b.king[0] || name == b.king[1]) return b.King();
        
        return w.Blank();
        
        /* OLD PIECE RETURNS SAME OBJECT AGAIN AND AGAIN
        for(let piece of this.w)
        {
            if(piece.name[0] == name || piece.name[1] == name)
            {
                return piece;
            }
        }
        for(let piece of this.b)
        {
            if(piece.name[0] == name || piece.name[1] == name)
            {
                return piece;
            }
        }
        return w.Blank();
        */
    }
    
    static switchColor(piece)
    {
        let pieceName = piece.name[0];
        pieceName = pieceName.slice(0,1) == "w" ? "b" + pieceName.slice(1) : "w" + pieceName.slice(1);
        return this.name2piece(pieceName);
    }
}
