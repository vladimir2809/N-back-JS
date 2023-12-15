screenWidth=800//option[numOption].widthScreenBlock*mapSize;// ширина экрана
screenHeight=600//option[numOption].heightScreenBlock*mapSize;// высота экрана
var windowWidth=document.documentElement.clientWidth;
var windowHeight=document.documentElement.clientHeight;
var windowWidthOld = windowWidth;
var windowHeighOld = windowHeight;
var  canvasWidth= windowWidth;
var  canvasHeight= windowHeight;
var canvasWidthMore = null;
var canvas;
var context;
var time = 0;
var timeOld = new Date().getTime();
var timeNow = new Date().getTime();
var imageSpriteSet = null;
var countLoad = 0;
var numSprite = 0;
var scale = 1.5;
var numBackStep = 22;
var dataImg={
    xSp:0,
    ySp:0,
    spWidth:0,
    spHeight:0,
}
var buttonNo = {
    x:800/2-100-20,//*2,
    y:430,
    width: 100,
    height: 50,
    str:'<= Нет',
    fontSize:25,
    colorText:'red',
    color:'black',
} 
var buttonYes = {
    x:800/2+20,//+100,
    y:430,
    width: 100,
    height: 50,
    str:'ДА =>',
    fontSize:25,
    colorText:'green',
    color:'black',
} 
var distMinusPlus = 30;
var buttonPlus= {
    x:800/2+distMinusPlus,//*2,
    y:530,
    width: 50,
    height: 50,
    str:'+',
    fontSize:25,
    colorText:'white',
    color:'black',
} 
var buttonMinus = {
    x:800/2-50-distMinusPlus,//*2,
    y:530,
    width: 50,
    height: 50,
    str:'-',
    fontSize:25,
    colorText:'white',
    color:'black',
} 
var dataImgArr = [];
window.addEventListener('load', function () {
    preload();
    create();
    setInterval(drawAll,16);
    setInterval(gameLoop,16);
});
window.onresize = function()
{
    updateSize()
    console.log("resize");
}
function updateSize()
{
    windowWidth=document.documentElement.clientWidth;
    windowHeight=document.documentElement.clientHeight;
    let mult =1;
    if (windowWidth>=windowHeight)
    {
        canvasWidth = /*canvas.width = */windowHeight*screenWidth/screenHeight;
        canvasHeight = /*canvas.height = */windowHeight;
        if (canvasWidth>windowWidth)
        {
            mult = windowWidth/canvasWidth;
           // canvas.width =
                canvasWidth *= mult;
            //canvas.height =
                canvasHeight *= mult;
        }
        canvasWidthMore = true;
    }
    else
    {
        canvasWidthMore = false;
        canvasWidth = /*canvas.width*/  windowWidth;
        canvasHeight= /*canvas.height*/  windowWidth*screenHeight/screenWidth;
    }
    
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
    canvas.style.setProperty('left', (window.innerWidth - canvas.width)/2 + 'px'); 
    canvas.style.setProperty('top', (window.innerHeight - canvas.height) / 2 + 'px'); 
    if (canvasWidthMore==true)
    {
        context.scale(windowHeight / screenHeight * mult, windowHeight / screenHeight * mult);   
        mouseMultX = windowHeight / screenHeight * mult;
        mouseMultY = windowHeight / screenHeight * mult;
    }
    else
    {
       context.scale(windowWidth/screenWidth,windowWidth/screenWidth);
       mouseMultX = windowWidth / screenWidth;
       mouseMultY = windowWidth / screenWidth;
    }
    //setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
    //                        (window.innerHeight - canvas.height)/2);
    //camera.width = canvasWidth;
    //camera.height = canvasHeight;
}
function preload()
{
    imageSpriteSet = new Image();
    imageSpriteSet.src = 'img/tailset.png';
    imageSpriteSet.onload = function () {
        countLoad++;
        //imageLoad = true;
        if (countLoad == 1) console.log('image load!');

    }
    imageSpriteSet.onerror = function () {
        alert("во время загрузки произошла ошибка");
        //alert(pair[0].name);
    }
}
function create()
{
    canvas = document.getElementById("canvas");  
    context = canvas.getContext("2d");
    updateSize();
    initKeyboardAndMouse([]);
    initImgFromSpriteset();
}
function drawAll()
{
    context.fillStyle = "rgb(210,210,210)"
    context.fillRect(0, 0, screenWidth, screenHeight);
    drawTextCenterScreen('Появлялась ли эта картинка '+numBackStep+' позиции назад?',50,25,'green')
    //scale = 0.70;
   // for (let i = 0; i < 16; i++)
   // {
        //numSprite = i;
        context.drawImage(imageSpriteSet, dataImgArr[numSprite].xSp, dataImgArr[numSprite].ySp, 
                        dataImgArr[numSprite].spWidth, dataImgArr[numSprite].spHeight,
                      250, 100, dataImgArr[numSprite].spWidth *scale, dataImgArr[numSprite].spHeight*scale);
        //context.drawImage(imageSpriteSet, dataImgArr[numSprite].xSp, dataImgArr[numSprite].ySp, 
        //                dataImgArr[numSprite].spWidth, dataImgArr[numSprite].spHeight,
        //              (i%4)*145+10, Math.floor(i/4)*145+10, dataImgArr[numSprite].spWidth *scale, dataImgArr[numSprite].spHeight*scale);
  //  }

    drawButton(buttonNo);
    drawButton(buttonYes);
    drawTextCenterScreen('Число позиций назад:',600-87,25,'green')
    drawButton(buttonPlus);
    drawButton(buttonMinus);
    drawTextCenterScreen(numBackStep,600-35,25,'green')
    //
}
function drawTextCenterScreen(str,y,fontSize,color)
{
    context.fillStyle = color;
    context.font = fontSize+'px Arial';
    let widthText=context.measureText(str).width;
    let x = screenWidth/2 - widthText / 2;
    context.fillText(str, x, y);
}
function drawButton(obj)
{
    context.fillStyle = obj.color;
    context.fillRect(obj.x, obj.y, obj.width, obj.height);
    context.fillStyle = obj.colorText;
    context.font = obj.fontSize+'px Arial';
    let widthText=context.measureText(obj.str).width;
    let x = obj.width/2 - widthText / 2;
    context.fillText(obj.str, obj.x+x, obj.y+obj.fontSize*1.3);
}
//var buttonNo = {
//    x:100,
//    y:500,
//    width: 100,
//    height: 50,
//    str:'<= Нет',
//    fontSize:25,
//    colorText:'red',
//    color:'black',
//} 
function gameLoop()
{
    timeNow = new Date().getTime();
    time += timeNow - timeOld;
    if (time>100)
    {
        numSprite++;
        numSprite %= 16;
        time = 0;
    }
    timeOld = new Date().getTime();
    
}
function initImgFromSpriteset()
{
    let line = 0;
    let widthSprite = 200;
    for (let i = 0; i < 16;i++)
    {
        let data = clone(dataImg);
        data.xSp = (i % 4) * widthSprite;
        data.ySp = Math.floor(i / 4) * widthSprite;
        data.spWidth = widthSprite;
        data.spHeight = widthSprite;
        dataImgArr.push(data);
    }
    console.log (dataImgArr);
}
