/**
 *
 * @author 
 *
 */
interface Pos{
    x:number,
    y:number
}
interface AtomBall{
    id: number,
    //pos?: Pos, 
    ballType?:string,
    img?: egret.DisplayObject,
    chosenTag?: boolean,
    pos?:(x:number,y:number)=>any,
    distance?: (x: number,y: number)=>number,
    getPos?:()=>Pos,
}
class TemplateMgr {
	public constructor() {
	}
	/*
	 * 创建指定类型的球
	 */ 
	public createBall(type:string){
        var ball: AtomBall = null;    
        if(this.BallTemplate[type]){
            var img = RES.getRes(type+"_png");  
            ball = new Ball(this.BallTemplate[type], img);
            //ball = Template.onCreateBall();
            //ball.ballType = type; 
	    }
        return ball;
	}
    public onCreateBall: (type:string) => AtomBall
    public BallTemplate = {}
}
var Template: TemplateMgr = new TemplateMgr(); 
Template.BallTemplate["O2"] = { posX: 0,posY: 0,type: "O2" };
Template.BallTemplate["C"] = { posX: 0,posY: 0,type: "C" };
Template.BallTemplate["H2"] = { posX: 0,posY: 0,type: "H2" };
Template.BallTemplate["Na"] = { posX: 0,posY: 0,type: "Na" };
Template.BallTemplate["N2"] = { posX: 0,posY: 0,type: "N2" };
Template.BallTemplate["H2S"] = { posX: 0,posY: 0,type: "H2S" };
Template.BallTemplate["H2O"] = { posX: 0,posY: 0,type: "H2O" };
Template.BallTemplate["Si"] = { posX: 0,posY: 0,type: "Si" };