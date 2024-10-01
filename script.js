// Check if the user is on a mobile device
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Redirect to the mobile page if on a mobile device
if (isMobile()) {
    window.location.href = 'mobile.html'; // Replace 'mobile.html' with your mobile page URL
}
 

let activekeyboard = 1; // index of the active keyboard
activekeyboard = Math.floor(Math.random() * 3) + 1;
let firsttime = true;
let gameisvisible = false;
    let ww = window.innerWidth;
let margins = `${(ww - 1400) / 2}px`;
    
let lastInteractionTime = Date.now(); // Initialize with the current time

// Function to update the last interaction time
function updateLastInteractionTime() {
    lastInteractionTime = Date.now();
}


    // console.log(margins);
    const keys = document.getElementsByClassName('key');
    const popups = document.getElementsByClassName('popup');
    const popupImgs = document.getElementsByClassName('popup-img');
    const infoPositions = [ {top: '227px', left: '300px'},
        { top: '100px', left: '300px' }, { top: '100px', left: '300px' },
        { top: '227px', left: '300px' }];
     const infoColors = ['rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0)',
         'rgba(255, 255, 255)', 'rgba(255, 255, 255, 0.8)' ];
const bgColors = ['#FF3333', '#ECE2CE', '#3B3641', '#FF3333'];
     const keyPositions = [
            // keyboard 1
           [ { id: 'Rkey', top: '360px', left: '505px' },
            { id: 'Lkey', top: '400px', left: '805px' },
            { id: 'Mkey', top: '450px', left: '675px' },
            { id: 'Zkey', top: '450px', left: '385px' },
            { id: 'Bkey', top: '450px', left: '585px' },
            { id: 'Akey', top: '400px', left: '370px' },
            { id: 'Pkey', top: '360px', left: '845px' },
            { id: 'Returnkey', top: '400px', left: '945px', width: '90px' }],
         // keyboard 2
            [{ id: 'Rkey', top: '280px', left: '560px' },
             { id: 'Lkey', top: '350px', left: '830px' },
             { id: 'Mkey', top: '410px', left: '732px' },
             { id: 'Zkey', top: '410px', left: '420px' },
             { id: 'Bkey', top: '410px', left: '610px' },
             { id: 'Akey', top: '350px', left: '395px' },
             { id: 'Pkey', top: '280px', left: '880px' },
             { id: 'Returnkey', top: '350px', left: '1030px', width: '90px' }],
             // keyboard 3
         [{ id: 'Rkey', top: '295px', left: '507px' },
             { id: 'Lkey', top: '355px', left: '875px' },
             { id: 'Mkey', top: '415px', left: '785px' },
             { id: 'Zkey', top: '415px', left: '370px' },
             { id: 'Bkey', top: '415px', left: '610px' },
             { id: 'Akey', top: '355px', left: '340px' },
             { id: 'Pkey', top: '295px', left: '925px' },
             { id: 'Returnkey', top: '355px', left: '1060px', width: '90px' }],
         // keyboard 4 === keyvoard 1
         [{ id: 'Rkey', top: '360px', left: '505px' },
             { id: 'Lkey', top: '400px', left: '805px' },
             { id: 'Mkey', top: '450px', left: '675px' },
             { id: 'Zkey', top: '450px', left: '385px' },
             { id: 'Bkey', top: '450px', left: '585px' },
             { id: 'Akey', top: '400px', left: '370px' },
             { id: 'Pkey', top: '360px', left: '845px' },
             { id: 'Returnkey', top: '400px', left: '945px', width: '90px' }],
        ];

     function positionKeys() {
            for (const pos of keyPositions[activekeyboard-1]) {
                const key = document.getElementById(pos.id);
                let xoffset = parseInt(pos.left) + parseInt(margins);
                key.style.top = pos.top;
                key.style.left = `${xoffset}px`;
               
                if (pos.width) {
                    key.style.width = pos.width; // Set width if specified
                }
                const infotext = document.getElementById('infotext');
                let xtextoffset = parseInt(infoPositions[activekeyboard-1].left) + parseInt(margins);
                infotext.style.left = `${xtextoffset}px`;
                infotext.style.top = infoPositions[activekeyboard-1].top;
                infotext.style.color = infoColors[activekeyboard-1];
            }
        }

    positionKeys();

    function swapBackgroundImage() {
        const keyboardImage = document.querySelector('.keyboard-image'); // Select the keyboard image
        const newImageUrl = `img/keyboard${activekeyboard}.jpg`; // Construct the new image URL
        keyboardImage.src = newImageUrl; // Update the image source
        ww = window.innerWidth;
        margins = `${(ww - 1400) / 2}px`;
        keyboardImage.style.marginLeft = margins;
        positionKeys();
        updateLastInteractionTime();
        const keyboardcontainer = document.getElementById('keyboard-container');
        keyboardcontainer.style.backgroundColor = bgColors[activekeyboard-1];
    }

     function preloadImages() {
            for (let key of keys) {
                const imgSrc = key.getAttribute('data-image');
                if (imgSrc) {
                const img = new Image();
                img.src = imgSrc;
            }
            }
         const gameimg = new Image();
         gameimg.src = 'img/game1'; 
    }

  

    preloadImages();
    let popupTimers = {};
    let currentLink = '';
    // activekeyboard = 3; // REMOVE LATER
     swapBackgroundImage(); 

    // const popup = document.getElementById('popup');
    // const popupImg = document.getElementById('popup-img');
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const popup = popups[i];
        const popupImg = popupImgs[i];
        // console.log(popup.id);
        key.addEventListener('mouseover', (event) => {
            if (popupTimers[i] !== undefined) {
                clearTimeout(popupTimers[i]);
            }
            updateLastInteractionTime()
            // Get the position of the key
            const rect = key.getBoundingClientRect();
            const infoText = key.getAttribute('data-info-text');
            updateInfoText(infoText);
            // Set the image source and show the popup
            const imgSrc = key.getAttribute('data-image');
            const link = key.getAttribute('data-link');
            popupImg.src = imgSrc;
            currentLink = link;
            popup.style.display = 'block';
            popup.style.left = `${parseInt(keyPositions[activekeyboard-1][i].left)+parseInt(margins) + 40}px`;
            popup.style.top = `${parseInt(keyPositions[activekeyboard-1][i].top) - 100}px`;
            // popup.style.opacity = 1;
            popupTimers[i] = setTimeout(() => {
                popup.offsetHeight;
                popup.classList.add('show');
            }, 100);
        });

         key.addEventListener('mouseout', () => {
             
            popupTimers[i] = setTimeout(() => {
                popup.classList.remove('show');
                popup.style.display = 'none';
                updateInfoText('');
            }, 200);
             updateLastInteractionTime()
        });
        key.addEventListener('click', () => {
            if (currentLink) {
                window.open(currentLink, '_blank');
            }
            updateLastInteractionTime()
        });

        popup.addEventListener('mouseout', () => {
            // Set a timer to hide the popup after 2 seconds
            popupTimers[i] = setTimeout(() => {
                popup.classList.remove('show');
                popup.style.display = 'none';
                updateInfoText('');
            }, 200);
            updateLastInteractionTime()
        });

        popup.addEventListener('mouseover', () => {
            clearTimeout(popupTimers[i]);
            popup.classList.add('show');
            updateLastInteractionTime()
        });

         popup.addEventListener('click', () => {
            if (currentLink) {
                window.open(currentLink, '_blank');
            }
             updateLastInteractionTime()
        });
    }

    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (key === ' ') {
            event.preventDefault(); // Prevent default action for spacebar
        }
        if (key === 'r') {
            showPopup('Rpopup');
        } else if (key === 'l') {
            showPopup('Lpopup');
        } else if (key === 'm') {
            showPopup('Mpopup');
        } else if (key === 'z') {
            showPopup('Zpopup');
        } else if (key === 'b') {
            showPopup('Bpopup');
        } else if (key === 'a') {
            showPopup('Apopup');
        } else if (key === 'p') {
            showPopup('Ppopup');
        } else if (key === 'enter') {
            showPopup('Returnpopup');
        }
        if (key === '1') {  
            activekeyboard = 1;
            swapBackgroundImage();
        } else if (key === '2') {
            activekeyboard = 2;
            swapBackgroundImage();
        } else if (key === '3') {
            activekeyboard = 3;
            swapBackgroundImage();
        } else if (key === '4') {
            activekeyboard = 4;
            swapBackgroundImage();
        }
        if (key === '?' || key === '/') {
            text = 'b = bio, enter = links & socials, use your mouse or keyboard to explore'
            updateInfoText(text) 
        }
        if (key === 'g' && !gameisvisible) {
            const gamePopup = document.getElementById('game-popup');
            ww = window.innerWidth;
            gameMargins = `${(ww - 580) / 2}px`;
            gamePopup.style.left = gameMargins;
            gamePopup.style.display = 'block';
            gameisvisible = true;
            updateLastInteractionTime()
            startGame();
        }
    });

    
    function showPopup(popupId) {
        updateLastInteractionTime()
            // const keys = document.getElementsByClassName('key');
            const popup = document.getElementById(popupId);
            // const popupImg = popup.querySelector('.popup-img');
            const key = document.getElementById(popupId.replace('popup', 'key'));
            let index=0;
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].id === key.id) { index =i; break; }
            }
            popupImg = popupImgs[index];
            //  if (popupTimers[index] !== undefined) {
            //     clearTimeout(popupTimers[index]);
            // }
            const imgSrc = key.getAttribute('data-image');
            const link = key.getAttribute('data-link');
            popupImg.src = imgSrc;
            currentLink = link;
            const infoText = key.getAttribute('data-info-text');
            updateInfoText(infoText);   
            
            popup.style.display = 'block';
            popup.style.left = `${parseInt(keyPositions[activekeyboard-1][index].left)+parseInt(margins) + 40}px`;
            popup.style.top = `${parseInt(keyPositions[activekeyboard-1][index].top) - 100}px`;
            popup.offsetHeight; // Force reflow
            popup.classList.add('show');
            // popupTimers[index] = setTimeout(() => {
            //     popup.offsetHeight;
            //     popup.classList.add('show');
            // }, 100);
            popupTimers[index] = setTimeout(() => {
            popup.classList.remove('show');
            popup.style.display = 'none';
            updateInfoText('');
        }, 3000);
        }

    function updateInfoText(text) {
        const infotext = document.getElementById('infotext');
        infotext.textContent = text;
        infotext.style.display = 'block';
        // const maskedText = '#'.repeat(text.length);
        // infotext.textContent = maskedText; // Set initial masked text
        if (text === '') {
            infotext.style.display = 'none';
        }
        // let index = 0; // Initialize index for character display
        // const interval = setInterval(() => {
        //     if (index < text.length) {
        //         infotext.textContent = text.substring(0, index) + text[index] + maskedText.substring(index + 1);
        //         index++;
        //     } else {
        //         clearInterval(interval); // Clear interval when done
        //     }
        // }, 15); // Adjust the interval time as needed
    }

    document.getElementById('settings').addEventListener('mouseover', () => {
            // Your JavaScript code here
            // activekeyboard += 1;
            // if (activekeyboard > 3) { activekeyboard = 1; }
            // swapBackgroundImage();
            text = 'b = bio, enter = links & socials, use your mouse or keyboard to explore'
            updateInfoText(text) 
        });
        document.getElementById('changer').addEventListener('click', () => {
               
                activekeyboard += 1;
                if (activekeyboard > 3) { activekeyboard = 1; }
                swapBackgroundImage();
                // text = 'b = bio, enter = links & socials, use your mouse or keyboard to explore'
                // updateInfoText(text)
            });

    window.onresize = function () {
        let ww = window.innerWidth;
        let margins = `${(ww - 1400) / 2}px`;
        
        swapBackgroundImage();
    };



