import { TimelineMax } from "gsap/TweenMax";

class AcmeExperience {
    constructor() {
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
        this.timelinecanvasElt = new TimelineMax();
    }

    resize(opts) {
        let ratio = opts.canvasElt.width / opts.canvasElt.height;
        let canvasElt_height = window.innerHeight;
        let canvasElt_width = canvasElt_height * ratio;
        if(canvasElt_width>window.innerWidth){
            canvasElt_width=window.innerWidth;
            canvasElt_height=canvasElt_width/ratio;
        }

        opts.canvasElt.style.width = canvasElt_width + 'px';
        opts.canvasElt.style.height = canvasElt_height + 'px';
    }

    drawImageActualSize(opts) {
        opts.canvasElt.width = opts.body.clientWidth;
        opts.canvasElt.height = opts.body.clientHeight;

        this.resize(opts);

        opts.context.scale(this.scaleOptions.x, this.scaleOptions.y);

        this.imageOptions.forEach(option => {
            opts.context.drawImage(opts.image, option.sx, option.sy, option.sw, option.sh, option.dx, option.dy, option.dw, option.dh);
        });

        this.requestAnimation = requestAnimationFrame(() => {this.drawImageActualSize(opts)});
    }

    onReady(opts) {
        this.drawImageActualSize(opts);

        window.addEventListener('load', this.resize, false);
        window.addEventListener('resize', this.resize, false);

        this.imageOptions.forEach( option => {
            let tl = new TimelineMax();
            tl.to(option, 2, {dx: option.ax, dy: option.ay, ease: Quart.easeInOut, yoyo: true, repeat: 4});
            this.masterTimeLine.add(tl, 'startPoint');
        });

        this.masterTimeLine.pause();

        setTimeout(() => {

            this.masterTimeLine.play();
        }, 500);
    }

    cancel() {
        cancelAnimationFrame(this.requestAnimation);
        console.log('cancel');
    }

    init() {
        let acmeOpts;

        acmeOpts = {
            body: document.querySelector('body'),
            canvasElt: document.querySelector('canvas'),
            image: new Image(60, 45),
            get context () {
                return this.canvasElt.getContext('2d')
            }
        };

        acmeOpts.image.src = 'assets/images/test.png';

        acmeOpts.image.onload = () => {
            this.timelinecanvasElt.to(this.scaleOptions, 2, {x: this.scaleOptions.aX, y: this.scaleOptions.aY, ease: Quad.easeInOut});
            this.masterTimeLine.add('startPoint', 0);
            this.onReady(acmeOpts);
        };
    }
}

export default AcmeExperience;
