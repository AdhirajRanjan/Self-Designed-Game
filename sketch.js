
var player, playerimg, vehicle, vehicleimg;
var backgroundimg;
var obstacleimg, obstacleGroup;
var score;
var gameState = "intro"
var edges;
function preload()
{
    backgroundimg = loadImage("1.jpg")
    vehicleimg = loadImage("plane.png")
}

function setup()
{
    var canvas = createCanvas(600,600)

    
    obstacleGroup = createGroup()
    player = createSprite(100,300,10,10)
    player.shapeColor = "red"
    player.scale = 2
    edges = createEdgeSprites();

    vehicle = createSprite(550,300,20,20)
    vehicle.addImage("plane",vehicleimg)
  vehicle.scale = 0.2    
    
}

function draw()
{
    background(backgroundimg)
    player.collide(edges[0])
    player.collide(edges[1])
    player.collide(edges[2])
    player.collide(edges[3])

    if(gameState === "playing")
    {
      spawnObstacles()
    }
    
    vehicle.collide(obstacleGroup)

    if(vehicle.collide(obstacleGroup))
    {
      gameState = "end"
    }

    edges.visible = false;
    if(gameState === "intro")
    {
      stroke("blue")
      text("Use The arrow keys to move",230,100)
      text("Enter the plane",230,120)
      score = 0;
      if(player.collide(edges[0])||player.collide(edges[1])||player.collide(edges[2])||player.collide(edges[3]))
      {
        stroke("red")
        text("There is no escape",230,140)
      }
      if(player.isTouching(vehicle))
      {
        stroke("blue")
        text("Press space to enter the plane",400,270)
        if(keyDown("space"))
        {
          gameState = "playing"
        }
      }
    
    if(keyIsDown(UP_ARROW))
    {
        player.y = player.y - 6
        
    }

    if(keyIsDown(DOWN_ARROW))
    {
        player.y = player.y + 6
    }

    if(keyIsDown(LEFT_ARROW))
    {
        player.x = player.x - 6
    }

    if(keyIsDown(RIGHT_ARROW))
    {
        player.x = player.x + 6

    }

  }

  if(gameState === "playing")
  {
    score = Math.round(frameCount)
    stroke("blue")
    text("Avoid the Obstacles",200,100)
    stroke("green")
    text("Score: "+score,20,50)
    //vehicle.velocityX = 6;
    //camera.x = vehicle.x
    player.visible = false
    vehicle.collide(edges[0])
    vehicle.collide(edges[1])
    vehicle.collide(edges[2])
    vehicle.collide(edges[3])

    
    if(keyIsDown(UP_ARROW))
    {
      vehicle.y = vehicle.y - 8
    }

    if(keyIsDown(DOWN_ARROW))
    {
      vehicle.y = vehicle.y +8
    }

    if(keyIsDown(RIGHT_ARROW))
    {
        vehicle.x = vehicle.x + 4

    }
    if(keyIsDown(LEFT_ARROW))
    {
        vehicle.x = vehicle.x - 4
    }
    if(score === 1000)
    {
      //change the image to car
      gameState = "car"
    }
  }

    if(gameState === "car")
    {
      stroke("blue")
      text("You have now transformed into a car, you can only jump now",200,100)
      score = Math.round(frameCount)
    }
    

    if(gameState === "end")
    {
      stroke("red")
      text("Game Over!!!",200,100)
      text("Press Space to start again",200,120)
      if (keyDown("space"))
      {
        gameState = "intro"
        player.x = 100
        player.y = 300
        player.visible = true;
        vehicle.x = 550
        vehicle.y = 300

      }
    }
    drawSprites()
}

function spawnObstacles()
{
  if(frameCount % 20 === 0)
  {
    var obstacle = createSprite(640,Math.round(random(50,550)),30,30)
    obstacle.velocityX = -(6 + 3 * score/300)

    obstacleGroup.add(obstacle)
  }

}
