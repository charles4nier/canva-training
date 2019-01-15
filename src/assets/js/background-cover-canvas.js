class BackgroundCoverCanvas {
    drawImageProp (opts, x, y, w, h, offsetX, offsetY) {
        if (arguments.length === 2) {
            x = y = 0;
            w = opts.context.canvas.width;
            h = opts.context.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;


        let iw = opts.image.width,
            ih = opts.image.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        opts.context.drawImage(opts.image, cx, cy, cw, ch,  x, y, w, h);
    }

    cancel () {
        console.log('canceled');
    }

    init() {
        let acmeOpts,
            width,
            height;

        acmeOpts = {
            body: document.querySelector('body'),
            canvasElt: document.querySelector('canvas'),
            image: new Image(),
            get context () {
                return this.canvasElt.getContext('2d')
            }
        };

        acmeOpts.canvasElt.width = acmeOpts.body.clientWidth;
        acmeOpts.canvasElt.height = acmeOpts.body.clientHeight;

        width = acmeOpts.body.clientWidth;
        height = acmeOpts.body.clientHeight;

        acmeOpts.image.src = 'assets/images/test.png';
        acmeOpts.image.onload = () => {
            this.drawImageProp(acmeOpts, 0, 0, width, height)
        };
    }
}

export default BackgroundCoverCanvas;
