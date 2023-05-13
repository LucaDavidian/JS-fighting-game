const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

clearScreen = function() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

const background = new Sprite({position : {x : 0, y : 0}, dimensions : { w : canvas.width, h : canvas.height}, imageSrc : './assets/background.png'});
const shop = new Sprite({position : {x : 630, y : 160}, dimensions : {w : 708, h : 128}, scale : 2.5, numFrames : 6, imageSrc : './assets/shop.png', numSubFrames : 15});

const samuraiIdle = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 1600, h : 200}, scale : 2, numFrames : 8, imageSrc : './assets/samuraiMack/Idle.png', numSubFrames : 15});
const samuraiRun = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 1600, h : 200}, scale : 2, numFrames : 8, imageSrc : './assets/samuraiMack/Run.png', numSubFrames : 15});
const samuraiJump = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 400, h : 200}, scale : 2, numFrames : 2, imageSrc : './assets/samuraiMack/Jump.png', numSubFrames : 15});
const samuraiFall = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 400, h : 200}, scale : 2, numFrames : 2, imageSrc : './assets/samuraiMack/Fall.png', numSubFrames : 15});
const samuraiAttack1 = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 1200, h : 200}, scale : 2, numFrames : 6, imageSrc : './assets/samuraiMack/Attack1.png', numSubFrames : 15});
const samuraiAttack2 = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 1200, h : 200}, scale : 2, numFrames : 6, imageSrc : './assets/samuraiMack/Attack2.png', numSubFrames : 15});
const samuraiHit = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 800, h : 200}, scale : 2, numFrames : 4, imageSrc : './assets/samuraiMack/Take Hit.png', numSubFrames : 15});
const samuraiDeath = new Sprite({offset : {x : 200 - 50, y : 200 - 67}, dimensions : {w : 1200, h : 200}, scale : 2, numFrames : 6, imageSrc : './assets/samuraiMack/Death.png', numSubFrames : 15});

const kenjiIdle = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 800, h : 200}, scale : 2, numFrames : 4, imageSrc : './assets/kenji/Idle.png', numSubFrames : 15});
const kenjiRun = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 1600, h : 200}, scale : 2, numFrames : 8, imageSrc : './assets/kenji/Run.png', numSubFrames : 20});
const kenjiJump = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 400, h : 200}, scale : 2, numFrames : 2, imageSrc : './assets/kenji/Jump.png', numSubFrames : 15});
const kenjiFall = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 400, h : 200}, scale : 2, numFrames : 2, imageSrc : './assets/kenji/Fall.png', numSubFrames : 15});
const kenjiAttack1 = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 800, h : 200}, scale : 2, numFrames : 4, imageSrc : './assets/kenji/Attack1.png', numSubFrames : 15});
const kenjiAttack2 = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 800, h : 200}, scale : 2, numFrames : 4, imageSrc : './assets/kenji/Attack2.png', numSubFrames : 15});
const kenjiHit = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 600, h : 200}, scale : 2, numFrames : 3, imageSrc : './assets/kenji/Take hit.png', numSubFrames : 15});
const kenjiDeath = new Sprite({offset : {x : 200 - 30, y : 200 - 55}, dimensions : {w : 1400, h : 200}, scale : 2, numFrames : 7, imageSrc : './assets/kenji/Death.png', numSubFrames : 15});

const player = new Fighter({sprites : {idle : samuraiIdle, run : samuraiRun, jump : samuraiJump, fall : samuraiFall, attack1 : samuraiAttack1, attack2 : samuraiAttack2, hit : samuraiHit, death : samuraiDeath}, position : {x : 0, y : 0}, velocity : {x : 0, y : 0}, dimensions : {w : 80, h : 110}, attackBoxDimensions : {w : 100, h : 50}, attackBoxOffset : {x : 130, y : 20}});
const enemy = new Fighter({facingDirection : 'left', sprites : {idle : kenjiIdle, run : kenjiRun, jump : kenjiJump, fall : kenjiFall, attack1 : kenjiAttack1, attack2 : kenjiAttack2, hit : kenjiHit, death : kenjiDeath}, dimensions : {w : 70, h : 110}, position : {x : 500, y : 300}, velocity : {x : 0, y : 0}, attackBoxDimensions : {w : 100, h : 50}, attackBoxOffset : {x : 100, y : 20}});

