var buttonCol=['red','blue','green','yellow'];
var gamePat=[], userClick=[];
var level=0;
var start=false;
function nextSequence(){
    level++;
    userClick=[];
    $('h1').text('Level '+level);
    var randomNum=Math.floor(Math.random()*4);
    var randomCol=buttonCol[randomNum];
    gamePat.push(randomCol);
    console.log(randomCol);
    nextSound(randomCol);
    $('#'+randomCol).fadeOut(250).fadeIn(250);
}
$('.btn').click(function(){
    var user=$(this).attr('id');
    userClick.push(user);
    nextSound(user);
    animate(user);
    checkAns(userClick.length-1);
})
function nextSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}
function animate(currentCol){
    $('#'+currentCol).addClass('pressed');
    setTimeout(function(){
        $('.btn').removeClass('pressed');
    }, 150);
}
$(document).on('keypress',function(){
    if(!start){
        nextSequence();
        start=true;
    }
})
function checkAns(currentL){
    if(userClick[currentL]==gamePat[currentL])
        console.log('Success');
    else{
        console.log('Wrong');
        var audio=new Audio('sounds/wrong.mp3');
        audio.play();
        $('h1').text('Game Over, Press Any Key To Restart');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        startOver();
    }
    if(userClick.length==gamePat.length){
         setTimeout(function(){
            nextSequence();
        },1000);
    }
}
function startOver(){
    level=0;
    gamePat=[];
    start=false;
}
