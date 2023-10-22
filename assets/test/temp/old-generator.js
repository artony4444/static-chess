//  createBoard() Generates HTML Squares and adds inside id="board"

/*
                     •= Inner Workings =•
    
    
        Squares Print Order :-
        
        left >> right | up >> down
        
        ■  □  ■  □  ■  □  ■  □
        □  ■  □  ■  □  ■  □  ■
        ■  □ •••
        
        
        
        Default Print Order :
        
        1
        2
        3
        4
        5
        6
        7
        8
        x  a  b  c  d  e  f  g  h
        
        
        
        reverse y[|]  =  ● white
        
        8
        7
        6
        5
        4
        3
        2
        1
        x  a  b  c  d  e  f  g  h
        
        
        
        reverse x[-]  =  ○ black 
        
        1
        2
        3
        4
        5
        6
        7
        8
        x  h  g  f  e  d  c  b  a
        
        
        
        Chess Board Diagram :
        
        ■  □  ■  □  ■  □  ■  □
        □  ■  □  ■  □  ■  □  ■
        ■  □  ■  □  ■  □  ■  □
        □  ■  □  ■  □  ■  □  ■
        ■  □  ■  □  ■  □  ■  □
        □  ■  □  ■  □  ■  □  ■
        ■  □  ■  □  ■  □  ■  □
        □  ■  □  ■  □  ■  □  ■
        
        Details :-
        
        - Starts with white square and
          shifts between white black.
          
        - on next line it starts 
          with last lines last color
        
*/



var board = document.getElementById("board"); // ToDo create element append child


var squareHtml = `
                    <div id="$(id)" class="$(color)Square square">$(child)</div>`;

var notationHtml = `
                        <div class="$(class) unselectable">$(mark)</div>`;



function createBoard(isWhiteSide = true)
{
    board.innerHTML = '';
    
    for(var wSquare = true, y = 0; y < 8; y++)
    {
        for(var x = 0; x < 8; x++)
        {
            
            var rx = 7 - x;  // reverse x[-]
            var ry = 7 - y;  // reverse y[|]
            
            // eg. a1, h7
            var squareId = cnvrt.ray2str(isWhiteSide ? x : rx, isWhiteSide ? ry : y);
            var squareColor = wSquare ? "w" : "b";
            
            // html to mark squares
            var squareNotation = "";
            
            // just to makes code clear
            var bigBreak = "\n                    ";
            
            
            
            if(x == 0) //  mark ranks - 1 2 3 4 5 6 7 8
            {
                var notationStyle = squareColor + "Rank"; // CSS style id
                var notation = squareId[1];
                
                //  constructing html...
                
                squareNotation += [
                    notationHtml
                    .split("$(class)").join(notationStyle)
                    .split("$(mark)").join(notation),
                    y == 7 ? "" : bigBreak
                ].join('');
            }
            
            
            if(y == 7) //  mark files - a b c d e f g h
            {
                var notationStyle = squareColor + "File";
                var notation = squareId[0];
                
                //  constructing html...
                
                squareNotation += [
                    notationHtml
                    .split("$(class)").join(notationStyle)
                    .split("$(mark)").join(notation), 
                    bigBreak
                ].join('');
            }
            
            
            
            //  constructing html...
            
            board.innerHTML += [
                squareHtml
                .split("$(id)").join(squareId)
                .split("$(color)").join(squareColor)
                .split("$(child)").join(squareNotation)
            ].join('')
            
            
            wSquare = !(wSquare); // shift between w : b
            
        }
        
        wSquare = !(wSquare); // unshift (check diagram)
        
        board.innerHTML += y < 7 ? '\n' : bigBreak + bigBreak;  // makes generated code clear and easy
    }
    
    //console.log(board.innerHTML);
}
