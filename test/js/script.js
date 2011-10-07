//Some shapes dont match up exactly when loading them from a data url, not sure why.
//An error threshold of 7 seems to do the trick so far
var ERROR_THRESHOLD = 7;

function startTest(name, drawCanvas, controlImage){
	var ctx = document.getElementById('ctx'),
		ctxContext = ctx.getContext('2d'),
		controlCtx = document.getElementById('control-ctx'),
		controlCtxContext = controlCtx.getContext('2d'),
		img = new Image();
	
	img.src = controlImage;
	img.onload = function(){
		drawCanvas('ctx');
		controlCtxContext.drawImage(img,0,0);
		
		imageData = ctxContext.getImageData(0, 0, ctx.width, ctx.height);
		imageDataControl = controlCtxContext.getImageData(0, 0, controlCtx.width, controlCtx.height);
		var length = imageData.data.length,
			count = 0;

		if(imageDataControl.data.length === length){
		while(length--){
			if( imageData.data[length] !== imageDataControl.data[length] &&
			   Math.abs(imageData.data[length] - imageDataControl.data[length]) > ERROR_THRESHOLD ){
				
				var log = 'no match at ' + length + ': ' +  [imageData.data[length], imageDataControl.data[length]],
					li = document.createElement('li'),
					ul = document.getElementById('log');
					
				li.innerHTML =  log;
				ul.appendChild(li);
				
				console.log(log);
				count++;
				
				if(count > 2000){
					console.log('exiting: too many errors');
					var errorRate = document.getElementById('error-rate');
					errorRate.innerHTML = 'too many';
					return;
				}
			}
		}
		
		var errorRate = document.getElementById('error-rate'),
			rate = count / imageData.data.length * 100 + '%';
		
		if(errorRate){
			errorRate.innerHTML = rate ;
		}
		
		console.log(name + ' error rate: '  + rate );
		
		}
		else {
			console.log('different length');
		}
	}
}
