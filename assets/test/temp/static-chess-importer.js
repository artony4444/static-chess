
//---------- IMPORT FILES..

let dcs = document.currentScript;
let address = dcs.getAttribute("src").split("static-chess.js").join("");
let divID = dcs.getAttribute("divID");


//---------- CSS

let cssStyles = `
    <link rel="stylesheet" href="`+address+`src/css/root.css">
    <link rel="stylesheet" href="`+address+`src/css/blocks.css">
    <link rel="stylesheet" href="`+address+`src/css/main.css">
    <link rel="stylesheet" href="`+address+`src/css/chess.board.css">

`;

let head = document.getElementsByTagName('head')[0];
head.insertAdjacentHTML("beforeend", cssStyles);


//---------- JS

let body = document.getElementsByTagName('body')[0];

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
        sc.divID = divID;

        sc.onload = function()
        {
            loadedCount++;
            loadScriptSequentially();
        };

        body.appendChild(sc);
    }
}

dcs.remove();


/*

//---------- FAIL

for(let src of jsClassesSRC)
{
    let sc = document.createElement('script');
    sc.type = "text/javascript";
    sc.src = src;
    
    body.appendChild(sc);
    sc.insertAdjacentHTML("afterend", "\n    ");
}

let mainSc = document.createElement('script');
mainSc.type = "text/javascript";
mainSc.src = address + "src/js/main.js";
body.appendChild(mainSc);
mainSc.insertAdjacentHTML("afterend", "\n");

dcs.remove();


//---------- FAIL

let jsClasses = `
    <script type="text/javascript" src="`+address+`src/js/tools/strings.js"></script>
    <script type="text/javascript" src="`+address+`src/js/tools/converter.js"></script>
    <script type="text/javascript" src="`+address+`src/js/ui/objects/drag-drop.js"></script>
    <script type="text/javascript" src="`+address+`src/js/ui/ui.js"></script>
    <script type="text/javascript" src="`+address+`src/js/chess/objects/pieces.js"></script>
    <script type="text/javascript" src="`+address+`src/js/chess/objects/square.js"></script>
    <script type="text/javascript" src="`+address+`src/js/chess/objects/logic.js"></script>
    <script type="text/javascript" src="`+address+`src/js/chess/objects/board.mjs"></script>
`;

let jsMain = `
    <script type="text/javascript" src="`+address+`src/js/main.mjs"></script>
    `;

let body = document.getElementsByTagName('body')[0];
body.insertAdjacentHTML("beforeend", jsClasses);

let mainSc = document.createElement('script');
mainSc.type = "text/javascript";
mainSc.src = address + "src/js/main.js";
dcs.replaceWith(mainSc);

*/


//console.log(document.getElementsByTagName('html')[0].innerHTML);
