// Sprite class
function Sprite({position : initPosition, dimensions, imageSrc, scale = 1, numFrames = 1, numSubFrames = 1, offset = {x : 0, y : 0}}) {
    this.position = initPosition;
    this.dimensions = dimensions;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.numFrames = numFrames;
    this.currentFrame = 0;
    this.numSubFrames = numSubFrames;
    this.subFramesCount = 0;
    this.offset = offset;
    this.repeat = true;
}

Sprite.prototype.update = function() {
    this.subFramesCount++;

    if (!(this.subFramesCount % this.numSubFrames)) {
        this.currentFrame++;
        if (this.currentFrame >= this.numFrames)
            if (this.repeat)
                this.currentFrame = 0;
            else
                this.currentFrame--;
    }
}

Sprite.prototype.draw = function() {
    context.drawImage(this.image,
                      this.dimensions.w / this.numFrames * this.currentFrame,
                      0,
                      this.dimensions.w / this.numFrames,
                      this.dimensions.h,
                      this.position.x - this.offset.x, 
                      this.position.y - this.offset.y, 
                      this.dimensions.w / this.numFrames * this.scale, 
                      this.dimensions.h * this.scale, 
                      );
}

// Fighter class
function Fighter({facingDirection = 'right', position : initPosition, dimensions, velocity : initVelocity, attackBoxDimensions, attackBoxOffset = {x : 0, y : 0}, sprites}) {
    this.dimensions = dimensions;
    this.position = initPosition;
    this.velocity = initVelocity;
    
    this.sprites = sprites;
    
    for (const [key, value] of Object.entries(this.sprites))
        sprites[key].position = this.position;
    
    this.setSprite('idle');
    
    this.inAir = false;
    this.attacking = false;
    this.hit = false;
    this.facingDirection = facingDirection;

    this.health = 40;
    this.dead = false;

    this.lastKeyPressed;

    this.attackBox = {
        position : {x : this.position.x, y : this.position.y}, 
        dimensions : attackBoxDimensions, 
        offset : attackBoxOffset
    }
}

Fighter.prototype.setSprite = function(sprite, repeat = true) {
    this.currentSprite = this.sprites[sprite];
    this.currentSprite.currentFrame = 0;
    this.currentSprite.subFramesCount = 0;
    this.currentSprite.repeat = repeat;
}

const gravity = 0.05;
const groundOffset = 97;

Fighter.prototype.update = function() {
    // update physics
    this.velocity.y += gravity;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // update collisions
    if (this.position.x < 0)
        this.position.x = 0;
    if (this.position.x + this.dimensions.w > canvas.width)
        this.position.x = canvas.width - this.dimensions.w;

    if (this.position.y < 0)
        this.position.y = 0;
    if (this.position.y + this.dimensions.h > canvas.height - groundOffset)
    {
        this.position.y = canvas.height - groundOffset - this.dimensions.h;
        this.velocity.y = 0;

        if (this.inAir)
            this.inAir = false;
    }

    // update state
    if (this.facingDirection === 'right') {
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    }
    else { // this.facingDirection === 'left'
        this.attackBox.position.x = this.position.x - (this.attackBox.dimensions.w - this.dimensions.w) - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    }

    // update sprite animation
    this.currentSprite.update();
}

Fighter.prototype.draw = function() {
    // context.fillStyle = 'blue';
    // context.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h);

    // if (this.attacking) {
    //     context.fillStyle = 'red';
    //     context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.dimensions.w, this.attackBox.dimensions.h);
    // }

    this.currentSprite.draw();
}