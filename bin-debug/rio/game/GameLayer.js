/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameLayer = (function (_super) {
    __extends(GameLayer, _super);
    function GameLayer(info) {
        var _this = _super.call(this) || this;
        _this.stageInfo = info;
        _this.logic = new GameLogic(info);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.gameStart, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.gameEnd, _this);
        _this.stateGame = "ending";
        _this.touchEnabled = true;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 140;
        button.verticalCenter = -400;
        _this.addChild(button);
        //button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pause,this);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.addBall, _this);
        _this.balls = new Array();
        _this.initDebugDraw();
        _this.preIniter = info.lvData.length;
        _this.ballTimer = new egret.Timer(500, _this.preIniter);
        _this.ballTimer.addEventListener(egret.TimerEvent.TIMER, function () {
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
        }, _this);
        _this.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { }, _this);
        return _this;
        //ballTimer.start();
    }
    GameLayer.prototype.pause = function (evt) {
        if (this.stateGame == "playing") {
            this.gamePause();
        }
        else if (this.stateGame == "pausing") {
            this.gameResume();
        }
    };
    GameLayer.prototype.initDebugDraw = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        // this.p2Draw = new p2DebugDraw(this.logic.getWorld(),sprite);
        // this.p2Draw.factor = SpritePhysic.factor;
        // this.p2Draw.winHeight = SpritePhysic.stageHeight;
    };
    GameLayer.prototype.gameStart = function () {
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
    GameLayer.prototype.focuse_in = function (event) {
        this.gameResume();
    };
    GameLayer.prototype.focuse_out = function (event) {
        this.gamePause();
    };
    GameLayer.prototype.addBall = function (evt) {
        var index = Math.floor(Math.random() * this.stageInfo.persent.length);
        this._addBall(evt.stageX, evt.stageY, this.stageInfo.persent[index]);
    };
    GameLayer.prototype._addBall = function (_posX, _posY, _type) {
        console.log(_type);
        var ball = Template.createBall(_type); // new Ball({ posX: _posX,posY: _posY,type: _type });
        ball.pos(_posX, _posY);
        this.logic.add(ball);
    };
    GameLayer.prototype.touchBegin = function (evt) {
        //evt.
    };
    GameLayer.prototype.touchMove = function (evt) {
    };
    GameLayer.prototype.touchCancel = function (evt) {
        console.log("touchCancel");
        this.logic.freeChosen();
    };
    GameLayer.prototype.touchEnd = function (evt) {
        this.logic.destroyAtoms();
    };
    GameLayer.prototype.gamePause = function () {
        if (this.stateGame == "pausing") {
            return;
        }
        this.stateGame = "pausing";
        this.logic.pause();
    };
    GameLayer.prototype.gameResume = function () {
        if (this.stateGame == "playing") {
            return;
        }
        this.stateGame = "playing";
        this.logic.resume();
    };
    GameLayer.prototype.gameEnd = function () {
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
    GameLayer.prototype.onChosen = function (item) {
        if (!item.chosenTag) {
            this.logic.choose(item);
        }
    };
    GameLayer.prototype.initLogic = function () {
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
    GameLayer.prototype.debugDraw = function () {
        //if(this.p2Draw) {
        //this.p2Draw.drawDebug();
        //}
    };
    return GameLayer;
}(eui.UILayer));
__reflect(GameLayer.prototype, "GameLayer");
//# sourceMappingURL=GameLayer.js.map