// function triggerFunctionAtRandomIntervals() {
    function randomThought() {
        texts = ['ai irl', 'art is code',
            'forever in electric dreams', 'generative nature',
            'the singularity will not be televised',
            'cryptocompatible', 'futureproof your dreams',
            'blockchaingang', 'multichain futurism',
            'existential exabytes']
        text = texts[Math.floor(Math.random() * texts.length)]
        updateInfoText(text)
        setTimeout(() => {
            updateInfoText('');
        }, 1000);
    }

    // Generate a random interval between 15 and 60 seconds (15000 to 60000 milliseconds)
    // const randomInterval = Math.floor(Math.random() * 60000) + 15000;
    // console.log(randomInterval);
    // Call the function
    // if (firsttime) {
    //     firsttime = false;
    // } else {
    //     const currentTime = Date.now();
        // const timeSinceLastInteraction = currentTime - lastInteractionTime; // Time in milliseconds
        // if (timeSinceLastInteraction / 1000 > 60) {
            // randomThought();
        // }
    // }

    // Set the next trigger
    // setTimeout(triggerFunctionAtRandomIntervals, randomInterval);
// }

setInterval(checkTimeSinceLastInteraction, 10000);

function checkTimeSinceLastInteraction() {
    const currentTime = Date.now();
    const timeSinceLastInteraction = currentTime - lastInteractionTime; // Time in milliseconds
    const r = Math.random();
    if (timeSinceLastInteraction / 1000 > 60
        && r > 0.65)
     {
        randomThought();
        // updateLastInteractionTime();
}
    // You can add any additional logic here based on the time since the last interaction
}







