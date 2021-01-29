
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState="start";
function preload()
{
bgImg=loadImage("Temple_Run_Wallpaper_A.png");
	playerDead=loadAnimation("Dead__000.png","Dead__001.png","Dead__002.png","Dead__003.png","Dead__004.png","Dead__005.png","Dead__006.png","Dead__007.png","Dead__008.png","Dead__009.png");
	playerIdle=loadAnimation("Idle__000.png","Idle__001.png","Idle__002.png","Idle__003.png","Idle__004.png","Idle__005.png","Idle__006.png","Idle__007.png","Idle__008.png","Idle__009.png");
	playerJump=loadAnimation("Jump__000.png","Jump__001.png","Jump__002.png","Jump__003.png","Jump__004.png","Jump__005.png","Jump__006.png","Jump__007.png","Jump__008.png","Jump__009.png");
	playerRun=loadAnimation("Run__000.png","Run__001.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png");
	playerSlide=loadAnimation("Slide__000.png","Slide__001.png","Slide__002.png","Slide__003.png","Slide__004.png","Slide__005.png","Slide__006.png","Slide__007.png","Slide__008.png","Slide__009.png");
	monsterImg=loadImage("images-removebg-preview.png");
	coinImg=loadAnimation("Gold_1.png","Gold_2.png","Gold_3.png","Gold_4.png","Gold_5.png","Gold_6.png","Gold_7.png","Gold_8.png","Gold_9.png","Gold_10.png","Gold_11.png","Gold_12.png","Gold_13.png","Gold_14.png","Gold_15.png","Gold_16.png","Gold_17.png","Gold_18.png","Gold_19.png","Gold_20.png","Gold_21.png","Gold_22.png","Gold_23.png","Gold_24.png","Gold_25.png","Gold_26.png","Gold_27.png","Gold_28.png","Gold_29.png","Gold_30.png")
	frontpage=loadImage("Temple-Run-Start-Screen.png");
	startImg=loadImage("startimg1.png");

	

}

function setup() {
	createCanvas(800, 400);


	engine = Engine.create();
	world = engine.world;

	start1=createSprite(400,200,100,50);
	start1.addImage(startImg);
	start1.scale=0.2;
	start1.visible=false;

	//fpage=createSprite(0,0,800,400);
	//fpage.addImage(frontpage);
	//fpage.visible=false;
	
  backgr=createSprite(0,0,1600,400);
  backgr.addImage(bgImg);
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
   
  player = createSprite(100,390,20,50);
  player.addAnimation("Running",playerRun);
  player.scale = 0.2;
  
  
  ground = createSprite(400,390,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  
  //startButton.visible=true;
  
  CoinGroup = new Group();
  monsterGroup = new Group();
  
  score = 0;
	Engine.run(engine);
  
}
function draw(){
	
if(gameState==="start"){
	
	background(frontpage);
	//start1.visible=true;
	
	
	textSize(35);
	fill("blue");
	text("Press S to start the game",200,170);
}
	
//if(mousePressedOver(start1) && gameState==="start"){
//	gameState="play";
	
	
//	}



if(keyDown("s")&&gameState==="start"){
	gameState="play";
}

 else if(gameState==="play"){
	background("white");
    //fapge.visible=false;
	start1.visible=false;
    
	if(ground.x<0) {
	  ground.x=ground.width/2;
	}
	if(backgr.x<100){
	  backgr.x=backgr.width/2;
	}
	
	  if(CoinGroup.isTouching(player)){
		CoinGroup.destroyEach();
	  score = score + 2;
	  }
	  
	
	  if(keyDown("space") ) {
		player.velocityY = -12;
	  }
	  player.velocityY = player.velocityY + 0.8;
	
	  player.collide(ground);
	  spawnCoins();
	  spawnMonsters();
   
	  if(monsterGroup.isTouching(player)){ 
		gameState="end";
	   // score=score-2;
	  }
	
	drawSprites();
	
	stroke("white");
	textSize(20);
	fill("white");
	text("Score: "+ score, 500,50);

	
	}
//}

else if(gameState==="end"){
	background("black ");
	stroke("yellow");
	textSize(30);
	fill("red");
	text("Game Over", 350,200);
	text("Press R to Restart", 350,250);
 

}

if(keyDown("r")&&gameState==="end"){
	gameState="start";
	score=0;
}
}
function spawnCoins() {
	//write code here to spawn the food
	if (frameCount % 80 === 0) {
	  var coin = createSprite(600,250,40,10);
	  coin.y = random(120,200);    
	  coin.addAnimation("coinmoving",coinImg);
	  coin.scale = 0.05;
	  coin.velocityX = -5;
	   //assign lifetime to the variable
	  coin.lifetime = 300;
	  player.depth = coin.depth + 1;
	  
	  //add each banana to the group
	  CoinGroup.add(coin);
	}
  }
  
  function spawnMonsters() {
	if(frameCount % 300 === 0) {
	  var monster = createSprite(600,380,10,40);
	  monster.velocityX = -6;
	  monster.addAnimation("obstacle",monsterImg);
	  
	  //assign scale and lifetime to the obstacle     
	  monster.scale = 1.0;
	  monster.lifetime = 300;
	//  monster.debug=true;
	  monster.setCollider("rectangle",0,0,100,100);
	  //add each obstacle to the group
	  monsterGroup.add(monster);
	}
  }

