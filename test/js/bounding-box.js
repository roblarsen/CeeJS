"use strict";

var round = function(number){
  return Math.round(number);
};

var boundingBoxTest = function(ctx, x, y, w, h){
  var bb = ctx.boundingBox();
  it("has a top left", function () {
    expect(round(bb.tl.x)).toBe(round(x));
    expect(round(bb.tl.y)).toBe(round(y));
  });

  it("has a top", function(){
    expect(round(bb.t.x)).toBe(round(x + w / 2));
    expect(round(bb.t.y)).toBe(round(y));
  });

  it("has a top right", function(){
    expect(round(bb.tr.x)).toBe(round(x + w));
    expect(round(bb.tr.y)).toBe(round(y));
  });

  it("has a right", function(){
    expect(round(bb.r.x)).toBe(round(x + w));
    expect(round(bb.r.y)).toBe(round(y + h / 2));
  });

  it("has a bottom left", function () {
    expect(round(bb.bl.x)).toBe(round(x));
    expect(round(bb.bl.y)).toBe(round(y + h));
  });

  it("has a bottom", function(){
    expect(round(bb.b.x)).toBe(round(x + w / 2));
    expect(round(bb.b.y)).toBe(round(y + h));
  });

  it("has a bottom right", function(){
    expect(round(bb.br.x)).toBe(round(x + w));
    expect(round(bb.br.y)).toBe(round(y + h));
  });

  it("has a left", function(){
    expect(round(bb.l.x)).toBe(round(x));
    expect(round(bb.l.y)).toBe(round(y + h /2));
  });
};

describe("BoundingBox-Rectangle", function() {
  var ctx = new Cee();
  ctx.rectangle({x:50, y:75, height: 100, width: 50});

  boundingBoxTest(ctx, 50, 75, 50, 100);
});

describe("BoundingBox-Circle", function() {
  var ctx = new Cee();
  ctx.circle({
    "x" : 100,
    "y" : 100,
    "radius" : 50
  });

  boundingBoxTest(ctx, 50, 50, 100, 100);
});

describe("BoundingBox-Line", function() {
  var ctx = new Cee();
  var angle = 45;
  var distance = 100;

  ctx.beginPath()
  .line({
   "x" : 0,
   "y" : 0,
   "distance" : distance,
   "angle" : angle
 })
  .stroke()
  .closePath();

  boundingBoxTest(
    ctx,
    0, 0,
    Math.cos(angle * ( Math.PI / 180)) * distance,
    Math.sin(angle * ( Math.PI / 180)) * distance
    );
});

describe("BoundingBox-Arc-1", function() {
  var ctx = new Cee();
  var x = 100;
  var y = 100;
  var r = 100;
  var start = Math.PI * 2;
  var end = Math.PI * 0.5;


  ctx.beginPath()
  .arc( x , y , r , start, end)
  .stroke()
  .closePath();

  boundingBoxTest(
    ctx,
    100, 100,
    r,
    r
  );
});


describe("BoundingBox-Arc-2", function() {
  var ctx = new Cee();
  var x = 100;
  var y = 100;
  var r = 100;
  var start = Math.PI * 0.55;
  var end = Math.PI * -0.5;


  ctx.beginPath()
  .arc( x , y , r , start, end, true)
  .stroke()
  .closePath();

  boundingBoxTest(
    ctx,
    x + r * Math.cos( start ),
    0,
    x - r * Math.cos( start ),
    r * 2
    );
});

describe("BoundingBox-ArcTo", function() {
  var ctx = new Cee();
  var x0 = 10;
  var y0 = 150;
  var x1 = 100;
  var y1 = 40;
  var x2 = 150;
  var y2 =  120;
  var r = 30;


  ctx.beginPath()
  .beginPath()
  .moveTo(x0, y0)
  .arcTo(x1, y1, x2, y2, r)
  .stroke()
  .closePath();

  boundingBoxTest(
    ctx,
    10,
    61.37208401914279,
    112.17007238690462,
    89
    );
});
