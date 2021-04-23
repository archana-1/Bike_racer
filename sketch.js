var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var bell, pink, yellow,pink_fell, yellow_fell;
var pink_group, yellow_group
var cycle, gameoverimg,gameover;
var obstacle_img,obstacle,obstacle_group
var chance = 5

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pink = loadAnimation("opponent1.png","opponent2.png")
  yellow = loadAnimation("opponent4.png", "opponent5.png")
  bell = loadSound("sound/bell.mp3")
  pink_fell = loadImage("opponent3.png")
  yellow_fell = loadImage("opponent6.png")
  gameoverimg  = loadImage("gameOver.png")
  obstacle_img = loadImage("obstacle3.png")
  
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(5+ Math.round(distance/100));

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("fell",mainRacerImg2)
mainCyclist.scale=0.06;
// mainCyclist.debug = true
mainCyclist.setCollider("rectangle",0,0,90,90)

  // groups
  pink_group = new Group()
  yellow_group = new Group()
  obstacle_group = new Group()
  
  // gameover
  gameover  = createSprite(150,250,10,10)
  gameover.addImage(gameoverimg)
  gameover.scale = 0.5;
  gameover.visible = false
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
    // spawn cycles
    cyclist()
    if(frameCount % 75 == 0){
      spawnObstacles()
    }
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    if(keyDown("space")){
      bell.play()
    }
    // console.log("test : ",frameRate());
    
    distance = distance + Math.round(getFrameRate()/30)
    if(mainCyclist.isTouching(pink_group) ){
      gameState = END
      mainCyclist.changeAnimation("fell")
      cycle.addAnimation("cycle",pink_fell)
    }
    
    if(mainCyclist.isTouching(yellow_group) ){
      gameState = END
      mainCyclist.changeAnimation("fell")
      cycle.addAnimation("cycle",yellow_fell)
    }
    
    if(mainCyclist.isTouching(obstacle_group) ){
      gameState = END
      mainCyclist.changeAnimation("fell")
       obstacle_group.setVelocityXEach(0)
    }
 }
  
  if(gameState == END){
    
    end()
    
  }
  
   if(chance >0){
    if(mousePressedOver(gameover)){
      console.log("chance: "+chance)

        gameover.visible = false
        distance = 0;
        pink_group.destroyEach()
        yellow_group.destroyEach()
        mainCyclist.changeAnimation("SahilRunning")
        gameState = PLAY
        chance--;
      }
    
  }
  
}

function spawnObstacles(){
  var choice;
  obstacle = createSprite(300,60,10,10)
  obstacle.addImage(obstacle_img)
  obstacle.scale = 0.05;
  
  obstacle.velocityX = -(6 +Math.round(distance/100))
  obstacle.lifeTime = 300/6
  choice = Math.round(random(1,3))
  console.log("val : "+choice)
  if(choice == 1){
    obstacle.y = Math.round(random(10,50))
  }
  else if( choice == 2 ){
    obstacle.y = Math.round(random(250,300))
  }
  obstacle_group.add(obstacle)
  
}

function cyclist(){
  var choice;
  if(frameCount % 150 == 0){
    cycle = createSprite(450, Math.round(random(50,250)),10,10)
    cycle.velocityX = -(4+ Math.round(distance/100))
   
    cycle.setLifetime = 150
    cycle.scale = 0.06
    choice = Math.round(random(1,2))
    if(choice == 1){
      cycle.addAnimation("cycle", pink)
      pink_group.add(cycle)
    }
    else{
      cycle.addAnimation("cycle",yellow)
      yellow_group.add(cycle)
    }
    
    // console.log(choice)
    
   
    
  }
  
}

function end(){
  gameover.visible = true
    
    path.velocityX = 0;    
    pink_group.setVelocityXEach(0)
    yellow_group.setVelocityXEach(0)
  
    // yellow_group.destroyEach()
  
}