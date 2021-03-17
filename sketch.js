var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,boy1Img,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover,gameoverImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload()
{
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImg = loadImage("gameOver.png")
  boy1Img = loadAnimation("runner1.png")
}

function setup()
{
  
  createCanvas(400,500);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 6;


//creating boy running
boy = createSprite(60,370,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("SahilStop",boy1Img);
boy.scale=0.08; 
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}
function draw() 
{
  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === PLAY)
  {
    boy.x = World.mouseX;
    
    //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if (cashG.isTouching(boy)) 
    {
      treasureCollection=treasureCollection+20
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy))
    {
      treasureCollection=treasureCollection+80
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) 
    {
      treasureCollection=treasureCollection+50
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) 
      {      
        gameState = END
    }
  }    
  }
  else if(gameState === END)
  {
    gameover = createSprite(200,250,10,10)
    gameover.addImage(gameoverImg)
    gameover.scale=0.8
    path.velocityY=0
     
    boy.changeAnimation("SahilStop",boy1Img)
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();    
} 
    
  drawSprites();
  textSize(20);
  fill("black");
  stroke("red")
  text("Treasure: "+ treasureCollection,150,30);
}

function createCash() 
{
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}
function createDiamonds() 
{
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}
function createJwellery()
{
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}
function createSword()
{
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}