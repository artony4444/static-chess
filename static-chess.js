

// ---------- Import Files ---------- //


let dcs = document.currentScript;
let address = dcs.getAttribute("src").split("static-chess.js").join("");
let boardID = dcs.staticChess;


//---------- css

let cssStyles = `
    <link rel="stylesheet" href="`+address+`src/css/root.css">
    <link rel="stylesheet" href="`+address+`src/css/blocks.css">
    <link rel="stylesheet" href="`+address+`src/css/main.css">
    <link rel="stylesheet" href="`+address+`src/css/chess.board.css">

`;

let head = document.getElementsByTagName('head')[0];
head.insertAdjacentHTML("beforeend", cssStyles);


//---------- js

let div = document.createElement('div');
div.id = boardID;
div.staticChess = boardID;
dcs.replaceWith(div);

let jsClassesSRC = [
    address+"src/js/tools/strings.js",
    address+"src/js/tools/converter.js",
    address+"src/js/ui/objects/drag-drop.js",
    address+"src/js/ui/ui.js",
    address+"src/js/chess/objects/pieces.js",
    address+"src/js/chess/objects/square.js",
    address+"src/js/chess/objects/logic.js",
    address+"src/js/chess/objects/board.js",
    address+"src/js/main.js"
];

let loadedCount = 0;

document.addEventListener("DOMContentLoaded", function() {loadScriptSequentially();});

function loadScriptSequentially()
{
    if(loadedCount < jsClassesSRC.length)
    {
        let src = jsClassesSRC[loadedCount];
        
        let sc = document.createElement('script');
        sc.type = "text/javascript";
        sc.src = src;
        div.staticChess = boardID;
        
        sc.onload = function()
        {
            loadedCount++;
            loadScriptSequentially();
        };

        div.appendChild(sc);
        sc.insertAdjacentHTML("afterend", "\n    ");
    }
}


/* 

    <---- debug ---->
    
    if(loadedCount == jsClassesSRC.length - 1)
    {
        console.log(document.getElementsByTagName('html')[0].innerHTML);
    }
    
    
    <---- changes ---->
    
    body.appendChild >> div.appendChild
    
*/
