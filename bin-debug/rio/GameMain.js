/**
 *
 * @author
 *
 */
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.skinName = "resource/rioSkin/GameMainSkin.exml";
    }
    var d = __define,c=GameMain,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_start.label = RES.getRes('t_start_png');
    };
    p.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.stageInfo = {
            width: this.stage.stageWidth,
            height: this.stage.stageHeight,
            frameOffset: 20
        };
        var ballOneLine = 8;
        SpritePhysic.factor = ((this.stageInfo.width - this.stageInfo.frameOffset * 2) / (ballOneLine * 2));
        SpritePhysic.stageHeight = this.stage.stageHeight;
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addBall, this);
        //this.stage.addEventListener(egret.Event.RESIZE,this.onResize2,this);
        //this.stage.addEventListener(egret.Event.ACTIVATE,this.focuse_in,this);
        //this.stage.addEventListener(egret.Event.DEACTIVATE,this.focuse_out,this);
    };
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
    p.addBall = function (evt) {
        if (!this.gameLayer) {
            var arr = RES.getRes('level_json');
            //console.log(arr.data.length);
            this.stageInfo.lv = "lv1";
            this.stageInfo.lvData = arr["lv1"];
            var _persent = arr["lv1_概率"];
            this.stageInfo.persent = new Array(500);
            var start = 0;
            var end = 0;
            for (var itm in _persent) {
                //itm
                start = end;
                end += _persent[itm] * this.stageInfo.persent.length;
                for (var i = start; i < end; i++) {
                    this.stageInfo.persent[i] = itm;
                }
            }
            this.gameLayer = new GameLayer(this.stageInfo);
            this.addChild(this.gameLayer);
            return;
        }
    };
    return GameMain;
}(eui.Panel));
egret.registerClass(GameMain,'GameMain');
