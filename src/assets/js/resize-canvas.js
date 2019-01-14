import { TimelineMax } from "gsap/TweenMax";

class AcmeExperience {
    constructor() {
        this.body = document.querySelector('body');
        this.canvasElt = document.querySelector('canvas');
        this.context = canvasElt.getContext('2d');
        this.image = new Image(60, 45);
        this.requestAnimation;
        this.imageOptions  = [
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
        this.scaleOptions = {
            x: 1,
            y: 1,
            aX: 0.7,
            aY: 0.7
        };
        this.masterTimeLine = new TimelineMax();
        this.timelineCanvas = new TimelineMax();
    }

    resize() {
        let ratio = this.canvas.width / this.canvas.height;
        let canvas_height = window.innerHeight;
        let canvas_width = canvas_height * ratio;
        if(canvas_width>window.innerWidth){
            canvas_width=window.innerWidth;
            canvas_height=canvas_width/ratio;
        }

        this.canvas.style.width = canvas_width + 'px';
        this.canvas.style.height = canvas_height + 'px';
    }

    drawImageActualSize() {
        this.canvas.width = this.body.clientWidth;
        this.canvas.height = this.body.clientHeight;

        this.resize();

        this.context.scale(scaleOptions.x, scaleOptions.y);

        this.imageOptions.forEach(option => {
            this.context.drawImage(image, option.sx, option.sy, option.sw, option.sh, option.dx, option.dy, option.dw, option.dh);
        });

        this.requestAnimation = requestAnimationFrame(this.drawImageActualSize);
    }

    onReady() {
        this.context.canvas.width = this.image.width;
        this.context.canvas.height = this.image.height;

        this.drawImageActualSize();

        window.addEventListener('load', this.resize, false);
        window.addEventListener('resize', this.resize, false);

        this.imageOptions.forEach( (option, index) => {
            let tl = new TimelineMax();
            tl.to(option, 2, {dx: option.ax, dy: option.ay, ease: Quart.easeInOut, yoyo: true, repeat: 4});
            this.masterTimeLine.add(tl, 'startPoint');
        });

        this.masterTimeLine.pause();

        setTimeout(() => {

            this.masterTimeLine.play();
        }, 500);
    }

    init() {
        this.timelineCanvas.to(this.scaleOptions, 2, {x: this.scaleOptions.aX, y: this.scaleOptions.aY, ease: Quad.easeInOut});
        this.masterTimeLine.add('startPoint', 0);
        this.image.onload = this.onReady;
    }
}

export default AcmeExperience;
