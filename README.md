#Cee.js

Cee.js is a small helper library for the canvas 2d API. The goal is to extend and enhance the basic API while still remaining familiar. 

##API and Enhancements

There are currently two areas of focus

* _Chaining_ any method that doesn't return an explicit value or Cee object (e.g. createPattern, createLinearGradient) is chainable. 
* _API Enhancements_ These range from new concepts (getting the boundingBox of the last operation, getting the currentPos (x and y) of the 'cursor',) missing methods (circle, rectangle) to convenience methods (canvas properties are now chainable getter/setter methods)

A simple example might look like this

```javascript
   
    var ctx = new Cee("demo");
    for ( var i = 0; i < 100; i++ ){
      var x = Math.random() * ctx.width,
          y = Math.random() * ctx.height,
          radius = Math.random() * 100;
      ctx.circle({
        "x" : x,
        "y" : y,
        "radius" : radius,
        "fillStyle" : '#'+Math.floor(Math.random()*16777215).toString(16),
        "strokeStyle" : '#'+Math.floor(Math.random()*16777215).toString(16)
      });
    }
        
   
```    

You can demo the library in [this handy CeeJS demo plunker](http://plnkr.co/edit/wroi8u?p=preview). 
##Credits

So far...

Rob Larsen ( slaving away )

with big high fives to 

Bob Holt (kicked the project off and actually wrote the first lines of code) 

Marc Neuwirth (added all the smart stuff)
