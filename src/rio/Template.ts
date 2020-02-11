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
    public constructor(Balls : BallInfor[]) {
        if(Balls==null){return;}
        var  ballTemplate = this.BallTemplate;
        var scaleR = this.ScaleR;
        var scaleQ = this.ScaleQ;
        Balls.forEach(element => {
            var ballinfor:BallInfor = element;
            ballinfor.R = ballinfor.R/scaleR;
            ballinfor.Q = ballinfor.Q/scaleQ;
            if(ballinfor.pos==null){ballinfor.pos = {X:0,Y:0};}
            ballTemplate[ballinfor.type] = ballinfor;
        });
	}
	/*
	 * 创建指定类型的球
	 */ 
	public createBall(type:string){
        var ball: AtomBall = null;    
        if(this.BallTemplate[type]){
            //var img = RES.getRes(type+"_png");  
            ball = new Ball(this.BallTemplate[type]);
            //ball = Template.onCreateBall();
            //ball.ballType = type; 
	    }
        return ball;
	}
    public ScaleR:number = 53
    public ScaleQ:number = 1
    public onCreateBall: (type:string) => AtomBall
    public BallTemplate = {}
}
var Template: TemplateMgr = new TemplateMgr([
    { type: "H", R:53,  Q:1 ,color:0x87CEFA, },
    { type: "He",R:31,  Q:4 ,color:0x87CEFA, },
    { type: "Li",R:167, Q:7 ,color:0x87CEFA, },
    { type: "Be",R:112, Q:9 ,color:0x87CEFA, },
    { type: "B", R:87,  Q:11 ,color:0x87CEFA, },
    { type: "C", R:67,  Q:12 ,color:0x1A1A1A, },
    { type: "N", R:56,  Q:14 ,color:0x1A1A1A, },
    { type: "O", R:48,  Q:16 ,color:0xFFEC8B, },
    { type: "F", R:42,  Q:19 ,color:0xFFEC8B, },
    { type: "Ne",R:38,  Q:20 ,color:0xFFEC8B, },
    { type: "Na",R:190, Q:23 ,color:0xB2DFEE, },
]); 
