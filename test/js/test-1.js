(function(){
	var drawCanvas = function(id){
		var ctx = new Canvas(id); // creates a new Canvas object in the canvas with id="ctx"
		
		ctx.circle({x:25, y:25, radius: 10, fillStyle:'rgb(200,0,0)'}); // creates a red circle
		ctx.circle({x:25, y:55, radius: 15, fillStyle:'rgb(200,0,0)'}); // creates a red circle
		ctx.circle({x:55, y:25, radius: 30, fillStyle:'rgb(200,30,200)'}); // creates a purple circle
		ctx.rectangle({x:50, y:75, height: 100, width: 50, fillStyle: 'rgba(0, 0, 200, 0.5)'}); // creates a bluish rectangle with transparency
	};
	
	var drawControl = function(id){
		var canvas = document.getElementById(id);  
		if (canvas.getContext){
			
			var ctx = canvas.getContext('2d');
			
			ctx.moveTo(25,25);
			ctx.beginPath();
			ctx.arc(25, 25, 10, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.fillStyle = 'rgb(200,0,0)';
			ctx.fill();
			ctx.closePath();
			
			ctx.moveTo(25,55);
			ctx.beginPath();
			ctx.arc(25, 55, 15, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.fillStyle = 'rgb(200,0,0)';
			ctx.fill();
			ctx.closePath();

			ctx.moveTo(55,25);
			ctx.beginPath();
			ctx.arc(55, 25, 30, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.fillStyle = 'rgb(200,30,200)';
			ctx.fill();
			ctx.closePath();
			
			ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
			ctx.fillRect(50, 75, 50, 100);
		}
	}
	
	var controlImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADICAYAAAAePETBAAAMYElEQVR4Ae1ca3AV5Rl+94Tk5AomEVBkCkoqMLVjFaeKU+UmFWSw1FZrSW9aLm2ZcplaphSdYisFrZ2UUX+Aok5HhpZpbURFqAVSYYBxBoujtmgDgiIFCYmQ60lysn1e58Q5Ceey13PePXl3Zic5u/t93/M+zz7fbfdbwzRNkrQZhjFxRsmMrSsqVpSFjXA4m9giZiSypnFN8/bW7beDp/2ZwGJIEqTYKP7Zkoolv5lTOqcoE8FbLaO2pbZ9XeO6B9rMtt9bTeP0ukFOE3qdrjKvsuax4Y/Nvyp8lSgxOE6+Qaryq1YB48iz0bPLvI49Pj8RDrk8//I1a4euXTw6f3RxPDhp/7/b+S6tPLPyqQ+7P5zvF7asC8LOqBlWs3RswVi/YvQ03/e73m9fdHrRer+cEvIUrc3MuM14ZOgj84IiBocHNxcxZsZuM1xLl2dNEO5NcQOONqPUElJBFzFmxs4xeA0rK406Aqngrq203pQdchn7ocihrYhlLHqqjXbSpro2Kw4ZmTdyA48zUgELwjmOgWPxEmvGBcEd9ZVF5YtmZnvQ5wWJHAPHgphu8iI/ziOjggB4aGLhxD9OKZ4iuntrh1yO5cbCG5/l2OykS3atJ5kkyzzB8TkLhyy8OMHxQB9aMGTBUATwNS+CyKggcMfaceFxgW87+hPPMcEla/sfd/I7Y4LA0pOrB1cPdwIyCGnmDp57CcfoFqsv3V4AMwBsPPbrsV+K3RyWN2z2teFrAzfmAHZLG2IruSzvsh/i4jpLCZJc5Kkg0GFIAdHCmUTLbiYqvQaFon4qiuDvs8VTQiEjxELl5IbY8iaXTL4DHMzHuKTDaZCeCQIgN9xC9OJSCIBWuyQe0Fv4Mb1oSvyhnPz/1qJbOzed3zQJwe1wGqAnbUg+xhZLiHY/RHRxfzEY2CEjTFeEv+AUY2DSVRVUlZaFyr7qBrBrQdgZPyLa822iwmRAWsJXU56Rn+x0zhxHtTVoQnjCbW4CciUItxlcTX0nBYIenCstGJfiitw6NSp/VBV4ccyr44RMIzfg3GakovR/OPn5QaNSXZJT5/BkkRv00U6DciwI7gJjGnpTidqMeDAf4McV+QNHkDEFY7oR8pXxHNj537EgKGQ8d23TFXYWF1yUV5Huspw5Xx4q557rJU4DciPI9TzOSLe14YKw0acXnC5JoM8XGUV5CMDx9JAbQS7lQV869liQglDOTO6mC5fyjXw0relrjmQZuREkWZ59jufs0LxPlBf8cBy2G0FONhO1XwCl3wG2UGcP+2RgbF1mVyciBTXONjeCvP4vC2VyZRUxWy1cmRuXtJvtUUSSFUH+8xpRSzoaK3HBJ1HP3gFIV1zWzzf1NHG395RTII4dghlNcydRTQNRytv/c0B2tOu4U3yBS3ek8wh3e99zCtyxIFwgKsv1f0jTjvDDkP92DxxB6rvqeU7vGHZHmytBYJJz/yCavZko6fw/F9DSedgRuCAmOt51vB688BSeo43t5WpD4Qcw/T4dLdmeZJOMpZE3KWp25fyMb4/Z030wcnCbG0JdOaS34C7T3Ps40cT7iRoStSlfMiN0NPJO7+U5+7e+s76luaf5724C9EQQBsBOQfVVdQfRrx9EL2M3aqpPsMM50S9if7V9t+kGaBDS7mjfwaP0f7rB6styBJ4JBqjx2L+MfQQDxEsOs2pH1N6Ahzie3QScr5QN1VX0zpN3bj7RfeK7bjC5bkMSFQ63sBv+Hds/vQQa7Xsj8sYL1xVeNzhRmqAfQ2ytH0U/2ug2jozdrdCo7rnzzzkeMLkN1O/0HBvH6LacjAnCQA90HPjF4chhx9MKboP1Kz3HxLF5kb8vVRaqJ37XdQL2KuxcRXEVxkIcWX9ufSOWsDl+XoA8xG0bzm04A1AveAHMM0EgwnB0MRbcRDRvOdrwqzFYxGOzAgxbwwwUI8cI6qvOlzr2F+1sfbVnWsn0jLrTC7IS5bG7bXfbvo5930d15XgwGJ+v614WhCjHc/XV3yC65244AdPtaR9aPRqqpMUjtpgFoRLujQV24w8LVJ+sfgmrcr/pVRCu7lKIMW0mpqr+TPSDe/BelhUxGPj8nrNU07g60GJwHPyVhxPREwv4f682x4IUGMa9v0S9+SuiSjwxT+uKeMBD8OO2tl30YvNf4g8H6n/+ukPskxuePltwJEihYcx4kGjj7f3e4bXDKEbv1N60jt7pOGgnmYhr34683cqf2kC7sd9rQLYFQTU1dTHRtqkeILmLumjvmZ/TcXwhISgbf81h+ZnlT/r13RNbgnADjjZjCxpwz+r/hWYbvfzxUuJApW/8FYdVDat+69dXHDh+W4Jwb+o+Is/f6flJTxPVnf6x6OoL1VQLf1LjaNfRlX7eOJa7vXDH8IV4Esa9Kb8AbaF8KipfQrPLPOtFegI1k59nsixI2DAe2EG0wmrX1ikTbyHhtuKptKxiZdbHKaI/YHaLYRxbTTTKKdF20p3DxU9i8HhN+dKsjeh5BP5E0xOv8DgDvSlPu7apuLDkEFRXQzEd8gEePvlWXSUCuQ7TLccKJ57C2vaKTC2n5olCzLc17O/Y/z0IsTcRLj+PWRVkxiaizWPwIrufYPrnfQSvdFUTzcXxQqxxf5iXVfNqV15g2f9aN7/54RI/z8D6wNMQgmdta72am7KLy+rkYhVPFNrN3O31sTLHgJzHkdff4NTJ+NjLvEklk77OCyyxFqMsz8hzJE7UjEbxDlUzP3ata617nh8uoZw6t5jdprcqyODeWVu3BdpJHyvzs6n6GGF1EKYQd/PNvMASa/pm8TIyXrnEi2V4fQYvCYi9hU78ri2/3slvFPJLbPzeFL+qg7dDXo69kPAa8u2wg8vPa60K4ieGdHlfMAiNEchvd/B+HwTi8dRo7Fdih7E+XZ/Bi4k4LT+H4f0U9vewH0N6T6bKkZfnm1VBzuMWimAS0fNBYaqIuEycP5/qGj4XI/go/uU90JvVkXo9bq/OTEcaK7M+0+Vmszyrghx8M8NdXiYlVmbwpoNdKGpJEFQJZ8DKxy7KcZSUy+SyHSUOaCJLgnBse4iewnKptCumvOKBy+IyvcovKPlYFgQNyIY/eTjtno4gLovLTHddrp23LAiqjtPPEz2N1Tm+u4TL+CvRM1xmrhGeLh7LgnBGqMzvf5SoLV2mbs9zGQ1Evj53cIvRr/S2BMEd2/QK0V1bfRQFLuxBGd/isvwKWnK+tgThQEDUrt8R/XSXD1FxnpjhnYUydvqQfSCytDpS7xNMp2k+jTdPTuIW3ubV83V2HQuNvLf3KWyA/bA0/Z6ME8whTeWXHvg5e4nNd7N68+QGnNsMrgrZfb3HB+pfV4IwaRClHG9WP4SHV/febfFVUk6Hrlo7d22558adhYHaZjAX8ZtrQXozgzCfvWw9IcXL1jwdghH4aQz6NvI4A0IMuK5tL2eJ/nomSHzmEAem6bMcgU/zrC1PFB6ECDCFbokY8EWQRAXpMWsM2O72WstWr3LKgArilDmf0qkgPhHrNFtHA0OnhfmZzjBex1KV4G/qEGEaqiAqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMFRh6ggwhgQBkcdooIIY0AYHHWICiKMAWFw1CEqiDAGhMExTNMUBmlgw9EqS5j+KogKIowBYXDUISqIMAaEwVGHqCDCGBAGRx2igghjQBgcdYgKIowBYXDUISqIMAaEwVGHqCDCGBAGRx2igghjQBgcdYgKIowBYXDUISqIMAaEwVGHqCDCGBAGRx0iTJD/A66dVpMq0l/KAAAAAElFTkSuQmCC";
	
	startTest('test-1', drawCanvas, drawControl, controlImage);
})();