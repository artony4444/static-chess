// task - convert append child to insertAdjacentHTML (makes code small)
// task - remove multiple remove() code.

class ui
{
    constructor(board)
    {
        this.container = board.container;
        this.board = board;
        this.color = this.board.color;
        this.boardHTML = null;
        this.dragDrop = new dragDrop(this.board);
        
        this.variables();
    }
    
    /*  ----------  variables  ----------  */
    
    variables()
    {
        this.htmlVars();
        
        this.loadedPiece = new Set();
        this.addedPiece = new Set();        
    }
    
    htmlVars()
    {
        this.newLine = "\n";
        this.tab = "    ";
        this.parentTab = 3;
        this.boardTab = this.newLine + this.tab.repeat(this.parentTab+1);
        this.squareTab = this.newLine + this.tab.repeat(this.parentTab+2);
        this.childsTab = this.newLine + this.tab.repeat(this.parentTab+3);
    }
    
    /*  ----------  board  ----------  */
    
    clear(boardId, isWhiteSide, notation = true)
    {
        let parent = this.container;
        
        let board = document.createElement('div'); // board.id = boardId;
        board.className = string.boardClass;
        
        parent.innerHTML = this.boardTab;
        board.innerHTML = this.squareTab;
        
        
        
        parent.appendChild(board);
        
        
        // read assets/temp/boardGenerator.txt for details
        
        for(let wSquare = true, y = 0; y < 8; y++)
        {
            for(let x = 0; x < 8; x++)
            {
                
                let rx = 7 - x;  // reverse x[-]
                let ry = 7 - y;  // reverse y[|]
                
                
                let squareId = get.ray2str(isWhiteSide ? x : rx, isWhiteSide ? ry : y);
                let squareColor = wSquare ? "w" : "b";
                
                let square = document.createElement('div');
                square.id = squareId;
                square.className = squareId+" "+squareColor+"Square square";
                
                
                if(notation == true)
                {
                    if(x == 0) //  mark ranks - 1 2 3 4 5 6 7 8
                    {
                        let notationStyle = squareColor + "Rank unselectable"; // CSS style id
                        let notation = squareId[1];
                        
                        let squareNotation = document.createElement('div');
                        squareNotation.className = notationStyle;
                        squareNotation.innerHTML = notation;
                        square.appendChild(squareNotation);
                        
                        // making html readable                
                        squareNotation.insertAdjacentHTML("beforebegin", this.childsTab);
                        //squareNotation.insertAdjacentHTML("afterend", y == 7 ? "" : this.squareTab);
                        
                    }
                    
                    
                    if(y == 7) //  mark files - a b c d e f g h
                    {
                        let notationStyle = squareColor + "File unselectable";
                        let notation = squareId[0];
                        
                        let squareNotation = document.createElement('div');
                        squareNotation.className = notationStyle;
                        squareNotation.innerHTML = notation;
                        square.appendChild(squareNotation);
                        
                        // making html readable
                        squareNotation.insertAdjacentHTML("beforebegin", this.childsTab);
                        //squareNotation.insertAdjacentHTML("afterend", this.squareTab);
                        
                    }
                }
                
                
                let squareCollision = document.createElement('div');
                squareCollision.className = "squareCollision";
                square.appendChild(squareCollision);
                // making html readable
                squareCollision.insertAdjacentHTML("beforebegin", this.childsTab);
                
                
                
                
                board.appendChild(square);
                
                
                
                // making html readable
                square.insertAdjacentHTML("beforebegin", this.squareTab);
                
                
                
                
                wSquare = !(wSquare); // shift between w : b
                
            }
            
            wSquare = !(wSquare); // unshift (check diagram)
            
            board.innerHTML += y == 7 ? this.boardTab : this.squareTab + this.squareTab;
        }
        //console.log(parent.innerHTML);
        
        this.boardHTML = board;
        return board;
    }
    
    setPiece(piece, intXY)
    {
        let squareId = get.toStr(intXY);
        if(squareId == string.invalid) {return;}
        
        let square = this.container.querySelector("."+squareId);
        
        removePieces(square);
        if(piece.name[1] == w.blank[1]) {return;}
        
        
        let self = this;
        let pieceImg = getImage(piece);
        
        
        
        if(true)
        {
            square.appendChild(pieceImg);
            pieceImg.insertAdjacentHTML("beforebegin", self.childsTab);
        }
        
        
        
        
        /*     HELPER FUNCTIONS     */
        
        function removePieces(square)
        {
            let pieces = square.querySelectorAll(".piece");
            
            for(let p of pieces)
            {
                p.remove();
            }
        }
        
        
        function getImage(piece)
        {
            let img = document.createElement("img");
            
            img.className = "piece unselectable";
            img.src = piece.src;
            img.alt = piece.name[1];
            unhidePiecesAfterLoad(img);
            
            self.dragDrop.addDragDrop(img);
            
            return img;
        }
        
        
        function unhidePiecesAfterLoad(img)
        {
            if(img.complete) {return;}
            
            img.classList.add('hidden');
            self.addedPiece.add(img);
            
            img.addEventListener("load", function (e) {
            
                self.loadedPiece.add(img);
                
                // console.log(self.loadedPiece.size, self.addedPiece.size, img.alt);
                
                if(self.loadedPiece.size >= self.addedPiece.size)
                {
                    self.addedPiece.forEach((piece) => {
                    
                        piece.classList.remove('hidden');
                        // console.log(piece.className);
                        
                        piece.classList.add('fadeIn');
                        piece.addEventListener("animationend", function () {
                            piece.classList.remove('fadeIn');
                        });
                        
                    });
                    
                    self.addedPiece = new Set();
                    self.loadedPiece = new Set();
                }
                
            });
        }
    }
    
