/**
 *
 * @author 
 *
 */

class GameLayer extends eui.UILayer {
	public constructor(info:StageInfo) {
        super();
        this.stageInfo = info;
        this.logic = new GameLogic(info);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.gameStart,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.gameEnd,this);       
        
        this.stateGame = "ending";        
        this.touchEnabled = true;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 140;
        button.verticalCenter = -400;
        this.addChild(button);
        //button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pause,this);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addBall,this);
        
        this.balls = new Array();
        
        this.initDebugDraw();        
        
        this.preIniter = info.lvData.length;
        
        this.ballTimer = new egret.Timer(500,this.preIniter);
        this.ballTimer.addEventListener(egret.TimerEvent.TIMER,function(){
            if(this.preIniter<=0){
                return ;
            }
            this.preIniter--;
            var balls: string[] = this.stageInfo.lvData[this.preIniter];
            var height: number = this.stageInfo.height / (this.stageInfo.lvData.length - this.preIniter + 1); 
            var offset: number = this.stageInfo.width / (balls.length + 1);
            for(var i = 0;i < balls.length; i++) {
                this._addBall((i + 1) * offset,height,balls[i]);
            }            
        },this);
        this.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){},this);
        //ballTimer.start();

    }

	private pause(evt:egret.TouchEvent){
        if(this.stateGame == "playing"){
            this.gamePause();
        } else if(this.stateGame == "pausing"){
            this.gameResume();
        }
	}
	private initDebugDraw(){
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        // this.p2Draw = new p2DebugDraw(this.logic.getWorld(),sprite);
        // this.p2Draw.factor = SpritePhysic.factor;
        // this.p2Draw.winHeight = SpritePhysic.stageHeight;
	}
    private gameStart(){
        if(this.stateGame!="ending"){
            return;
        }
        this.initLogic();
        this.stateGame = "playing";
                
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchCancel,this);
        
        this.addEventListener(egret.Event.ENTER_FRAME,this.debugDraw,this);        

        this.stage.addEventListener(egret.Event.ACTIVATE,this.focuse_in,this);
        this.stage.addEventListener(egret.Event.DEACTIVATE,this.focuse_out,this);
        
        this.ballTimer.start();
    }
    private focuse_in(event: any) {
        this.gameResume();
    }
    private focuse_out(event: any) {
        this.gamePause();
    }
    private addBall(evt: egret.TouchEvent){
        var index: number = Math.floor(Math.random() * this.stageInfo.persent.length);
        this._addBall(evt.stageX,evt.stageY,this.stageInfo.persent[index]);
    }
    private _addBall(_posX:number, _posY:number, _type:string){
        console.log(_type);
        var ball = Template.createBall(_type);// new Ball({ posX: _posX,posY: _posY,type: _type });
        ball.pos(_posX,_posY);
        this.logic.add(ball);
    }
    private touchBegin(evt: egret.TouchEvent){
        //evt.
    }
    private touchMove(evt: egret.TouchEvent) {

    }
    private touchCancel(evt: egret.TouchEvent){
        console.log("touchCancel");
        this.logic.freeChosen();
    }
    private touchEnd(evt: egret.TouchEvent) {
        this.logic.destroyAtoms();
    }
    
    private gamePause() {
        if(this.stateGame == "pausing") {
            return;
        }
        this.stateGame = "pausing";
        this.logic.pause();
    }
    private gameResume(){
        if(this.stateGame == "playing"){
            return;
        }
        this.stateGame = "playing";
        this.logic.resume();
    }
    private gameEnd() {
        if(this.stateGame == "ending") {
            return;
        }
        this.stateGame = "ending";

//        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
//        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchCancel,this);

        //this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.addBall,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.debugDraw,this);
    }
    private onChosen(item: SpritePhysic){
        if(!item.chosenTag) {
            this.logic.choose(item);
        }
    }
    private initLogic() {
        var self = this;
        var logic: GameLogic = this.logic;
        logic.onAtomAdd = (ball: AtomBall) => {
            ball.img.alpha = 1;
            self.addChild(ball.img);
            if(ball instanceof SpritePhysic){
                (<SpritePhysic>ball).onChosen = this.onChosen.bind(this);
            }
            return;
        }
        logic.onAtomChosen = (ball: AtomBall) => {
            ball.img.alpha = 1;
        }
        logic.onAtomChosen = (ball:AtomBall) => {
            ball.img.alpha = 0.5;
            return;
        }
        logic.onAtomDestroy = (ball: AtomBall) => {
            ball.img.alpha = 0.1;
            self.removeChild(ball.img);
            return;
        }
        logic.onAtomUnchosen = (ball: AtomBall) => {
            ball.img.alpha = 1;
        }
        logic.init();
    }
    private debugDraw(){
        //if(this.p2Draw) {
            //this.p2Draw.drawDebug();
        //}
    }
    private preIniter:number;
    private balls: Ball[];
    private logic: GameLogic;
    private stateGame: string;//playing pausing ending
    private stageInfo: StageInfo;
    //private p2Draw: p2DebugDraw;
    private ballTimer: egret.Timer;
}
