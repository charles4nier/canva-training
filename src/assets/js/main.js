import { TimelineMax } from "gsap/TweenMax";

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
        ax: 1200,
        ay: 0,
    },
    {
        sx: 400,
        sy: 0,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 0,
        dw: 400,
        dh: 400,
        ax: 0,
        ay: 0,
    },
    {
        sx: 0,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 0,
        dy: 400,
        dw: 400,
        dh: 400,
        ax: 800,
        ay: 400,
    },
    {
        sx: 400,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 400,
        dw: 400,
        dh: 400,
        ax: 400,
        ay: 800,
    },
    {
        sx: 800,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 400,
        dw: 400,
        dh: 400,
        ax: 800,
        ay: 800,
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
        dh: 400,
        ax: 0,
        ay: 1200,
    },
    {
        sx: 400,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 800,
        dw: 400,
        dh: 400,
        ax: 1200,
        ay: 800,
    },
    {
        sx: 800,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 800,
        dw: 400,
        dh: 400,
        ax: 800,
        ay: 0
    },
    {
        sx: 0,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 0,
        dy: 1200,
        dw: 400,
        dh: 400,
        ax: 0,
        ay: 400,
    },
    {
        sx: 400,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 400,
        dy: 1200,
        dw: 400,
        dh: 400,
        ax: 400,
        ay: 0,
    },
    {
        sx: 800,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 800,
        dy: 1200,
        dw: 400,
        dh: 400,
        ax: 400,
        ay: 1200,
    },
    {
        sx: 1200,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 1200,
        dw: 400,
        dh: 400,
        ax: 1200,
        ay: 1200,
    },
    {
        sx: 1200,
        sy: 0,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 0,
        dw: 400,
        dh: 400,
        ax: 1200,
        ay: 400,
    },
    {
        sx: 1200,
        sy: 400,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 400,
        dw: 400,
        dh: 400,
        ax: 400,
        ay: 400,
    },
    {
        sx: 1200,
        sy: 800,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 800,
        dw: 400,
        dh: 400,
        ax: 0,
        ay: 800,
    },
    {
        sx: 1200,
        sy: 1200,
        sw: 400,
        sh: 400,
        dx: 1200,
        dy: 1200,
        dw: 400,
        dh: 400,
        ax: 1200,
        ay: 1200,
    }
];

let scaleOptions = {
    x: 1,
    y: 1,
    aX: 0.7,
    aY: 0.7
}

let masterTimeLine = new TimelineMax();
let timelineCanvas = new TimelineMax();

timelineCanvas.to(scaleOptions, 2, {x: scaleOptions.aX, y: scaleOptions.aY, ease: Quad.easeInOut});
timelineCanvas.pause();

masterTimeLine.add('startPoint', 0);

image.onload = init;

image.src = 'assets/images/test.png';

function drawImageActualSize() {
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight;

    context.scale(scaleOptions.x, scaleOptions.y);

    imgOptions.forEach(option => {
        context.drawImage(image, option.sx, option.sy, option.sw, option.sh, option.dx, option.dy, option.dw, option.dh);
    });

    requestAnimationFrame(drawImageActualSize);
}

function init() {
    drawImageActualSize();

    imgOptions.forEach( (option, index) => {
        let tl = new TimelineMax();
        tl.to(option, 2, {dx: option.ax, dy: option.ay, ease: Quart.easeInOut, yoyo: true, repeat: 4});
        masterTimeLine.add(tl, 'startPoint');
    });

    masterTimeLine.add(timelineCanvas.play(), 'startPoint');
    masterTimeLine.pause();

    setTimeout(() => {

        masterTimeLine.play();
    }, 500);
}


