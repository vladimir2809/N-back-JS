function Menu()
{
    this.being=false;
    this.timerId = null;
    this.x = 0;
    this.xMenu = 0;
    this.yMenu = 0;
    this.y = 0;
    this.width = 350;
    this.height = 380;
    this.widthOneItem = 200;
    this.heightOneItem = 40;
    this.sizeFontItem = 20;
    this.dist = 15;
    this.listSelect = [];
    this.listFlagOn = [];
    this.header = '';
    this.headerFontSize = 30;
    this.numSelectHower = null;
    this.mouseHower = false;
    this.selectHower = null;
    this.loadMap = false;
    this.loadMapTrue = true;
    this.blocking = false;
    this.selectNow = false;
    this.controllKey = false;
    this.keysControllFuncOn = false;
    this.timeOpen = null;
    this.setOption=function(option)
    {
        for (var attr1 in this)
        {
            for (var attr2 in option)
            {
                if (attr1==attr2)    this[attr1] = option[attr2];
            }
        }
        this.updateProp();
    }
    this.updateProp=function()
    {
    
        this.blocking = false;
        this.y = screenHeight / 2 - this.height / 2;
        this.x = screenWidth / 2 - this.width / 2;
        this.xMenu =this.x+ this.width/2-this.widthOneItem/2;
        this.yMenu = this.y+this.height/2-(this.listSelect.length)*(this.heightOneItem+this.dist)/2 ;
        this.yMenu += this.dist/2;
    }
    this.start=function()
    {
        //if (this.being==true)
        this.being = true;
        this.updateProp();
        //this.blocking = false;
        //this.y = screenHeight / 2 - this.height / 2;
        //this.x = screenWidth / 2 - this.width / 2;
        //this.xMenu =this.x+ this.width/2-this.widthOneItem/2;
        //this.yMenu = this.y+this.height/2-(this.listSelect.length)*(this.heightOneItem+this.dist)/2 ;
        //this.yMenu += this.dist/2;
        //this.timerId=setInterval(function(){
        
        //       menuRedactor.update(); 
           
        //},20);
    }
    this.close=function()
    {
        this.being = false;
        clearInterval(this.timerId);
    }
    this.menuOn=function()
    {
        this.being = true;
        this.resetSelect();
        this.timeOpen=new Date().getTime();
    }
    this.menuOff=function()
    {
        this.being = false;
        this.resetSelect();
        this.timeOpen=null;
    }
    this.draw=function ()
    {
        if (this.being==true)
        {
            let x = this.xMenu;
            let y = this.yMenu;
            context.fillStyle='rgb(0,0,0)';
            context.fillRect(this.x,this.y,this.width,this.height);// очистка экрана
            context.fillStyle='rgb(0,255,0)';

            let strHeader = this.header;
            context.font =  this.headerFontSize+'px Arial';
            let widthTextHeid = context.measureText(strHeader).width;
            context.fillText(strHeader,this.x+ this.width / 2 - widthTextHeid / 2, this.y+ this.headerFontSize);

            //context.fillStyle='rgb(210,210,0)';
            context.strokeStyle = 'rgb(210,210,0)';
            let sizeFont =  this.sizeFontItem;
            context.font = sizeFont+"px Arial";
            context.fillStyle='#FF8800';
            for (let i = 0; i < this.listSelect.length;i++)
            {
                let widthText = context.measureText(this.listSelect[i]).width;
                context.save();
                context.strokeStyle = this.numSelectHower == i ? 'red' : 'blue';
                context.lineWidth = 3;
                context.strokeRect(x,y+i*(this.heightOneItem+this.dist),this.widthOneItem,this.heightOneItem);
                let addX = this.widthOneItem / 2 - widthText / 2;
                //console.log(addX);
                context.fillStyle=this.listFlagOn[i]==true?'#FF8800':'#AAAAAA';
                context.fillText(this.listSelect[i],x+addX,y+i*this.heightOneItem+this.dist*i+this.heightOneItem/2+sizeFont/3);
                context.restore();
            }
        }
    }
    this.update=function()
    {
        if (this.being==true)
        {
            let mX = mouseX;//-mouseOffsetX;
            let mY = mouseY;//-mouseOffsetY;
            let x = this.xMenu;
            let y = this.yMenu;
            let timeNow=new Date().getTime();
            if ( this.controllKey ==false &&  this.mouseHower == false)
            {    
                this.numSelectHower = null;
                this.selectHower = null;
            }
            if (this.blocking==false )
            {
                let flag = false;
                for (let i = 0;i<this.listSelect.length;i++)
                {
                    if ( mX>x && mX<x+this.widthOneItem &&
                        mY>y+i*(this.heightOneItem+this.dist)&&
                        mY<y+i*(this.heightOneItem+this.dist)+ this.heightOneItem &&
                        this.listFlagOn[i]==true)
                    {
                        if (    (timeNow>this.timeOpen+200 && checkMouseMove(100)==true && 
                                this.keysControllFuncOn==true ) || 
                            this.keysControllFuncOn == false)
                        {
                            this.numSelectHower = i;
                            this.selectHower = this.listSelect[i];
                        }
                        this.mouseHower = true;
                        flag = true;
                    }

                }
                if (flag == false /*&& this.keysControllFuncOn == true &&
                        checkMouseMove(100)==true*/) this.mouseHower = false;
            }
            if (mouseLeftClick() && this.mouseHower==true)
            {
                this.selectNow = true;
       
            }   
        }
        //console.log(777);
    }
    this.controllKeyboard=function(up,down,enter)
    {
        this.keysControllFuncOn = true;
        let value = null;
        if (this.numSelectHower==null)
        {        
            if (up==true)
            {
                value = this.numSelectHower = this.listSelect.length - 1;
                this.selectHower = this.listSelect[value];
                this.controllKey = true;
            }
            if (down==true)
            {
                value = this.numSelectHower = 0;
                this.selectHower = this.listSelect[value];
                this.controllKey = true;
            }
        }
        else
        {
            if (up==true)
            {
                //value = this.numSelectHower--;
                this.numSelectHower--;
                value = this.numSelectHower = this.numSelectHower >= 0 ?
                                                this.numSelectHower :
                                                this.listSelect.length-1;
                this.selectHower = this.listSelect[value];
                this.controllKey = true;
            }
            if (down==true)
            {
                this.numSelectHower++;
                value = this.numSelectHower=this.numSelectHower<this.listSelect.length?
                                                this.numSelectHower:
                                                0;
                this.selectHower = this.listSelect[value];
                this.controllKey = true;
            }
            if (enter==true)
            {
                this.selectNow = true;
            }
        }
    }
    this.selectOn=function(callback)
    {
        if (this.selectNow==true)
        {
            this.selectNow = false;
            callback(this.selectHower);
        }
    }
    this.resetSelect=function()
    {
        this.numSelectHower = null;
        this.selectHower = null;
        this.keysControllFuncOn = false;
    }
}
