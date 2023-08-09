let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let ctx;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;


window.onload = function ()
    {
      board = document.getElementById('board');
      board.height = rows * blockSize;
      board.width = cols * blockSize;
      ctx = board.getContext('2d');
      generateFood();
      document.addEventListener('keyup', changeDirection);
      update();
      setInterval(update, 100);
    }

    function update()
    {
      if(gameOver) return;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, board.width, board.height);

      ctx.fillStyle = 'red';
      ctx.fillRect(foodX, foodY, blockSize, blockSize);

      if(snakeX === foodX && snakeY === foodY)
      {
        snakeBody.push([foodX, foodY])
        generateFood()
      }

      for(let i = snakeBody.length - 1; i > 0; i --)
      {
        snakeBody[i] = snakeBody[i - 1];
      }

      if(snakeBody.length)
      {
        snakeBody[0] = [snakeX, snakeY];
      }

      ctx.fillStyle = 'lime';
      snakeX += velocityX * blockSize;
      snakeY += velocityY * blockSize;
      ctx.fillRect(snakeX, snakeY, blockSize, blockSize);
      for(let i = 0; i < snakeBody.length; i ++)
      {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
      }  

      if(snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize)
      {
        gameOver = true;
        alert('Game Over')
      }

      for(let i = 0; i < snakeBody.length; i ++)
      {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1])
        {
          gameOver = true;
          alert('Game Over')
        }
      }
    }

    function generateFood ()
    {
      foodX = Math.floor(Math.random() * cols) * blockSize;
      foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    function changeDirection (e)
    {
      if(e.key === 'ArrowUp' && velocityY !== 1)
      {
        velocityX = 0;
        velocityY = -1;
      }
      else if(e.key === 'ArrowDown' && velocityY !== -1)
      {
        velocityX = 0;
        velocityY = 1;
      }
      else if(e.key === 'ArrowLeft' && velocityX !== 1)
      {
        velocityX = -1;
        velocityY = 0;
      }
      else if(e.key === 'ArrowRight' && velocityX !== -1)
      {
        velocityX = 1;
        velocityY = 0;
      }
    }