/**
 *
 * @author 
 *
 */
class Button extends eui.Component{
    public constructor() {
        super();
        this.skinName = "resource/rioSkin/rioSetingButtonSkin.exml";
    }
    public btnImg: eui.Image;
    public set label(value: any) {
        this.btnImg.source = value;
    }
    protected childrenCreated(): void {
        super.childrenCreated();
    }
}
