let id = document.currentScript.boardID;
var brd = new board(id, color.w);






document.getElementById("headBar").addEventListener("touchend", () =>
{
    //brd.getBoard();
    console.log(
        document.querySelector("html").innerHTML
    );
})


//brd.ui.boardCenterAnimation("CHECKMATE");
//brd.ui.freezeAdd();
//brd.ui.askPawnPromote(41);
//brd.importFEN("8/8/8/kkkkkkkk/8/KKKKKKKK/8/8");
//brd.importFEN("8/8/8/2k/0/2K/8/8");
//brd.importFEN("KKKKKKKK/KKKKKKKK/KKKKKKKK/KKKKKKKK/KKKKKKKK/KKKKKKKK/KKKKKKKK/KKKKKKKK");
//brd.importFEN("QQQQQQQQ/QQQQQQQQ/QQQQQQQQ/QQQQQQQQ/QQQQQQQQ/QQQQQQQQ/QQQQQQQQ/QQQQQQQQ");

/*

to add :-
    
    ● moves history
    ● three fold repetition
    ● board eval
    ● bot
    
*/
