var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TemplateMgr = (function () {
    function TemplateMgr() {
        this.BallTemplate = {};
    }
    /*
     * 创建指定类型的球
     */
    TemplateMgr.prototype.createBall = function (type) {
        var ball = null;
        if (this.BallTemplate[type]) {
            var img = RES.getRes(type + "_png");
            ball = new Ball(this.BallTemplate[type], img);
            //ball = Template.onCreateBall();
            //ball.ballType = type; 
        }
        return ball;
    };
    return TemplateMgr;
}());
__reflect(TemplateMgr.prototype, "TemplateMgr");
var Template = new TemplateMgr();
Template.BallTemplate["O2"] = { posX: 0, posY: 0, type: "O2" };
Template.BallTemplate["C"] = { posX: 0, posY: 0, type: "C" };
Template.BallTemplate["H2"] = { posX: 0, posY: 0, type: "H2" };
Template.BallTemplate["Na"] = { posX: 0, posY: 0, type: "Na" };
Template.BallTemplate["N2"] = { posX: 0, posY: 0, type: "N2" };
Template.BallTemplate["H2S"] = { posX: 0, posY: 0, type: "H2S" };
Template.BallTemplate["H2O"] = { posX: 0, posY: 0, type: "H2O" };
Template.BallTemplate["Si"] = { posX: 0, posY: 0, type: "Si" };
//# sourceMappingURL=Template.js.map