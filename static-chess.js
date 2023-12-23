

// ---------- Installing ---------- //


let dcs = document.currentScript;
let address = dcs.getAttribute("src").split("static-chess.js").join("");
let boardID = "sc:"+parseInt(Math.random()*10000);


// ---------- css

let cssStyles = `
    <div static-chess="`+boardID+`">
        <link rel="stylesheet" href="`+address+`src/css/root.css">
        <link rel="stylesheet" href="`+address+`src/css/blocks.css">
        <link rel="stylesheet" href="`+address+`src/css/main.css">
        <link rel="stylesheet" href="`+address+`src/css/chess.board.css">
    </div>
`;

let head = document.getElementsByTagName('head')[0];
head.insertAdjacentHTML("beforeend", cssStyles);


// ---------- board container

let container = document.createElement('div');
container.id = boardID;
container.setAttribute("static-chess", boardID);
container.className = "container"; 
dcs.replaceWith(container);


// ---------- js

let jsSRC = [
    address+"src/js/tools/strings.js",
    address+"src/js/tools/converter.js",
    address+"src/js/ui/objects/drag-drop.js",
    address+"src/js/ui/ui.js",
    address+"src/js/chess/pieces.js",
    address+"src/js/chess/square.js",
    address+"src/js/chess/logic.js",
    address+"src/js/chess/board.js",
    address+"src/js/main.js"
];

let body = document.getElementsByTagName('body')[0]; 
let div = document.createElement('div');
div.setAttribute("static-chess", boardID);
div.className = "static-chess-script";
body.appendChild(div); // if error => use this format <div> <STATIC-CHESS-SCRIPT> </div> or (use static-chess inside body)

document.addEventListener("DOMContentLoaded", addScript);
let loadedCount = 0;

function addScript()
{
    if(loadedCount < jsSRC.length)
    {
        let src = jsSRC[loadedCount];
        
        let script = document.createElement('script'); // script.type = "text/javascript";
        script.src = src;
        script.boardID = boardID;
        script.onload = function() { loadedCount++; addScript(); };

        div.appendChild(script);
        script.insertAdjacentHTML("beforebegin", "\n    ");
    }
}


/* ---------- DEBUG
    
    if(loadedCount == jsSRC.length - 1)
    {
        //document.querySelectorAll('[staticChess]').forEach((e) => console.log(e));
        console.log(document.getElementsByTagName('html')[0].innerHTML);
    }
    
------------- */
