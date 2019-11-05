/***

 _/_/_/  _/_/_/   _/    _/  _/_/_/  _/_/_/_/   _/      _/
_/       _/   _/   _/  _/  _/         _/      _/_/     _/
_/       _/_/_/      _/     _/_/      _/     _/  _/    _/
_/       _/ _/       _/         _/    _/    _/_/_/_/   _/
_/_/_/   _/   _/     _/    _/_/_/     _/   _/      _/  _/_/_/

_/_/_/    _/_/_/     _/_/_/   _/        _/  _/_/_/   _/_/_/       _/    _/  _/_/_/
_/        _/   _/   _/    _/  _/       _/   _/       _/   _/      _/   _/        _/
_/        _/_/_/    _/    _/  _/  _/  _/    _/_/_/   _/_/_/       _/  _/    _/_/_/
_/  _/_/  _/  _/    _/    _/  _/_/ _/_/     _/       _/  _/       _/_/           _/
_/_/_/    _/   _/    _/_/_/   _/    _/      _/_/_/   _/   _/      _/        _/_/_/

***/

//declare variables
var gameArea = document.getElementById("mycanvas");
var rise_speed = 5;
var fall_speed = 5;
var obstacle_amount = 80;
var obstacle_spacing;
var game_speed = 1.5;
var solute_color;
var crystal1;
var obstacles = [];
var particles = [];
var clicking;
var updater;
var game_state = 1; //1 = game is going; 0 = crystal exploded

function initializeCanvas(){

  if (getGamesFromCookie() >= 5){
    gameArea.style.display = "none";
  } else{
    //start the game
    gameArea.addEventListener('click', startGame);
    //give it dimensions and context
    gameArea.width = 400;
    gameArea.height = 400;
    gameArea.userSelect="none";
    gameArea.context = gameArea.getContext("2d");
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
}
function startGame(){
  //remove old eventlistener and add ones to make the crystal float
  gameArea.removeEventListener("click", startGame);
  gameArea.addEventListener("mousedown", function(){clicking = true});
  gameArea.addEventListener("mouseup", function(){clicking = false});
  gameArea.addEventListener("touchstart", function(){clicking = true});
  gameArea.addEventListener("touchend", function(){clicking = false});
  //get a nice solute_color
  solute_color = "rgb(" + randomInt(80,180) + "," + randomInt(80,180) + "," + randomInt(80,180) + ")";
  //make the crystal object
  crystal1 = new crystal(70, 200, 32, 20);
  //make obstacles
  for (var i = 0; i < obstacle_amount; i ++){
    var obsgen = Math.floor(randomInt(1,10));
    if (obsgen < 7){
      obstacles.push(new droplet(i*40 + 300, randomInt(20,260), randomInt(30,60), game_speed, 1, solute_color));
    } else if (obsgen < 9){
      obstacles.push(new droplet(i*40 + 300, randomInt(20,260), randomInt(30,60), game_speed, -1, "#53A0DE"));
    } else{
      obstacles.push(new dynamite(i * 40 + 300, randomInt(20, 260), 20, game_speed, "#8c5f62"));
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
    particles.push(new particle(crystal.x, crystal.y, randomInt(1,50)*randomSign(), randomInt(1,50)*randomSign(),"rgb(" + randomInt(80,180) + "," + randomInt(80,180) + "," + randomInt(80,180) + ")"));
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

  //increment the games on the cookie
  incrementGamesInCookie();
  //increase speed;
  game_speed += .2;

  if(getGamesFromCookie() < 5){
    gameArea.addEventListener('click', startGame);
  } else{
    gameArea.addEventListener('click', timeOut);
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

  this.draw = function(){
    ctx = gameArea.context;
    ctx.beginPath();
    ctx.moveTo(this.x,this.y+this.height/4);
    ctx.lineTo(this.x,this.y+this.height*3/4);
    ctx.lineTo(this.x+this.height/4,this.y+this.height);
    ctx.lineTo(this.x+this.width-this.height/4,this.y+this.height);
    ctx.lineTo(this.x+this.width,this.y+this.height*3/4);
    ctx.lineTo(this.x+this.width,this.y+this.height/4);
    ctx.lineTo(this.x+this.width-this.height/4,this.y);
    ctx.lineTo(this.x+this.height/4,this.y);
    ctx.closePath();
    ctx.fillStyle = solute_color;
    ctx.fill();
  }

  this.rise = function(){
    if (this.y <= 10){
      this.y = 10;
    } else{
      this.y -= rise_speed;
    }
  }

  this.fall = function(){
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
      crystal.value += m * this.dtype * 5;
      crystal.width += m * this.dtype / 50;
      crystal.height += m * this.dtype / 50;
      if(crystal.width <= 0 || crystal.height <= 0){
        crystal.width, crystal.height = 0;
        crystal.value = 0;
        game_state = 0;
        setTimeout(endGame,1000);
      }
    } else{
      this.x -= speed;
    }
  }
}
function dynamite(x, y, m, speed, color){
  this.x = x;
  this.y = y;

  this.draw = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
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
function particle(x, y, xs, ys, color){ //x, y, x-speed, y-speed
  this.x = x;
  this.y = y;

  this.draw = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
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
function incrementGamesInCookie(){
  var d = new Date();
  d.setTime(d.getTime() + 5 * 60 * 1000);
  var expires = "expires="+ d.toUTCString();
  var g = getGamesFromCookie() + 1;
  var wholecookie = "games=" + g + ";" + expires + ";path=/";
  document.cookie = wholecookie;
}
function getGamesFromCookie(){
  var str = document.cookie;
  var t;
  if(str == ""){
    t = 0;
  } else{
    var n = str.indexOf("games=");
    t = parseInt(str.slice(n+6,n+7));
  }
  return t;
}