// main loop
function loop() {
    window.requestAnimationFrame(loop);
    
    // process input
    if (!player.hit)
        player.velocity.x = 0;

    if (!player.dead && !player.hit && keys.a && player.lastKeyPressed === 'a' && !player.attacking) {
        player.velocity.x = -1;
        player.facingDirection = 'left';
    }
    if (!player.dead && !player.hit && keys.d && player.lastKeyPressed === 'd' && !player.attacking) {
        player.velocity.x = 1;
        player.facingDirection = 'right';
    }
    if (!player.dead && !player.hit && keys.w && !player.inAir && !player.attacking) {
        player.inAir = true;
        player.velocity.y -= 4;
        keys.w = false;
    }
    if (!player.dead && !player.hit && keys.space && !player.attacking && !player.inAir) {
        player.attacking = true;
        //setTimeout(() => { player.attacking = false; }, 800);
        keys.space = false;
    }

    if (!enemy.hit)
        enemy.velocity.x = 0;

    if (!enemy.dead && !enemy.hit && keys['arrow left'] && enemy.lastKeyPressed === 'arrow left' && !enemy.attacking) {
        enemy.velocity.x = -1;
        enemy.facingDirection = 'left';
    }
    if (!enemy.dead && !enemy.hit && keys['arrow right'] && enemy.lastKeyPressed === 'arrow right' && !enemy.attacking) {
        enemy.velocity.x = 1;
        enemy.facingDirection = 'right';
    }
    if (!enemy.dead && !enemy.hit && keys['arrow up'] && !enemy.inAir && !enemy.attacking) {
        enemy.inAir = true;
        enemy.velocity.y -= 4;
        keys.w = false;
    }
    if (!enemy.dead && !enemy.hit && keys['arrow down'] && !enemy.attacking && !enemy.inAir) {
        enemy.attacking = true;
        //setTimeout(() => { enemy.attacking = false; }, 800);
        keys.space = false;
    }

    // set sprite animation
    if (!player.dead && !player.hit && !player.attacking && player.inAir && player.currentSprite !== player.sprites.jump)
        player.setSprite('jump');
    if (!player.dead && !player.hit && player.attacking && !player.inAir && player.currentSprite !== player.sprites.attack1) 
        player.setSprite('attack1');
    if (!player.dead && !player.hit && !player.attacking && player.velocity.y > 0 && player.currentSprite !== player.sprites.fall)
        player.setSprite('fall');
    if (!player.dead && !player.hit && !player.attacking && player.velocity.y === 0) 
        if (player.velocity.x === 0 && player.currentSprite !== player.sprites.idle)
            player.setSprite('idle');
        else if (player.velocity.x !== 0 && player.currentSprite !== player.sprites.run)
            player.setSprite('run');

    if (!enemy.dead && !enemy.hit && !enemy.attacking && enemy.inAir && enemy.currentSprite !== enemy.sprites.jump)
        enemy.setSprite('jump');
    if (!enemy.dead && !enemy.hit && enemy.attacking && !enemy.inAir && enemy.currentSprite !== enemy.sprites.attack1) 
        enemy.setSprite('attack1');
    if (!enemy.dead && !enemy.hit && !enemy.attacking && enemy.velocity.y > 0 && enemy.currentSprite !== enemy.sprites.fall)
        enemy.setSprite('fall');
    if (!enemy.dead && !enemy.hit && !enemy.attacking && enemy.velocity.y === 0) 
        if (enemy.velocity.x === 0 && enemy.currentSprite !== enemy.sprites.idle)
            enemy.setSprite('idle');
        else if (enemy.velocity.x !== 0 && enemy.currentSprite !== enemy.sprites.run)
            enemy.setSprite('run');

    // update state
    if (player.attacking && player.sprites.attack1.currentFrame >= player.sprites.attack1.numFrames - 1)
        player.attacking = false;

    if (player.hit && player.sprites.hit.currentFrame >= player.sprites.hit.numFrames - 1)
        player.hit = false;

    if (enemy.attacking && enemy.sprites.attack1.currentFrame >= enemy.sprites.attack1.numFrames - 1)
        enemy.attacking = false;

    if (enemy.hit && enemy.sprites.hit.currentFrame >= enemy.sprites.hit.numFrames - 1)
        enemy.hit = false;

    shop.update();
    player.update();
    enemy.update();
    
    if (player.attacking && player.currentSprite.currentFrame === 4)
        if (player.facingDirection === 'right' &&
            player.attackBox.position.x + player.attackBox.dimensions.w >= enemy.position.x &&
            player.attackBox.position.x <= enemy.position.x + enemy.dimensions.w &&
            player.attackBox.position.y + player.attackBox.dimensions.h >= enemy.position.y &&
            player.attackBox.position.y <= enemy.position.y + enemy.dimensions.h ||
            player.facingDirection === 'left' &&
            player.attackBox.position.x <= enemy.position.x + enemy.dimensions.w &&
            player.attackBox.position.x + player.attackBox.dimensions.w >= enemy.position.x &&
            player.attackBox.position.y + player.attackBox.dimensions.h >= enemy.position.y &&
            player.attackBox.position.y <= enemy.position.y + enemy.dimensions.h) {
                if (!enemy.dead && enemy.currentSprite !== enemy.sprites.hit) {
                    enemy.velocity.x = player.facingDirection === 'right' ? 0.5 : -0.5;
                    enemy.hit = true;
                    enemy.health -= 20;

                    if (enemy.health <= 0) {
                        enemy.setSprite('death', false);
                        enemy.dead = true;
                    }
                    else
                        enemy.setSprite('hit');
                }
            }

    if (enemy.attacking && enemy.currentSprite.currentFrame === 2)
        if (enemy.facingDirection === 'right' &&
            enemy.attackBox.position.x + enemy.attackBox.dimensions.w >= player.position.x &&
            enemy.attackBox.position.x <= player.position.x + enemy.dimensions.w &&
            enemy.attackBox.position.y + enemy.attackBox.dimensions.h >= player.position.y &&
            enemy.attackBox.position.y <= player.position.y + player.dimensions.h ||
            enemy.facingDirection === 'left' &&
            enemy.attackBox.position.x <= player.position.x + player.dimensions.w &&
            enemy.attackBox.position.x + enemy.attackBox.dimensions.w >= player.position.x &&
            enemy.attackBox.position.y + enemy.attackBox.dimensions.h >= player.position.y &&
            enemy.attackBox.position.y <= player.position.y + player.dimensions.h) {
                if (!player.dead && player.currentSprite !== player.sprites.hit) {
                    player.velocity.x = enemy.facingDirection === 'right' ? 0.5 : -0.5;
                    player.hit = true;
                    player.health -= 20;

                    if (player.health <= 0) {
                        player.setSprite('death', false);
                        player.dead = true;
                    }
                    else
                        player.setSprite('hit');
                }
            }
    
    // draw
    clearScreen();
    background.draw();
    shop.draw();
    context.fillStyle = 'rgba(255, 255, 255, 0.1';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    enemy.draw();

    if (enemy.dead) {
        context.fillStyle = 'white';
        context.font = '60px';
        context.fillText('YOU WIN!', canvas.width / 2 - 100, canvas.height / 2);
    }
    else if (player.dead) {
        context.fillStyle = 'white';
        context.font = '60px';
        context.fillText('YOU LOSE!', canvas.width / 2 - 100, canvas.height / 2);    
    }
}