function startGame() {
   
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let gameimg = new Image();
    gameimg.src = 'img/game1.jpg'; 
    const gameInfo = document.getElementById('game-info');
    gameInfo.textContent = 'use arrows to play - level 1';
    // Game variables
    let level = 1;
    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = (2+(Math.random()-0.5)*0.2)*(Math.random()<0.5?1:-1);
    let dy = -2+(Math.random()-0.5)*0.2;
    let paddleHeight = 10;
    let paddleWidth = 114; // 120
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 4;
    let brickColumnCount = 5;
    let brickWidth = 95;
    let brickHeight = 35; // 71
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    let lastFrameTime = Date.now();

    // Event listeners for paddle movement
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = true;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = false;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = false;
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        

        //  gameimg.onload = function () {
            const imgWidth = gameimg.width;
            const imgHeight = gameimg.height;
            // const brickWidth = imgWidth / brickColumnCount;
            // const brickHeight = imgHeight / brickRowCount;

            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;

                        // Calculate the source rectangle for the current brick
                        let srcX = c * brickWidth;
                        let srcY = r * brickHeight;

                        // Draw the brick using the slice of the image
                        ctx.drawImage(gameimg, srcX, srcY, brickWidth, brickHeight, brickX, brickY, brickWidth, brickHeight);
                    }
                }
            }
        // };
    }
    let isGameRunning = true;

    function draw() {
        if (!isGameRunning) {
            return;
        }
        const currentFrameTime = Date.now();
        const deltaTime = (currentFrameTime - lastFrameTime) / (10-level); // Time difference in seconds
        lastFrameTime = currentFrameTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        if (x + dx * deltaTime > canvas.width - ballRadius || x + dx * deltaTime < ballRadius) {
            dx = -dx;
        }
        if (y + dy * deltaTime < ballRadius) {
            dy = -dy;
        } else if (y + dy * deltaTime > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                dx = dx + (Math.random() - 0.5) * 0.1;
            } else {
                // game over LOST
                dx = dy = 0;
                const gameInfo = document.getElementById('game-info');
                gameInfo.textContent = '*** game over :-( ***';
                x = canvas.width / 2;
                y = -100;
                isGameRunning = true;
                setTimeout(() => {
                    // gameInfo.textContent = 'level 1';
                    const gamePopup = document.getElementById('game-popup');
                    gamePopup.style.display = 'none';
                    isGameRunning = false; // Stop the game loop
                    gameisvisible = false;
                    // return; // Exit the function
                }, 2000);
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7 * deltaTime*0.6;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7 * deltaTime*0.6;
        }

        x += dx * deltaTime;
        y += dy * deltaTime;
        requestAnimationFrame(draw);
    }

    function collisionDetection() {
        let allBricksDestroyed = true;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status == 1) {
                    allBricksDestroyed = false; // not all bricks destroyed
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                    }
                }
            }
        }
        if (allBricksDestroyed) {
           
            const gamePopup = document.getElementById('game-popup');
            const gameInfo = document.getElementById('game-info');
            
            if (level === 1) {
                gameimg.src = 'img/game2.jpg';
                level = 2;
                gameInfo.textContent = 'level 2';
            } else if (level === 2) {
                gameimg.src = 'img/game3.jpg';
                level = 3;
                gameInfo.textContent = 'level 3';
            } else if (level === 3) {
                gameover();
                return;
            }
            for (let c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = dy = 0;
            paddleWidth = paddleWidth -20;
            // isGameRunning = false;
            setTimeout(() => {
                
                dx = (2 + (Math.random() - 0.5) * 0.2) * (Math.random() < 0.5 ? 1 : -1);
                dy = -2 + (Math.random() - 0.5) * 0.2;
                // isGameRunning = true; // Restart the game loop
                // draw(); // Start drawing again
            }, 1000);
        }
    }
    function gameover() { // comment out
        const gameInfo = document.getElementById('game-info');
        gameInfo.textContent = 'game over -- YOU WIN!';
        dx = dy = 0;
        isGameRunning = true;
        setTimeout(() => {
            const gameInfo = document.getElementById('game-info');
            gameInfo.textContent = 'level 1';
            const gamePopup = document.getElementById('game-popup');
            gamePopup.style.display = 'none';
            isGameRunning = false; // Stop the game loop
            gameisvisible = false;
            return; // Exit the function
        }, 2000);
       
    }

    draw();
}