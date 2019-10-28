/***
_/_/_/   _/_/_/   _/   _/  _/_/_/  _/_/_/   _/      _/
_/       _/   _/   _/  _/  _/        _/    _/ _/    _/
_/       _/_/_/      _/     _/_/     _/    _/_/_/   _/
_/       _/ _/       _/         _/   _/   _/    _/  _/
_/_/_/   _/   _/     _/     _/_/_/   _/   _/     _/ _/_/_/

_/_/_/   _/_/_/   _/_/_/  _/      _/   _/_/_/   _/_/_/               _/_/
_/       _/  _/  _/    _/  _/     _/   _/       _/   _/                 _/
_/       _/_/_/  _/    _/   _/    _/   _/_/_/   _/_/_/      _/   _/    _/
_/  _/   _/ _/   _/    _/    _/ _/_/   _/       _/  _/        _/_/       _/
_/_/_/   _/   _/  _/_/_/      _/  _/   _/_/_/   _/   _/        _/     _/_/
***/

//declare variables
var gameArea = document.getElementById("mycanvas");
var rise_speed = 5;
var fall_speed = 5;
var rise_image = "up.png";
var fall_image = "down.png";
var obstacle_amount = 50;
var obstacle_spacing;
var game_speed = 1.5;
var games_played = 0;

var crystal1;
var obstacles = [];
var particles = [];
var clicking;
var updater;
var game_state = 1; //1 = game is going; 0 = crystal exploded

