//Variables for images
var BackgroundI,player_running,bananaI,stoneI;
//Vatiables for groups 
var FoodGroup,obstaclesGroup;
//Variable for Background
var Background;
//Variable for Monkey
var Monkey;
//Variable for invisible ground
var invisibleGround;
//Variable to store the score
var score = 0;
//Variable used for the time the monkey touches the stone,e.g  1st time or 2nd time
var time = 0;
//Variable to store game states
var PLAY = 1;
var END = 0;
//Initial game states
var gameState = 1;


function preload() {
  //loading the monkey animation
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  //loading the background image
  BackgroundI  = loadImage("jungle.jpg");
  //loading the banana image and the stone image
  bananaI = loadImage("banana.png");
  stoneI = loadImage("stone.png");
  //loading the restart image
  RestartImg = loadImage("restart.png");
 
}

function setup() {
  //Create the canvas
  createCanvas(800, 400);
  
  //Creating background
  Background = createSprite(300,100,50,50);
  Background.addImage("background",BackgroundI);
  Background.velocityX = -4;
  Background.scale = 1.3;
  Background.x = Background.width/2;
  
  //Creating monkey
  Monkey = createSprite(100,350,30,35);
  Monkey.addAnimation("running_monkey",player_running);
  Monkey.scale = 0.08;
  
  //Ctreating the invisible ground
  invisibleGround = createSprite(400,380,800,20);
  invisibleGround.visible = false;
  
  //Restart button
  Restart = createSprite(350,250,10,10);
  Restart.addImage("restart",RestartImg);
  Restart.scale = 0.55;  
  
  //Creating food and obstacle groups
  FoodGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
  
  background(220);
  
  //Conditions for game state PLAY
  if(gameState === 1){ 
    
    //Make the monkey jump when the space key is pressed
    if(keyDown("space") && Monkey.y >= 300){
     Monkey.velocityY = -14;
     }
    
    //Reseting background
    if(Background.x < 200){
     Background.x = Background.width/2;
     }
    // If foodGroup is touching the monkey, increase the score by 2 and destroy food.
    if(Monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 2;
   
    }
    //Conditions(when the monkey touches the obstacles group)
    if(Monkey.isTouching(obstaclesGroup)) {
      Monkey.scale = 0.08;
      time = time + 0.05;
    }
    
    //Increase the size of monkey after it reaches certain score like (10, 20, 30 and 40)
    switch(score){
    case 10 : Monkey.scale = 0.12;
      break;
    case 20 : Monkey.scale = 0.14;
      break;
    case 30 : Monkey.scale = 0.16;
      break;
    case 40 : Monkey.scale = 0.18;
      break;
    default :  break;
    }
    
    //Calling the spawnFood and spawnObstacles function
    spawnFood();
    spawnObstacles(); 
  
    //If the monkey touches an obstacle second time, end the game
    if(time > 1.86) {
    gameState = 0;
    }
    //Make the Restart button invisible   
    Restart.visible = false;
  }
  else if(gameState === 0){
    //Stop everything
    stop();
    //Make the score 0
    score = 0;
    //Make the Restart button visible
    Restart.visible = true;
    
    //Conditions ,when the Restart button is pressed
    if(mousePressedOver(Restart)){
      gameState = 1;
      obstaclesGroup.destroyEach();
      FoodGroup.destroyEach();
      Background.velocityX = -4;
      time = 0;
       }
  }
  
  //Adding gravity
  Monkey.velocityY = Monkey.velocityY + 0.5; 
  
  //Make the monkey collide the invisible ground
  Monkey.collide(invisibleGround);
  
  //Draw the sprites
  drawSprites();
  
  //Displaying the score
  fill("yellow");
  textStyle(BOLD);
  textSize(22);
  text("Score : " + score ,500,80);
  
  //Game Over text
  if(gameState === 0){
    fill("white");
    stroke("black");
    textStyle(BOLD);
    textFont("Comic Sans MS");
    textSize(30);
    text("GAME OVER !",280,200);
  }

}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaI);
    banana.scale = 0.06;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    Monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
    
    banana.setCollider("rectangle",0,0,600,350); 
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(stoneI);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

//Function to stop everyting
function stop(){
  Background.velocityX = 0; 
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  Monkey.velocityY = 0;
}






