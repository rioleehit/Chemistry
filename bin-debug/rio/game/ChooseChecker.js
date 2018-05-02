/**
 *
 * @author
 *
 */
var ChooseChecker = (function () {
    function ChooseChecker() {
    }
    var d = __define,c=ChooseChecker,p=c.prototype;
    p.check = function (chosen, newAtom, distance) {
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
egret.registerClass(ChooseChecker,'ChooseChecker');
