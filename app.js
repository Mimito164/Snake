document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0]; // el 2 es la cabeza y el 0 es la cola de la serpiente

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    function startGame() {
        currentSnake.forEach((index) => { squares[index].classList.remove('snake')}); // borro la snake de todos los divs
        squares[appleIndex].classList.remove('apple'); // borro la apple
        clearInterval(interval); // termino el intervalo de tiempo 
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach((index) => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);

    }

    function moveOutcomes() {
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || // choco abajo
            (currentSnake[0] % width === width -1 && direction === 1) || // choco a la drecha
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            (squares[currentSnake[0] + direction].classList.contains('snake'))
        ){
            return clearInterval(interval);
        }
        
        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction);
        
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            
        }

        squares[currentSnake[0]].classList.add('snake');

    }

    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake'));
        squares[appleIndex].classList.add('apple');
    }


    function control(e) {
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39) {
            direction = 1; //derecha
        } else if(e.keyCode === 38) {
            direction = -width; //arriba
        } else if(e.keyCode === 37) {
            direction = -1; //izquierda
        } else if(e.keyCode === 40) {
            direction = +width; //abajo
        }
        
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);


});