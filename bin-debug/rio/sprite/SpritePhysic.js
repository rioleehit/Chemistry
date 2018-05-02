/**
 *
 * @author
 *
 */
var SpritePhysic = (function (_super) {
    __extends(SpritePhysic, _super);
    function SpritePhysic(options) {
        _super.call(this, options);
        this.img = new egret.Sprite();
        this.img["update"] = function () { };
        if (options && options.onInit) {
            options.onInit.call(this);
        }
        this.img.addEventListener(egret.Event.ADDED_TO_STAGE, this.active, this);
        this.img.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.unactive, this);
    }
    var d = __define,c=SpritePhysic,p=c.prototype;
    p.update = function () {
        this.img.x = (this.position[0] * SpritePhysic.factor);
        this.img.y = (SpritePhysic.stageHeight - this.position[1] * SpritePhysic.factor);
        //        this.img.rotation = 360 - this.angle * 180 / Math.PI;
        //        if(this.img["update"]){
        //            this.img["update"](this);
        //        }
    };
    p.active = function () {
        if (this.img) {
            this.img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onChosen, this);
            this.img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onChosen, this);
        }
    };
    p.unactive = function () {
        if (this.img) {
            this.img.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onChosen, this);
            this.img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onChosen, this);
        }
    };
    p._onChosen = function (evt) {
        if (this.chosenTag == false) {
            this.onChosen(this);
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.touchEnabled = true;
        return result;
    };
    p.getPos = function () { return { x: this.img.x, y: this.img.y }; };
    p.getDisplayObject = function () { return this.img || this.shapImg; };
    SpritePhysic.maxId = 0;
    return SpritePhysic;
}(p2.Body));
egret.registerClass(SpritePhysic,'SpritePhysic');
