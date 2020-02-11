/**
 *
 * @author 
 *
 */
interface BallInfor{
    pos?:
    {
        X?: number,
        Y?: number,
    },
    R:number,//半径
    Q:number,//质量
    type:string,
    color:number,//颜色
    alpha?:number,//透明度
    img?:any//图片素材
}
class Ball extends SpritePhysic implements AtomBall{
    public ballType: string;
    public constructor(info: BallInfor) {
        super({
            mass: 1,
            position: [Math.floor(info.pos.X / SpritePhysic.factor),
                Math.floor((SpritePhysic.stageHeight - info.pos.Y) / SpritePhysic.factor),],
            onInit: (self:Ball)=>{
                self.mass = info.Q;
                self.ballType = info.type;
//                var vertices = [];
//                var size = 2.2;
//                for(var i = 0,N = 7;i < N;i++) {
//                    var a = 2 * Math.PI / N * i;
//                    var vertex = [size * 0.5 * Math.cos(a),size * 0.5 * Math.sin(a)]; // Note: vertices are added counter-clockwise
//                    vertices.push(vertex);
//                }
//                var boxShape = new p2.Convex({ vertices: vertices });
                var boxShape: p2.Shape = new p2.Circle({ radius: info.R });
                self.addShape(boxShape);
                //var img = this.createBitmapByName("circle");
                var img = new egret.Shape();
                img.graphics.beginFill(info.color,info.alpha!=null?info.alpha:1);
                img.graphics.drawCircle(0,0,SpritePhysic.factor * info.R);
                img.graphics.endFill();
                img.touchEnabled = true;
                var text = new egret.TextField();
                text.textColor = 0xffffff - info.color;
                text.text = info.type;     
                text.anchorOffsetX = Math.ceil(text.width / 2);
                text.anchorOffsetY = Math.ceil(text.height / 2);
                self.ballType = info.type;
                if(info.img==null){
                    this.img.addChild(img);
                    this.img.addChild(text);
                    return;
                }
                var radius = (<p2.Circle>boxShape).radius * SpritePhysic.factor;
                //var radius = 1 * SpritePhysic.factor;
                var texture = new egret.Bitmap(info.img);
                texture.touchEnabled = true;
                texture.width = radius*2;
                texture.height = radius * 2;
                texture.anchorOffsetX = radius ; 
                texture.anchorOffsetY = radius ;
                self.img.width = radius;
                self.img.height = radius;
                //self.img.addChild(texture);
            }
        });
	}
	public pos(x:number,y:number){
        this.position = [(x / SpritePhysic.factor),
            ((SpritePhysic.stageHeight - y) / SpritePhysic.factor)];
	}
    public distance(x: number,y: number){
        var pos:Pos = this.getPos();
        var offX: number = x - pos.x;
        var offY: number = y - pos.y;        
        return Math.sqrt(offX * offX + offY * offY);
    }
}
