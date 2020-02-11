var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TemplateMgr = (function () {
    function TemplateMgr(Balls) {
        this.ScaleR = 53;
        this.ScaleQ = 1;
        this.BallTemplate = {};
        if (Balls == null) {
            return;
        }
        var ballTemplate = this.BallTemplate;
        var scaleR = this.ScaleR;
        var scaleQ = this.ScaleQ;
        Balls.forEach(function (element) {
            var ballinfor = element;
            ballinfor.R = ballinfor.R / scaleR;
            ballinfor.Q = ballinfor.Q / scaleQ;
            if (ballinfor.pos == null) {
                ballinfor.pos = { X: 0, Y: 0 };
            }
            ballTemplate[ballinfor.type] = ballinfor;
        });
    }
    /*
     * 创建指定类型的球
     */
    TemplateMgr.prototype.createBall = function (type) {
        var ball = null;
        if (this.BallTemplate[type]) {
            //var img = RES.getRes(type+"_png");  
            ball = new Ball(this.BallTemplate[type]);
            //ball = Template.onCreateBall();
            //ball.ballType = type; 
        }
        return ball;
    };
    return TemplateMgr;
}());
__reflect(TemplateMgr.prototype, "TemplateMgr");
var Template = new TemplateMgr([
    { type: "H", R: 53, Q: 1, color: 0x87CEFA, alpha: 1 },
    { type: "He", R: 31, Q: 4, color: 0x87CEFA, alpha: 1 },
    { type: "Li", R: 167, Q: 7, color: 0x87CEFA, alpha: 1 },
    { type: "Be", R: 112, Q: 9, color: 0x87CEFA, alpha: 1 },
    { type: "B", R: 87, Q: 11, color: 0x87CEFA, alpha: 1 },
    { type: "C", R: 67, Q: 12, color: 0x1A1A1A, alpha: 1 },
    { type: "N", R: 56, Q: 14, color: 0x1A1A1A, alpha: 1 },
    { type: "O", R: 48, Q: 16, color: 0xFFEC8B, alpha: 1 },
    { type: "F", R: 42, Q: 19, color: 0xFFEC8B, alpha: 1 },
    { type: "Ne", R: 38, Q: 20, color: 0xFFEC8B, alpha: 1 },
    { type: "Na", R: 190, Q: 23, color: 0xB2DFEE, alpha: 1 },
]);
// Template.BallTemplate["O2"] = { posX: 0,posY: 0,type: "O2" };
// Template.BallTemplate["C"] = { posX: 0,posY: 0,type: "C" };
// Template.BallTemplate["H2"] = { posX: 0,posY: 0,type: "H2" };
// Template.BallTemplate["Na"] = { posX: 0,posY: 0,type: "Na" };
// Template.BallTemplate["N2"] = { posX: 0,posY: 0,type: "N2" };
// Template.BallTemplate["H2S"] = { posX: 0,posY: 0,type: "H2S" };
// Template.BallTemplate["H2O"] = { posX: 0,posY: 0,type: "H2O" };
// Template.BallTemplate["Si"] = { posX: 0,posY: 0,type: "Si" }; 
//# sourceMappingURL=Template.js.map