

class dragDrop
{
    constructor(board)
    {
        this.board = board
        
        this.allowDrag = true;
        this.isTouching = true;
        
        this.variables();
    }
    
    variables()
    {
        this.freezedPiece = [];
    }
    
    /*  ----------  event  ----------  */
    
    addDragDrop(pieceImg)
    {
        let self = this;
        
        pieceImg.addEventListener("touchstart",
            function start(event)
            {
                self.startDrag(event, pieceImg);
            });
        
        pieceImg.addEventListener("touchmove", 
            function move(event)
            {
                self.moveDrag(event, pieceImg);
            });
        
        pieceImg.addEventListener("touchend", 
            function end(event)
            {
                self.stopDrag(event, pieceImg);
            });
        
        // task - to make this compatable for desktop
        
        /*
        pieceImg.addEventListener("click", 
            function start(event)
            {
                self.startDrag(event, pieceImg);
            });
        
        pieceImg.addEventListener("mousedown", 
            function start(event)
            {
                self.startDrag(event, pieceImg);
            });
        
        pieceImg.addEventListener("mousemove", 
            function move(event)
            {
                self.moveDrag(event, pieceImg);
            });
        
        pieceImg.addEventListener("mouseup", 
            function end(event)
            {
                self.stopDrag(event, pieceImg);
            });
        */
    }
    
    addTouchMove(moveImg)
    {
        this.freezePiece(moveImg);
        
        let self = this;
        
        moveImg.addEventListener("click",
            function start(event)
            {
                self.touchMove(event, moveImg);
            });
    }
    
    /*  ----------  touch  ----------  */
    
    touchMove(event, moveImg)
    {
        let toXY = this.img2int(moveImg);
        this.board.logic.move(toXY);
    }
    
    /*  ----------  drag-drop  ----------  */
    
    startDrag(event, pieceImg)
    {
        this.allowDrag = true;
        this.isTouching = true;
        
        if(event.touches.length != 1 || this.allowDrag == false) // disables multi-click
        {
            this.allowDrag = false;
            return;
        }
        
        this.removeMovesIfThisIsSecondClick(pieceImg);
        
        this.setMoves(pieceImg);
        
        //this.moveDrag(event, pieceImg);
    }
    
    removeMovesIfThisIsSecondClick(pieceImg)
    {
        if(this.movesShowing() && this.lastPiece == pieceImg)
        {
            this.timeout = setTimeout(function (self, pieceImg) 
            {
                if(self.isTouching == false) self.resetMoves();
            }
        , 100, this, pieceImg);
        }
        
        this.lastPiece = pieceImg;
    }
    
    // --- move
    
    moveDrag(event, pieceImg) 
    {
        if(event.touches.length != 1 || this.allowDrag == false) // disables multi-click
        {
            this.allowDrag = false;
            this.resetStyles(pieceImg);
            return;
        }
        
        let bond = pieceImg.parentElement.getBoundingClientRect(); // element x y poition
        
        let x = event.targetTouches[0].clientX - bond.left - (pieceImg.offsetWidth / 2 );
        let y = event.targetTouches[0].clientY - bond.top - (pieceImg.offsetHeight / 2 );
        
        this.addStyles(pieceImg, x, y);
    }
    
    // --- stop
    
    stopDrag(event, pieceImg) 
    {
        this.resetStyles(pieceImg);
        
        this.isTouching = false;
        
        if(this.allowDrag == false)
        {
            return;
        }
        
        let x = event.changedTouches[0].clientX; // pageX
        let y = event.changedTouches[0].clientY;
        
        let targets = document.elementsFromPoint(x,y); // gets all html elements on this x y pos
        
        let pieceFromXY = pieceImg.parentNode.classList[0];
        let square = null;
        let hasSquare = false;
        let hasCollision = false;
        let hasMove = false;
        
        
        
        for(let element of targets)
        {
            //console.log(element.className);
            
            if(!(hasCollision) && element.classList.contains("squareCollision"))
            {
                hasCollision = true;
            }
            else if(!(hasSquare) && element.classList.contains("square"))
            {
                hasSquare = true;
                
                square = element;
                
                if(square.querySelector(".move") != null) hasMove = true;
            }
            
            if(hasSquare && hasCollision && hasMove)
            {
                let toXY = get.str2int(square.classList[0]);
                
                this.board.logic.move(toXY);
                break;
            }
        }
        //this.resetMoves();
    }
    
    /*  ----------  CSS  ----------  */
    
    addStyles(target, x, y)
    {
        target.style.left = x + 'px';
        target.style.top = y + 'px';
        target.style.zIndex = "3";
        
        //target.style.transition = "transform 0.2s";
        //target.style.transform = "scale(150%, 150%)";
        
        target.style.touchAction = 'none';
    }
    
    resetStyles(target)
    {
        target.style.left = 0;
        target.style.top = 0;
        target.style.zIndex = "2";
        
        //target.style.transform = "scale(100%, 100%)";    
        
        target.style.touchAction = 'pinch-zoom';
    }
    
    /*  ----------  freeze  ----------  */
    
    freezePiece(img)
    {
        let piece = this.img2piece(img);
        if(piece == null) return;
        
        this.freezeStyle(piece);
        this.freezedPiece.push(piece);
    }
    
    releseFreeze()
    {
        for(let piece of this.freezedPiece)
        {
            this.releseFreezeStyle(piece);
        }
        
        this.freezedPiece = [];
    }
    
    freezeStyle(piece)
    {
        piece.style.pointerEvents = "none";
    }
    
    releseFreezeStyle(piece)
    {
        piece.style.pointerEvents = "auto";
    }
    
    /*  ----------  moves  ----------  */
    
    setMoves(pieceImg)
    {
        this.board.setMoves(this.img2int(pieceImg));
    }
    
    setResetMoves(pieceImg)
    {
        this.board.setResetMoves(this.img2int(pieceImg));
    }
    
    resetMoves()
    {
        this.board.resetMoves();
    }
    
    movesShowing()
    {
        return this.board.movesShowing();
    }
    
    /*  ----------  helper  ----------  */
        
    img2int(pieceImg)
    {
        return get.str2int(pieceImg.parentNode.classList[0]);
    }
    
    img2piece(img)
    {
        let square = img.parentNode;
        return square.querySelector(".piece");
    }
}
