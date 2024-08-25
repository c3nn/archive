const D = document,
      width = 16,
      height = 16;

for(let i = 0; i < width * height; i++){
    D.getElementById('background').innerHTML = D.getElementById('background').innerHTML + '□';
    if((i + 1) % width == 0){
        D.getElementById('background').innerHTML = D.getElementById('background').innerHTML + '<br>';
    }
}

var grid = 'rendering...',
    direction = 'waiting',
    snakeX = 7,
    snakeY = 7,
    length = 1,
    showNum = false,
    numberGrid = Array(width * height).fill(0),
    alive = true,
    appleEaten = 'true',
    topScore = 0,
    oldDirection = 'ArrowUp',
    inputTaken = 'false',
    inputQueue = ['waiting'],
    appleX,
    appleY,
    ArrowUp = ['ArrowDown'],
    ArrowDown = ['ArrowUp'],
    ArrowRight = ['ArrowLeft'],
    ArrowLeft = ['ArrowRight'],
    waiting = [''],
    preview = true;

window.addEventListener('keydown', function (e) { // the key thing
    if(preview == true){
        preview = false;
        alive = false;
    }else{
        if((e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') && e.key != inputQueue[inputQueue.length - 1]){ // is valid key
            inputQueue.push(e.key);
        }
        // console.log(inputQueue);
    }
}, false);

function render(){ // puts numberGrid into grid
    grid = '';
    var itemNumber = 0;
    numberGrid.forEach(function(item) {
        itemNumber += 1;
        if(showNum == true){
            grid += numberGrid[itemNumber - 1];
        }
        else{
            if(item != 0){
                if(item == -1){ grid += '•'; }
                else{ grid += '■'; }
            }
            else{
                grid += '□';
            }
        }
        if(itemNumber % width == 0){
                grid += '<br>';
        }
    })
    D.getElementById('grid').innerHTML = grid;
}

function updateSnake(){ // updates location of snake
     if(inputQueue[0] != 'waiting' || inputQueue.length != 1){
        if(eval(oldDirection).includes(inputQueue[0]) == false && inputQueue.length != 0){
            direction = inputQueue[0];
        }
        inputQueue.splice(0,1);
     }
    switch(direction){
        case 'ArrowUp':
        snakeY = snakeY -1;
        break;
        case 'ArrowDown':
        snakeY = snakeY + 1;
        break;
        case 'ArrowRight':
        snakeX = snakeX + 1;
        break;
        case 'ArrowLeft':
        snakeX = snakeX - 1;
        break;
    }
    if(snakeY < 0||snakeX < 0||snakeY + 1 > height||snakeX > width - 1||numberGrid[width * snakeY + snakeX] > 0){ // if outside bounds / overlaping snake
        alive = 'false';
    }
    else{
        if(numberGrid[(width * snakeY) + snakeX] == -1){
            appleEaten = 'true';
            length = length + 1;
            appleResize();
        }
    }
    oldDirection = direction;
    numberGrid.splice((width * snakeY) + snakeX, 1, length); // sets the heads position
}

function appleResize(){ // adds one to all of snake so length update isnt delayed
    var itemNumber = 0;
    numberGrid.forEach(function(item){
        if(item > 0){
            numberGrid.splice(itemNumber,1,item + 1);
        }
        itemNumber += 1;
    })
}

function updateAllBlocks(){ // takes one from every numberGrid item
    var itemNumber = 0;
    numberGrid.forEach(function(item){
        if(item > 0){
            numberGrid.splice(itemNumber,1,item - 1);
        }
        itemNumber += 1;
    })
}

function createApple(){ // picks location and sets apple there
    var good = 'false';
    while(good == 'false'){
        appleX = Math.floor(Math.random() * width),
        appleY = Math.floor(Math.random() * height);
        if(numberGrid[(appleY * width) + appleX] == 0){
            good = 'true';
            numberGrid.splice((width * appleY) + appleX,1,-1);
        }
    }
}

setInterval(update, 140); // runs update() every 110ms
function update(){ // runs all functions and resets if dead, also sets scores, plays preview
    if(alive != true){
        grid = 'rendering...',
        direction = 'waiting',
        snakeX = 7,
        snakeY = 7,
        length = 1,
        numberGrid = Array(width * height).fill(0),
        alive = true,
        appleEaten = 'true',
        oldDirection = 'waiting',
        inputTaken = 'false',
        inputQueue = ['waiting'];
    }
    else{
        updateAllBlocks();
        updateSnake();
        if(appleEaten == 'true'){
            createApple();
            appleEaten = false;
        }
        if(preview == true){ // preview
            if(appleY < snakeY & inputQueue.includes('ArrowUp') == false){
                inputQueue.push('ArrowUp');
            }
            if(appleY > snakeY & inputQueue.includes('ArrowDown') == false){
                inputQueue.push('ArrowDown');
            }
            if(appleX < snakeX & inputQueue.includes('ArrowLeft') == false){
                inputQueue.push('ArrowLeft');
            }
            if(appleX > snakeX & inputQueue.includes('ArrowRight') == false){
                inputQueue.push('ArrowRight');
            }
        }
        render();
    }
    if(length - 1 > topScore){
        topScore = length - 1;
    }
    if(preview == false){
        D.getElementById('score').innerHTML = 'score: ' + (length - 1);
        D.getElementById('topScore').innerHTML = 'top: ' + topScore;
    }
    
    // un=comment if you want chaos
    // if(direction != 'waiting'){
    //     numberGrid.splice(numberGrid.length - 1,1);
    // }
}