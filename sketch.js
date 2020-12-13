
var player, playerimg, vehicle, vehicleimg;
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
      text("Use The arrow keys to move",230,100)
      text("Enter the plane",230,120)
      if(player.collide(edges[0])||player.collide(edges[1])||player.collide(edges[2])||player.collide(edges[3]))
      {
        stroke("red")
        text("There is no escape",230,140)
      }
      if(player.isTouching(vehicle))
      {
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
    text("Avoid the Obstacles",650,100)
    vehicle.velocityX = 6;
    camera.x = vehicle.x
    player.visible = false
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
  }
    
    drawSprites()
}
