/**
 *
 * @author 
 *
 */
class GameLogic{
    public onAtomChosen: (ball: AtomBall) => any
    public onAtomUnchosen: (ball: AtomBall) => any
    public onAtomAdd: (ball: AtomBall) => any
    public onAtomDestroy: (balls: AtomBall) => any
    public init(){
        this.atoms = new Array();
        this.atomChosen = new Array();
        this.chosenCount = 0;
        this.isPause = false;
    }
    public add(ball: AtomBall) {
        ball.chosenTag = false;
        this.atoms[ball.id] = ball;
        this.world.addBody(<p2.Body>ball); 
        this.onAtomAdd(ball);
    }
    public choose(ball: AtomBall) {
        if(!ball.chosenTag && this.checker.check(this.atomChosen,ball,SpritePhysic.factor)){
            this.chosenCount++;
            this.atomChosen.push(ball);            
            this.onAtomChosen(ball);
            ball.chosenTag = true;
        }
    }
    public freeChosen(){
        for(var i = 0;i < this.atomChosen.length;i++) {
            var ball: AtomBall = this.atomChosen[i];
            if(ball && ball.chosenTag) {
                ball.chosenTag = false;
                this.onAtomUnchosen(ball);
            }
        }
        this.atomChosen = new Array();        
    }
    public destroyAtoms(){
        for(var i = 0;i < this.atomChosen.length;i++) {
            var ball: AtomBall = this.atomChosen[i];
            var id: number = ball.id;
            if(ball&&ball.chosenTag){
                ball.chosenTag = false;
                this.world.removeBody(<p2.Body>ball);
            }
            this.atoms[id] = null;          
        }
        this.atomChosen = new Array();
    }
    public getWorld(){
        return this.world;
    }
    public getAllAtomBall(){
        return this.atoms;
    }
    public pause(){
        this.isPause = true;
    }
    public resume(){
        this.isPause = false;
    }
    public constructor(info: StageInfo) {
        this.stageInfo = info;
        this.onAtomChosen = (ball: AtomBall) => { return; }
        this.onAtomUnchosen = (ball: AtomBall) => { return; }
        this.onAtomAdd = (ball: AtomBall) => { return; }
        this.onAtomDestroy = (balls: AtomBall) => { return; }
        this.checker = new ChooseChecker();
        this.world = new p2.World();
        this.world.gravity = [0,-1];
        this.world.sleepMode = p2.World.NO_SLEEPING;
        this.initGround();
        //this.init();        
    }
    private initGround(){
        var world = this.world;
        world.setGlobalStiffness(1e8);
        ///world.solver.iterations = 20;
        //world.solver.tolerance = 0.02;
        
        var factor = SpritePhysic.factor;
        var sInfo = this.stageInfo;
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.addShape(groundShape,[0,(sInfo.frameOffset+10) / factor]);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape,[0,(sInfo.height - sInfo.frameOffset) / factor],Math.PI);


        groundShape = new p2.Plane();
        groundBody.addShape(groundShape,[(sInfo.width - sInfo.frameOffset) / factor,0],Math.PI / 2);

        groundShape = new p2.Plane();
        groundBody.addShape(groundShape,[sInfo.frameOffset / factor,(sInfo.width) / factor],-Math.PI / 2);
        groundBody.type = p2.Body.STATIC;

        var planeShape: p2.Plane = new p2.Plane();
        var planeBody: p2.Body = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.position[1] = 10;
        world.addBody(groundBody);
        //world.
        world.on("addBody",function(event: any) {
            if(event.body && event.body instanceof SpritePhysic && this.onAtomAdd) {
                this.onAtomAdd(event.body);
            }
        },this);
        world.on("removeBody",function(event: any) {
            if(event.body && event.body instanceof SpritePhysic && this.onAtomDestroy) {
                this.onAtomDestroy(event.body);
            }   
        },this);

        egret.startTick(function(timeStamp: number) {
            if(!this.timeStamp) {
                this.timeStamp = timeStamp;
                return false;
            }
            var offtime = timeStamp - this.timeStamp;
            if(this.isPause==false && offtime<40){
                world.step(offtime / 200);
                {
                    //var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
                    var l = world.bodies.length;
                    for(var i: number = 0;i < l;i++) {
                        var boxBody: p2.Body = world.bodies[i];
                        if(boxBody instanceof SpritePhysic) {
                            (<SpritePhysic>boxBody).update();
                        }
                    }
                }
            }           
            this.timeStamp = timeStamp;
            return true;
        },this);
    }
    private isPause: boolean;
    private chosenCount: number;
    private atomChosen: AtomBall[];
    private atoms: AtomBall[];
    private checker: ChooseChecker;
    private world: p2.World;
    private stageInfo: StageInfo;
}