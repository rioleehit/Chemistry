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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/rioSkin/rioSetingButtonSkin.exml";
        return _this;
    }
    Object.defineProperty(Button.prototype, "label", {
        set: function (value) {
            this.btnImg.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Button;
}(eui.Component));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map