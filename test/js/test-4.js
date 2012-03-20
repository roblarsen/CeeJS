//https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes#quadraticCurveTo_example
(function(){

    var drawCanvas = function(id){
        var ctx = new Canvas(id); // creates a new Canvas object in the canvas with id="ctx"

        // Quadratric curves example
        ctx.beginPath()
            .moveTo(75,25)
            .quadraticCurveTo(25,25,25,62.5)
            .quadraticCurveTo(25,100,50,100)
            .quadraticCurveTo(50,120,30,125)
            .quadraticCurveTo(60,120,65,100)
            .quadraticCurveTo(125,100,125,62.5)
            .quadraticCurveTo(125,25,75,25)
            .stroke();
            // Bezier curves example
        ctx.beginPath()
            .moveTo(75,40)
            .bezierCurveTo(75,37,70,25,50,25)
            .bezierCurveTo(20,25,20,62.5,20,62.5)
            .bezierCurveTo(20,80,40,102,75,120)
            .bezierCurveTo(110,102,130,80,130,62.5)
            .bezierCurveTo(130,62.5,130,25,100,25)
            .bezierCurveTo(85,25,75,37,75,40)
            .fill();
    };

    var drawControl = function(id){
        var canvas = document.getElementById(id);
        if (canvas.getContext){

            var ctx = canvas.getContext('2d');

            // Quadratric curves example
            ctx.beginPath();
            ctx.moveTo(75,25);
            ctx.quadraticCurveTo(25,25,25,62.5);
            ctx.quadraticCurveTo(25,100,50,100);
            ctx.quadraticCurveTo(50,120,30,125);
            ctx.quadraticCurveTo(60,120,65,100);
            ctx.quadraticCurveTo(125,100,125,62.5);
            ctx.quadraticCurveTo(125,25,75,25);
            ctx.stroke();

            // Bezier curves example
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fill();

        }
    };

    var controlImage = "data:image/png;base64,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";

    startTest('test-1', drawCanvas, drawControl, controlImage);
})();
