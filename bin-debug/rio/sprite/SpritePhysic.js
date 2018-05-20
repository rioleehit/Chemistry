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
/**
 *
 * @author
 *
 */
var SpritePhysic = (function (_super) {
    __extends(SpritePhysic, _super);
    function SpritePhysic(options) {
        var _this = _super.call(this, options) || this;
        _this.img = new egret.Sprite();
        _this.img["update"] = function () { };
        if (options && options.onInit) {
            _this.onInit = options.onInit;
        }
        _this.img.addEventListener(egret.Event.ADDED_TO_STAGE, _this.active, _this);
        _this.img.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.unactive, _this);
        return _this;
    }
    SpritePhysic.prototype.update = function () {
        this.img.x = (this.position[0] * SpritePhysic.factor);
        this.img.y = (SpritePhysic.stageHeight - this.position[1] * SpritePhysic.factor);
        //        this.img.rotation = 360 - this.angle * 180 / Math.PI;
        //        if(this.img["update"]){
        //            this.img["update"](this);
        //        }
    };
    SpritePhysic.prototype.active = function () {
        this.onInit();
        if (this.img) {
            this.img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onChosen, this);
            this.img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onChosen, this);
        }
    };
    SpritePhysic.prototype.unactive = function () {
        if (this.img) {
            this.img.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onChosen, this);
            this.img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onChosen, this);
        }
    };
    SpritePhysic.prototype._onChosen = function (evt) {
        if (this.chosenTag == false) {
            this.onChosen(this);
        }
    };
    SpritePhysic.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.touchEnabled = true;
        return result;
    };
    SpritePhysic.prototype.getPos = function () { return { x: this.img.x, y: this.img.y }; };
    SpritePhysic.prototype.getDisplayObject = function () { return this.img || this.shapImg; };
    SpritePhysic.maxId = 0;
    return SpritePhysic;
}(p2.Body));
__reflect(SpritePhysic.prototype, "SpritePhysic");
//# sourceMappingURL=SpritePhysic.js.map