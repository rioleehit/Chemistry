/**
 *
 * @author 
 *
 */
class ChooseChecker {
	public constructor() {
	}
    public check(chosen: AtomBall[],newAtom: AtomBall, distance:number){        
        var isSame: boolean = true;
        var pos: Pos = newAtom.getPos();
        var isClose: boolean = chosen.length==0;
        for(var i = 0;i < chosen.length && isSame; i++) {
            isSame = chosen[i].ballType == newAtom.ballType;
            isClose = isClose ? isClose : (isSame && chosen[i].distance(pos.x,pos.y) < distance * 2.05);
	    }
        return isSame&&isClose;
	}
	
}
