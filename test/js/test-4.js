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
	}

	var controlImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADICAYAAAAePETBAAAJaklEQVR4nO3dP2wUVx7A8a/3xLEnwboBu4hsTOGW409siQL7gqkIBOUKhGQBQrbEUVxBFArTIOSkgQ4FJxI6bC40J7ngzwWOP4mLcNLIJVJ0lwJq0BlR7PqvbL8rZgYvxrs7b+b9mY1+X+nJkrW2ZuYje3Zn3syAJEmSJJntck7HV8A3wPfAJPAAeAL8FI0n0fcmo9d8E/2M7+WuNRL1N0AB48Alj+MrYKIFftoOL7qh3APLA7BwDOZOwPwpWDoDy5/DyuewcgaWT8HSCZg/BnMDsNADy91Q3g4vWkK0ieh3e1u3vXATWN0TLkvDLkUYM8AnSX7AYB0FON8L08OwOA5vn8FSAKre+Hs0Gr3uWfQ7h2GxF6YLcB7ocLmCCvoVzEQoif5KLkUvPIAblC3A0H54PgLzT2G20YZNC7J+PIXZEZjfD8+BoWhZrBVjKOhnbTs3rPqFNlHaWuHqIFTuQVl3Y5oAqR73oDwIlVa4CrSZXtl1GJASBMyjdLbDjbMwNwXzWTaiSZB4TMH8WZhrhxtAp4kV3gADMoCAGZRiCUbPwezPsGhi49kAicfPsHgOZkswChTTrnQNDMgIAtlQjhyC1w+hYnKj2QSJx0OoHILXwBHdla6DAQZAQB+ltAPuj2XcR/gEiccYlHfAfaCUZMUbYDTazlovTIrSMwCvTO0nfIMEhPuXAXgF9NRb8QQYSbaz1gvrohTh4oUUb1/zDhKPCzBbhIsZMJJuZ60XboRSaIebty3/i/INEoC6DeX28MNdIQWGFZD1KJu74MEdSzvuvIEEoO5ApQseAr/XxLAG8g6lE/77yOG/qTyABKAewOJp+J8mhlWQTR/BzFZYve5po/gE+QXUEqz+Bf6D3ucVKyCFnfDoISx+C6oEygeKL5AIQ/0C6jHMdYX/vgqNNpo1kDaYuFu1z/CF4gOkGiP+3l2oRDt69yBFuLjRuykfKK5BNsKIx20oF2u8JbYJ8vGXMFdrgV2juASphxGPCzBLgw+PJkFKA/Cq0YK7RHEFkgQjHtEn+nqHWcyA7ID7SQ+HuEJxAaKDERAeZomOfVkFOap7oNAFim0QXYx4jEGZ2keJM4MUD8HrNCtkG8UmSFqMeESH7ovGQUowmuV8hk0UWyBZMQLC8ynRSS6jIJ3nDBwWsYViA8QERjzOhe+61p8OTg/SDjdMnXa1gWIaxCRGQHg6ODpHbwSk7Wydzxx5QDEJYhojHmdhjvdns6QDaYWrNs76mUQxBWILIyB8GxxNMcoEsmXQ4vkNUygmQGxixGMQKqxNxksFMpR1EpsLlKwgLjACwsl4hDMk04Hsh+c2F3A9ypgHEFcY8YimraYC6RhxMGMkHmMZUNKCuMYIQI3APOEEbz2QAnyRZuKzD5Q0ID4wAsIJ3tGsez2QXph2uaBZUHRBfGHEoxemdUG+HjY8/9Ymig6Ib4wA1DAssnZlVyKQW+Pw1tcC66IkBckDRgBqHN4SXj2VDKQFppJcuZQXlCQgecEIQD2DpejyumQg2+Cl74XWQWkEkieMeGyHF4lBuj3MPsyCUg8kjxgBqO7wQ2IikNF9sOJ7gXVQaoHkFSMA1QPLhDv2hl07CAu+F1gHZSOQPGMEoAZggfA6+obd+szw4XbbKOtB8o4RgDoWHo7/PgnI5PGc/oXUQqkGaQaMANSJ8BDKZBKQH07m4C2vDkoM0iwYAahTsER4G5CGPT4Ny74XWAdlBNQ/mggjAHUm3Kk/SQLy4+7OztXhvj7VDOPTXbvUH1pa1JUW1JVdqOG+5hh7drBC+OHwtwbyV1Xou6IK//ydOnzK/4a2AdJE/7L6VYkZ9Skn1ZEDf1SlGdT1T/wvl+l/WU2yUw8xxuhXw/SpYfrUdwdoGhSdnXoTvO1dwwjgHUgATYOi87Y35x8M38dYD9IsKDofDHN86ORDjI1AmgFF59BJTg8uboxRCyTvKDoHF3N4+L02Rj2QPKPoHH7P2Qmq+hiNQPKKonWCKj+ncBtjJAHJG4r2KVxyMckhGUZSkDyhaE9ywPs0oOQYOiB5QUkzDcjjRDk9DF2QPKCkmSh3uQDn3U8l1cdIA/IO5Q3q+p/cYqSeSorzydbpMNKCBKC+7Yv+UhyipJ5sDe4uR8iCkQXEB0qWyxHAwQU7WTGygrhEyXzBDpYvaTOBYQLEFYqJS9pohSs2Lvo0hWEKxDaKqYs+AbabvizaJIZJEJsoxi6LBrM3DjCNYRrEBorpGweAoVtr2MCwAWIaxfitNSD7zWdsYdgCMYVi6+YzEN6eqeGd5Fxj2AQxgWLt9kxR2jcws41hGyQLiu0bmAF6t/hzgeECJA2Kq1v8QcKbYLrCcAWii+LsJphRPfUeR+ESwyVIUhTXt4kFat9I2TWGa5BGKL5upAx8eKtxHxg+QN6hvEGN9a99747PW41HFbrgX49g1heGL5CAEKM0E359AItd4Vxdfzfjj9rcweFft/Jm1QeGT5AYZesbVrv+zL+BTRrbzRaI6gc18xGHZh56mhjhE+QxzHYc5lcUMyjvD3QJMcKvbNoJj+56mPXoC+QuVHbCI2Azin5NFNMg72HEFdpgwvVDwXyA3IZyWzi3am2foYdiEmRDjHcVHT82zzXIlzBXrPXWNjmKKZD6GFU5e7CkK5CptQdLflx3zZOhmABJjBHn5NGrLkB0H72aACUriDZGdUcPwStbDye2CVL1cOKj2mtdHyULSCaMOGuP77YBYurx3XVQ0oIYwajO+APuTYJMWXjAfQ2UNCDGMarb3gpXBqGSdTKeCZB7UB6ESjRVp63h0uv2IYouiFWM6rYAQ/vh+QjMp5ngnRbkKcyOwHw0vXOItUlsdnofRQdkz4QjjPV1FOB8L0wPw+I4vE1yJVdSkGewNA5vh2GxF6YL8AXhxGd3xSh7uUkykL03ARWicNnj+Bq41QJT2+BlN1T2wcpBWPgM5o7DwklYOg3Lu+lc3U3n6mlYPglLx6PXHISFfbDSDZVt8LIFpoBb0e/2t257mABU9DVRl3I6RoFr0UadBH4AHgM/RuNx9L3J6DXXop/xvdy1hiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJktSk/R9NSGDYbfUjWAAAAABJRU5ErkJggg==";

	startTest('test-1', drawCanvas, drawControl, controlImage);
})();
