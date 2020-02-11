/**
 *
 * @author 
 *
 */

interface StageInfo {
    width: number,
    height: number,
    frameOffset:number,
    lv?:string,
    lvData?:string[][],
    persent?:string[], 
}
class GameMain extends eui.Panel{
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        this.skinName = "resource/rioSkin/GameMainSkin.exml";     
	}
    private btn_start: Button;
    protected childrenCreated(): void {
        super.childrenCreated();
        
        this.btn_start.label = RES.getRes('t_start_png');
    }
    public init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        this.stageInfo = { 
            width: this.stage.stageWidth,
            height: this.stage.stageHeight,
            frameOffset:20
        };
        var ballOneLine = 8;
        SpritePhysic.factor = /*Math.ceil*/((this.stageInfo.width - this.stageInfo.frameOffset*2)/(ballOneLine*2));
        SpritePhysic.stageHeight = this.stage.stageHeight;
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addBall,this);

        //this.stage.addEventListener(egret.Event.RESIZE,this.onResize2,this);

        //this.stage.addEventListener(egret.Event.ACTIVATE,this.focuse_in,this);
        //this.stage.addEventListener(egret.Event.DEACTIVATE,this.focuse_out,this);

	}
//    private focuse_in(event: any) {
//        console.log("focuse_in");
//    }
//    private focuse_out(event: any) {
//        console.log("focuse_out");
//    }
//    private onResize2(event:any){
//        console.log(this.$stage.stageHeight + " " + this.$stage.stageWidth);
//        
//        var stage = this.$stage;
//        
//        console.log(stage.visible);
////        this.$setWidth(stage.$stageWidth);
////        this.$setHeight(stage.$stageHeight);
//    }
    private addBall(evt: egret.TouchEvent){
        if(!this.gameLayer){
            var arr = RES.getRes('level_json');
            //console.log(arr.data.length);
            this.stageInfo.lv = "lv1";
            this.stageInfo.lvData = arr["lvTest"];
            var _persent = arr["lvTest_概率"];
            this.stageInfo.persent = new Array(500);
            var start: number = 0;
            var end: number = 0;
            
            for(var itm in _persent) {
                //itm
                start = end;
                end += _persent[itm] * this.stageInfo.persent.length;
                for(var i = start;i < end;i++) {
                    this.stageInfo.persent[i] = itm;
                }
            }
            this.gameLayer = new GameLayer(this.stageInfo);
            
            this.addChild(this.gameLayer);
            return;
        }
	}
    private gameLayer: GameLayer;
    private stageInfo: StageInfo;
    
}
