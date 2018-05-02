/**
 *
 * @author
 *
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.call(this);
        this.skinName = "resource/rioSkin/rioSetingButtonSkin.exml";
    }
    var d = __define,c=Button,p=c.prototype;
    d(p, "label",undefined
        ,function (value) {
            this.btnImg.source = value;
        }
    );
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Button;
}(eui.Component));
egret.registerClass(Button,'Button');
