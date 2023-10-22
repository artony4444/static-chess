// just a prototype 

var dragable = document.getElementById("ball");

dragable.addEventListener("touchstart", startDrag);
dragable.addEventListener("touchmove", startDrag);
dragable.addEventListener("touchend", stopDrag);



function startDrag(event) 
{
    // gets element current pos in document
    var bond = dragable.parentElement.getBoundingClientRect();
    
    // touch - elementPos = (left and top style) - half of width and height of draggable elem (center x & y);
    var x = event.touches[0].clientX - bond.left - (dragable.offsetWidth / 2 );
    var y = event.touches[0].clientY - bond.top - (dragable.offsetHeight / 2 );
    
    addStyle(x, y);
    
    document.getElementById("log").innerHTML ="x :"+x+", y :"+y;
}

function stopDrag(event) 
{
    resetStyle();
    
    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
    
    // gets list of all element on (x, y) cords. starting from top most;
    var targets = document.elementsFromPoint(x,y);
    
    for(var target of targets)
    {
        if(target.className.includes("container"))
        {
            target.appendChild(dragable);
        }
    }
}

function sddStyle(x, y)
{
    dragable.style.left = x + 'px';
    dragable.style.top = y + 'px';
}

function resetStyle()
{
    dragable.style.left = 0;
    dragable.style.top = 0;
}