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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(info, _img) {
        var _this = _super.call(this, {
            mass: 1,
            position: [Math.floor(info.posX / SpritePhysic.factor),
                Math.floor((SpritePhysic.stageHeight - info.posY) / SpritePhysic.factor),],
            onInit: function () {
                _this.ballType = info.type;
                //                var vertices = [];
                //                var size = 2.2;
                //                for(var i = 0,N = 7;i < N;i++) {
                //                    var a = 2 * Math.PI / N * i;
                //                    var vertex = [size * 0.5 * Math.cos(a),size * 0.5 * Math.sin(a)]; // Note: vertices are added counter-clockwise
                //                    vertices.push(vertex);
                //                }
                //                var boxShape = new p2.Convex({ vertices: vertices });
                var boxShape = new p2.Circle({ radius: 1 });
                _this.addShape(boxShape);
                //var img = this.createBitmapByName("circle");
                var img = new egret.Shape();
                img.graphics.beginFill(0xff0000, 1);
                img.graphics.drawCircle(0, 0, SpritePhysic.factor);
                img.graphics.endFill();
                img.touchEnabled = true;
                var radius = boxShape.radius * SpritePhysic.factor;
                //var radius = 1 * SpritePhysic.factor;
                var text = new egret.TextField();
                text.text = info.type;
                text.anchorOffsetX = Math.ceil(text.width / 2);
                text.anchorOffsetY = Math.ceil(text.height / 2);
                _this.ballType = info.type;
                //this.img.addChild(img);
                //this.img.addChild(text);
                var texture = new egret.Bitmap(_img);
                texture.touchEnabled = true;
                texture.width = radius * 2;
                texture.height = radius * 2;
                texture.anchorOffsetX = radius;
                texture.anchorOffsetY = radius;
                _this.img.width = radius;
                _this.img.height = radius;
                _this.img.addChild(texture);
            }
        }) || this;
        return _this;
    }
    Ball.prototype.pos = function (x, y) {
        this.position = [(x / SpritePhysic.factor),
            ((SpritePhysic.stageHeight - y) / SpritePhysic.factor)];
    };
    Ball.prototype.distance = function (x, y) {
        var pos = this.getPos();
        var offX = x - pos.x;
        var offY = y - pos.y;
        return Math.sqrt(offX * offX + offY * offY);
    };
    return Ball;
}(SpritePhysic));
__reflect(Ball.prototype, "Ball", ["AtomBall"]);
//# sourceMappingURL=Ball.js.map