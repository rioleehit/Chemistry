var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameLogic = (function () {
    function GameLogic(info) {
        this.stageInfo = info;
        this.onAtomChosen = function (ball) { return; };
        this.onAtomUnchosen = function (ball) { return; };
        this.onAtomAdd = function (ball) { return; };
        this.onAtomDestroy = function (balls) { return; };
        this.checker = new ChooseChecker();
        this.world = new p2.World();
        this.world.gravity = [0, -1];
        this.world.sleepMode = p2.World.NO_SLEEPING;
        this.initGround();
        //this.init();        
    }
    GameLogic.prototype.init = function () {
        this.atoms = new Array();
        this.atomChosen = new Array();
        this.chosenCount = 0;
        this.isPause = false;
    };
    GameLogic.prototype.add = function (ball) {
        ball.chosenTag = false;
        this.atoms[ball.id] = ball;
        this.world.addBody(ball);
        this.onAtomAdd(ball);
    };
    GameLogic.prototype.choose = function (ball) {
        if (!ball.chosenTag && this.checker.check(this.atomChosen, ball, SpritePhysic.factor)) {
            this.chosenCount++;
            this.atomChosen.push(ball);
            this.onAtomChosen(ball);
            ball.chosenTag = true;
        }
    };
    GameLogic.prototype.freeChosen = function () {
        for (var i = 0; i < this.atomChosen.length; i++) {
            var ball = this.atomChosen[i];
            if (ball && ball.chosenTag) {
                ball.chosenTag = false;
                this.onAtomUnchosen(ball);
            }
        }
        this.atomChosen = new Array();
    };
    GameLogic.prototype.destroyAtoms = function () {
        for (var i = 0; i < this.atomChosen.length; i++) {
            var ball = this.atomChosen[i];
            var id = ball.id;
            if (ball && ball.chosenTag) {
                ball.chosenTag = false;
                this.world.removeBody(ball);
            }
            this.atoms[id] = null;
        }
        this.atomChosen = new Array();
    };
    GameLogic.prototype.getWorld = function () {
        return this.world;
    };
    GameLogic.prototype.getAllAtomBall = function () {
        return this.atoms;
    };
    GameLogic.prototype.pause = function () {
        this.isPause = true;
    };
    GameLogic.prototype.resume = function () {
        this.isPause = false;
    };
    GameLogic.prototype.initGround = function () {
        var world = this.world;
        world.setGlobalStiffness(1e8);
        ///world.solver.iterations = 20;
        //world.solver.tolerance = 0.02;
        var factor = SpritePhysic.factor;
        var sInfo = this.stageInfo;
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape, [0, (sInfo.frameOffset + 10) / factor]);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [0, (sInfo.height - sInfo.frameOffset) / factor], Math.PI);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [(sInfo.width - sInfo.frameOffset) / factor, 0], Math.PI / 2);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [sInfo.frameOffset / factor, (sInfo.width) / factor], -Math.PI / 2);
        groundBody.type = p2.Body.STATIC;
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.position[1] = 10;
        world.addBody(groundBody);
        //world.
        world.on("addBody", function (event) {
            if (event.body && event.body instanceof SpritePhysic && this.onAtomAdd) {
                this.onAtomAdd(event.body);
            }
        }, this);
        world.on("removeBody", function (event) {
            if (event.body && event.body instanceof SpritePhysic && this.onAtomDestroy) {
                this.onAtomDestroy(event.body);
            }
        }, this);
        egret.startTick(function (timeStamp) {
            if (!this.timeStamp) {
                this.timeStamp = timeStamp;
                return false;
            }
            var offtime = timeStamp - this.timeStamp;
            if (this.isPause == false && offtime < 40) {
                world.step(offtime / 200);
                {
                    //var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
                    var l = world.bodies.length;
                    for (var i = 0; i < l; i++) {
                        var boxBody = world.bodies[i];
                        if (boxBody instanceof SpritePhysic) {
                            boxBody.update();
                        }
                    }
                }
            }
            this.timeStamp = timeStamp;
            return true;
        }, this);
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map