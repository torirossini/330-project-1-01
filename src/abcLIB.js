(function(){
    
    function dtr(degrees){
            return degrees * (Math.PI/180);
        }

    function drawCircle(ctx,x,y,radius,color){
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    
    const abcLIB = {
        dtr:dtr,
        drawCircle:drawCircle
    };
    
    window.abcLIB = abcLIB;
    
})();