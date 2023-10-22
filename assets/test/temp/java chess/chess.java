// made by Artony#4166 (discord)


import java.util.Arrays;
import java.util.ArrayList;



// yet to include - 

//    pawn promotion
//    checkmate screen
//    bot




class Main{
    public static void main(String args[]){
        chess game1 = new chess();
        //System.out.println(game1.getMoves(12));
        //game1.board.importFEN("k2K4/8/8/8/4R3/8/8/8");
        //System.out.println(game1.board.getMovesList(xy.h8,w.king()));
        
        //System.out.println(get.int22string(game1.board.getAttackers(game1.board.getKingPos(color.W))));
        //System.out.println(game1.board.isCheck(color.W));
        
        
        game1.board.move(xy.g1, xy.f3);
        game1.board.move(xy.e7, xy.e5);
        game1.board.move(xy.f3, xy.g5);
        game1.board.move(xy.f8, xy.e7);
        game1.board.move(xy.g5, xy.f7);
        game1.board.move(xy.g8, xy.f6);
        game1.board.move(xy.f7, xy.h8);
        game1.board.move(xy.e8, xy.g8);
        
        
        
        
        game1.board.getBoard();
    }
}






class chess
{
    board board = new board();
    player[] player = new player[2];
    ArrayList<move> moves = new ArrayList<move>();
    
    color turn = color.W;
    
    int moveNumber = 1;
    
    
    
    
    
    
    public chess()
    {
        setPlayers();
    }
    
    
    
    
    
    public void setPlayers()
    {
        player[0] = new player(color.W);
        player[1] = new player(color.B);
    }
    
    
    
    
    
    public String[][] getDisplay()
    {
        return display.getBoard(board.board);
    }
    
    public int[] getMoved()
    {
        if (moves.size() == 0) return new int[1];
        else return display.getMoved(moves.get(moves.size()-1));
    }
    
    
    
    public void displayMovesHistory()
    {
        System.out.println(get.move22names(moves));
    }
    
    
    
    public ArrayList<Integer> getMoves(int fXY)
    {
        if (board.getpiece(fXY).pieceColor == turn)
        {
            return board.getMoves(fXY);
        }
        else return new ArrayList<Integer>();
    }
    
    
    
    public void move(int fXY, int tXY)
    {
        if (turn == board.getpiece(fXY).pieceColor /*&& board.isMove(fXY, tXY)*/)
        {
            addMove(fXY, tXY);
            board.move(fXY, tXY);
            
            if (turn == color.W) 
            {
                turn = color.B;
            }
            else if (turn == color.B)
            {
                turn = color.W;
                
                moveNumber++;
            }
        }
        else if (turn != board.getpiece(fXY).pieceColor) 
        {
            System.out.println("its "+get.color2str(turn)+"'s turn");
        }
        else System.out.println(board.getpiece(fXY).image+" "+get.int2str(fXY)+" - "+get.int2str(tXY)+", Invalid");
    }
    
    
    
    public void addMove(int fXY, int tXY) // castle
    {
        move move = new move();
        
        move.number = moveNumber;
        move.piece = board.getpiece(fXY);
        move.player = turn == color.W ? player[0] : player[1];
        move.killed = board.getpiece(tXY);
        move.isCastle = board.isCastle(fXY, tXY);
        move.fill(fXY, tXY, board.kXY());
        
        moves.add(move);
    }
}







class move
{
    String name;
    int number;
    player player;
    piece piece;
    int fXY;
    int tXY;
    int kXY;
    piece killed;
    boolean isCastle;
    
    public void fill(int fXY, int tXY, int kXY)
    {
        this.fXY = fXY;
        this.tXY = tXY;
        this.kXY = kXY;
        String n1 = player.color == color.W ? number+". " : "";
        String n2 = piece.image.split("_")[1];
        String n3 = " "+get.int2str(tXY)+", ";
        name = n1+n2+n3;
        //System.out.println(name);
    }
}







class player
{
    String name;
    color color;
    
    public player()
    {}
    
    public player(color color)
    {
        if (color == color.W)
        {
            name = "p1";
            this.color = color;
        }
        if (color == color.W)
        {
            name = "p2";
            this.color = color;
        }
    }
}




class display
{
    
    public static String[][] getBoard(square[][] board)
    {
        String[][] images = new String[8][8];
        
        for (int a = 0; a < 8; a++)
        {
            for (int b = 0; b < 8; b++)
            {
                images[a][b] = board[a][b].piece.image;
            }
        }
        return images;
    }
    
    public static int[] getMoved(move m)
    {
        int[] moved = new int[4]; // MAKE SURE TO INCREASE THIS
        
        moved[0] = m.fXY; // from
        moved[1] = m.tXY; // to
        moved[2] = m.kXY; // killed
        moved[3] = m.isCastle ? 1 : 0;
        
        return moved;
    }
}



















