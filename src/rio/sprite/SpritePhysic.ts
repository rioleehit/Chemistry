/**
 *
 * @author 
 *
 */
class SpritePhysic extends p2.Body{
	public constructor(options?) {
        super(options);
        this.img = new egret.Sprite();
        this.img["update"] = ()=>{ };
        if(options && options.onInit){
            options.onInit.call(this);
        }
        this.img.addEventListener(egret.Event.ADDED_TO_STAGE,this.active,this);
        this.img.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.unactive,this);
    } 
    public update() {
        this.img.x = (this.position[0] * SpritePhysic.factor);
        this.img.y = (SpritePhysic.stageHeight - this.position[1] * SpritePhysic.factor);
//        this.img.rotation = 360 - this.angle * 180 / Math.PI;
//        if(this.img["update"]){
//            this.img["update"](this);
//        }
    }
    public active() {
        if(this.img){
            this.img.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._onChosen,this);
            this.img.addEventListener(egret.TouchEvent.TOUCH_MOVE,this._onChosen,this);
        }
    }
    public unactive() {
        if(this.img) {
            this.img.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this._onChosen,this);
            this.img.addEventListener(egret.TouchEvent.TOUCH_MOVE,this._onChosen,this);
        }
    }
    private _onChosen(evt: egret.TouchEvent){
        if(this.chosenTag == false){
            this.onChosen(this);
        }
    }
    public onChosen: Function;
    public chosenTag: boolean;
    public createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.touchEnabled = true;
        return result;
    } 
    public getPos() { return { x: this.img.x,y: this.img.y};}
    public getDisplayObject() { return this.img || this.shapImg; }
    public static factor: number;
    public static stageHeight: number;
    public static maxId: number = 0;
    public img: egret.Sprite;
    protected shapImg: egret.Shape;
    //public id: number;
}
