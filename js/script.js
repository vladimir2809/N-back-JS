﻿screenWidth=800//option[numOption].widthScreenBlock*mapSize;// ширина экрана
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
var scoreRecord = 1657;
var multScore = 1;
var countStar = 3;
var timeMenu = null;
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
function updateSize()
{
    windowWidth=document.documentElement.clientWidth;
    windowHeight=document.documentElement.clientHeight;
    let mult = 1;
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
    divYes = document.getElementById('divYes');
    divNo = document.getElementById("divNo");
    canvas = document.getElementById("canvas");  
    context = canvas.getContext("2d");
    updateSize();
    time = new Date().getTime();
    srand(time);
    initKeyboardAndMouse(['ArrowLeft','ArrowRight','Escape']);
    initImgFromSpriteSet();
    timeMenu = new Menu();
    timeMenu.setOption({
        listSelect:['1 минута','3 минуты','5 минут'],
        listFlagOn:[true,true,true],
        header : 'Выберите время',
        width : screenWidth,
        height: screenHeight,
    });
    timeMenu.being = false;
    mainMenu = new Menu();
    mainMenu.setOption({
        listSelect:['Играть',"Продолжить"],
        listFlagOn:[true,false],
        header : 'N-назад',
        width : screenWidth,
        height: screenHeight,
        headerFontSize: 40,
        widthOneItem : 300,
        heightOneItem : 60,
        sizeFontItem :30,
    });
    mainMenu.being = true;
    
    gameMenu = new Menu();
    gameMenu.setOption({
        listSelect:['Продолжить',"Главное меню"],
        listFlagOn:[true,true],
        header:'Пауза',
        width: 300,
        height: 300,
    });
    gameMenu.y = 100;
    gameMenu.yMenu = 200;
    gameMenu.being = false;
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

    drawTextCenterScreen('Число позиций назад:',600-87,25,'green')
    drawButton(buttonPlus);
    drawButton(buttonMinus);
    drawTextCenterScreen(numBackStep, 600 - 35, 25, 'green');
    if (drawResult == 'wrong') drawCross(90, 220);
    if (drawResult == 'correct') drawOk(640, 220);

    timeMenu.draw();
    mainMenu.draw();
    gameMenu.draw();
    if (startGame == true) drawMenuLabel(buttonGameMenu.x ,buttonGameMenu.y,
            buttonGameMenu.width ,buttonGameMenu.height );
    if (endGame == true)  drawScreenResult();
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

    str = 'ошибок: ' + wrong;
    widthText=context.measureText(str).width;
    xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+150);

    context.font = '45px Arial';
    str = 'Очки ' + score + " x " + multScore + ' = ' + score * multScore;
    widthText=context.measureText(str).width;
    xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+230);

    str = 'Старый рекорд = '+scoreRecord;
    widthText=context.measureText(str).width;
    xText = width/2 - widthText / 2;
    context.fillText(str, x+xText, y+305);

    drawButton(buttonRestart);
    drawButton(buttonMainMenu);
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
function saveRecordScore()
{
    localStorage.setItem('NBackRecord', JSON.stringify({ timeGameSave:timeGameRAM,
                                       scoreRecord,scoreRecord }));
}
function loadRecordScore()
{
    let data=localStorage.getItem('NBackRecord');
    //alert(data);
    data = JSON.parse(data);
    let timeSave = 0;
    if (typeof(data.timeGameRam)=='number')
    {
        timeSave=data.timeGameRam;
    }
    if (typeof(data.scoreRecord)=='number')
    {
        scoreRecord=data.scoreRecord;
    }

}
function gameLoop()
{
    timeNow = new Date().getTime();
    time += timeNow - timeOld;
    if (gameMenu.being == false)
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
    if (mainMenu.being == false && timeMenu.being == false )
    {
        if (keyUpDuration('Escape',100))
        {
            gameMenu.being = !gameMenu.being;
        }
    }
    if (startGame==true)
    {
        divYes.style.display = 'block';
        divNo.style.display = 'block';
    }
    else
    {
        //console.log('none');
        divYes.style.display = 'none';
        divNo.style.display = 'none';
    }
    if (startGame == true && timeGame == 0) 
    {
        endGame = true;
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
    }
    if (endGame==true)
    {
        let mouseClick = mouseLeftClick();
        if ((checkInObj(buttonRestart,mouseX,mouseY)&& mouseClick==true))
        {
            resetDataGame();
            startGame = true;
            timeGame = timeGameRAM;
           
        }
    }
    if (mainMenu.being == false && timeMenu.being == false && 
        gameMenu.being == false && endGame==false)
    {

        if (drawResult!=null)
        {
            if (drawImage==false && time>100)
            {
                drawImage = true;
            }
            if (time>500)
            {
                drawResult = null;
                //drawImage = false;
                time = 0;

            }
        }
        //if (drawImage==false && time>100)
        //{
        //    drawImage = true;
        //}
        if (dataArr.length == 0 && startSprite==false) 
        {
            numSprite = randomInteger(0, 8);
            startSprite = true;

        }
  
        let mouseClick = mouseLeftClick();
        let len = dataArr.length;
        if (mouseClick==true)
        {
            //alert('click');
            if (checkInObj(buttonPlus,mouseX,mouseY))
            {
                if (numBackStep<10)numBackStep++;
            }
            if (checkInObj(buttonMinus,mouseX,mouseY))
            {
                if (numBackStep>1)numBackStep--;
            }
        }  
        if (drawImage==true)
        {
            if ((checkInObj(buttonYes,mouseX,mouseY)&& mouseClick==true) || keyUpDuration('ArrowRight',200) ||
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
    
            if ((checkInObj(buttonNo,mouseX,mouseY) && mouseClick==true) || keyUpDuration('ArrowLeft',200) ||
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
        if ((checkInObj(buttonGameMenu,mouseX,mouseY) && mouseClick==true))
        {
            gameMenu.being = true;
        }
    }
    gameMenu.update();
    timeMenu.update();
    mainMenu.update();
    if (mainMenu.being==true)
    {
        mainMenu.selectOn(function(select) {
            console.log(select);
            if (select == 'Играть') 
            {
                mainMenu.being = false;
                timeMenu.being = true;
            }
        });
    }
    if (timeMenu.being==true)
    {
        timeMenu.selectOn(function(select) {
            console.log(select);
            if (select == '1 минута') 
            {
                timeMenu.being = false;
                timeGameRAM = timeGame = 1000 * 60;
                startGame=true;
            
            }
            if (select == '3 минуты') 
            {
                timeMenu.being = false;
                timeGameRAM = timeGame = 1000 * 60 * 3;
                startGame=true;
            
            }
            if (select == '5 минут') 
            {
                timeMenu.being = false;
                timeGameRAM = timeGame = 1000 * 60 * 5;
                startGame=true;
            
            }
        });
    }
    if (gameMenu.being==true)
    {
        gameMenu.selectOn(function (select) {
            if (select == 'Продолжить') {
                gameMenu.being = false;
            }
            if (select == 'Главное меню') {
                gameMenu.being = false;
                mainMenu.being = true;
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
}
function addScore()
{
    score += 10 * Math.pow(2, numBackStep-1);
}
function minusScore()
{
    score -= 10 * Math.pow(2, numBackStep-1)*3;
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