class board
{
    square[][] board = new square[8][8];
    
    
    ArrayList<piece> whitepieces = new ArrayList<piece>();
    ArrayList<piece> blackpieces = new ArrayList<piece>();
    ArrayList<piece> wKilledpieces = new ArrayList<piece>();
    ArrayList<piece> bKilledpieces = new ArrayList<piece>();
    
    
    
    
    boolean hasPawnSpecial = false;
    int lastPawnMove = 0;
    int killedpiece = 0;
    
    
    
    boolean hasCastle = false;
    
    boolean hasWhiteShortCastle = false;
    boolean hasBlackShortCastle = false;
    boolean hasWhiteLongCastle = false;
    boolean hasBlackLongCastle = false;
    
    boolean whiteKingNotMoved = true;
    boolean whiteLeftRookNotMoved = true;
    boolean whiteRightRookNotMoved = true;
    
    boolean blackKingNotMoved = true;
    boolean blackLeftRookNotMoved = true;
    boolean blackRightRookNotMoved = true;
    
    
    
    
    
    
    
    
    public board()
    {
        clear();
        assemble();
    }
    
    public square getSquare(int at)
    {
        int[] xy = get.int2ray(at);
        return board[xy[0]][xy[1]];
    }
    
    public void setpiece(piece piece, int at)
    {
        getSquare(at).piece = piece;
    }
    
    public piece getpiece(int at)
    {
        return getSquare(at).piece;
    }
    
    public boolean haspiece(int at)
    {
        return !(getpiece(at) instanceof empty);
    }
    
    
    
    
    public void clear()
    {
        for (int a = 0; a < board.length; a++)
        {
            for (int b = 0; b < board[a].length; b++)
            {
                board[a][b] = new square();
                board[a][b].piece = w.empty();
            }
        }
    }
    
    
    
    public void getBoard() 
    {
        for (int b = 0; b < board.length; b++)
        {
            for (int a = 0; a < board[b].length; a++)
            {
                // ay white // xb black // 
                int x = board.length - a - 1;
                int y = board.length - b - 1;
                System.out.print(board[a][y].piece.image+", ");
            }
            System.out.println("");
        }
    }
    
    
    
    public void assemble()
    {
        //importFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
        setpiece(w.rook(), xy.a1);
        setpiece(w.rook(), xy.h1);
        setpiece(w.knight(), xy.b1);
        setpiece(w.knight(), xy.g1);
        setpiece(w.bishop(), xy.c1);
        setpiece(w.bishop(), xy.f1);
        setpiece(w.queen(), xy.d1);
        setpiece(w.king(), xy.e1);
        
        setpiece(b.rook(), xy.a8);
        setpiece(b.rook(), xy.h8);
        setpiece(b.knight(), xy.b8);
        setpiece(b.knight(), xy.g8);
        setpiece(b.bishop(), xy.c8);
        setpiece(b.bishop(), xy.f8);
        setpiece(b.queen(), xy.d8);
        setpiece(b.king(), xy.e8);
        //white pawn
        for (int a = 1; a <= 8; a++)
        {
            setpiece(w.pawn(), a*10+2);
        }
        //black pawn
        for (int a = 1; a <= 8; a++)
        {
            setpiece(b.pawn(), a*10+7);
        }
        
        
        updatepieceList();
    }
    
    
    public void importFEN(String FEN)
    {
        String[] lines = FEN.split("/");
        
        //System.out.println(Arrays.deepToString(lines));
        
        int x = 7, y = 0;
        
        for (int a = 0; a < lines.length; a++)
        {
            for (int b = 0; b < lines[a].length(); b++)
            {
                char raw = lines[a].charAt(b);
                
                if (get.char2str(raw) == "is number")
                {
                    int num = Character.getNumericValue(raw);
                    for (int ab = 0; ab < num; ab++)
                    {
                        setpiece(w.empty(), get.ray2int(y, x));
                        y++;
                    }
                }
                else 
                {
                    setpiece(get.char2piece(raw), get.ray2int(y, x));
                    y++;
                }
            }
            x--;
            y = 0;
        }
        
        
        updatepieceList();
    }
    
    
    // 2 updatepieceList();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ArrayList<Integer> validMoves = new ArrayList<Integer>();
    
    
    
