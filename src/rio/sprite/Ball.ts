/**
 *
 * @author 
 *
 */
interface BallInfor{
    posX: number,
    posY: number,
    type:string
}
class Ball extends SpritePhysic implements AtomBall{
    public ballType: string;
    public constructor(info: BallInfor, _img:any) {
        super({
            mass: 1,
            position: [Math.floor(info.posX / SpritePhysic.factor),
                Math.floor((SpritePhysic.stageHeight - info.posY) / SpritePhysic.factor),],
            onInit: (self:Ball)=>{
                 self.ballType = info.type;
//                var vertices = [];
//                var size = 2.2;
//                for(var i = 0,N = 7;i < N;i++) {
//                    var a = 2 * Math.PI / N * i;
//                    var vertex = [size * 0.5 * Math.cos(a),size * 0.5 * Math.sin(a)]; // Note: vertices are added counter-clockwise
//                    vertices.push(vertex);
//                }
//                var boxShape = new p2.Convex({ vertices: vertices });
                var boxShape: p2.Shape = new p2.Circle({ radius: 1 });
                self.addShape(boxShape);
                //var img = this.createBitmapByName("circle");
                var img = new egret.Shape();
                img.graphics.beginFill(0xff0000,1);
                img.graphics.drawCircle(0,0,SpritePhysic.factor);
                img.graphics.endFill();
                img.touchEnabled = true;
                var radius = (<p2.Circle>boxShape).radius * SpritePhysic.factor;
                //var radius = 1 * SpritePhysic.factor;
                var text = new egret.TextField();
                text.text = info.type;     
                text.anchorOffsetX = Math.ceil(text.width / 2);
                text.anchorOffsetY = Math.ceil(text.height / 2);
                self.ballType = info.type;
                //this.img.addChild(img);
                //this.img.addChild(text);
                var texture = new egret.Bitmap(_img);
                texture.touchEnabled = true;
                texture.width = radius*2;
                texture.height = radius * 2;
                texture.anchorOffsetX = radius ; 
                texture.anchorOffsetY = radius ;
                self.img.width = radius;
                self.img.height = radius;
                self.img.addChild(texture);
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
