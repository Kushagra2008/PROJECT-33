var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score =0;
var ground, turn = 0;
var particle, gamestate = "play";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }   
}
 


function draw() {
  
    background("black");
    textSize(20)
   //text("Score : "+score,20,30);
    Engine.update(engine);
   
    ground.display();
    
     for (var i = 0; i < plinkos.length; i++) {
       
       plinkos[i].display();
       
     }
     /*if(frameCount%60===0){
       particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
       score++;
     }*/
   
    for (var j = 0; j < particles.length; j++) {
     
       particles[j].display();
       if (particles[j].body.position.y > 480)
       {
        if (particles[j].body.position.x < 200 && particles[j].body.position.x > 0)
        {
          score += 500
          Matter.Body.setPosition(particles[j].body, {x: 1000, y: 100})
         particles[j].body.isStatic = true;
         console.log(score)
        }

        if (particles[j].body.position.x >= 200 && particles[j].body.position.x < 500)
        {
          score += 200
          Matter.Body.setPosition(particles[j].body, {x: 1000, y: 100})
         particles[j].body.isStatic = true;
         console.log(score)
        }
        if (particles[j].body.position.x >= 500 && particles[j].body.position.x < 800)
        {
          score += 200
          Matter.Body.setPosition(particles[j].body, {x: 1000, y: 100})
         particles[j].body.isStatic = true;
         console.log(score)
        }
       }
     }
     for (var k = 0; k < divisions.length; k++) {
       
       divisions[k].display();
       
     }
   if (gamestate === "end")
  {
    textSize(80)
    fill("red")
    text("GAME OVER", width/2 - 250, height/2-50)
  }
  push();
  stroke("yellow")
  strokeWeight(10);
  line(0, 480, 800, 480)
  pop();
  textSize(20)
  fill("red")
  text("500", 20, 530)
  text("500", 100, 530)
  text("500", 180, 530)
  text("200", 260, 530)
  text("200", 340, 530)
  text("200", 420, 530)
  text("100", 500, 530)
  text("100", 580, 530)
  text("100", 660, 530)
  text("100", 740, 530)
  text("SCORE: " + score, 20, 30);

}

function mousePressed()
{
  if (gamestate !== "end" && turn < 5)
{
  turn ++
  particle = new Particle(mouseX, 10, 10, 10)
  particles.push(particle)
  //particle.display();
}

else if(turn >= 5)
{
  gamestate = "end";
}
}



