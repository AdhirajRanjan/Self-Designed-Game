
var player, playerimg, vehicle, vehicleimg;
var obstacleimg;
var score;
var gameState = "intro"
var edges;
function preload()
{
    
}

function setup()
{
    var canvas = createCanvas(600,600)

    
    player = createSprite(100,300,10,10)
    player.shapeColor = "red"
    edges = createEdgeSprites();

    vehicle = createSprite(550,300,20,20)
    
    
}

function draw()
{
    background(50)
    player.collide(edges[0])
    player.collide(edges[1])
    player.collide(edges[2])
    player.collide(edges[3])
    

    edges.visible = false;
    if(gameState === "intro")
    {
      stroke("blue")
      text("Use The arrow keys to move",230,100)
      text("Enter the plane",230,120)
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
    if(score === 5000)
    {
      //change the image to car
      gameState = "car"
    }
  }

    if(gameState === "car")
    {
      stroke("blue")
      text("You have now transformed into a car, you can only jump now")
      score = Math.round(frameCount)
    }
    if(gameState === "playing")
    {
      spawnObstacles()
    }
    drawSprites()
}

function spawnObstacles()
{
  if(frameCount % 30 === 0)
  {
    var obstacle = createSprite(640,Math.round(random(50,550)),30,30)
    obstacle.velocityX = -(6 + 3 * score/500)
  }

}
