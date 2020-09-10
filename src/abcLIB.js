(function(){
    function doStuff(){
        console.log("meh");
    }
    
    const abcLIB = {
        doStuff:doStuff
    };
    
    window.abcLIB = abcLIB;
    
})();