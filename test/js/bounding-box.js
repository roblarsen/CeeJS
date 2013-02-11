var round = function(number){
    return Math.round(number);
};

var boundingBoxTest = function(ctx, x, y, w, h){
    var bb = ctx.boundingBox();
    it('has a top left', function () {
        expect(round(bb.tl.x)).toBe(round(x));
        expect(round(bb.tl.y)).toBe(round(y));
    });

    it('has a top', function(){
        expect(round(bb.t.x)).toBe(round(x + w / 2));
        expect(round(bb.t.y)).toBe(round(y));
    });

    it('has a top right', function(){
        expect(round(bb.tr.x)).toBe(round(x + w));
        expect(round(bb.tr.y)).toBe(round(y));
    });

    it('has a right', function(){
        expect(round(bb.r.x)).toBe(round(x + w));
        expect(round(bb.r.y)).toBe(round(y + h / 2));
    });

    it('has a bottom left', function () {
        expect(round(bb.bl.x)).toBe(round(x));
        expect(round(bb.bl.y)).toBe(round(y + h));
    });

    it('has a bottom', function(){
        expect(round(bb.b.x)).toBe(round(x + w / 2));
        expect(round(bb.b.y)).toBe(round(y + h));
    });

    it('has a bottom right', function(){
        expect(round(bb.br.x)).toBe(round(x + w));
        expect(round(bb.br.y)).toBe(round(y + h));
    });

    it('has a left', function(){
        expect(round(bb.l.x)).toBe(round(x));
        expect(round(bb.l.y)).toBe(round(y + h /2));
    });
};

describe('BoundingBox-Rectangle', function() {
    var ctx = new Canvas();
    ctx.rectangle({x:50, y:75, height: 100, width: 50});

    boundingBoxTest(ctx, 50, 75, 50, 100);
});

describe('BoundingBox-Circle', function() {
    var ctx = new Canvas();
    ctx.circle({
        "x" : 100,
        "y" : 100,
        "radius" : 50
    });

    boundingBoxTest(ctx, 50, 50, 100, 100);
});

describe('BoundingBox-Line', function() {
    var ctx = new Canvas();
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

describe('BoundingBox-Arc1', function() {
    var ctx = new Canvas();
    var x = 100;
    var y = 100;
    var r = 100;
    var start = Math.PI * 2;
    var end = Math.PI * 0.5;


    ctx.beginPath()
      .arc( x , y , r , start, end)
      .stroke()
      .closePath();

    var bb = ctx.boundingBox();

    boundingBoxTest(
        ctx,
        100, 100,
        r,
        r
    );
});

describe('BoundingBox-Arc2', function() {
    var ctx = new Canvas();
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