    setMove(intXY)
    {
        let square = this.getSquare(intXY);
        let tab = this.getTab(3);
        
        
        
        if(this.hasPiece(intXY))
        {
            let code = `\n$(tab)<div class="background move">\n$(tab)    <svg class="background">\n$(tab)        \n$(tab)        <defs>\n$(tab)            <mask id="captureMoveMask">\n$(tab)                <rect class="background" fill="white"/>\n$(tab)                <rect class="captureMove"/>\n$(tab)            </mask>\n$(tab)        </defs>\n$(tab)        \n$(tab)        <rect class="background captureMoveFill" mask="url(#captureMoveMask)">\n$(tab)        \n$(tab)    </svg>\n$(tab)</div>`;
            code = code.split("$(tab)").join(tab);
            square.insertAdjacentHTML("beforeend", code);
        }
        else
        {
            let code = `\n$(tab)<div class="background move">\n$(tab)    <div class="regularMove"></div>\n$(tab)</div>`;
            code = code.split("$(tab)").join(tab);
            square.insertAdjacentHTML("beforeend", code);
        }
        
        this.dragDrop.addTouchMove(square.querySelector(".move"));
    }
    
    setMoves(fromXY, intXYarray)
    {
        for(let intXY of intXYarray)
        {
            this.setMove(intXY);
        }
        this.selectorAdd(fromXY);
    }
    
    resetMoves()
    {
        let moves = this.container.querySelectorAll(".move");
        
        for(let move of moves)
        {
            move.remove();
        }
        
        this.selectorRemove();
        this.dragDrop.releseFreeze();
    }
    
    selectorAdd(toXY)
    {
        let square = this.getSquare(toXY);
        
        if(true)
        {
            let code = `\n$(tab)<div class="selection"></div>`;
            code = code.split("$(tab)").join(this.getTab(3));
            square.insertAdjacentHTML("beforeend", code);
        }
    }
    
    selectorRemove()
    {
        let selection = this.container.querySelectorAll(".selection");
        
        for(let select of selection)
        {
            select.remove();
        }
    }
    
    checkAdd(toXY)
    {
        let square = this.getSquare(toXY);
        
        if(square.querySelectorAll(".check").length != 0) return;
        
        if(true)
        {
            let code = `\n$(tab)<div class="check"></div>`;
            code = code.split("$(tab)").join(this.getTab(3));
            square.insertAdjacentHTML("beforeend", code);
        }
    }
    
    checkRemove()
    {
        let selection = this.container.querySelectorAll(".check");
        
        for(let select of selection)
        {
            select.remove();
        }
    }
    
    freezeAdd()
    {
        this.freezeRemove();
        
        let con = this.container;
        let board = con.querySelector(".board");
        
        if(board.querySelectorAll(".freeze").length != 0) return;
        
        if(true)
        {
            let code = `\n$(tab)<div class="freeze">\n$(tab)    <div class="freezeContent">\n$(tab)    </div>\n$(tab)</div>`;
            code = code.split("$(tab)").join(this.getTab(3));
            board.insertAdjacentHTML("beforeend", code);
        }
    }
    
    freezeRemove()
    {
        let selection = this.container.querySelectorAll(".freeze");
        
        for(let select of selection)
        {
            select.remove();
        }
    }
    
    boardCenterAnimation(str)
    {
        this.freezeAdd();
        
        let con = this.container;
        let freezeC = con.querySelector(".freezeContent");
        
        if(freezeC.querySelectorAll(".boardCenter").length != 0) return;
        
        if(true)
        {
            let code = `\n$(tab)<div class="boardCenter">`+str+`</div>`;
            code = code.split("$(tab)").join(this.getTab(3));
            freezeC.insertAdjacentHTML("beforeend", code);
            
            let cm = freezeC.querySelector(".boardCenter");
            let self = this;
            
            cm.classList.add('fadeIn');
            cm.addEventListener("animationend", function () {
                cm.classList.remove('fadeIn');
                setTimeout(function () {
                    let freeze = con.querySelector(".freeze");
                    freeze.classList.add("fadeOut");
                    freeze.addEventListener("animationend", function () {
                        self.freezeRemove();
                    });
                },500);
            });
        }
    }
    
