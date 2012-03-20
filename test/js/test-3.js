(function(){
    var x = 100,
        y = 100,
        radius = 100;

    var drawCanvas = function(id){
        var ctx = new Canvas(id); // creates a new Canvas object in the canvas with id="ctx"

        var bb = ctx
            .circle({x:x, y:y, radius: radius, fillStyle:'rgb(200,0,0)'}) // creates a red circle
            .boundingBox(); //get bounding box

        var lines = [
            {x1:x, y1:y, x2:bb.tl.x, y2:bb.tl.y, strokeStyle:'rgb(0,0,0)'},
            {x1:x, y1:y, x2:bb.t.x, y2:bb.t.y, strokeStyle:'rgb(125,0,0)'},
            {x1:x, y1:y, x2:bb.tr.x, y2:bb.tr.y, strokeStyle:'rgb(255,0,0)'},
            {x1:x, y1:y, x2:bb.r.x, y2:bb.r.y, strokeStyle:'rgb(0,125,0)'},
            {x1:x, y1:y, x2:bb.br.x, y2:bb.br.y, strokeStyle:'rgb(0,255,0)'},
            {x1:x, y1:y, x2:bb.b.x, y2:bb.b.y, strokeStyle:'rgb(0,0,125)'},
            {x1:x, y1:y, x2:bb.bl.x, y2:bb.bl.y, strokeStyle:'rgb(0,0,255)'},
            {x1:x, y1:y, x2:bb.l.x, y2:bb.l.y, strokeStyle:'rgb(0,125,125)'}
        ],
        length = lines.length;

        while(length--){
            var line = lines[length];
            ctx.beginPath()
                .moveTo(line.x1, line.y1)
                .lineTo(line.x2, line.y2)
                .strokeStyle(line.strokeStyle)
                .stroke();
        }

        ctx.rectangle({x1:bb.tl.x, y1:bb.tl.y, x2:bb.br.x, y2:bb.br.y});
    };

    var drawControl = function(id){
        var canvas = document.getElementById(id);
        if (canvas.getContext){

            var ctx = canvas.getContext('2d');

            ctx.moveTo(x,y);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.fillStyle = 'rgb(200,0,0)';
            ctx.fill();
            ctx.closePath();

            var lines = [
                {"x1":x,"y1":y,"x2":x - radius,"y2":y - radius,"strokeStyle":"rgb(0,0,0)"},
                {"x1":x,"y1":y,"x2":x         ,"y2":y - radius,"strokeStyle":"rgb(125,0,0)"},
                {"x1":x,"y1":y,"x2":x + radius,"y2":y - radius,"strokeStyle":"rgb(255,0,0)"},
                {"x1":x,"y1":y,"x2":x + radius,"y2":y         ,"strokeStyle":"rgb(0,125,0)"},
                {"x1":x,"y1":y,"x2":x + radius,"y2":y + radius,"strokeStyle":"rgb(0,255,0)"},
                {"x1":x,"y1":y,"x2":x         ,"y2":y + radius,"strokeStyle":"rgb(0,0,125)"},
                {"x1":x,"y1":y,"x2":x - radius,"y2":y + radius,"strokeStyle":"rgb(0,0,255)"},
                {"x1":x,"y1":y,"x2":x - radius,"y2":y         ,"strokeStyle":"rgb(0,125,125)"}
            ],
            length = lines.length;

            while(length--){
                var line = lines[length];

                ctx.beginPath();
                ctx.moveTo(line.x1, line.y1);
                ctx.lineTo(line.x2, line.y2);
                ctx.strokeStyle = line.strokeStyle;
                ctx.stroke();
            }

            ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2);

        }
    };

    var controlImage = "data:image/png;base64,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";

    startTest('test-1', drawCanvas, drawControl, controlImage);
})();
