var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ChooseChecker = (function () {
    function ChooseChecker() {
    }
    ChooseChecker.prototype.check = function (chosen, newAtom, distance) {
        var isSame = true;
        var pos = newAtom.getPos();
        var isClose = chosen.length == 0;
        for (var i = 0; i < chosen.length && isSame; i++) {
            isSame = chosen[i].ballType == newAtom.ballType;
            isClose = isClose ? isClose : (isSame && chosen[i].distance(pos.x, pos.y) < distance * 2.05);
        }
        return isSame && isClose;
    };
    return ChooseChecker;
}());
__reflect(ChooseChecker.prototype, "ChooseChecker");
//# sourceMappingURL=ChooseChecker.js.map