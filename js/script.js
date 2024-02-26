const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
let detect = new MobileDetect(/*window.*/navigator.userAgent)
//alert("Mobile: " + detect.mobile()       // телефон или планшет
//       + " Phone: " + detect.phone()         // телефон
//        +" Tablet: " + detect.tablet()       // планшет
//        +" OS: " + detect.os()               // операционная система 
//        +" userAgent: " + detect.userAgent()); // userAgent
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
var divYes;
var divNo;
var context;
var time = 0;
var timeOld = new Date().getTime();
var timeNow = new Date().getTime();
var imageSpriteSet = null;
var imageStar = null;
var countLoad = 0;
var numSprite = 0;
var startSprite = false;
var startGame = false;
var endGame = false;
var scale = 1.5;
var numBackStep = 2;
var dataArr = [];
var correct = 0;
var wrong = 0;
var drawResult = null;
var drawImage = true;
var sideClick = false;
var timeGame = 1000 * 60 * 5;
var timeGameRAM = 0;
var score = 0;
var scoreRecord = 10;
var scoreTotal = 0;
var multScore = 1;
var countStar = 3;
var timeMenu = null;
var controllKeyWinResult = false;
var flagLoadAutoSave = false;
var dataImg={
    xSp:0,
    ySp:0,
    spWidth:0,
    spHeight:0,
}
var yYesNo = 400;
var deltaXYesNo = 20;
var buttonNo = {
    x:800/2-130-deltaXYesNo,//-20,//*2,
    y:yYesNo,
    width: 130,
    height: 150,
    str:'<= Нет',
    
    fontSize:35,
    colorText:'red',
    color:'black',
} 
var buttonYes = {
    x:800/2+deltaXYesNo,//+20,//+100,
    y:yYesNo,
    width: 130,
    height: 150,
    str:'ДА =>',
    fontSize:35,
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
var buttonGameMenu = {
    x:1,
    y:1,
    width:40,
    height:40,
}
var buttonRestart = {

    being:false,

    x:50,
    y:450,
    width:200,
    height:50,

    str:'Рестарт',
    fontSize:25,
    colorText:'white',
    hower: false,
    colorHower: 'yellow',
    color:'red',

}
var buttonMainMenu = {

    being:false,

    x:550,
    y:450,
    width:200,
    height:50,

    str:'Главное меню',
    fontSize:25,
    colorText:'white',
    hower: false,
    colorHower: 'yellow',
    color:'red',

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
window.addEventListener("orientationchange", function () {
     //screen.orientation.lock( 'landscape' )
    setTimeout(updateSize, 1000);
    setTimeout(updateSize, 2500);
   // window.orientation = 90;
    //alert("The orientation of the screen is: " + window.orientation);
});
function drawWidthHeight()
{
    context.font = 25 + 'px Arial';
    context.fillStyle = 'red';
    //let str = 'Не верно ' + wrong;
    ///widthText=context.measureText(str).width;
    let startY = 120;
    let stepY = 30;
    context.fillText("winWidth: "+window.innerWidth/*windowWidth*/, 56/*120-widthText/2*/, startY);
    context.fillText("winHeight: "+window.innerHeight/*windowHeight*/, 56/*120-widthText/2*/, startY+stepY);
    context.fillText("canvasWidth: "+canvasWidth, 56/*120-widthText/2*/, startY+stepY*2);
    context.fillText("canvasHeight: "+canvasHeight, 56/*120-widthText/2*/, startY+stepY*3);

    const rect = canvas.getBoundingClientRect()

    context.fillText("canvasX: "+rect.x, 356/*120-widthText/2*/, startY);
    context.fillText("canvasY: "+rect.y, 356/*120-widthText/2*/, startY+stepY);
    
    context.fillText("screenWidth: "+screenWidth, 356/*120-widthText/2*/, startY+stepY*2);
    context.fillText("screenHeight: "+screenHeight, 356/*120-widthText/2*/, startY+stepY*3);
    //context.fillText("canvasWidth: "+canvasWidth, 56/*120-widthText/2*/, startY+stepY*2);

}
function updateSize()
{
    windowWidth=window.innerWidth//document.documentElement.clientWidth;
    windowHeight=window.innerHeight//document.documentElement.clientHeight;
    divYes.style.display = 'none';
    divNo.style.display = 'none';
    let mult = 1;
    if (windowWidth>windowHeight)
    {
        canvasWidth = /*canvas.width = */windowHeight*screenWidth/screenHeight;
        canvasHeight = /*canvas.height = */windowHeight;
        if (canvasWidth>=windowWidth)
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
        //if (canvasHeight>=windowHeight)
        //{
        //    mult = windowHeight/canvasHeight ;
        //   // canvas.width =
        //        canvasWidth *= mult;
        //    //canvas.height =
        //        canvasHeight *= mult;
        //}
    }
    
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
    if (canvasWidthMore==false)
    {
        canvas.style.setProperty('left', '0px'); 
    }
    else
    {
        canvas.style.setProperty('left', (window.innerWidth - canvasWidth/*canvas.width*/)/2 + 'px'); 
    }

    canvas.style.setProperty('top', (window.innerHeight - canvasHeight/*canvas.height*/) / 2 + 'px'); 
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
    updateYesNo(mult);
    //setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
    //                        (window.innerHeight - canvas.height)/2);
    //camera.width = canvasWidth;
    //camera.height = canvasHeight;
}
function updateYesNo(mult)
{
    let canvasPos = canvas.getBoundingClientRect();
    //let yesPos= divYes.getBoundingClientRect()
    let summWidth = (canvas.offsetWidth + 10 * 2 + 100*2+20)*mult;
    //let valueTop = windowHeight / 2 - divYes.offsetWidth/2+'px';
    //let valueLeft= canvasPos.left+canvas.offsetWidth + 10+'px'
    //divYes.style.top = valueTop;
    //divYes.style.left = valueLeft;

    //valueTop = windowHeight / 2 - divNo.offsetWidth/2+'px';
    //valueLeft= canvasPos.left -divNo.offsetWidth- 10+'px'
    //divNo.style.top = valueTop;
    //divNo.style.left = valueLeft;

    if (summWidth>=windowWidth || windowHeight<100)
    {
        divYes.style.display = 'none';
        divNo.style.display = 'none';
        sideClick = false;
    }
    else
    {
        if (startGame==true)
        {
            divYes.style.display = 'block';
            divNo.style.display = 'block';
            valueTop = windowHeight / 2 - divYes.offsetWidth/2+'px';
            valueLeft= canvasPos.left+canvas.offsetWidth + 10+'px'
            divYes.style.top = valueTop;
            divYes.style.left = valueLeft;

            valueTop = windowHeight / 2 - divNo.offsetWidth/2+'px';
            valueLeft= canvasPos.left -divNo.offsetWidth- 10+'px'
            divNo.style.top = valueTop;
            divNo.style.left = valueLeft;
        }
        sideClick = true;
    }
    console.log(windowWidth, summWidth);
    //console.log("yes "+divYes.offsetWidth ,"no "+ divNo.offsetWidth);
}
function preload()
{
    imageSpriteSet = new Image();
    imageSpriteSet.src = 'img/tailset.png';
    imageStar = new Image();
    imageStar.src = 'img/star.png';
    imageSpriteSet.onload = function () {
        countLoad++;
        //imageLoad = true;
        if (countLoad == 1) console.log('image tailSet load!');

    }
    imageStar.onload = function () {
        countLoad++;
        if (countLoad == 2) console.log('image star load!');
    }
    imageSpriteSet.onerror = function () {
        alert("во время загрузки произошла ошибка");
        //alert(pair[0].name);
    }
    imageStar.onerror = function () {
        alert("во время загрузки произошла ошибка");
        //alert(pair[0].name);
    }
}
function create()
{
    
    //window.screen.lockOrientation('portrait');
    //window.screen.lockOrientation("landscape");
/*    screen.orientation.lock( 'landscape' )*/ 
    //alert(isMobile+' 25'+' '+navigator.userAgent);
    divYes = document.getElementById('divYes');
    divNo = document.getElementById("divNo");
    canvas = document.getElementById("canvas");  
    context = canvas.getContext("2d");
    updateSize();
    
    time = new Date().getTime();
    srand(time);
    initKeyboardAndMouse(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Escape','Enter','KeyS']);
    initImgFromSpriteSet();
    let multSizeMenu = 1.7;
    timeMenu = new Menu();
    timeMenu.setOption({
        listSelect:['1 минута','3 минуты','5 минут'],
        listFlagOn:[true,true,true],
        header : 'Выберите время',
        width : screenWidth,
        height: screenHeight,
    });
    timeMenu.being = false;
    timeMenu.widthOneItem *= multSizeMenu;
    timeMenu.heightOneItem *= multSizeMenu;
    timeMenu.sizeFontItem *= multSizeMenu;
    timeMenu.dist *= multSizeMenu;
    timeMenu.headerFontSize *= multSizeMenu;
    timeMenu.updateProp();
   
    mainMenu = new Menu();
    mainMenu.setOption({
        listSelect:['Играть',/*"Продолжить"*/],
        listFlagOn:[true,/*false*/],
        header : 'N-назад',
        width : screenWidth,
        height: screenHeight,
        headerFontSize: 40,
        widthOneItem : 300,
        heightOneItem : 60,
        sizeFontItem :30,
    });
    mainMenu.widthOneItem *= multSizeMenu;
    mainMenu.heightOneItem *= multSizeMenu;  
    mainMenu.sizeFontItem *= multSizeMenu;
    mainMenu.dist *= multSizeMenu;
    mainMenu.headerFontSize *= multSizeMenu;
    mainMenu.updateProp();

    if (checkAutoSave()==true)
    {
        loadAutoSave();
        flagLoadAutoSave = true;
        startSprite = true;
        startGame = true;
        updateSize();
    }
    else
    {
        mainMenu.being = true;
    }
 
    
    gameMenu = new Menu();
    gameMenu.setOption({
        listSelect:['Продолжить',"Главное меню"],
        listFlagOn:[true,true],
        header:'Пауза',
        width: 300,
        height: 300,
    });
    gameMenu.heightOneItem *= multSizeMenu*0.7;  
    gameMenu.widthOneItem *= multSizeMenu*0.7;
    gameMenu.sizeFontItem *= multSizeMenu*0.7;
    gameMenu.dist *= multSizeMenu*0.7;
    gameMenu.headerFontSize *= multSizeMenu;
    gameMenu.updateProp();
    gameMenu.y = 100;
    gameMenu.yMenu = 200;
    gameMenu.being = false;

    

    NMenu = new Menu();

    NMenu.setOption({
        listSelect:['N=1',"N=2","N=3","N=4","N=5","N=6","N=7"],
        listFlagOn:[true,true,true,true,true,true,true],
        header:'Выберите N',
        width : screenWidth,
        height: screenHeight,
    });
   NMenu.widthOneItem *= multSizeMenu*0.7;
   NMenu.heightOneItem *= multSizeMenu*0.7; 
   NMenu.sizeFontItem *= multSizeMenu*0.7;
   NMenu.dist *= multSizeMenu*0.7;
   NMenu.headerFontSize *= multSizeMenu*0.7;
   NMenu.updateProp();
  
}
function drawAll()
{
    context.fillStyle = "rgb(210,210,21)"
    context.fillRect(0, 0, screenWidth, screenHeight);
    
    drawTextCenterScreen('Появлялась ли эта картинка '+numBackStep+" "+strPosition(numBackStep)+' назад?',50,25,'green')
    //scale = 0.70;
   // for (let i = 0; i < 16; i++)
    if (drawImage==true)
    {
        //numSprite = i;
        context.drawImage(imageSpriteSet, dataImgArr[numSprite].xSp, dataImgArr[numSprite].ySp, 
                        dataImgArr[numSprite].spWidth, dataImgArr[numSprite].spHeight,
                      250, 100, dataImgArr[numSprite].spWidth *scale, dataImgArr[numSprite].spHeight*scale);
        //context.drawImage(imageSpriteSet, dataImgArr[numSprite].xSp, dataImgArr[numSprite].ySp, 
        //                dataImgArr[numSprite].spWidth, dataImgArr[numSprite].spHeight,
        //              (i%4)*145+10, Math.floor(i/4)*145+10, dataImgArr[numSprite].spWidth *scale, dataImgArr[numSprite].spHeight*scale);
    }
    else
    {
        //context.fillStyle = 'black';
       // context.fillRect(250,100,dataImgArr[numSprite].spWidth *scale, dataImgArr[numSprite].spHeight*scale)
    }
    context.font = 25 + 'px Arial';
    context.fillStyle = 'red';
    let str = 'Не верно ' + wrong;
    widthText=context.measureText(str).width;
    context.fillText(str, 56/*120-widthText/2*/, 120);
   // context.fillText('mouseX '+Math.floor(mouseX)+' mouseY '+Math.floor(mouseY),10,30);
    context.fillStyle = 'green';
    
    str = 'Верно ' + correct;
    widthText=context.measureText(str).width;
    context.fillText(str, 665-widthText/2, 120);

    //context.fillText('Верно '+correct, 620, 120);

    context.fillStyle = 'blue';
    let second = Math.floor((timeGame / 1000) % (60));
    second = second >= 10 ? second : '0' + second;
    context.fillText('Время '+Math.floor(timeGame/(1000*60))+':'+second, 56, 170);

    str = 'Очки: '+score;
    widthText=context.measureText(str).width;
    context.fillText(str, 665-widthText/2, 170);


    drawButton(buttonNo);
    drawButton(buttonYes);

    //drawTextCenterScreen('Число позиций назад:',600-87,25,'green')
    ////drawButton(buttonPlus);
    ////drawButton(buttonMinus);
    //drawTextCenterScreen(numBackStep, 600 - 35, 25, 'green');
    if (drawResult == 'wrong') drawCross(90, 220);
    if (drawResult == 'correct') drawOk(640, 220);

    timeMenu.draw();
    mainMenu.draw();
    gameMenu.draw();
    NMenu.draw();
    if (startGame == true) drawMenuLabel(buttonGameMenu.x ,buttonGameMenu.y,
                                         buttonGameMenu.width ,buttonGameMenu.height );
    if (endGame == true)  drawScreenResult();


    //drawWidthHeight();
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
function drawButton(obj,hower=false)
{
    context.fillStyle = obj.color;
    context.fillRect(obj.x, obj.y, obj.width, obj.height);
    if (hower==true)
    {
        context.strokeStyle = obj.colorHower;
        context.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    context.fillStyle = obj.colorText;
    
    context.font = obj.fontSize+'px Arial';
    let widthText=context.measureText(obj.str).width;
    let x = obj.width/2 - widthText / 2;
    context.fillText(obj.str, obj.x+x, obj.y+obj.height/2+obj.fontSize/3/*+obj.fontSize*1.3*/);
   // this.heightOneItem/2+sizeFont/3
}
function drawCross(x,y)
{
    width = 70;
    context.save();
    context.strokeStyle = 'red';
    context.lineWidth = 5;

    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+width,y+width);
    context.stroke();

    context.beginPath();
    context.moveTo(x,y+width);
    context.lineTo(x+width,y);
    context.stroke();

    context.restore();
}
function drawOk(x,y)
{
    width = 70;
    context.save();
    context.strokeStyle = 'green';
    context.lineWidth = 5;

    context.beginPath();
    context.moveTo(x,y+width/2);
    context.lineTo(x,y+width);
    context.stroke();

    context.beginPath();
    context.moveTo(x,y+width);
    context.lineTo(x+width,y);
    context.stroke();

    context.restore();
}
function drawMenuLabel(x,y,width,height)
{
    //let width = 40;
    //let height = 40;
    context.strokeStyle = 'rgb(255,0,0)';
    context.strokeRect(x, y, width, height);
    for (let i = 0; i < 3; i++)
    {
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(x + 10, y + (i + 1) * (height / (3 + 1)));
        context.lineTo(x + width - 10, y + (i + 1) * (height / (3 + 1)));
        context.stroke();
    }
}
function drawScreenResult()
{
   
    let width = 700;
    let height = 400; 
    let x = screenWidth/2-width/2;
    let y = screenHeight/2-height/2;
    let scale = 3;
    let sizeStar = 40;
    //countStar = 3;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(x, y, width, height);
    for (let i = 0; i < countStar;i++)
    {
        context.save();
        //context.scale(scale,scale);
        widthStars = sizeStar * (countStar);
        context.drawImage(imageStar,x+(width)/(2.0)-widthStars/2+i*sizeStar,y);
        context.restore();
    }
    context.fillStyle = 'white';

    context.font = '35px Arial';
    let str = 'Всего ходов: ' +(wrong+correct);
    let widthText=context.measureText(str).width;
    let xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+100);

    str = 'Ошибок: ' + wrong;
    widthText=context.measureText(str).width;
    xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+150);
    let startY = 215;
    let stepY = 55;
    context.font = '45px Arial';
    str = 'Очки ' + score + " x " + multScore + ' = ' + scoreTotal;
    widthText=context.measureText(str).width;
    xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+startY/*230*/);

    str = 'Старый рекорд = '+scoreRecord;
    widthText=context.measureText(str).width;
    xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+startY+stepY/*305*/);

    if (scoreTotal>scoreRecord)
    {
        context.fillStyle = 'rgb(64,255,0)';
        str = 'Новый рекорд = '+scoreTotal;
        widthText=context.measureText(str).width;
        xText = width/2 - widthText / 2;
        context.fillText(str, x+xText, y+startY+stepY*2);
    }
    drawButton(buttonRestart,buttonRestart.hower);
    drawButton(buttonMainMenu,buttonMainMenu.hower);
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

/////////////////////////////////////////////
//  АВТОСОХРАНЕНИЕ 
/////////////////////////////////////////////
function removeAutoSave()
{
     localStorage.removeItem('NBackAutoSave');
}
function checkAutoSave()
{
    if (localStorage.getItem('NBackAutoSave')!=null && 
        localStorage.getItem('NBackAutoSave')!=undefined)
    {
        return true;
    }
    return false;
}
function saveAutoSave()
{
    let data = { dataArr: dataArr, numSprite:numSprite, timeGame: timeGame,
                        timeGameRAM: timeGameRAM, numBackStep: numBackStep };
    localStorage.setItem('NBackAutoSave', JSON.stringify(data));
    console.log(data);
}
function loadAutoSave()
{
    if (checkAutoSave()==true)
    {
        let data=localStorage.getItem('NBackAutoSave');
        data=JSON.parse(data)
        if (typeof(data.dataArr)=='array')
        {
            dataArr=data.dataArr;
        }
        if (typeof(data.numSprite)=='number')
        {
            numSprite=data.numSprite;
        }
        if (typeof(data.timeGameRAM)=='number')
        {
            timeGameRAM=data.timeGameRAM;
        }
        if (typeof(data.timeGame)=='number')
        {
            timeGame=data.timeGame;
        }
        if (typeof(data.numBackStep)=='number')
        {
            numBackStep=data.numBackStep;
        }
    }
}

/////////////////////////////////////////////
//  СОХРАНЕНИЕ РЕКОРДА ОЧОКОВ
/////////////////////////////////////////////
function removeRecordScore()
{
    localStorage.removeItem('NBackRecord');
}
function checkRecordScore()
{
    if (localStorage.getItem('NBackRecord')!=null && 
        localStorage.getItem('NBackRecord')!=undefined)
    {
        return true;
    }
    return false;
}
function saveRecordScore(timeGame, score)
{
    let data = [];
    if (checkRecordScore()==true)
    {
        data=localStorage.getItem('NBackRecord');
        //alert(data);
        data = JSON.parse(data);
    }
    let flag = false;
    for (let i = 0; i < data.length;i++)
    {
        if (data[i].timeGameSave==timeGame /*&& scoreRecord<score*/)
        {
            if (scoreRecord<score)
            {
                data[i]={ timeGameSave:timeGame, scoreRecord:score}
            }
            flag = true;
        }
        //if (data[i].timeGameSave==timeGame)
        //{
            
        //}
    }
    if (flag==false)
    {
        data.push({timeGameSave: timeGame, scoreRecord: score});
    }
    localStorage.setItem('NBackRecord', JSON.stringify(data));
}
function loadRecordScore(timeGame)
{
    if (checkRecordScore()==true)
    {

    
        let data=localStorage.getItem('NBackRecord');
        //alert(data);
        data = JSON.parse(data);
        //let timeSave = 0;
        console.log(data);
        for (let i = 0; i < data.length;i++)
        {

            if (data[i].timeGameSave==timeGame)
            {
                //if (typeof(data[i].timeGameRam)=='number')
                //{
                //    timeSave=data[i].timeGameRam;
                //}
                if (typeof(data[i].scoreRecord)=='number')
                {
                    scoreRecord=data[i].scoreRecord;
                }
            }
        }
    }
}

function gameLoop()
{
    timeNow = new Date().getTime();
    time += timeNow - timeOld;
    if (mainMenu.being == false && timeMenu.being == false &&
        NMenu.being == false && gameMenu.being == false)
    {
        if (timeGame - (timeNow - timeOld) > 0) timeGame -= (timeNow - timeOld); else timeGame = 0;
    }
    
   
    //wrong++;
    //if (time>100)
    //{
    //    numSprite++;
    //    numSprite %= 16;
    //    time = 0;
    //}
    timeOld = new Date().getTime();
    if (mainMenu.being == false && timeMenu.being == false  && NMenu.being == false)
    {
        if (keyUpDuration('Escape',100))
        {
            gameMenu.being = !gameMenu.being;
        }
        if (keyUpDuration('KeyS',100))
        {
           // loadAutoSave()
            //window.resizeTo(300,300);
            //window.outerWidth = 300;
        }
    }
    if (startGame==false)
    {
        divYes.style.display = 'none';
        divNo.style.display = 'none'
        
    }
    else
    {
        //divYes.style.display = 'block';
        //divNo.style.display = 'block';
        //console.log('none');
        ;
    }
    if (startGame == true && timeGame == 0) 
    {
        endGame = true;
        console.log ('OPEN')
        if (wrong<=(wrong+correct)*0.05)
        {
            countStar = 3;
            multScore = 2;
        }
        else if (wrong>(wrong+correct)*0.05 && wrong<=(wrong+correct)*0.15)
        {
            countStar = 2;
            multScore = 1.5;
        }
        else
        {
            countStar = 1;
            multScore = 1;
        } 
        scoreTotal = score * multScore;
        saveRecordScore(timeGameRAM, scoreTotal);
        removeAutoSave();
    }
    if (endGame==true)
    {
        let mouseClick = mouseLeftClick();
        if (checkInObj(buttonRestart,mouseX,mouseY) || buttonRestart.hower == true)
        {
            if (checkMouseMove(100))
            {
                buttonRestart.hower = true;
                buttonMainMenu.hower = false;
            }
            if ( (mouseClick==true && checkInObj(buttonRestart,mouseX,mouseY) )||
                keyUpDuration('Enter',50))
            {    
                resetDataGame();
                loadRecordScore(timeGameRAM);
                startGame = true;
                timeGame = timeGameRAM;

            }
           
        }
        else
        {
            if (controllKeyWinResult == false) buttonRestart.hower = false;
        }
        if (checkInObj(buttonMainMenu,mouseX,mouseY) || buttonMainMenu.hower == true)
        {
            if (checkMouseMove(100))
            {
                buttonMainMenu.hower = true;
                buttonRestart.hower = false;
            }
            if ( ( mouseClick==true && checkInObj(buttonMainMenu,mouseX,mouseY)) ||
                 keyUpDuration('Enter',50))
            { 
                resetDataGame();
                mainMenu.being = true;
            }
        }
        else
        {   
            if (controllKeyWinResult == false)  buttonMainMenu.hower = false;
        }
        if ( (keyUpDuration('ArrowLeft',50) || keyUpDuration('ArrowRight',50)))
        {
            controllKeyWinResult = true;
            buttonMainMenu.hower = !buttonMainMenu.hower;
            buttonRestart.hower = !buttonMainMenu.hower ;
        }
        //if (keyUpDuration('ArrowEnter',50))
        //{
        //    if (buttonMainMenu.hower == true)
        //}
    }
    if (mainMenu.being == false && timeMenu.being == false && 
        gameMenu.being == false && NMenu.being == false &&
        endGame==false)
    {

        //if (drawResult!=null)
        //{
        //    if (drawImage==false && time>100)
        //    {
        //        drawImage = true;
        //    }
        //    if (time>500)
        //    {
        //        drawResult = null;
        //        //drawImage = false;
        //        time = 0;

        //    }
        //}
        //if (drawImage==false && time>100)
        //{
        //    drawImage = true;
        //}
        if (dataArr.length == 0 && startSprite==false) 
        {
            numSprite = randomInteger(0, 8);
            startSprite = true;
            //if (flagLoadAutoSave == false) 
            {saveAutoSave(); console.log('sosiska')}

        }
  
        let mouseClick = mouseLeftClick();
        let len = dataArr.length;
        //if (mouseClick==true)
        //{
        //    //alert('click');
        //    if (checkInObj(buttonPlus,mouseX,mouseY))
        //    {
        //        if (numBackStep<10)numBackStep++;
        //    }
        //    if (checkInObj(buttonMinus,mouseX,mouseY))
        //    {
        //        if (numBackStep>1)numBackStep--;
        //    }
        //}  
        if (drawImage==true)
        {
            if ((checkInObj(buttonYes,mouseX,mouseY)&& mouseClick==true) || keyUpDuration('ArrowRight',50) ||
                (mouseX>screenWidth && mouseClick==true && sideClick==true))
            {
            
                if (len>numBackStep && dataArr[len-numBackStep]==numSprite)
                {
                    drawResult = 'correct';
                    correct++;
                    addScore()
              
                }
                else
                {
                    drawResult = 'wrong';
                    wrong++;
                    minusScore();
                }
                updateData()
            }
    
            if ((checkInObj(buttonNo,mouseX,mouseY) && mouseClick==true) || keyUpDuration('ArrowLeft',50) ||
                (mouseX<0 && mouseClick==true && sideClick==true))
            {
            
                if (len>numBackStep && dataArr[len-numBackStep]==numSprite)
                {
                    drawResult = 'wrong';
                    wrong++;
                    minusScore();
                
                }
                else
                {
                    drawResult = 'correct';
                    correct++;
                    addScore();
              
                }
                updateData();
            }
        }  
        if (drawImage==false && time>100)
        {
            drawImage = true;
        }
        if (drawResult!=null)
        {
       
            if (time>500)
            {
                drawResult = null;
                //drawImage = false;
                time = 0;

            }
        }
        if ((checkInObj(buttonGameMenu,mouseX,mouseY) && mouseClick==true))
        {
            gameMenu.being = true;
        }
    }
    gameMenu.update();
    timeMenu.update();
   // timeMenu.controllKeyboard();
    NMenu.update();
    mainMenu.update();
    if (mainMenu.being==true)
    {
        //checkMouseMove(1500);
        mainMenu.controllKeyboard(keyUpDuration('ArrowUp',50),keyUpDuration('ArrowDown',50),keyUpDuration('Enter',50));
        mainMenu.selectOn(function(select) {
            console.log(select);
            if (select == 'Играть') 
            {
            //    mainMenu.being = false;
            //    mainMenu.resetSelect();
            //    timeMenu.being = true;
                mainMenu.menuOff();
                timeMenu.menuOn();
                
            }
        });
    }
    if (timeMenu.being==true)
    {
        timeMenu.controllKeyboard(keyUpDuration('ArrowUp',50),keyUpDuration('ArrowDown',50),keyUpDuration('Enter',50));
        timeMenu.selectOn(function(select) {
            console.log(select);
         
           
            if (select == '1 минута') 
            {
              ;
                timeGameRAM = timeGame = 1000 * 10//60;
            
            
            }
            if (select == '3 минуты') 
            {
              
                timeGameRAM = timeGame = 1000 * 60 * 3;
               
            
            }
            if (select == '5 минут') 
            {
                
                timeGameRAM = timeGame = 1000 * 60 * 5;
                
            
            }
            if (select == '1 минута' || select == '3 минуты' || select == '5 минут'  )
            {
                //timeMenu.being = false;
                //timeMenu.resetSelect();
                //NMenu.being = true;

                timeMenu.menuOff();
                NMenu.menuOn();

                //loadRecordScore(timeGameRAM);
                //startGame=true;
                //if (sideClick==true)
                //{
                //    divYes.style.display = 'block';
                //    divNo.style.display = 'block';
                //    updateYesNo();
                //}
            }
        });
    }
    if (NMenu.being==true)
    {
        NMenu.controllKeyboard(keyUpDuration('ArrowUp',50),keyUpDuration('ArrowDown',50),keyUpDuration('Enter',50));
        NMenu.selectOn(function (select) {
            console.log(select);
            if (select!=null)
            {
                //NMenu.being = false;
                //NMenu.resetSelect();
                NMenu.menuOff();
                loadRecordScore(timeGameRAM);
                startGame=true;
                let N = null;
                N = select.split('=')[1];
                numBackStep = N;
                if (sideClick==true)
                {
                    divYes.style.display = 'block';
                    divNo.style.display = 'block';
                    updateYesNo();
                }
            }
        });
    }
    if (gameMenu.being==true)
    {
        gameMenu.controllKeyboard(keyUpDuration('ArrowUp',50),keyUpDuration('ArrowDown',50),keyUpDuration('Enter',50));
        gameMenu.selectOn(function (select) {
            if (select == 'Продолжить') {
                gameMenu.menuOff();
            }
            if (select == 'Главное меню') {
                //gameMenu.being = false;
                //gameMenu.resetSelect();

                //mainMenu.being = true;

                gameMenu.menuOff();
                mainMenu.menuOn();
                resetDataGame();
                //timeGame = 0;
                //dataArr = [];
               
                //startSprite = false;
                //startGame = false;
                //endGame = false;
                //correct = 0;
                //wrong = 0;
                //score = 0;
                
            }
        });

    }
    //if ((checkInObj(buttonYes,mouseX,mouseY) && mouseClick==true) ||
    //    ( checkInObj(buttonNo,mouseX,mouseY) && mouseClick==true) ||
    //    keyUpDuration('ArrowLeft',200)||
    //    keyUpDuration('ArrowRight',200)

    //    )

    //{
    //    dataArr.push(numSprite);
    //    let rand = randomInteger(0, 100);
    //    if (len<=numBackStep)
    //    {
    //        numSprite = randomInteger(0, 8);
    //    }
    //    else
    //    {
    //        if(rand>50)
    //        {
    //            numSprite= dataArr[len+1-numBackStep];
    //        }
    //        else
    //        {
    //            numSprite = randomInteger(0, 8);
    //        }
    //    }
    //    time = 0;
    //}
    
}
function resetDataGame()
{
    timeGame = 0;
    dataArr = [];
    startSprite = false;
    startGame = false;
    endGame = false;
    correct = 0;
    wrong = 0;
    score = 0;
    controllKeyWinResult = false;
    buttonRestart.hower = false;
    buttonMainMenu.hower = false;
}
function addScore()
{
    //score += 10 * Math.pow(2, numBackStep-1);
    score += 10 *  numBackStep;

}
function minusScore()
{
    //score -= 10 * Math.pow(2, numBackStep-1)*3;
    score -= 10 * numBackStep * 3;
    score = score >= 0 ? score : 0;
}
function updateData()
{
    dataArr.push(numSprite);
    let len = dataArr.length;
    let rand = randomInteger(0, 100);
    if (len<=numBackStep)
    {
        numSprite = randomInteger(0, 8);
    }
    else
    {
        if(rand>50)
        {
            numSprite= dataArr[len-numBackStep];
        }
        else
        {
            numSprite = randomInteger(0, 8);
        }
    }
    time = 0;
    drawImage = false;
    if (dataArr.length > 10) dataArr.shift();
    saveAutoSave();
}
function strPosition(value)
{
    if (value == 1) return 'позицию';
    if (value > 1 && value < 5) return 'позиции';
    if (value >=5) return 'позиций';
}
function initImgFromSpriteSet()
{
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