const keys = {
    a : false,
    d : false,
    w : false,
    space : false,
    ['arrow left'] : false,
    ['arrow right'] : false,
    ['arrow up'] : false,
    ['arrow down'] : false,
};

loop();

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        // player input
        case 'd':
            if (event.repeat) break;
            keys.d = true;
            player.lastKeyPressed = 'd';
            break;

        case 'a':
            if (event.repeat) break;
            keys.a = true;
            player.lastKeyPressed = 'a';
            break;

        case 'w':
            if (event.repeat) break;
            keys.w = true;
            break;

        case ' ':
            if (event.repeat) break;
            keys.space = true;
            break;
        
        // enemy input
        case 'ArrowRight':
            if (event.repeat) break;
            keys['arrow right'] = true;
            enemy.lastKeyPressed = 'arrow right';
            break;

        case 'ArrowLeft':
            if (event.repeat) break;
            keys['arrow left'] = true;
            enemy.lastKeyPressed = 'arrow left';
            break;

        case 'ArrowUp':
            if (event.repeat) break;
            keys['arrow up'] = true;
            break;

        case 'ArrowDown':
            if (event.repeat) break;
            keys['arrow down'] = true;
            break;
    }
});

window.addEventListener('keyup', function(event) {
    switch (event.key) {
        // player input
        case 'd':
            keys.d = false;
            if (keys.a)
                player.lastKeyPressed = 'a';
            break;
        
        case 'a':
            keys.a = false;
            if (keys.d)
                player.lastKeyPressed = 'd';
            break;
        
        case 'w':
            keys.w = false;
            break;

        case ' ': 
            keys.space = false;
            break;

        // enemy input
        case 'ArrowRight':
            keys['arrow right'] = false;
            if (keys['arrow left'])
                enemy.lastKeyPressed = 'arrow left';
            break;

        case 'ArrowLeft':
            keys['arrow left'] = false;
            if (keys['arrow right'])
                enemy.lastKeyPressed = 'arrow right';
            break;

        case 'ArrowUp':
            keys['arrow up'] = false;
            break;

        case 'ArrowDown':
            keys['arrow down'] = false;
            break;
    }
});