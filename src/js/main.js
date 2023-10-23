
var brd = new board("board1", "boardContainer1", color.w);


//brd.ui.boardCenterAnimation("CHECKMATE");
//brd.ui.freezeAdd();
//brd.ui.askPawnPromote(41);

//brd.importFEN("8/8/8/kkkkkkkk/8/KKKKKKKK/8/8");

//brd.importFEN("8/8/8/2k/0/2K/8/8");



document.getElementById("test101").addEventListener("touchend", function getBoard()
{
    brd.getBoard();
    //console.log(brd.container.innerHTML);
});

/*

to add :-
    
    ● moves history
    ● three fold repetition
    ● board eval
    ● bot
    
*/
