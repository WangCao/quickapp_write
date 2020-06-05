function calcDistance(loc1,loc2) {
    return Math.sqrt((loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y-loc2.y)*(loc1.y-loc2.y));
}

function calcLineWidth(t,s,lastLineWidth) {
    let v = s/t;
    let res;
    if (v < 0.1) {
        res = 30;
    }else if (v >= 10) {
        res = 1
    }else {
        res = 30 - (v-0.1)/(10-0.1)*(30-1)
    }

    if (lastLineWidth == -1) {
        return res;
    }

    return lastLineWidth*3/4 + res*1/4
}
const quickapp_write = {
    vm: null,
    canvas: null,
    ctx: null,
    lastLoc: {x:0,y:0}, // 上一次绘制位置
    lastTimestamp: 0,
    lastLineWidth: -1,
    init(vm,canvasId) {
        if (!vm || !canvasId) {
            console.log("参数不合法")
            return;
        }
        this.vm = vm;
        this.canvas = vm.$element(canvasId);
        this.ctx = this.canvas.getContext('2d');
        console.log("初始化")
    },
    touchstart(evt) {
        let locx = evt.touches[0].offsetX;
        let locy = evt.touches[0].offsetY;
        this.lastLoc = {x:locx,y:locy};
        this.lastTimestamp = new Date().getTime();
    },
    touchmove(evt) {
        let locx = evt.touches[0].offsetX;
        let locy = evt.touches[0].offsetY;
        const {ctx,lastLoc,lastTimestamp,lastLineWidth} = this;

        const nowLoc = {x: locx,y:locy};
        const nowTimestamp = new Date().getTime();
        const distance = calcDistance(nowLoc,lastLoc); // 计算出距离
        const time = nowTimestamp - lastTimestamp;
        const lineWidth = calcLineWidth(time,distance,lastLineWidth);
        ctx.beginPath();
        ctx.moveTo(lastLoc.x,lastLoc.y);
        ctx.lineTo(locx,locy);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        this.lastLoc = nowLoc;
        this.lastTimestamp = nowTimestamp;
        this.lastLineWidth = lineWidth;


        console.log("鼠标移动")
        console.log(evt)
        console.log(evt.touches)
    },
    clear() {
        const {ctx} = this;
        ctx.clearRect(0,0,700,1000);
    },
    touchend(evt) {

    }
}

const m_global = Object.getPrototypeOf(global) || global;
!(function() {
  m_global && (m_global.$quickapp_write = quickapp_write);
})();

export default quickapp_write;