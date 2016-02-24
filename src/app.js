
/* 
 * Adaptación del TicTacToe V1.0 en base al proyecto
   de grayfire.
 */
 
var TopMenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var titleLabel = new cc.LabelTTF("TicTacToe V0.1", "Arial", 32);
        titleLabel.x = size.width / 2;
        titleLabel.y = size.height - 40;
        this.addChild(titleLabel, 5);

               
        return true;
    },

    onEnter : function(){
        cc.director.runScene(new TttxScene(3));
    },

   
});


var TopMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TopMenuLayer();
        this.addChild(layer);
    }
});
