// Borrowed a bunch of stuff including bluring from the way processing-js runs tests
// https://github.com/jeresig/processing-js/blob/master/test/ref/index.html
// It doesnt solve the Windows testing problem, but it was worth a shot. Maybe we can improve on this

var ERROR_THRESHOLD = 10;

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
        // controlCtxContext.drawImage(img, 0, 0);

        diff = imagediff.diff(ctx, controlCtx);
        diffCtxContext.putImageData(diff, 0, 0);

        var succeeded = imagediff.equal(ctx, controlCtx, ERROR_THRESHOLD),
            status = document.getElementById('status');
        if (succeeded) {
            status.innerHTML = 'Succeeded';
        }
        else {
            status.innerHTML = 'Failed';
        }
    };
}
