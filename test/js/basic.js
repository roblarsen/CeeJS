"use strict";

var ERROR_THRESHOLD = 10;

xdescribe("BasicTest-1", function() {

  var canvas, control;

  beforeEach(function (done) {
    jasmine.addMatchers(imagediff.jasmine);

    canvas = (function(){
      var ctx = new Cee();

      ctx.circle({
        x:25,
        y:25,
        radius: 10,
        fillStyle:"rgb(200,0,0)",
        strokeStyle: "#000000"
      }); // creates a red circle
      ctx.circle({
        x:25,
        y:55,
        radius: 15,
        fillStyle:"rgb(200,0,0)",
        strokeStyle: "#000000"
      }); // creates a red circle
      ctx.circle({
        x:55,
        y:25,
        radius: 30,
        fillStyle:"rgb(200,30,200)",
        strokeStyle: "#000000"
      }); // creates a purple circle
      ctx.rectangle({
        x:50,
        y:75,
        height: 100,
        width: 50,
        fillStyle: "rgba(0, 0, 200, 0.5)"
      }); // creates a bluish rectangle with transparency

      return ctx.container;
    }());

    control = (function(){
      var canvas = document.createElement("canvas");
      if (canvas && canvas.getContext){

        var ctx = canvas.getContext("2d");

        ctx.moveTo(25,25);
        ctx.beginPath();
        ctx.arc(25, 25, 10, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.moveTo(25,55);
        ctx.beginPath();
        ctx.arc(25, 55, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.moveTo(55,25);
        ctx.beginPath();
        ctx.arc(55, 25, 30, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(200,30,200)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(50, 75, 50, 100);
      }
      return canvas;
    }());

    done();
  });

  it("test-1", function (done) {
    expect(canvas).toImageDiffEqual(control, ERROR_THRESHOLD);
  });
});

xdescribe("BasicTest-2", function() {
  var canvas, control;

  beforeEach(function (done) {
    jasmine.addMatchers(imagediff.jasmine);

    canvas = (function(){
      var ctx = new Cee();
      ctx.reset();
      for (var i = 0; i<1000; i++){
        var color = "rgb(0," + Math.floor(255 - i/7) + "," +
          Math.floor(255 - i/100) + ")";

        ctx.beginPath().line({
          x: 0.4 * i,
          y: 0.4 * i,
          angle: i,
          distance: i * 0.4
        }).strokeStyle(color).stroke();
      }

      return ctx.container;
    }());

    control = (function(){
      var canvas = document.createElement("canvas");
      if (canvas && canvas.getContext){

        var ctx = canvas.getContext("2d");
        for (var i = 0; i<1000; i++){
          var color = "rgb(0," + Math.floor(255 - i/7) + "," +
                Math.floor(255 - i/100) + ")",
            hypotenuse = 0.4 * i,
            angle = i % 360,
            radians = angle * (Math.PI / 180),
            dy = hypotenuse + Math.sin(radians) * hypotenuse,
            dx = hypotenuse + Math.cos(radians) * hypotenuse;

          ctx.beginPath();
          ctx.moveTo(hypotenuse, hypotenuse);
          ctx.lineTo(dx,dy);
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }
      return canvas;
    }());

    done();
  });

  it("test-2", function (done) {
    expect(canvas).toImageDiffEqual(control, ERROR_THRESHOLD);
  });
});

xdescribe("BasicTest-3", function() {
  var canvas, control;

  beforeEach(function (done) {
    jasmine.addMatchers(imagediff.jasmine);

    var x = 100,
      y = 100,
      radius = 100;

    canvas = (function(){
      var ctx = new Cee();

      var bb = ctx
        .circle({
          x:x,
          y:y,
          radius: radius,
          fillStyle:"rgb(200,0,0)",
          strokeStyle: "#000000"
        }) // creates a red circle
        .boundingBox(); //get bounding box

      var lines = [
        {x1:x, y1:y, x2:bb.tl.x, y2:bb.tl.y, strokeStyle:"rgb(0,0,0)"},
        {x1:x, y1:y, x2:bb.t.x, y2:bb.t.y, strokeStyle:"rgb(125,0,0)"},
        {x1:x, y1:y, x2:bb.tr.x, y2:bb.tr.y, strokeStyle:"rgb(255,0,0)"},
        {x1:x, y1:y, x2:bb.r.x, y2:bb.r.y, strokeStyle:"rgb(0,125,0)"},
        {x1:x, y1:y, x2:bb.br.x, y2:bb.br.y, strokeStyle:"rgb(0,255,0)"},
        {x1:x, y1:y, x2:bb.b.x, y2:bb.b.y, strokeStyle:"rgb(0,0,125)"},
        {x1:x, y1:y, x2:bb.bl.x, y2:bb.bl.y, strokeStyle:"rgb(0,0,255)"},
        {x1:x, y1:y, x2:bb.l.x, y2:bb.l.y, strokeStyle:"rgb(0,125,125)"}
      ],
      length = lines.length;

      while (length--){
        var line = lines[length];
        ctx.beginPath()
          .moveTo(line.x1, line.y1)
          .lineTo(line.x2, line.y2)
          .strokeStyle(line.strokeStyle)
          .stroke();
      }

      ctx.rectangle({x1:bb.tl.x, y1:bb.tl.y, x2:bb.br.x, y2:bb.br.y});

      return ctx.container;
    }());

    control = (function(){
      var canvas = document.createElement("canvas");
      if (canvas && canvas.getContext){

        var ctx = canvas.getContext("2d");

        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        var lines = [{
            "x1":x,
            "y1":y,
            "x2":x - radius,
            "y2":y - radius,
            "strokeStyle":"rgb(0,0,0)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x,
            "y2":y - radius,
            "strokeStyle":"rgb(125,0,0)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x + radius,
            "y2":y - radius,
            "strokeStyle":"rgb(255,0,0)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x + radius,
            "y2":y,
            "strokeStyle":"rgb(0,125,0)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x + radius,
            "y2":y + radius,
            "strokeStyle":"rgb(0,255,0)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x,
            "y2":y + radius,
            "strokeStyle":"rgb(0,0,125)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x - radius,
            "y2":y + radius,
            "strokeStyle":"rgb(0,0,255)"
          }, {
            "x1":x,
            "y1":y,
            "x2":x - radius,
            "y2":y,
            "strokeStyle":"rgb(0,125,125)"
          }
        ],
        length = lines.length;

        while (length--){
          var line = lines[length];

          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.strokeStyle = line.strokeStyle;
          ctx.stroke();
        }

        ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
      }
      return canvas;
    }());

    done();
  });

  it("test-3", function (done) {
    expect(canvas).toImageDiffEqual(control, ERROR_THRESHOLD);
  });
});


xdescribe("BasicTest-4", function() {
  var canvas, control;

  beforeEach(function (done) {
    jasmine.addMatchers(imagediff.jasmine);

    canvas = (function(){
      var ctx = new Cee();
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

      return ctx.container;
    }());

    control = (function(){
      var canvas = document.createElement("canvas");
      if (canvas && canvas.getContext){

        var ctx = canvas.getContext("2d");

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
      return canvas;
    }());

    done();
  });

  it("test-4", function (done) {
    expect(canvas).toImageDiffEqual(control, ERROR_THRESHOLD);
  });
});

xdescribe("BasicTest-fail", function() {
  var canvas, control;

  beforeEach(function (done) {
    jasmine.addMatchers(imagediff.jasmine);

    canvas = (function(){
      var ctx = new Cee();
      ctx.reset();
      for (var i = 0; i<1000; i++){
        var color = "rgb(" + Math.floor(255 - i/7) + ",0," +
          Math.floor(255 - i/100) + ")";

        ctx.beginPath().line({x: 0.4 * i, y: 0.4 * i, angle: i,
          distance: i * 0.4 }).strokeStyle(color).stroke();
      }

      return ctx.container;
    }());

    control = (function(){
      var canvas = document.createElement("canvas");
      if (canvas && canvas.getContext){

        var ctx = canvas.getContext("2d");
        for (var i = 0; i<1000; i++){
          var color = "rgb(0," + Math.floor(255 - i/7) + "," +
                Math.floor(255 - i/100) + ")",
            hypotenuse = 0.4 * i,
            angle = i % 360,
            radians = angle * (Math.PI / 180),
            dy = hypotenuse + Math.sin(radians) * hypotenuse,
            dx = hypotenuse + Math.cos(radians) * hypotenuse;

          ctx.beginPath();
          ctx.moveTo(hypotenuse, hypotenuse);
          ctx.lineTo(dx,dy);
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }
      return canvas;
    }());

    done();
  });

  it("test-5", function (done) {
    expect(canvas).not.toImageDiffEqual(control, ERROR_THRESHOLD);
  });
});