    askPawnPromote(toXY)
    {
        this.freezeAdd();
        
        let freeze = this.container.querySelector(".freeze");
        
        if(freeze.querySelectorAll(".promotionRank").length != 0) return;
        
        if(true)
        {
            let file = Math.floor(toXY / 10);
            let isWhitePromote = toXY % 10 == 8 ? true : false;
                        
            let position, src1, alt1, src2, alt2, src3, alt3, src4, alt4;
            let p1, p2, p3, p4;
            
            if(isWhitePromote)
            {
                p1 = w.Queen();
                p2 = w.Rook();
                p3 = w.Bishop();
                p4 = w.Knight();
            }
            else
            {
                p1 = b.Queen();
                p2 = b.Rook();
                p3 = b.Bishop();
                p4 = b.Knight();
            }
            
            if(this.color == color.w)
            {
                position = isWhitePromote ? "top" : "bottom";
                
                if(isWhitePromote) topPieces();
                else bottomPieces();
                
            }
            else
            {
                position = isWhitePromote ? "bottom" : "top";
                file = 9 - file;
                
                if(isWhitePromote) bottomPieces();
                else topPieces();
            }
            
            function topPieces()
            {
                src1 = p1.src;
                src2 = p2.src;
                src3 = p3.src;
                src4 = p4.src;
                
                alt1 = p1.name[1];
                alt2 = p2.name[1];
                alt3 = p3.name[1];
                alt4 = p4.name[1];
            }
            
            function bottomPieces()
            {
                src1 = p4.src;
                src2 = p3.src;
                src3 = p2.src;
                src4 = p1.src;
                
                alt1 = p4.name[1];
                alt2 = p3.name[1];
                alt3 = p2.name[1];
                alt4 = p1.name[1];
            }
            
            let code = `\n$(tab)<div class="promotionRank" style="width: calc((100% / 8) * ${file}); ${position}:0;">\n$(tab)    <div class="promotionSquare" style="width: calc(100% / ${file}); ${position}:100%;">\n$(tab)        <div class="pieceSquare">\n$(tab)            <img class="promotionPiece unselectable" src="${src1}" alt="${alt1}">\n$(tab)        </div>\n$(tab)        <div class="pieceSquare">\n$(tab)            <img class="promotionPiece unselectable" src="${src2}" alt="${alt2}">\n$(tab)        </div>\n$(tab)        <div class="pieceSquare">\n$(tab)            <img class="promotionPiece unselectable" src="${src3}" alt="${alt3}">\n$(tab)        </div>\n$(tab)        <div class="pieceSquare">\n$(tab)            <img class="promotionPiece unselectable" src="${src4}" alt="${alt4}">\n$(tab)        </div>\n$(tab)    </div>\n$(tab)</div>`;
            code = code.split("$(tab)").join(this.getTab(4));
            freeze.insertAdjacentHTML("beforeend", code);
            
            let self = this;
            
            freeze.addEventListener("click", remove);
            
            let images = freeze.querySelectorAll(".promotionPiece");
            
            for(let img of images)
            {
                let piece = Piece.name2piece(img.alt);
                
                img.addEventListener("click", promote);
                
                function promote()
                {
                    self.board.logic.promotePawnTo(piece, toXY);
                    remove();
                }
            }
            
            function remove()
            {
                self.freezeRemove()
            }
        }
    }
    
    squareHighlightAdd(str, toXY)
    {
        let square = this.getSquare(toXY);
        
        if(true)
        {
            let code = `\n$(tab)<div class="`+str+`"></div>`;
            code = code.split("$(tab)").join(this.getTab(3));
            square.insertAdjacentHTML("beforeend", code);
        }
    }
    
    squareHighlightRemove(str)
    {
        let selection = this.container.querySelectorAll("."+str);
        
        for(let select of selection)
        {
            select.remove();
        }
    }
    
    /*  ----------  helpers  ----------  */
    
    getPiece(intXY)
    {
        return this.getSquare(intXY).querySelector(".piece");
    }
    
    hasPiece(intXY)
    {
        return this.getPiece(intXY) != null; //&& Piece.name2Piece(this.getPiece(intXY).alt).name[1] != w.blank[1];
    }
    
    getSquare(intXY)
    {
        return this.container.querySelector("."+get.int2str(intXY));
    }
    
    nextLine(intTab)
    {
        return this.newLine + tab(intTab);
    }
    
    getTab(intTab)
    {
        return this.tab.repeat(this.parentTab + intTab);
    }
}

