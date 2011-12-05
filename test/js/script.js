// Borrowed a bunch of stuff including bluring from the way processing-js runs tests
// https://github.com/jeresig/processing-js/blob/master/test/ref/index.html
// It doesnt solve the Windows testing problem, but it was worth a shot. Maybe we can improve on this

// Some shapes dont match up exactly when loading them from a data url, not sure why.
// An error threshold of 7 seems to do the trick so far
var ERROR_THRESHOLD = 7,
    sigma = 2,
    // radius
    kernel, kernelSize;
buildKernel();

function startTest(name, drawCanvas, drawControl, controlImage) {
    var ctx = document.getElementById('ctx'),
        ctxContext = ctx.getContext('2d'),
        controlCtx = document.getElementById('control-ctx'),
        controlCtxContext = controlCtx.getContext('2d'),
        diffCtx = document.getElementById('diff-ctx'),
        diffCtxContext = diffCtx.getContext('2d'),
        img = new Image();

    img.src = controlImage;
    img.onload = function() {
        drawCanvas('ctx');
		drawControl('control-ctx');
        //controlCtxContext.drawImage(img, 0, 0);

        imageData = ctxContext.getImageData(0, 0, ctx.width, ctx.height);
        imageData.data = blur(imageData.data, ctx.width, ctx.height);
        imageDataControl = controlCtxContext.getImageData(0, 0, controlCtx.width, controlCtx.height);
        var length = imageData.data.length,
            count = 0;

        if (imageDataControl.data.length === length) {
            var diffData = diffCtxContext.createImageData(ctx.width, ctx.height),
                failed = false;
            for (var j = 0; j < length; j += 4) {
                if (Math.abs(imageData.data[j] - imageDataControl.data[j]) < ERROR_THRESHOLD &&
                    Math.abs(imageData.data[j + 1] - imageDataControl.data[j + 1]) < ERROR_THRESHOLD &&
                    Math.abs(imageData.data[j + 2] - imageDataControl.data[j + 2]) < ERROR_THRESHOLD &&
                    Math.abs(imageData.data[j + 3] - imageDataControl.data[j + 3]) < ERROR_THRESHOLD) {
                    diffData.data[j] = diffData.data[j + 1] = diffData.data[j + 2] = diffData.data[j + 3] = 0;
                }
                else {
                    diffData.data[j] = 255;
                    diffData.data[j + 1] = diffData.data[j + 2] = 0;
                    diffData.data[j + 3] = 255;
                    failed = true;
                }
            }

            diffCtxContext.putImageData(diffData, 0, 0);
            var status = document.getElementById('status');
            if (failed) {
                status.innerHTML = 'Failed';
            }
            else {
                status.innerHTML = 'Succeeded';
            }

        }
        else {
            console.log('different length');
        }
    }
}

function blur(data, width, height) {
    var len = data.length;
    var newData = new Array(len);

    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
            var r = 0,
                g = 0,
                b = 0,
                a = 0,
                sum = 0;
            var j = Math.max(1 - kernelSize, -y),
                jabs = -j;
            for (; j < kernelSize; jabs = Math.abs(++j)) {
                if (y + j >= height) {
                    break;
                }
                var i = Math.max(1 - kernelSize, -x),
                    iabs = -i;
                var offset = 4 * ((y + j) * width + (x + i));
                for (; i < kernelSize; iabs = Math.abs(++i)) {
                    if (x + i >= width) {
                        break;
                    }
                    var k = kernel[jabs][iabs];
                    r += data[offset++] * k;
                    g += data[offset++] * k;
                    b += data[offset++] * k;
                    a += data[offset++] * k;
                    sum += k;
                }
            }
            var destOffset = 4 * (y * width + x);
            newData[destOffset++] = r / sum;
            newData[destOffset++] = g / sum;
            newData[destOffset++] = b / sum;
            newData[destOffset++] = a / sum;
        }
    }

    return newData;
}

function buildKernel() {
    var ss = sigma * sigma;
    var factor = 2 * Math.PI * ss;
    kernel = new Array();
    kernel.push(new Array());
    var i = 0,
        j;
    do {
        var g = Math.exp(-(i * i) / (2 * ss)) / factor;
        if (g < 1e-3) break;
        kernel[0].push(g);++i;
    } while (i < 7);
    kernelSize = i;
    for (j = 1; j < kernelSize; ++j) {
        kernel.push(new Array());
        for (i = 0; i < kernelSize; ++i) {
            var g = Math.exp(-(i * i + j * j) / (2 * ss)) / factor;
            kernel[j].push(g);
        }
    }
}
