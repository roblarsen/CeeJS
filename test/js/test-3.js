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
	}

	var controlImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADICAYAAAAePETBAAAJaklEQVR4nO3dP2wUVx7A8a/3xLEnwboBu4hsTOGW409siQL7gqkIBOUKhGQBQrbEUVxBFArTIOSkgQ4FJxI6bC40J7ngzwWOP4mLcNLIJVJ0lwJq0BlR7PqvbL8rZgYvxrs7b+b9mY1+X+nJkrW2ZuYje3Zn3syAJEmSJJntck7HV8A3wPfAJPAAeAL8FI0n0fcmo9d8E/2M7+WuNRL1N0AB48Alj+MrYKIFftoOL7qh3APLA7BwDOZOwPwpWDoDy5/DyuewcgaWT8HSCZg/BnMDsNADy91Q3g4vWkK0ieh3e1u3vXATWN0TLkvDLkUYM8AnSX7AYB0FON8L08OwOA5vn8FSAKre+Hs0Gr3uWfQ7h2GxF6YLcB7ocLmCCvoVzEQoif5KLkUvPIAblC3A0H54PgLzT2G20YZNC7J+PIXZEZjfD8+BoWhZrBVjKOhnbTs3rPqFNlHaWuHqIFTuQVl3Y5oAqR73oDwIlVa4CrSZXtl1GJASBMyjdLbDjbMwNwXzWTaiSZB4TMH8WZhrhxtAp4kV3gADMoCAGZRiCUbPwezPsGhi49kAicfPsHgOZkswChTTrnQNDMgIAtlQjhyC1w+hYnKj2QSJx0OoHILXwBHdla6DAQZAQB+ltAPuj2XcR/gEiccYlHfAfaCUZMUbYDTazlovTIrSMwCvTO0nfIMEhPuXAXgF9NRb8QQYSbaz1gvrohTh4oUUb1/zDhKPCzBbhIsZMJJuZ60XboRSaIebty3/i/INEoC6DeX28MNdIQWGFZD1KJu74MEdSzvuvIEEoO5ApQseAr/XxLAG8g6lE/77yOG/qTyABKAewOJp+J8mhlWQTR/BzFZYve5po/gE+QXUEqz+Bf6D3ucVKyCFnfDoISx+C6oEygeKL5AIQ/0C6jHMdYX/vgqNNpo1kDaYuFu1z/CF4gOkGiP+3l2oRDt69yBFuLjRuykfKK5BNsKIx20oF2u8JbYJ8vGXMFdrgV2juASphxGPCzBLgw+PJkFKA/Cq0YK7RHEFkgQjHtEn+nqHWcyA7ID7SQ+HuEJxAaKDERAeZomOfVkFOap7oNAFim0QXYx4jEGZ2keJM4MUD8HrNCtkG8UmSFqMeESH7ovGQUowmuV8hk0UWyBZMQLC8ynRSS6jIJ3nDBwWsYViA8QERjzOhe+61p8OTg/SDjdMnXa1gWIaxCRGQHg6ODpHbwSk7Wydzxx5QDEJYhojHmdhjvdns6QDaYWrNs76mUQxBWILIyB8GxxNMcoEsmXQ4vkNUygmQGxixGMQKqxNxksFMpR1EpsLlKwgLjACwsl4hDMk04Hsh+c2F3A9ypgHEFcY8YimraYC6RhxMGMkHmMZUNKCuMYIQI3APOEEbz2QAnyRZuKzD5Q0ID4wAsIJ3tGsez2QXph2uaBZUHRBfGHEoxemdUG+HjY8/9Ymig6Ib4wA1DAssnZlVyKQW+Pw1tcC66IkBckDRgBqHN4SXj2VDKQFppJcuZQXlCQgecEIQD2DpejyumQg2+Cl74XWQWkEkieMeGyHF4lBuj3MPsyCUg8kjxgBqO7wQ2IikNF9sOJ7gXVQaoHkFSMA1QPLhDv2hl07CAu+F1gHZSOQPGMEoAZggfA6+obd+szw4XbbKOtB8o4RgDoWHo7/PgnI5PGc/oXUQqkGaQaMANSJ8BDKZBKQH07m4C2vDkoM0iwYAahTsER4G5CGPT4Ny74XWAdlBNQ/mggjAHUm3Kk/SQLy4+7OztXhvj7VDOPTXbvUH1pa1JUW1JVdqOG+5hh7drBC+OHwtwbyV1Xou6IK//ydOnzK/4a2AdJE/7L6VYkZ9Skn1ZEDf1SlGdT1T/wvl+l/WU2yUw8xxuhXw/SpYfrUdwdoGhSdnXoTvO1dwwjgHUgATYOi87Y35x8M38dYD9IsKDofDHN86ORDjI1AmgFF59BJTg8uboxRCyTvKDoHF3N4+L02Rj2QPKPoHH7P2Qmq+hiNQPKKonWCKj+ncBtjJAHJG4r2KVxyMckhGUZSkDyhaE9ywPs0oOQYOiB5QUkzDcjjRDk9DF2QPKCkmSh3uQDn3U8l1cdIA/IO5Q3q+p/cYqSeSorzydbpMNKCBKC+7Yv+UhyipJ5sDe4uR8iCkQXEB0qWyxHAwQU7WTGygrhEyXzBDpYvaTOBYQLEFYqJS9pohSs2Lvo0hWEKxDaKqYs+AbabvizaJIZJEJsoxi6LBrM3DjCNYRrEBorpGweAoVtr2MCwAWIaxfitNSD7zWdsYdgCMYVi6+YzEN6eqeGd5Fxj2AQxgWLt9kxR2jcws41hGyQLiu0bmAF6t/hzgeECJA2Kq1v8QcKbYLrCcAWii+LsJphRPfUeR+ESwyVIUhTXt4kFat9I2TWGa5BGKL5upAx8eKtxHxg+QN6hvEGN9a99747PW41HFbrgX49g1heGL5CAEKM0E359AItd4Vxdfzfjj9rcweFft/Jm1QeGT5AYZesbVrv+zL+BTRrbzRaI6gc18xGHZh56mhjhE+QxzHYc5lcUMyjvD3QJMcKvbNoJj+56mPXoC+QuVHbCI2Azin5NFNMg72HEFdpgwvVDwXyA3IZyWzi3am2foYdiEmRDjHcVHT82zzXIlzBXrPXWNjmKKZD6GFU5e7CkK5CptQdLflx3zZOhmABJjBHn5NGrLkB0H72aACUriDZGdUcPwStbDye2CVL1cOKj2mtdHyULSCaMOGuP77YBYurx3XVQ0oIYwajO+APuTYJMWXjAfQ2UNCDGMarb3gpXBqGSdTKeCZB7UB6ESjRVp63h0uv2IYouiFWM6rYAQ/vh+QjMp5ngnRbkKcyOwHw0vXOItUlsdnofRQdkz4QjjPV1FOB8L0wPw+I4vE1yJVdSkGewNA5vh2GxF6YL8AXhxGd3xSh7uUkykL03ARWicNnj+Bq41QJT2+BlN1T2wcpBWPgM5o7DwklYOg3Lu+lc3U3n6mlYPglLx6PXHISFfbDSDZVt8LIFpoBb0e/2t257mABU9DVRl3I6RoFr0UadBH4AHgM/RuNx9L3J6DXXop/xvdy1hiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJktSk/R9NSGDYbfUjWAAAAABJRU5ErkJggg==";

	startTest('test-1', drawCanvas, drawControl, controlImage);
})();
