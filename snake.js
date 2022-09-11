const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32; // create the unit

const ground = new Image(); // images
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

let dead = new Audio(); // audio
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// creating the snake
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// creating the food
let food = {
    x : Math.floor(Math.random()*17+1)*box ,
    y : Math.floor(Math.random()*15+3) *box
}

let score = 0; // creating score var
let d; //controling the snake

document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function collision(newHead,snake){ // cheack collision function
    for(let i = 0; i < snake.length; i++){
        if(newHead.x == snake[i].x && newHead.y == snake[i].y){
            return true;
        }
    }
    return false;
}

function draw(){ // drawing on canvas
    ctx.drawImage(ground, 0,0);
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y); 
    
    let snakeX = snake[0].x; // old head position
    let snakeY = snake[0].y;
    
    if( d == "LEFT") snakeX -= box; //direction
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    if(snakeX == food.x && snakeY == food.y){ // if the snake eats the food
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
            
        }
    }else{
        // remove the tail if dont
        snake.pop();
    }
    
    let newHead = { // add new Head
        x : snakeX,
        y : snakeY
    }
    
    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,300); // call draw function every 300 ms