function initializeCanvas(){
  var cookie = document.cookie;
  var pos =
  console.log(cookie);
  //give it dimensions and context
  gameArea.width = 400;
  gameArea.height = 400;
  gameArea.userSelect="none";
  gameArea.context = gameArea.getContext("2d");
  //add event listener so that game starts when canvas is clicked
  gameArea.addEventListener('click', startGame);
  //draw home screen graphics
  gameArea.context.fillStyle = "rgb(219, 199, 109)";
  gameArea.context.fillRect(0,0,gameArea.width, gameArea.height);
  gameArea.context.fillStyle = "rgb(87, 114, 132)";
  gameArea.context.font = "30px monospace";
  gameArea.context.textAlign = "center";
  gameArea.context.fillText("Crystal Grower v3", gameArea.width/2, gameArea.height/2);
  gameArea.context.font = "15px monospace";
  gameArea.context.textAlign = "center";
  gameArea.context.fillText("Click to begin", gameArea.width/2, gameArea.height/2 +25);

}
function startGame(){
  //remove old eventlistener and add ones to make the crystal float
  gameArea.removeEventListener("click", startGame);
  gameArea.addEventListener("mousedown", function(){clicking = true});
  gameArea.addEventListener("mouseup", function(){clicking = false});
  gameArea.addEventListener("touchstart", function(){clicking = true});
  gameArea.addEventListener("touchend", function(){clicking = false});
  //make the crystal object
  crystal1 = new crystal(70, 200, 32, 20);
  //make obstacles
  for (var i = 0; i < obstacle_amount; i ++){
    var obsgen = Math.floor(randomInt(1,10));
    if (obsgen < 7){
      obstacles.push(new droplet(i*40 + 300, randomInt(20,260), randomInt(30,60), game_speed, 1, "rgb(124, 153, 44)"));
    } else if (obsgen < 9){
      obstacles.push(new droplet(i*40 + 300, randomInt(20,260), randomInt(30,60), game_speed, -1, "rgb(83, 160, 222)"));
    } else{
      obstacles.push(new dynamite(i * 40 + 300, randomInt(20, 260), 20, game_speed));
    }
  }
  //set interval for updating the game
  updater = setInterval(updateGame,20);
}
function updateGame(){
  //draw background
  gameArea.context.fillStyle = "rgb(219, 199, 109)";
  gameArea.context.fillRect(0,0,gameArea.width, gameArea.height);
  //check whether objects were hit; if not, keep drawing them
  for (var i = 0; i < obstacles.length; i ++){
    obstacles[i].update(crystal1);
    obstacles[i].draw();
  }
  //check whether crystal is rising or falling and then draw
  if(clicking){
    crystal1.rise();
  } else{
    crystal1.fall();
  }
  crystal1.draw();
  //draw any particles that exist
  for (var i = 0; i < particles.length; i ++){
    particles[i].update();
    particles[i].draw();
  }
  //if the last obstacle is gone, end the game
  if(game_state && obstacles[obstacles.length-1].x < 0){
    game_state = 0;
    setTimeout(endGame,1000);
  }
}
function propogateParticles(crystal){
  //make the particles
  for (var i = 0; i < 200; i ++){
    particles.push(new particle(crystal.x, crystal.y, randomInt(1,50)*randomSign(), randomInt(1,50)*randomSign() ));
  }
}
function endGame(){
  //clear the interval that updates the game
  clearInterval(updater);
  //clear all obstacles and particles and set the game state back to default
  obstacles = [];
  particles = [];
  game_state = 1;
  //reference log
  console.log("score: " + crystal1.value);
  //display end game graphics
  gameArea.context.fillStyle = "rgb(219, 199, 109)";
  gameArea.context.fillRect(0,0,gameArea.width, gameArea.height);
  gameArea.context.fillStyle = "rgb(87, 114, 132)";
  gameArea.context.font = "30px monospace";
  gameArea.context.textAlign = "center";
  gameArea.context.fillText("Crystal value: " + crystal1.value, gameArea.width/2, gameArea.height/2);
  gameArea.context.font = "15px monospace";
  gameArea.context.textAlign = "center";
  gameArea.context.fillText("Click to restart", gameArea.width/2, gameArea.height/2 +25);

  if(games_played < 4){
    //add event listener so that game begins when canvas is clicked
    gameArea.addEventListener('click', startGame);
    //increment games_played
    games_played += 1;
    //increase speed;
    game_speed += .2;
  } else{
    gameArea.addEventListener('click', timeOut);
    var d = new Date();
    var e = d.getTime() + 10000;
    var wholecookie = "timeout=true;expires=" + e + ";path=/";
    document.cookie = wholecookie;
  }
}
function timeOut(){
  //display timeout graphics
  gameArea.context.fillStyle = "rgb(219, 199, 109)";
  gameArea.context.fillRect(0,0,gameArea.width, gameArea.height);
  gameArea.context.fillStyle = "rgb(87, 114, 132)";
  gameArea.context.font = "30px monospace";
  gameArea.context.textAlign = "center";
  gameArea.context.fillText("Timeout, buddy!", gameArea.width/2, gameArea.height/2);
  gameArea.context.font = "15px monospace";
  gameArea.context.textAlign = "center";
  gameArea.context.fillText("It looks like you've played", gameArea.width/2, gameArea.height/2 +25);
  gameArea.context.fillText("five games already. Time to", gameArea.width/2, gameArea.height/2 +40);
  gameArea.context.fillText("take a break. See you later!", gameArea.width/2, gameArea.height/2 +55);
}
function crystal(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.value = 0;

  this.img = new Image();
  this.img.src = rise_image;

  this.draw = function(){
    ctx = gameArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  this.rise = function(){
    this.img.src = rise_image;
    if (this.y <= 10){
      this.y = 10;
    } else{
      this.y -= rise_speed;
    }
  }

  this.fall = function(){
    this.img.src = fall_image;
    if (this.y >= 400 - 10 - this.height){
      this.y = 400-10-this.height;
    } else{
      this.y += fall_speed;
    }
  }
}
function droplet(x, y, m, speed, dtype, fill){ //x-position, y-position, droplet-size, droplet-speed, droplet-type (-1 for bad, 1 for good), droplet-fill
  this.x = x;
  this.y = y;
  this.dtype = dtype;

  this.draw = function(){
    ctx = gameArea.context;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y-m/2);
    ctx.bezierCurveTo(this.x-m/1.5, this.y+m/2, this.x+m/1.5, this.y+m/2, this.x,this.y-m/2);
    ctx.fill();
  }
  this.update = function(crystal){
    if (this.x-.2*m <= crystal.x + crystal.width && this.x-.2*m + .4*m >= crystal.x && this.y-.5*m <= crystal.y + crystal.height && this.y-.5*m + .75*m >= crystal.y && game_state){
      this.y = -400;
      crystal.value += m * this.dtype;
      if(crystal.width > 2){
        crystal.width += m * this.dtype / crystal.height;
        crystal.height += m * this.dtype / crystal.width;
      }
    } else{
      this.x -= speed;
    }
  }
}
function dynamite(x, y, m, speed){
  this.x = x;
  this.y = y;

  this.draw = function(){
    ctx = gameArea.context;
    ctx.fillStyle = "rgb(87, 114, 132)";
    ctx.fillRect(this.x, this.y, m, m, 4);
  }
  this.update = function(crystal){
    if (this.x <= crystal.x + crystal.width && this.x + m >= crystal.x && this.y <= crystal.y + crystal.height && this.y + m >= crystal.y && game_state){
      this.y = -400;
      crystal.width, crystal.height = 0;
      crystal.value = 0;
      game_state = 0;
      propogateParticles(crystal);
      setTimeout(endGame,1000);
    } else{
      this.x -= speed;
    }
  }
}
function particle(x, y, xs, ys){ //x, y, x-speed, y-speed
  this.x = x;
  this.y = y;

  this.draw = function(){
    ctx = gameArea.context;
    ctx.fillStyle = "rgb(87, 114, 132)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  this.update = function(){
    this.x += xs;
    this.y += ys;
  }
}
function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function randomSign(){
  var x = Math.random();
  if (x < .5){
    return -1;
  } else{
    return 1;
  }
}