    public void move(int fXY, int tXY)
    {
        if (isMove(fXY, tXY))
        {
            piece moved = getpiece(fXY);
            
            record(fXY, tXY);
            
            
            
            int killed = tXY;
            if (killedpiece != 0) killed = killedpiece;
            
            
            
            setpiece(w.empty(), killed);
            setpiece(getpiece(fXY), tXY);
            setpiece(w.empty(), fXY);
            
            
            if (moved instanceof king && tXY - fXY == 20 || tXY - fXY == -20) castleRook(fXY, tXY);
            
            
            resetVars();
            //allCastleFalse();
        }
        else System.out.println(""+get.int2str(fXY)+" > "+get.int2str(tXY)+" is invalid move");
    }
    
    
    public void castleRook(int fXY, int tXY)
    {
        if (true)
        {
            if (getpiece(tXY).image == w.king && tXY - fXY == 20)
            {
                int rookPos = tXY + 10;
                int rookEndPos = tXY - 10;
                setpiece(getpiece(rookPos), rookEndPos);
                setpiece(w.empty(), rookPos);
                hasCastle = true;
            }
            else if (getpiece(tXY).image == b.king && tXY - fXY == 20)
            {
                int rookPos = tXY + 10;
                int rookEndPos = tXY - 10;
                setpiece(getpiece(rookPos), rookEndPos);
                setpiece(w.empty(), rookPos);
                hasCastle = true;
            }
            else if (getpiece(tXY).image == w.king && tXY - fXY == -20)
            {
                int rookPos = tXY - 20;
                int rookEndPos = tXY + 10;
                setpiece(getpiece(rookPos), rookEndPos);
                setpiece(w.empty(), rookPos);
                hasCastle = true;
            }
            else if (getpiece(tXY).image == b.king && tXY - fXY == -20)
            {
                int rookPos = tXY - 20;
                int rookEndPos = tXY + 10;
                setpiece(getpiece(rookPos), rookEndPos);
                setpiece(w.empty(), rookPos);
                hasCastle = true;
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public ArrayList<Integer> getMoves(int fromXY)
    {
        validMoves = new ArrayList<Integer>();
        validMoves = movesList(fromXY);
        return validMoves;
    }
    
    
    public boolean isMove(int fromXY, int toXY)
    {
        validMoves = new ArrayList<Integer>();
        validMoves = movesList(fromXY);
        return hasMove(toXY, validMoves);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public boolean hasMove(int toXY, ArrayList<Integer> validMoves) // check if move is in array
    {
        for (int move : validMoves)
        {
            if (move == toXY) return true;
        }
        return false;
    }
    
    
    public boolean isSameColor(piece piece1, piece piece2)
    {
        return piece1.pieceColor == piece2.pieceColor;
    }
    
    
    public boolean isOutOfBoard(int madeMove)
    {
        if (madeMove > 88 || madeMove < 11 || madeMove % 10 == 0 || madeMove % 10 == 9 || madeMove / 10 == 0 || madeMove / 10 == 9) 
        return true;
        else return false;
    }
    
    
    
    public boolean isCheckAfterMove(int fromXY, int madeMove)
    {
        boolean isCheck = false;
        
        piece from = getpiece(fromXY);
        piece to = getpiece(madeMove);
        
        if (hasPawnSpecial)
        {
            int killedPos = madeMove;
            if (killedpiece != 0) killedPos = killedpiece;
            piece killed = getpiece(killedPos);
            
            
            setpiece(w.empty(), killedPos);
            setpiece(from, madeMove);
            setpiece(w.empty(), fromXY);        
            
            isCheck = isCheck(from.pieceColor);    
        
            setpiece(killed, killedPos);
            setpiece(to, madeMove);
            setpiece(from, fromXY);
        }
        else
        {
            setpiece(from, madeMove);
            setpiece(w.empty(), fromXY);
            
            isCheck = isCheck(from.pieceColor);    
            
            setpiece(to, madeMove);
            setpiece(from, fromXY);
        }
        return isCheck;
    }
    
    
    
    
    public boolean isCastle(int fXY, int tXY) // for chess class
    {
        boolean isCastle = false;
        if (tXY - fXY == 20 || tXY - fXY == -20) isCastle = true;
        return isCastle;
    }
    
    public boolean isValidCastle(int fromXY, int madeMove)
    {
        boolean isValid = true;
        
        if (madeMove - fromXY == -20) // long
        {
            if (isUnderAttack(fromXY)) isValid = false;
            if (colorIsAttacking(fromXY - 10, get.oppColor(getpiece(fromXY).pieceColor))) isValid = false;
            if (!(getpiece(fromXY - 40) instanceof rook)) isValid = false;
        }
        else if (madeMove - fromXY == 20) // short
        {
            if (isUnderAttack(fromXY)) isValid = false;
            if (colorIsAttacking(fromXY + 10, get.oppColor(getpiece(fromXY).pieceColor))) isValid = false;
            if (getpiece(madeMove + 10) instanceof rook) isValid = false;
            if (!(getpiece(fromXY + 30) instanceof rook)) isValid = false;
        }
        
        return isValid;
    }
    
    
    
    
    
    public ArrayList<Integer> movesList(int fromXY) 
    {
        piece currentpiece = getpiece(fromXY);
        ArrayList<Integer> moves = getMovesList(fromXY, currentpiece);
        
        ArrayList<Integer> finalMoves = new ArrayList<Integer>();
        
        for (int madeMove : moves)
        {
            if (isCheckAfterMove(fromXY, madeMove)) continue;
            
            if (currentpiece instanceof king)
            {
                if (isCastle(fromXY, madeMove))
                {
                    if (!(isValidCastle(fromXY, madeMove))) continue;
                }
            }
            
            finalMoves.add(madeMove);
        }
        
        return finalMoves;  
    }
    
    
    
    public ArrayList<Integer> getMovesList(int fromXY, piece pc) 
    {
        ArrayList<Integer> movesList = new ArrayList<Integer>();
        
        piece currentpiece = pc;      //getpiece(fromXY);
        
        int[][] moves = currentpiece.moves;
        
        if (currentpiece instanceof empty)
        {
            return movesList;
        }
        
        
        for (int a = 0; a < moves.length; a++)
        {
            for (int z = 0; z < moves[a].length; z++)
            {
                int m = moves[a][z];
                int madeMove = fromXY + m;
                
                if (isOutOfBoard(madeMove)) break;
                if (isSameColor(currentpiece, getpiece(madeMove))) break;
                
                
                if (currentpiece instanceof pawn)
                {
                    if (m == 1 || m == -1) // front 1
                    {
                        if (haspiece(madeMove)) break;
                    }
                    else if (m == 2) // front 2 white 
                    {
                        if (fromXY % 10 != 2) break; // pawn is at y = 2
                        else if (haspiece(madeMove)) break;  // pawn is blocked +2 move cant be made
                    }
                    else if (m == -2) // front 2 black
                    {
                        if (fromXY % 10 != 7) break;
                        else if (haspiece(madeMove)) break;
                    }
                    else if (m == 11 || m == -9 || m == -11 || m == 9) // right left take
                    {
                        // special mv
                        if (m == 11 || m == -9) // white
                        {
                            if (lastPawnMove != 0 && madeMove % 10 == 6 && madeMove - 1 == lastPawnMove % 100)
                            {
                                hasPawnSpecial = true;
                                killedpiece = madeMove - 1;
                                
                                movesList.add(madeMove);
                            }
                        }
                        else if (m == -11 || m == 9) // black
                        {
                            if (lastPawnMove != 0 && madeMove % 10 == 3 && madeMove + 1 == lastPawnMove % 100)
                            {
                                hasPawnSpecial = true;
                                killedpiece = madeMove + 1;
                                
                                movesList.add(madeMove);
                            }
                        }
                        
                        if (!(haspiece(madeMove))) break;
                        //promote yet to include
                    }
                }
                else if (currentpiece instanceof king)
                {
                    if (m == 20 || m == -20)
                    {
                        if (!hasAnyCastle(currentpiece.pieceColor)) break;
                    
                        color pieceColor = currentpiece.pieceColor;
                        color c = get.oppColor(pieceColor);
                        String pieceImg = currentpiece.image;
                    
                        if (m == 20) // short castle
                        {
                            if (pieceImg == w.king && whiteKingNotMoved && whiteRightRookNotMoved) 
                            {
                                if (haspiece(madeMove)) break;
                                //if (colorIsAttacking(madeMove - 10, c)) break;
                                hasWhiteShortCastle = true;
                                hasCastle = true;
                            }
                            else if (pieceImg == b.king && blackKingNotMoved && blackRightRookNotMoved) 
                            {
                                if (haspiece(madeMove)) break;
                                //if (colorIsAttacking(madeMove - 10, c)) break;
                                hasBlackShortCastle = true;
                                hasCastle = true;
                            }
                            else break;
                        }
                        else if (m == -20) // long castle
                        {
                            if (pieceImg == w.king && whiteKingNotMoved && whiteLeftRookNotMoved) 
                            {
                                if (haspiece(madeMove)) break;
                                //if (colorIsAttacking(madeMove + 10, c)) break;
                                hasWhiteLongCastle = true;
                                hasCastle = true;
                            }
                            else if (pieceImg == b.king && blackKingNotMoved && blackLeftRookNotMoved) 
                            {
                                if (haspiece(madeMove)) break;
                                //if (colorIsAttacking(madeMove + 10, c)) break;
                                hasBlackLongCastle = true;
                                hasCastle = true;
                            }
                            else break;
                        }
                    }
                }
                
                movesList.add(madeMove);
                
                if (haspiece(madeMove)) break; // stops adding moves if a piece is obstructing way ahead 
            }
        }
        //System.out.println(get.int22string(movesList));
        return movesList;
    }
    
    
    
    
    // VICTIM TO ATTACKER
    
    public ArrayList<Integer> OLDgetAttackersByColor(int fXY, color c)
    {
        ArrayList<Integer> attackers = new ArrayList<Integer>();
        ArrayList<piece> pieces = get.pieces(get.oppColor(c));
        
        for (piece pc : pieces)
        {
            // if (pc instanceof king) continue; // stops infinite loop
            
            ArrayList<Integer> pieceMove = getMovesList(fXY, pc);
            
            for (int move : pieceMove)
            {
                if (get.pieceStr(getpiece(move)).equals(get.pieceStr(pc)))
                {
                    attackers.add(move);
                }
            }
        }
        return attackers;
    }
    
    
    // ATTACKER TO VICTIM
    
    public ArrayList<Integer> NEWgetAttackersByColor(int fXY, color c) 
    {
        if (isOutOfBoard(fXY)) return new ArrayList<Integer>();
        
        ArrayList<Integer> attackers = new ArrayList<Integer>();
        
        ArrayList<piece> attackerpieces = getAllpieces(c);
        
        for (piece pc : attackerpieces)
        {
            //if (pc instanceof king) continue; // stops infinite loop
            
            ArrayList<Integer> moves = getMovesList(pc.pos, pc);
            
            for (int move : moves)
            {
                if (move == fXY) attackers.add(pc.pos);
            }
        }
        
        return attackers;
    }
    
    public ArrayList<Integer> getAttackers(int fXY)
    {
        piece victim = getpiece(fXY);
        color atkrColor = get.oppColor(victim.pieceColor);
        
        return OLDgetAttackersByColor(fXY, atkrColor);
    }
    
    public boolean colorIsAttacking(int fXY, color c)
    {
        return (OLDgetAttackersByColor(fXY, c).size() != 0);
    }
    
    public boolean isUnderAttack(int fXY)
    {
        return (getAttackers(fXY).size() != 0);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    
    int lastMove = 1112;
    int killedpiece = 0;
    
    ArrayList<piece> whitepieces = new ArrayList<piece>();
    ArrayList<piece> blackpieces = new ArrayList<piece>();
    ArrayList<piece> wKilledpieces = new ArrayList<piece>();
    ArrayList<piece> bKilledpieces = new ArrayList<piece>();
    
    */
    
    public ArrayList<piece> getAllpieces(color c)
    {
        ArrayList<piece> pieces = new ArrayList<piece>();
        
        updatepieceList();
        
        switch (c)
        {
            case W :
                pieces.addAll(whitepieces);
                break;
            case B :
                pieces.addAll(blackpieces);
                break;
            case blank :
                pieces.addAll(whitepieces);
                pieces.addAll(blackpieces);
        }
        return pieces;
    }
    
    
    public void record(int fXY, int tXY)
    {
        piece moved = getpiece(fXY);
        moved.pos = tXY;
        
        piece killed = getpiece(tXY);
        if (killedpiece != 0) killed = getpiece(killedpiece);
        
        
        if (moved instanceof pawn && fXY - tXY == 2 || fXY - tXY == -2) lastPawnMove = fXY*100+tXY;
        else lastPawnMove = 0;
        
        updateCastle(fXY, moved);
        
        switch (killed.pieceColor)
        {
            case W :
                //if (wKilledpieces.get(wKilledpieces.size()-1) == killed) break;
                wKilledpieces.add(killed);
                break;
            case B :
                //if (bKilledpieces.get(bKilledpieces.size()-1) == killed) break;
                bKilledpieces.add(killed);
                break;
        }
    }
    
    
    public void updateCastle(int fXY, piece moved)
    {
        
        if (moved instanceof king || moved instanceof rook)
        {
            String movedImg = moved.image;
            
            if (movedImg == w.king || movedImg == w.rook)
            {
                if (movedImg == w.king) whiteKingNotMoved = false;
                else if (whiteLeftRookNotMoved == true && movedImg == w.rook && fXY == 11) whiteLeftRookNotMoved = false;
                else if (whiteRightRookNotMoved == true && movedImg == w.rook && fXY == 81) whiteRightRookNotMoved = false;
            }
            else if (movedImg == b.king || movedImg == b.rook)
            {
                if (movedImg == b.king) blackKingNotMoved = false;
                else if (blackLeftRookNotMoved == true && movedImg == b.rook && fXY == 18) blackLeftRookNotMoved = false;
                else if (blackRightRookNotMoved == true && movedImg == b.rook && fXY == 88) blackRightRookNotMoved = false;
            }
        }
    }
    
    
    public int kXY()
    {
        int kXY = 0;
        
        if (hasPawnSpecial) kXY = killedpiece;
        
        return kXY;
    }
    
    public boolean hasAnyCastle(color c)
    {
        boolean hasCastle = false;
        
        if (true)
        {
            if (c == color.W && whiteKingNotMoved)
            {
                if (whiteLeftRookNotMoved == true) hasCastle = true;
                if (whiteRightRookNotMoved == true) hasCastle = true;
            }
            else if (c == color.B && blackKingNotMoved)
            {
                if (blackLeftRookNotMoved == true) hasCastle = true;
                if (blackRightRookNotMoved == true) hasCastle = true;
            }
        }
        return hasCastle;
    }
    
    public void resetVars()
    {
        killedpiece = 0;
        hasPawnSpecial = false;
        
        hasCastle = false;
        hasWhiteShortCastle = false;
        hasBlackShortCastle = false;
        hasWhiteLongCastle = false;
        hasBlackLongCastle = false;
    }
    
    public void updatepieceList()
    {
        whitepieces = new ArrayList<piece>();
        blackpieces = new ArrayList<piece>();
        
        for (int a = 0; a < board.length; a++)
        {
            for (int b = 0; b < board[a].length; b++)
            {
                int sqr = get.ray2int(a, b);
                piece pc = getpiece(sqr);
                pc.pos = sqr;
                
                switch (getpiece(sqr).pieceColor)
                {
                    case W :
                        whitepieces.add(pc);
                        break;
                    case B :
                        blackpieces.add(pc);
                        break;
                }
            }
        }
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    int wKingPos = xy.e1;
    int bKingPos = xy.e8;
    
    
    public int getKingPos(color c)
    {
        
        if (c == color.W)
        {
            if (getpiece(wKingPos).image == w.king)
            {
                return wKingPos;
            }
            else 
            {
                for (int x = 0; x < 8; x++)
                {
                    for (int y = 0; y < 8; y++)
                    {
                        if (getpiece(get.ray2int(x,y)).image == w.king)
                        {
                            wKingPos = get.ray2int(x,y);
                            return wKingPos;
                        }
                    }
                }
            }
            return wKingPos;
        }
        else if (c == color.B)
        {
            if (getpiece(bKingPos).image == b.king)
            {
                return bKingPos;
            }
            else 
            {
                for (int x = 0; x < 8; x++)
                {
                    for (int y = 0; y < 8; y++)
                    {
                        if (getpiece(get.ray2int(x,y)).image == b.king)
                        {
                            bKingPos = get.ray2int(x,y);
                            return bKingPos;
                        }
                    }
                }
            }
            return bKingPos;
        }
        return wKingPos;
    }
    
    public boolean isCheck(color c)
    {
        return (isUnderAttack(getKingPos(c)));
    }
}







class square 
{
    piece piece;
    
    public square()
    {
        piece = new empty();
    }
}





class piece
{
    color pieceColor;
    String image;
    int[][] moves;
    
    int pos;
}






class empty extends piece
{
    public empty()
    {
        pieceColor = color.blank;
        image = w.empty;
        super.moves = moves;
    }
    
    final int[][] moves = 
    {
        {}
    };
}





class king extends piece
{
    public king(color Col)
    {
        pieceColor = Col;
        if (Col == color.W) 
        {
            image = w.king;
        }
        else 
        {
            image = b.king;
        }
        super.moves = moves;
    }
    
    final int[][] moves = 
    {
        {-9}, {-10, -20}, {-11}, {-1}, {1}, {9}, {10, 20}, {11}
    };
}





class queen extends piece
{
    public queen(color Col)
    {
        pieceColor = Col;
        if (Col == color.W)
        {
            image = w.queen;
        }
        else 
        {
            image = b.queen;
        }
        super.moves = moves;
    }
    
    final int[][] moves = 
    {
        {1, 2, 3, 4, 5, 6, 7, 8},
        {-1, -2, -3, -4, -5, -6, -7, -8},
        {10, 20, 30, 40, 50, 60, 70, 80},
        {-10, -20, -30, -40, -50, -60, -70, -80},
        {11, 22, 33, 44, 55, 66, 77, 88},
        {-11, -22, -33, -44, -55, -66, -77, -88},
        {9, 18, 27, 36, 45, 54, 63, 72},
        {-9, -18, -27, -36, -45, -54, -63, -72}
    };
}





class rook extends piece
{
    public rook(color Col)
    {
        pieceColor = Col;
        if (Col == color.W)
        {
            image = w.rook;
        }
        else
        {
            image = b.rook;
        }
        super.moves = moves;
    }
    
    final int[][] moves = 
    {
        {1, 2, 3, 4, 5, 6, 7, 8},
        {-1, -2, -3, -4, -5, -6, -7, -8},
        {10, 20, 30, 40, 50, 60, 70, 80},
        {-10, -20, -30, -40, -50, -60, -70, -80}
    };
}





class bishop extends piece
{
    public bishop(color Col)
    {
        pieceColor = Col;
        if (Col == color.W) 
        {
            image = w.bishop;
        }
        else 
        {
            image = b.bishop;
        }
        super.moves = moves;
    }
    
    final int[][] moves = 
    {
        {11, 22, 33, 44, 55, 66, 77, 88},
        {-11, -22, -33, -44, -55, -66, -77, -88},
        {9, 18, 27, 36, 45, 54, 63, 72},
        {-9, -18, -27, -36, -45, -54, -63, -72}
    };
}





class knight extends piece
{
    public knight(color Col)
    {
        pieceColor = Col;
        if (Col == color.W) 
        {
            image = w.knight;
        }
        else 
        {
            image = b.knight;
        }
        super.moves = moves;
    }
    
    final int[][] moves = 
    {
        {-8}, {12}, {21}, {19}, {8}, {-12}, {-21}, {-19}
    };
}





class pawn extends piece
{
    public pawn(color Col)
    {
        pieceColor = Col;
        
        if (Col == color.W) 
        {
            image = w.pawn;
            moves = wPawnMoves;
        }
        else
        {
            image = b.pawn;
            moves = bPawnMoves;
        }
        super.moves = moves;
    }
    
    final int[][] moves;
    
    final int[][] wPawnMoves = 
    {
        {1, 2}, {11}, {-9}
    };
    final int[][] bPawnMoves = 
    {
        {-1, -2}, {-11}, {9}
    };
}



enum color
{
    W,
    B,
    blank;
}















// RESOURCES ADRESS

class w 
{
    static String empty = "   ";
    
    static String king = "K";
    static String queen = "Q";
    static String rook = "R";
    static String bishop = "B";
    static String knight = "N";
    static String pawn = "P";
    
    /*
    
    static String empty = "w_blank";
    
    static String king = "w_king";
    static String queen = "w_queen";
    static String rook = "w_rook";
    static String bishop = "w_bishop";
    static String knight = "w_knight";
    static String pawn = "w_pawn";
    
    */
    
    public static piece empty()
    {
        return new empty();
    }
    public static piece king()
    {
        return new king(color.W);
    }
    public static piece queen()
    {
        return new queen(color.W);
    }
    public static piece rook()
    {
        return new rook(color.W);
    }
    public static piece bishop()
    {
        return new bishop(color.W);
    }
    public static piece knight()
    {
        return new knight(color.W);
    }
    public static piece pawn()
    {
        return new pawn(color.W);
    }
}

class b
{
    static String empty = "   ";
    
    static String king = "k";
    static String queen = "q";
    static String rook = "r";
    static String bishop = "b";
    static String knight = "n";
    static String pawn = "p";
    
    /*
    
    static String empty = "w_blank";
    
    static String king = "b_king";
    static String queen = "b_queen";
    static String rook = "b_rook";
    static String bishop = "b_bishop";
    static String knight = "b_knight";
    static String pawn = "b_pawn";
    
    */
    
    public static piece empty()
    {
        return new empty();
    }
    public static piece king()
    {
        return new king(color.B);
    }
    public static piece queen()
    {
        return new queen(color.B);
    }
    public static piece rook()
    {
        return new rook(color.B);
    }
    public static piece bishop()
    {
        return new bishop(color.B);
    }
    public static piece knight()
    {
        return new knight(color.B);
    }
    public static piece pawn()
    {
        return new pawn(color.B);
    }
}

class xy
{
    static int a1 = 11;
    static int a2 = 12;
    static int a3 = 13;
    static int a4 = 14;
    static int a5 = 15;
    static int a6 = 16;
    static int a7 = 17;
    static int a8 = 18;
    static int b1 = 21;
    static int b2 = 22;
    static int b3 = 23;
    static int b4 = 24;
    static int b5 = 25;
    static int b6 = 26;
    static int b7 = 27;
    static int b8 = 28;
    static int c1 = 31;
    static int c2 = 32;
    static int c3 = 33;
    static int c4 = 34;
    static int c5 = 35;
    static int c6 = 36;
    static int c7 = 37;
    static int c8 = 38;
    static int d1 = 41;
    static int d2 = 42;
    static int d3 = 43;
    static int d4 = 44;
    static int d5 = 45;
    static int d6 = 46;
    static int d7 = 47;
    static int d8 = 48;
    static int e1 = 51;
    static int e2 = 52;
    static int e3 = 53;
    static int e4 = 54;
    static int e5 = 55;
    static int e6 = 56;
    static int e7 = 57;
    static int e8 = 58;
    static int f1 = 61;
    static int f2 = 62;
    static int f3 = 63;
    static int f4 = 64;
    static int f5 = 65;
    static int f6 = 66;
    static int f7 = 67;
    static int f8 = 68;
    static int g1 = 71;
    static int g2 = 72;
    static int g3 = 73;
    static int g4 = 74;
    static int g5 = 75;
    static int g6 = 76;
    static int g7 = 77;
    static int g8 = 78;
    static int h1 = 81;
    static int h2 = 82;
    static int h3 = 83;
    static int h4 = 84;
    static int h5 = 85;
    static int h6 = 86;
    static int h7 = 87;
    static int h8 = 88;
}

// str - a1 // int - 11 // ray - {0, 0} //

class get
{
    public static String int2str(int at)
    {
        int x = at / 10;
        int y = at % 10;
        char abc = (char) (x + 96);
        
        return ""+abc+y;
    }
    
    public static int str2int(String at)
    {
        char[] xy = at.toCharArray();
        int x = xy[0]-96;
        int y = Character.getNumericValue(xy[1]);
        
        return x*10+y;
    }
    
    public static int ray2int(int x, int y)
    {
        return x*10+10+y+1;
    }
    
    public static int[] int2ray(int a)
    {
        int[] ab = {a/10-1, a%10-1};
        return ab;
    }
    
    public static String ray2str(int x, int y)
    {
        return int2str(ray2int(x,y));
    }
    
    public static int[] str2ray(String at)
    {
        return int2ray(str2int(at));
    }
    
    public static ArrayList<String> int22string(ArrayList<Integer> list)
    {
        ArrayList<String> result = new ArrayList<String>();
        for (int a : list)
        {
            result.add(int2str(a));
        }
        return result;
    }
    
    public static ArrayList<String> move22names(ArrayList<move> list)
    {
        ArrayList<String> result = new ArrayList<String>();
        
        if (list.size() == 0) return result;
        
        for (move a : list)
        {
            result.add(a.name);
        }
        return result;
    }
    
    public static String char2str(char letter)
    {
        return char2piece(letter).image;
    }
    
    public static String color2str(color cl)
    {
        return cl == color.W ? "white" : "black";
    }
    
    public static color oppColor(color c)
    {
        color opposite;
        
        if (c == color.W) opposite = color.B;
        else if (c == color.B) opposite = color.W;
        else opposite = color.blank;
        return opposite;
    }
    
    public static String pieceStr(piece pc)
    {
        String instance = "default";
        if (pc instanceof king) instance = "king";
        if (pc instanceof queen) instance = "queen";
        if (pc instanceof rook) instance = "rook";
        if (pc instanceof bishop) instance = "bishop";
        if (pc instanceof knight) instance = "knight";
        if (pc instanceof pawn) instance = "pawn";
        if (pc instanceof empty) instance = "w_blank";
        
        return instance;
    }
    
    
    public static piece char2piece(char letter)
    {
        // FEN piece 
        if (letter == 'K') return w.king();
        if (letter == 'Q') return w.queen();
        if (letter == 'R') return w.rook();
        if (letter == 'B') return w.bishop();
        if (letter == 'N') return w.knight();
        if (letter == 'P') return w.pawn();
        if (letter == 'k') return b.king();
        if (letter == 'q') return b.queen();
        if (letter == 'r') return b.rook();
        if (letter == 'b') return b.bishop();
        if (letter == 'n') return b.knight();
        if (letter == 'p') return b.pawn();
        if (letter <= '8' || letter >= '1')
        {
            piece empty = w.empty();
            empty.image = "is number";
            return empty;
        }
        else
        {
            piece empty = b.empty();
            empty.image = "unknown";
            return empty;
        }
    }
    
    
    public static ArrayList<piece> pieces(color c)
    {
        ArrayList<piece> pieces = new ArrayList<piece>();
        
        if (c == color.W)
        {
            pieces.add(w.king());
            pieces.add(w.queen());
            pieces.add(w.rook());
            pieces.add(w.bishop());
            pieces.add(w.knight());
            pieces.add(w.pawn());
        }
        else if (c == color.B)
        {
            pieces.add(b.king());
            pieces.add(b.queen());
            pieces.add(b.rook());
            pieces.add(b.bishop());
            pieces.add(b.knight());
            pieces.add(b.pawn());
        }
        else if (c == color.blank)
        {
            pieces.add(w.king());
            pieces.add(w.queen());
            pieces.add(w.rook());
            pieces.add(w.bishop());
            pieces.add(w.knight());
            pieces.add(w.pawn());
            
            pieces.add(b.king());
            pieces.add(b.queen());
            pieces.add(b.rook());
            pieces.add(b.bishop());
            pieces.add(b.knight());
            pieces.add(b.pawn());
        }
        
        return pieces;
    }
}