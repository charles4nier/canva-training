import TweenMax from "gsap/TweenMax";

let body = document.querySelector('body'),
    canvasElt = document.querySelector('canvas'),
    context = canvasElt.getContext('2d'),
    image = new Image(60, 45);

let imgOptions = [
    {
        sx: 0,
        sy: 0,
        sw: 400,
        sh: 400,
        dx: 0,
        dy: 0,
        dw: 400,
        dh: 400,
        ax: 800,
        ay: 0
    },
    {
        sx: 400,
        sy: 0,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 0,
        dw: 400,
        dh: 400
    },
    {
        sx: 0,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 0,
        dy: 400,
        dw: 400,
        dh: 400
    },
    {
        sx: 400,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 400,
        dw: 400,
        dh: 400
    },
    {
        sx: 800,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 400,
        dw: 400,
        dh: 400
    },
    {
        sx: 800,
        sy: 0,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 0,
        dw: 400,
        dh: 400,
        ax: 800,
        ay: 1200,
    },
    {
        sx: 0,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 0,
        dy: 800,
        dw: 400,
        dh: 400
    },
    {
        sx: 400,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 800,
        dw: 400,
        dh: 400
    },
    {
        sx: 800,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 800,
        dw: 400,
        dh: 400
    },
    {
        sx: 0,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 0,
        dy: 1200,
        dw: 400,
        dh: 400
    },
    {
        sx: 400,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 1200,
        dw: 400,
        dh: 400
    },
    {
        sx: 800,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 1200,
        dw: 400,
        dh: 400
    },
    {
        sx: 1200,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 1200,
        dw: 400,
        dh: 400
    },
    {
        sx: 1200,
        sy: 0,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 0,
        dw: 400,
        dh: 400
    },
    {
        sx: 1200,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 400,
        dw: 400,
        dh: 400
    },
    {
        sx: 1200,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 800,
        dw: 400,
        dh: 400
    },
    {
        sx: 1200,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 1200,
        dw: 400,
        dh: 400
    }
];


setTimeout(() => {
    imgOptions.forEach( option => {
        TweenMax.to(option, 8, {dx: 700, dy: 500, ease: Elastic.easeOut.config(2, 0.2), repeat: true});
    });
    TweenMax.to(canvasElt, 8, {scaleX: 0.5, scaleY: 0.5, ease:  SlowMo.ease.config(1, 0.2, false),  repeat: true});
}, 1000);

image.onload = drawImageActualSize;

image.src = 'assets/images/test.png';

function drawImageActualSize() {
    canvas.width = body.clientWidth ;
    canvas.height = body.clientHeight;

    imgOptions.forEach(option => {
        context.drawImage(image, option.sx, option.sy, option.sw, option.sh, option.dx, option.dy, option.dw, option.dh);
    });


    requestAnimationFrame(drawImageActualSize);
}


