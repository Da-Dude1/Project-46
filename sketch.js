var Level1=1;
var level2=2
var END=0 ;
var gameState=Level1;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var tubeGroup,tube2Group


var score=0;
var gameOver, restart, gameOverImg,restartImg,tube ; 


function preload(){
 restartImg=loadImage("restart.png")
 gameOverImg=loadImage("gameOver.png")
 marioImg=loadAnimation("mario1_png.png","mario2_png.png")
 backimg=loadImage("backg.jpg")

}
function setup() {
  createCanvas(displayWidth, displayHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("hi",marioImg);
  trex.setCollider("rectangle",0,0,210,210)

 
  
  


  
  
  gameOver=createSprite(width/2,height/2)
  gameOver.addImage(gameOverImg)

  gameOver.visible=false 
  
  restart=createSprite(width/2,height/2-100)
  restart.addImage(restartImg)
  restart.scale=1.5;
  restart.visible=false 
  
  invisibleGround = createSprite(width/2,height/1.17,width,10);
  invisibleGround.visible = true;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  tubeGroup= new Group()
  tube2Group = new Group()
  coinGroup=new Group()
  score = 0;
}

function draw() {
  background(backimg);
  textSize(25)
  text("Score: "+ score, width/1.1,height/10);
  text(mouseX+ " , " +mouseY, mouseX, mouseY)
  console.log(gameState)
  
  if(gameState===Level1){
    score = score + Math.round(getFrameRate()/60);
  //score =200
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8

   
    
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    coins()
    if(obstaclesGroup.isTouching(trex)){
      gameState=END
    }
    if (coinGroup.isTouching(trex)) {
      score=score+20
      coinGroup.destroyEach()
    }

    if (score >= 200) {
      gameState=level2
    }
  }

  else if (gameState === level2){
    score = score + Math.round(getFrameRate()/60);
    cloudsGroup.setLifetimeEach(0)
    obstaclesGroup.setLifetimeEach(0)
    coinGroup.setLifetimeEach(0)
   // trex.addImage("flappy bird.png",flappybirdImg)
  if(keyDown("space")) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
          
    tubes2()
    tubes()
    if (trex.y>= displayHeight+20) {
     gameState=END
   }      
    if (tube2Group.isTouching(trex)) {
      gameState=END
    }
    if (tubeGroup.isTouching(trex)) {
      gameState=END
    }
  }
    
 
  else if(gameState===END){
    gameOver.visible=true 
    restart.visible=true 
    
    trex.velocityY=0;
   
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    
    trex.changeAnimation("colided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
    if(mousePressedOver(restart)){
      reset()
    }
  }
 
  
 
  drawSprites();
}
function reset(){
  gameState = Level1;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var cloud = createSprite(width,height/5,200,100);
    cloud.y = Math.round(random(80,200));
   // cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(width,height/1.23,100,200);
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
   // var rand = Math.round(random(1,6));
   // switch(rand) {
   //   case 1: obstacle.addImage(obstacle1);
   //           break;
   //   case 2: obstacle.addImage(obstacle2);
   //           break;
   //   case 3: obstacle.addImage(obstacle3);
   //           break;
   //   case 4: obstacle.addImage(obstacle4);
  //          break;
  //    case 5: obstacle.addImage(obstacle5);
  //            break;
   //   case 6: obstacle.addImage(obstacle6);
   //           break;
  //    default: break;
    //}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function tubes() {
  if(frameCount%100===0){
    var tube=createSprite(width/2,height/7,width/12,height/4)
    tube.velocityX=-(6 + 3*score/100);
    tube.lifetime = 200;
    tube.collide(invisibleGround);
    tubeGroup.add(tube)
  }
}
function tubes2() {
  if (frameCount%100===0) {
    var tube2= createSprite(width,height/1.3,width/12,height/4)
    tube2.lifetime = 200;
    tube2.velocityX=-(6 + 3*score/100);
    tube2Group.add(tube2)
  }
  
}
function coins() {
  if(frameCount%100===0){
    var coin=createSprite(width/1.5,height/1.8,50,50)
    coin.velocityX=-(6 + 3*score/100);
    coinGroup.add(coin)
  }
}