/*!
 * Canvas JavaScript Library v0.0.1
 * http://bobholtwebdev.com/
 *
 * Copyright 2011, Bob Holt
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://bobholtwebdev.com/license
 *
 * Date: Thu Sep 1 17:20:56 2011 -0400
 */

(function(window){
    var document = window.document,
        navigator = window.navigator,
        location = window.location;

    var Canvas = (function(){
        // Define a local copy of Canvas
        var Canvas = function(selector){
            return new Canvas.fn.init(selector)
        };

        Canvas.fn = Canvas.prototype = {
            constructor: Canvas,
            init: function(selector){
                var xCurrentPos = 0,
                    yCurrentPos = 0,
                    container = document.getElementById(selector),
                    context = container.getContext('2d'),
                    font = "normal 1em sans-serif",
                    fillStyle = "#000",
                    strokeStyle = "#000",
                    getCurrentPos = function(){
                        return {
                            x: xCurrentPos,
                            y: yCurrentPos
                        }
                    },
                    arc = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            radius = params.radius || 0,
                            start = params.start || 0,
                            end = params.end || Math.PI * 2,
                            counter = params.counter || false;

                        context.arc(x,y,radius,start,end,counter);
                        return getCurrentPos();
                    },
                    beginPath = function(){
                        context.beginPath();
                        return getCurrentPos();
                    },
                    circle = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            radius = params.radius || 10,
                            fill = params.fill || false;
                        arc({
                            x: x,
                            y: y,
                            radius: radius
                        });
                        stroke();
                        if(fill){
                            context.fill();
                        }
                        closePath();
                        return getCurrentPos();
                    },
                    closePath = function(){
                        context.closePath();
                        return getCurrentPos();
                    },
                    fill = function(){
                        context.fill();
                        return getCurrentPos();
                    },
                    lineFor = function(distance,angle){
                        return getCurrentPos();
                    },
                    lineTo = function(x,y){
                      context.lineTo(x,y);
                      xCurrentPos = x;
                      yCurrentPos = y;
                      return getCurrentPos();
                    },
                    moveTo = function(x,y){
                      context.moveTo(x,y);
                      xCurrentPos = x;
                      yCurrentPos = y;
                      return getCurrentPos();
                    },

                    /*
                     * Function: rectangle
                     *
                     * Draws a rectangle in the canvas container
                     *
                     * Parameters:
                     *  params.x - (Integer) Starting x coordinate. Defaults to the current position.
                     *  params.y - (Integer) Starting y coordinate. Defaults to the current position.
                     *  params.width - (Integer) Rectangle width. Defaults to 0.
                     *  params.height - (Integer) Rectangle height. Defaults to 0.
                     *  params.fill - (Boolean) If the rectangle should be filled. Defaults to false.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     * See Also:
                     *
                     *  <circle>
                     */
                    rectangle = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            width = params.width || 0,
                            height = params.height || 0,
                            fill = params.fill || false;
                        if (fill) {
                            context.fillRect(x,y,width,height);
                        } else {
                            context.strokeRect(x,y,width,height);
                        }
                        return getCurrentPos();
                    },

                    /*
                     * Function: reset
                     *
                     * Resets the canvas container, erasing the currently displayed drawings.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     */
                    reset = function(){
                        container.width = container.width;
                        xCurrentPos = yCurrentPos = 0;
                        return getCurrentPos();
                    },

                    stroke = function(){
                        context.stroke();
                        return getCurrentPos();
                    };

                return {
                    circle: circle,
                    getCurrentPos: getCurrentPos,
                    lineFor: lineFor,
                    lineTo: lineTo,
                    rectangle: rectangle,
                    reset: reset,
                    stroke: stroke
                }
            }
        }

        Canvas.fn.init.prototype = Canvas.fn;

        return Canvas;
    }());
    window.Canvas = Canvas;
}(window));

/*
it should have quadratic curves and bezier curves in it too
*/