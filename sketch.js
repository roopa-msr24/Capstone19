var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background, backgroundImage;
var bird,birdImage, boyC,birdC
var boy, boyImage,ground,rand
var score;
var gameOver, restart,gameOverImg, restartImg;
var obstacle, obstacle1,obstacle2,obstacle3,obstaclesGroup;


function preload(){
backgroundImage=loadImage("bg2.jpg")
boyImage=loadAnimation("3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-0.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-1.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-2.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-3.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-4.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-5.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-6.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-7.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-8.png","3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-9.png")
  boyC=loadAnimation("3d9cde8882874821d82483d9bd382746KVclOhG0yOngmv4y-1.png")
  obstacle3=loadAnimation("f3-0.png","f3-1.png")
  
  obstacle2=loadAnimation("f2-0.png","f2-1.png","f2-2.png","f2-3.png","f2-4.png","f2-5.png","f2-6.png","f2-7.png","f2-8.png","f2-9.png","f2-10.png","f2-11.png","f2-12.png","f2-13.png","f2-14.png","f2-15.png","f2-16.png","f2-18.png","f2-19.png","f2-20.png","f2-21.png","f2-22.png","f2-23.png","f2-24.png","f2-25.png","f2-26.png","f2-27.png","f2-28.png","f2-29.png")
  
  birdC=loadAnimation("5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-0.png")
  
  
  birdImage=loadAnimation("5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-0.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-1.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-2.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-3.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-4.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-5.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-6.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-7.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-8.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-9.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-10.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-11.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-12.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-13.png", "5eb0955534d040229151540d75561fb3qLHyR7lJhbCkuAYw-14.png")
  
   gameOverImg = loadImage("g1.png");
  restartImg = loadImage("reset.jpg");
  
  }

function setup() {
  createCanvas(800, 600);
background=createSprite(0,0,800,600);
background.x= background.width/2;
background.addImage(backgroundImage)
 background.scale=2.2
 
  
  boy=createSprite(100,400,150,50)
  boy.addAnimation("boyImage",boyImage)
 boy.addAnimation("collided", boyC);
  boy.scale=0.2
  
  ground = createSprite(400,400,800,20);
  ground.visible=false
  
  obstaclesGroup = createGroup();
  birdsGroup=createGroup()
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.4;
  restart.scale = 0.4;

  gameOver.visible = false;
  restart.visible = false;

    score=0;
}

function draw() {
   background.velocityX=-(10+score/100);
  
  if (gameState===PLAY){
      if( background.x<0) {
     background.x =background.width/2;
     
  }
if(keyDown("space") && boy.y>=170 ){
    boy.velocityY = -12;
    }
     boy.velocityY = boy.velocityY + 0.8;
    
  if(obstaclesGroup.isTouching(boy)){
    textSize(50)
    text("gameOver", 200,200)
    gameState = END
    
    }
      
  }
   else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    background.velocityX = 0;
    boy.velocityY = 0;
       
    boy.changeAnimation("collided", boyC)
    obstaclesGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    birdsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
     
   }
 boy.collide( ground);
 spawnObstacles()
  spawnBirds()
drawSprites();
  
  fill("red")
  textSize(40)
  text("score "+ score, 500,50)
  score = score + Math.round(getFrameRate()/60);
}


function spawnObstacles() {
      if(frameCount % 150 === 0) {
    obstacle = createSprite(600,300,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(10+score/100)
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addAnimation("abc",obstacle3);
       obstacle.scale = 0.05;
       break;
      case 2: obstacle.addAnimation("xyz",  obstacle2);
        obstacle.scale = 0.2              ;
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
  }
}

function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(100,50));
    bird.addAnimation("xyz",birdImage);
    bird.addAnimation("x",birdC)
    
    bird.scale = 0.2;
    bird.velocityX = (-3+score/100);
    
     //assign lifetime to the variable
    bird.lifetime = 200;
    
    //adjust the depth
   bird.depth = boy.depth;
    boy.depth = boy.depth + 1;
    
    //add each cloud to the group
    birdsGroup.add(bird);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  birdsGroup.destroyEach();
 boy.changeAnimation("boyImage",boyImage)
  
   
  score = 0;
  
}













