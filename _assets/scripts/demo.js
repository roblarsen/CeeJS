document.getElementById( "demo" ).addEventListener( "click" , function(){
 console.log("demo");
 var ctx = new Cee("ctx");
    for ( var i = 0; i < 100; i++ ){
      var x = Math.random() * ctx.width,
          y = Math.random() * ctx.height,
          radius = Math.random() * 100;
      ctx.fillCircle({
        "x" : x,
        "y" : y,
        "radius" : radius,
        "fillStyle" : '#'+Math.floor(Math.random()*16777215).toString(16)
      });
    }  
});