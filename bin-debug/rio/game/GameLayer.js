/**
 *
 * @author
 *
 */
var GameLayer = (function (_super) {
    __extends(GameLayer, _super);
    function GameLayer(info) {
        _super.call(this);
        this.stageInfo = info;
        this.logic = new GameLogic(info);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.gameStart, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.gameEnd, this);
        this.stateGame = "ending";
        this.touchEnabled = true;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 140;
        button.verticalCenter = -400;
        this.addChild(button);
        //button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pause,this);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addBall, this);
        this.balls = new Array();
        this.initDebugDraw();
        this.preIniter = info.lvData.length;
        this.ballTimer = new egret.Timer(500, this.preIniter);
        this.ballTimer.addEventListener(egret.TimerEvent.TIMER, function () {
            if (this.preIniter <= 0) {
                return;
            }
            this.preIniter--;
            var balls = this.stageInfo.lvData[this.preIniter];
            var height = this.stageInfo.height / (this.stageInfo.lvData.length - this.preIniter + 1);
            var offset = this.stageInfo.width / (balls.length + 1);
            for (var i = 0; i < balls.length; i++) {
                this._addBall((i + 1) * offset, height, balls[i]);
            }
        }, this);
        this.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { }, this);
        //ballTimer.start();
    }
    var d = __define,c=GameLayer,p=c.prototype;
    p.pause = function (evt) {
        if (this.stateGame == "playing") {
            this.gamePause();
        }
        else if (this.stateGame == "pausing") {
            this.gameResume();
        }
    };
    p.initDebugDraw = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.p2Draw = new p2DebugDraw(this.logic.getWorld(), sprite);
        this.p2Draw.factor = SpritePhysic.factor;
        this.p2Draw.winHeight = SpritePhysic.stageHeight;
    };
    p.gameStart = function () {
        if (this.stateGame != "ending") {
            return;
        }
        this.initLogic();
        this.stateGame = "playing";
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchCancel, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.debugDraw, this);
        this.stage.addEventListener(egret.Event.ACTIVATE, this.focuse_in, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.focuse_out, this);
        this.ballTimer.start();
    };
    p.focuse_in = function (event) {
        this.gameResume();
    };
    p.focuse_out = function (event) {
        this.gamePause();
    };
    p.addBall = function (evt) {
        var index = Math.floor(Math.random() * this.stageInfo.persent.length);
        this._addBall(evt.stageX, evt.stageY, this.stageInfo.persent[index]);
    };
    p._addBall = function (_posX, _posY, _type) {
        console.log(_type);
        var ball = Template.createBall(_type); // new Ball({ posX: _posX,posY: _posY,type: _type });
        ball.pos(_posX, _posY);
        this.logic.add(ball);
    };
    p.touchBegin = function (evt) {
        //evt.
    };
    p.touchMove = function (evt) {
    };
    p.touchCancel = function (evt) {
        console.log("touchCancel");
        this.logic.freeChosen();
    };
    p.touchEnd = function (evt) {
        this.logic.destroyAtoms();
    };
    p.gamePause = function () {
        if (this.stateGame == "pausing") {
            return;
        }
        this.stateGame = "pausing";
        this.logic.pause();
    };
    p.gameResume = function () {
        if (this.stateGame == "playing") {
            return;
        }
        this.stateGame = "playing";
        this.logic.resume();
    };
    p.gameEnd = function () {
        if (this.stateGame == "ending") {
            return;
        }
        this.stateGame = "ending";
        //        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        //        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchCancel, this);
        //this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.addBall,this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.debugDraw, this);
    };
    p.onChosen = function (item) {
        if (!item.chosenTag) {
            this.logic.choose(item);
        }
    };
    p.initLogic = function () {
        var _this = this;
        var self = this;
        var logic = this.logic;
        logic.onAtomAdd = function (ball) {
            ball.img.alpha = 1;
            self.addChild(ball.img);
            if (ball instanceof SpritePhysic) {
                ball.onChosen = _this.onChosen.bind(_this);
            }
            return;
        };
        logic.onAtomChosen = function (ball) {
            ball.img.alpha = 1;
        };
        logic.onAtomChosen = function (ball) {
            ball.img.alpha = 0.5;
            return;
        };
        logic.onAtomDestroy = function (ball) {
            ball.img.alpha = 0.1;
            self.removeChild(ball.img);
            return;
        };
        logic.onAtomUnchosen = function (ball) {
            ball.img.alpha = 1;
        };
        logic.init();
    };
    p.debugDraw = function () {
        if (this.p2Draw) {
        }
    };
    return GameLayer;
}(eui.UILayer));
egret.registerClass(GameLayer,'GameLayer');
