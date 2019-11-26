

const FPS = 30;
const BODY_WIDTH = 3;
let CLOUD_SPEED = 40;
let TOPO_SPEED = 40;
let DASH_SPEED = 100;
const APPENDAGE_SPEED = .035;
const GRAVITY = 5;
let JUMP_FRAMES = 0;
const JUMP_VELOCITY = 60;
const EDDY_BOOST = 1;
let LOSS_FRAMES = 0;
let WIN_FRAMES = 0;


let can = document.getElementById("gameCanvas");
let ctx = can.getContext("2d");
let faceCan = document.getElementById("faceCanvas");
let faceCtx = faceCan.getContext("2d");
let mooseCan = document.getElementById("mooseCanvas");
let mooseCtx = mooseCan.getContext("2d");

// faceCtx.fillStyle = "Yellow";
// faceCtx.fillRect(0, 0, faceCan.width, faceCan.height);

let width = can.width = window.innerWidth - 20;
let height = can.height = window.innerHeight - 20;

const DASH_Y = can.height / 1.3 + can.height / 12;

function toRadians(deg){
    return ((deg / 180) * Math.PI);
}


class Person{

    constructor(img, x, y,sadImg){
        this.src = img;
        this.sadSrc = sadImg;
        this._x = x;
        this._y = y;
        this._running = false;
        this._leftFoot = .26;
        this._leftKnee = .26;
        this._rightKnee = .74;
        this._rightFoot = .74;
        this._leftShoulder = .26;
        this._leftElbow = .74;
        this._rightShoulder = .74;
        this._rightElbow = .26;
        this._leftDirection = true;
        this._rightDirection = true;
        this._jumping = false;
        this._baselineY = y;
        this._lost = false;
        this._won = false;

        let image = new Image()
        image.src = img;
        image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)}

        let sadImage = new Image()
        sadImage.src = sadImg;
        
        this._image = image;
        faceCtx.drawImage(image,0,0);

        // faceCtx.fillStyle = "Yellow";
        // faceCtx.fillRect(0, 0, faceCan.width, faceCan.height);

        this._face = faceCan;
        
    }

    emote(emotion){
        let image = new Image();
        image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)};
        if(emotion === "sad"){
            image.src = this.sadSrc;
            //image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)};
            faceCtx.clearRect(0, 0, this._face.width, this._face.height);
            faceCtx.drawImage(image,0,40);
        }
        else {
            image.src = this.src;
            //image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)};
            faceCtx.clearRect(0, 0, this._face.width, this._face.height);
            faceCtx.drawImage(image,0,0);
        }

    }

    lose(){
        this._lost = true;
        this.emote("sad");
        TOPO_SPEED = 0;
        DASH_SPEED = 0;
        CLOUD_SPEED = 0;
        this._baselineY = 5000;
        this._leftFoot = .26;
        this._leftKnee = .26;
        this._rightFoot = .74;
        this._rightKnee = .74;
        this._leftShoulder = 1;
        this._leftElbow = 1.25;
        this._rightShoulder = 0;
        this._rightElbow = 1.75;

    }

    win(){
        this._won = true;
        TOPO_SPEED = 0;
        DASH_SPEED = 0;
        CLOUD_SPEED = 0;
    }

    move(newX, newY){
        this._x = newX;
        this._y = newY;
    }

    draw(){

        let bodyWidth = 3;
        let neckLength = 30;
        let armLength = 80;
        //let lowerArm = 100;
        let legLength = 80;

        //let lowerLeg = 100;
        let bodyLength = 100;
        let legSpeed = APPENDAGE_SPEED;

        if(this._lost || this._won) this._running = false;

        if(this._jumping){
            //if(JUMP_FRAMES > 30) this._jumping = false;
            //if()
            // if(this._y >= this._baselineY){
            //     this._y = this._baselineY;
            //     this._jumping = false;
            // }

            this._y -= JUMP_VELOCITY - GRAVITY * JUMP_FRAMES;

        }

        if(this._y >= this._baselineY){
            this._y = this._baselineY;
            this._jumping = false;
        }

        if(this._running === true){

            this._rightElbow = 1.85;
            this._leftElbow = 1.85;

            this._leftKnee = .75;

            if(this._leftFoot >= .75 || this._leftFoot <= .25) {
                this._leftDirection = !this._leftDirection;
                
            }

            if(this._leftDirection) {
                this._leftFoot += legSpeed;
                this._leftShoulder += legSpeed;
                // if(this._leftFoot > .5){
                //     this._leftKnee += legSpeed;
                // }
            }
            else {
                this._leftFoot -= legSpeed;
                this._leftShoulder -= legSpeed;
            }


            if(this._rightFoot >= .75 || this._rightFoot <= .25) this._rightDirection = !this._rightDirection;

            if(this._rightDirection) {
                this._rightFoot -= legSpeed;
                this._rightShoulder -= legSpeed;
            }
            else {
                this._rightFoot += legSpeed;
                this._rightShoulder += legSpeed;
            }

            // if(this._leftShoulder >= .75 || this._leftShoulder <= .25) {
            //     this._leftDirection = !this._leftDirection;
                
            // }


        }else{
            if(this._lost){
                this._leftFoot = .26;
                this._leftKnee = .26;
                this._rightFoot = .74;
                this._rightKnee = .74;
                this._leftShoulder = 1;
                this._leftElbow = 1.25;
                this._rightShoulder = 0;
                this._rightElbow = 1.75;

            }else if(this._won){
                this._leftFoot = .26;
                this._leftKnee = .26;
                this._rightFoot = .74;
                this._rightKnee = .74;
                this._leftShoulder = 1.75;
                this._leftElbow = 1.75;
                this._rightShoulder = 1.25;
                this._rightElbow = 1.25;

            }else{
                this._leftFoot = .26;
                this._leftKnee = .26;
                this._rightFoot = .74;
                this._rightKnee = .74;
                this._leftShoulder = .26;
                this._leftElbow = .74;
                this._rightShoulder = .74;
                this._rightElbow = .26;

            }

            
        }

        //draw head
        //ctx.drawImage(this._image, this._x - (width / scaleX / 2), this._y - (height), width, height, this._x - width / 5, this._y - height, width / scaleX, height / scaleY);
        ctx.drawImage(this._face, this._x - this._face.width / 2, this._y - this._face.height)
        // draw body
        ctx.strokeStyle = "white";
        ctx.lineWidth = bodyWidth;
        let currentX = this._x; // + (width / scaleX) * 0.5;
        let currentY = this._y ;//+ (height / scaleY) - (height - (height / scaleY)) / 6;
        let previousX;
        let previousY;

        ctx.beginPath();
        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(
            currentX,
            currentY + neckLength
        );

        currentY = currentY + neckLength;

        ctx.moveTo(
            currentX,
            currentY
            );

        previousX = currentX;
        previousY = currentY;

        ctx.lineTo(      
            currentX + armLength * Math.cos(this._rightShoulder * Math.PI),
            currentY + armLength * Math.sin(this._rightShoulder * Math.PI),
            );

        currentX = currentX + armLength * Math.cos(this._rightShoulder * Math.PI);
        currentY = currentY + armLength * Math.sin(this._rightShoulder * Math.PI),

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + armLength * Math.cos(this._rightElbow * Math.PI),
            currentY + armLength * Math.sin(this._rightElbow * Math.PI),
            );           


        currentX = previousX;
        currentY = previousY;

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + armLength * Math.cos(this._leftShoulder * Math.PI),
            currentY + armLength * Math.sin(this._leftShoulder * Math.PI),
            );

        currentX = currentX + armLength * Math.cos(this._leftShoulder * Math.PI);
        currentY = currentY + armLength * Math.sin(this._leftShoulder * Math.PI),

        ctx.moveTo(
            currentX,
            currentY
            );   
            
        ctx.lineTo(      
            currentX + armLength * Math.cos(this._leftElbow * Math.PI),
            currentY + armLength * Math.sin(this._leftElbow * Math.PI),
            );


        currentX = previousX;
        currentY = previousY;

        ctx.moveTo(
            currentX,
            currentY
            );
 

        ctx.lineTo(      
            currentX,
            currentY + bodyLength
            );
        
        currentY =  currentY + bodyLength;
        previousY = currentY;
        previousX = currentX;

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._rightFoot * Math.PI),
            currentY + legLength * Math.sin(this._rightFoot * Math.PI),
            );

        currentX = currentX + legLength * Math.cos(this._rightFoot * Math.PI);
        currentY = currentY + legLength * Math.sin(this._rightFoot * Math.PI);


        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._rightKnee * Math.PI),
            currentY + legLength * Math.sin(this._rightKnee * Math.PI),
            );

        currentX = previousX;
        currentY = previousY;

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._leftFoot * Math.PI),
            currentY + legLength * Math.sin(this._leftFoot * Math.PI),
            );

        currentX = currentX + legLength * Math.cos(this._leftFoot * Math.PI);
        currentY = currentY + legLength * Math.sin(this._leftFoot * Math.PI);

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._leftKnee * Math.PI),
            currentY + legLength * Math.sin(this._leftKnee * Math.PI),
            );
        

        ctx.stroke();

    }

    jump(){
        if(!this._jumping){
            JUMP_FRAMES = 0;
            this._jumping = true;            
        }

    }
}

class Dog{

    constructor(img, x, y,sadImg){
        this.src = img;
        this.sadSrc = sadImg;
        this._x = x;
        this._y = y;
        this._running = false;
        this._leftFoot = .26;
        this._leftKnee = .26;
        this._rightKnee = .74;
        this._rightFoot = .74;
        this._leftShoulder = .26;
        this._leftElbow = 1;
        this._rightShoulder = 1;
        this._rightElbow = 1;
        this._leftDirection = true;
        this._rightDirection = true;
        this._jumping = false;
        this._baselineY = y;
        this.bodyRadX = 100;
        this.bodyRadY = 40;

        let image = new Image()
        image.src = img;
        image.onload = function(){mooseCtx.drawImage(image,0,0,1000,1500,0,50,mooseCan.width * 1.3, mooseCan.height * 1.3)}

        let sadImage = new Image()
        sadImage.src = sadImg;
        
        this._image = image;
        mooseCtx.drawImage(image,0,0,1000,1500,0,50,mooseCan.width * 1.3, mooseCan.height * 1.3);

        // faceCtx.fillStyle = "Yellow";
        // faceCtx.fillRect(0, 0, faceCan.width, faceCan.height);

        this._face = mooseCan;
        
    }

    // emote(emotion){
    //     let image = new Image();
    //     image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)};
    //     if(emotion === "sad"){
    //         image.src = this.sadSrc;
    //         //image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)};
    //         faceCtx.clearRect(0, 0, this._face.width, this._face.height);
    //         faceCtx.drawImage(image,0,40);
    //     }
    //     else {
    //         image.src = this.src;
    //         //image.onload = function(){faceCtx.drawImage(image,0,0,300,500,0,25,faceCan.width, faceCan.height)};
    //         faceCtx.clearRect(0, 0, this._face.width, this._face.height);
    //         faceCtx.drawImage(image,0,0);
    //     }

    // }

    move(newX, newY){
        this._x = newX;
        this._y = newY;
    }

    draw(){

        let bodyWidth = 3;
        let neckLength = 30;
        let tailLength = 40;
        let armLength = 80;
        //let lowerArm = 100;
        let legLength = 80;

        //let lowerLeg = 100;
        let bodyLength = 100;
        let legSpeed = APPENDAGE_SPEED;

        if(this._jumping){
            //if(JUMP_FRAMES > 30) this._jumping = false;
            //if()
            // if(this._y >= this._baselineY){
            //     this._y = this._baselineY;
            //     this._jumping = false;
            // }

            this._y -= JUMP_VELOCITY - GRAVITY * JUMP_FRAMES;

        }

        if(this._y >= this._baselineY){
            this._y = this._baselineY;
            this._jumping = false;
        }

        if(this._running === true){

            this._rightElbow = 1.75;
            this._leftElbow = 1.75;

            this._leftKnee = .75;

            if(this._leftFoot >= .75 || this._leftFoot <= .25) {
                this._leftDirection = !this._leftDirection;
                
            }

            if(this._leftDirection) {
                this._leftFoot += legSpeed;
                this._leftShoulder += legSpeed;
                // if(this._leftFoot > .5){
                //     this._leftKnee += legSpeed;
                // }
            }
            else {
                this._leftFoot -= legSpeed;
                this._leftShoulder -= legSpeed;
            }


            if(this._rightFoot >= .75 || this._rightFoot <= .25) this._rightDirection = !this._rightDirection;

            if(this._rightDirection) {
                this._rightFoot -= legSpeed;
                this._tail -= legSpeed;
            }
            else {
                this._rightFoot += legSpeed;
                this._rightShoulder += legSpeed;
            }

            // if(this._leftShoulder >= .75 || this._leftShoulder <= .25) {
            //     this._leftDirection = !this._leftDirection;
                
            // }


        }else{
            this._leftFoot = .26;
            this._leftKnee = .26;
            this._rightFoot = .74;
            this._rightKnee = .74;
            this._leftShoulder = .26;
            this._leftElbow = .74;
            this._rightShoulder = .74;
            this._rightElbow = .26;
            
        }

        //draw head
        //ctx.drawImage(this._image, this._x - (width / scaleX / 2), this._y - (height), width, height, this._x - width / 5, this._y - height, width / scaleX, height / scaleY);
        //ctx.drawImage(this._face, this._x + this.bodyRadX, this._y - this._face.height)
        // draw body

        let currentX = this._x; // + (width / scaleX) * 0.5;
        let currentY = this._y ;//+ (height / scaleY) - (height - (height / scaleY)) / 6;
        
        ctx.drawImage(this._face, this._x + this.bodyRadX - 35, this._y - this._face.height)
        
        ctx.fillStyle = "#A36F40";
        ctx.beginPath()
        ctx.ellipse(this._x, this._y, this.bodyRadX, this.bodyRadY, 0, 2 * Math.PI, false);
        //ctx.arc(this._x, this._y, 50, 0, 2 * Math.PI, false);

        ctx.closePath();
        ctx.fill()

        let previousX = currentX;
        let previousY = currentY;

        ctx.strokeStyle = "#A36F40";
        ctx.lineWidth = bodyWidth;

        currentX = currentX - this.bodyRadX;

        ctx.beginPath();
        ctx.moveTo(
            currentX,
            currentY 
            );

        ctx.lineTo(
            currentX - tailLength,
            currentY 
        );

        currentX = previousX;

        currentX = currentX + this.bodyRadY * Math.cos(.25 * Math.PI);
        currentY = currentY + this.bodyRadY * Math.sin(.25 * Math.PI);

        previousX = currentX;
        previousY = currentY;
       
        ctx.moveTo(
            currentX,
            currentY
            );

        // previousX = currentX;
        // previousY = currentY;

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._rightFoot * Math.PI),
            currentY + legLength * Math.sin(this._rightFoot * Math.PI),
            );

        currentX = previousX;
        currentY = previousY;

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._leftFoot * Math.PI),
            currentY + legLength * Math.sin(this._leftFoot * Math.PI),
            ); 
            
        currentX = this._x;
        currentY = this._y;
            
        ctx.moveTo(
            currentX,
            currentY
            );

        currentX = currentX + this.bodyRadY * Math.cos(.75 * Math.PI);
        currentY = currentY + this.bodyRadY * Math.sin(.75 * Math.PI);

        previousX = currentX;
        previousY = currentY;
       
        ctx.moveTo(
            currentX,
            currentY
            );

        // previousX = currentX;
        // previousY = currentY;

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._rightFoot * Math.PI),
            currentY + legLength * Math.sin(this._rightFoot * Math.PI),
            );

        currentX = previousX;
        currentY = previousY;

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + armLength * Math.cos(this._leftFoot * Math.PI),
            currentY + armLength * Math.sin(this._leftFoot * Math.PI),
            );  



        // currentX = previousX;
        // currentY = previousY;

        // ctx.moveTo(
        //     currentX,
        //     currentY
        //     );

        // ctx.lineTo(      
        //     currentX + armLength * Math.cos(this._leftShoulder * Math.PI),
        //     currentY + armLength * Math.sin(this._leftShoulder * Math.PI),
        //     );

        // currentX = currentX + armLength * Math.cos(this._leftShoulder * Math.PI);
        // currentY = currentY + armLength * Math.sin(this._leftShoulder * Math.PI),

        // ctx.moveTo(
        //     currentX,
        //     currentY
        //     );   
            
        // ctx.lineTo(      
        //     currentX + armLength * Math.cos(this._leftElbow * Math.PI),
        //     currentY + armLength * Math.sin(this._leftElbow * Math.PI),
        //     );


        // currentX = previousX;
        // currentY = previousY;

        // ctx.moveTo(
        //     currentX,
        //     currentY
        //     );
 

        // ctx.lineTo(      
        //     currentX,
        //     currentY + bodyLength
        //     );
        
        // currentY =  currentY + bodyLength;
        // previousY = currentY;
        // previousX = currentX;

        // ctx.lineTo(      
        //     currentX + legLength * Math.cos(this._rightFoot * Math.PI),
        //     currentY + legLength * Math.sin(this._rightFoot * Math.PI),
        //     );

        // currentX = currentX + legLength * Math.cos(this._rightFoot * Math.PI);
        // currentY = currentY + legLength * Math.sin(this._rightFoot * Math.PI);


        // ctx.moveTo(
        //     currentX,
        //     currentY
        //     );

        // ctx.lineTo(      
        //     currentX + legLength * Math.cos(this._rightKnee * Math.PI),
        //     currentY + legLength * Math.sin(this._rightKnee * Math.PI),
        //     );

        // currentX = previousX;
        // currentY = previousY;

        // ctx.moveTo(
        //     currentX,
        //     currentY
        //     );

        // ctx.lineTo(      
        //     currentX + legLength * Math.cos(this._leftFoot * Math.PI),
        //     currentY + legLength * Math.sin(this._leftFoot * Math.PI),
        //     );

        // currentX = currentX + legLength * Math.cos(this._leftFoot * Math.PI);
        // currentY = currentY + legLength * Math.sin(this._leftFoot * Math.PI);

        // ctx.moveTo(
        //     currentX,
        //     currentY
        //     );

        // ctx.lineTo(      
        //     currentX + legLength * Math.cos(this._leftKnee * Math.PI),
        //     currentY + legLength * Math.sin(this._leftKnee * Math.PI),
        //     );
        

        ctx.stroke();

    }

    // jump(){
    //     if(!this._jumping){
    //         JUMP_FRAMES = 0;
    //         this._jumping = true;            
    //     }

    // }
}

class Dash{
    constructor(x, y, width, height, color, ahead = null){
        this._x = x;
        this._y = y; 
        this._width = width;
        this._height = height
        this._color = color;
        this._ahead = ahead;
    }

    draw(){
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }

    move(velocity, prev = null){
        if(this._x <= -this._width){
            if(this._ahead === null){
                if(prev === null) this._x = can.width;
                else this._x = prev._x + 300;
            }else this._x = this._ahead._x + 300;
        }else this._x -= velocity / FPS;
        //this._x -= velocity / FPS;
    }

}

class Cloud{
    constructor(x, y, radius, color){
        this._x = x;
        this._y = y; 
        this._color = color;
        this._radius = radius;
        this._shape = Math.floor(Math.random() * 4);
    }

    draw(){
 
        if(this._shape === 0){
            ctx.fillStyle = this._color;
            ctx.beginPath()
            ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * 1.5, this._y + this._radius, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * .5, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);

            ctx.closePath();
            ctx.fill()

        }else if(this._shape === 1){
            ctx.fillStyle = this._color;
            ctx.beginPath()
            ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * 1.5, this._y + this._radius, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * .5, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y, this._radius, 0, 2 * Math.PI, false);


            ctx.closePath();
            ctx.fill()

        }else if(this._shape === 2){
            ctx.fillStyle = this._color;
            ctx.beginPath()
            ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * 1.5, this._y + this._radius, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * .5, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 1.1, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 1.3, this._y + this._radius * 1, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 2, this._y + this._radius * 1.2, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 2.2, this._y + this._radius * .7, this._radius, 0, 2 * Math.PI, false);


            ctx.closePath();
            ctx.fill()

        }else if(this._shape === 3){
            ctx.fillStyle = this._color;
            ctx.beginPath()
            ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * 1.5, this._y + this._radius, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x + this._radius * .5, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 1.1, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 1.3, this._y + this._radius * 1, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 2, this._y + this._radius * 1.2, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 2.2, this._y + this._radius * .7, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 3.3, this._y + this._radius * 1.2, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius, this._y - this._radius * .3, this._radius, 0, 2 * Math.PI, false);
            ctx.arc(this._x - this._radius * 2.8, this._y - this._radius * .3, this._radius, 0, 2 * Math.PI, false);


            ctx.closePath();
            ctx.fill()
        }

    }

    move(velocity){

        if(this._x <= -this._radius * 3){
            this._x = can.width + this._radius * 5;
            this._y = can.height / (2.5 + Math.random() * 8);
            this._shape = Math.floor(Math.random() * 4);
            this._radius = 20 + Math.floor(Math.random() * 5)
        }else this._x -= velocity / FPS;

        // if(this._x <= -this._width){
        //     this._x = can.width;
        // }else this._x -= velocity / FPS;
    }

}

class Hill{
    constructor(x){
        this._x = x;
        this._radius = 50 + Math.random() * 100;
        this._y = can.height / 2 + (Math.random() * this._radius * .5); 
        this._color = "#00a551";
    }

    draw(){

        ctx.fillStyle = "#00a551";
        ctx.beginPath();
        ctx.arc(this._x, this._y, this._radius, -.15, .15, true);
        ctx.fill();

    // ctx.fillStyle = "#00a551";
    // ctx.beginPath()
    // ctx.arc(300,can.height / 2, 50, -.15, .15, true);
    // ctx.fill()
    }

    move(velocity){
        if(this._x <= -this._radius){
            this._radius = 50 + Math.random() * 100;
            this._x = can.width + this._radius * 1.5;
            this._y = can.height / 2 + (Math.random() * this._radius * .5);
            
        }else this._x -= velocity / FPS;

    }

}

class Obstacle{
    constructor(x, y, height, width){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    draw(){
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

}






//-------------------------------------END CLASSES------------------------------------------








// let image = new Image()
// image.src = "../eddy.jpg";
// image.onload = function(){ctx.drawImage(image, 50, 50)}


let dash1 = new Dash(0, DASH_Y, 150, 20, "yellow");
let dash2 = new Dash(300, DASH_Y, 150, 20, "yellow", dash1);
let dash3 = new Dash(600, DASH_Y, 150, 20, "yellow", dash2);
let dash4 = new Dash(900, DASH_Y, 150, 20, "yellow", dash3);
let dash5 = new Dash(1200, DASH_Y, 150, 20, "yellow", dash4);
let dash6 = new Dash(1500, DASH_Y, 150, 20, "yellow", dash5);

let cloud1 = new Cloud(300, can.height / 8, 20, "white");
let cloud2 = new Cloud(600, can.height / 3, 23, "white");
let cloud3 = new Cloud(900, can.height / 6, 20, "white");
let cloud4 = new Cloud(1200, can.height / 6, 20, "white");
let cloud5 = new Cloud(1500, can.height / 6, 20, "white");

let hill1 = new Hill(350);
let hill2 = new Hill(750);
let hill3 = new Hill(1100);
let obstacle1 = new Obstacle(750, can.height / 1.3, 170, 30);

let eddy = new Person("../eddy.jpg", 350, 500, "../unhappyEddy.jpg");
eddy._image.onload
eddy.draw();

let moose = new Dog('../moose.jpg', can.width -250, 675, '../moose.jpg')
moose._running = true;

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(/** @type {keyboarkdEvent}*/ev){
    
    switch(ev.keyCode){
        case 37: //Left Arrow
            break;
        case 38: //Up Arrow
            eddy.jump();
            break;
        case 39: //Right Arrow
            eddy._running = true;
            break;

    }
}
function keyup(/** @type {keyboarkdEvent}*/ ev){
    switch(ev.keyCode){
        case 37: //Left Arrow
            break;
        case 38: //Up Arrow
            break;
        case 39: //Right Arrow
        eddy._running = false;
            break;

    }
}

setInterval(update, 1000 / FPS);

function update(){

    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(0, 0, can.width, can.height);
    ctx.fillStyle = "#00a551";
    ctx.fillRect(0, can.height / 2, can.width, can.height / 2);

    ctx.fillStyle = "Gray";
    ctx.fillRect(0, can.height / 1.3, can.width, can.height / 5.5);



    //let dash1 = new Dash(0, can.height / 1.5 + can.height / 12, 150, 20, "yellow");
    // if(eddy._running){
    //     dash1.move(DASH_SPEED, dash6);
    //     dash2.move(DASH_SPEED);
    //     dash3.move(DASH_SPEED);
    //     dash4.move(DASH_SPEED);
    //     dash5.move(DASH_SPEED);
    //     dash6.move(DASH_SPEED);
    //     cloud1.move(CLOUD_SPEED);
    //     cloud2.move(CLOUD_SPEED);
    //     cloud3.move(CLOUD_SPEED);
    //     cloud4.move(CLOUD_SPEED);
    //     cloud5.move(CLOUD_SPEED);
    //     hill1.move(TOPO_SPEED);
    //     hill2.move(TOPO_SPEED);
    //     hill3.move(TOPO_SPEED);

    // }

    if(eddy._running){
        eddy.move(eddy._x += EDDY_BOOST, eddy._y);
    }else{
        eddy.move(eddy._x -= DASH_SPEED / FPS, eddy._y);
    }

    if(eddy._x >= moose._x - moose.bodyRadX){
        moose._running = false;
        eddy.win();
    }

    if(eddy._x <= faceCan.width * 1.5){
        moose._running = false;
        //eddy._x += 50;
        eddy.lose()
    }

    if(eddy._lost && LOSS_FRAMES > 45){
        eddy.jump();
    }

    if(eddy._won && WIN_FRAMES < 60){
        eddy.jump();
    }

    dash1.move(DASH_SPEED, dash6);
    dash2.move(DASH_SPEED);
    dash3.move(DASH_SPEED);
    dash4.move(DASH_SPEED);
    dash5.move(DASH_SPEED);
    dash6.move(DASH_SPEED);
    cloud1.move(CLOUD_SPEED);
    cloud2.move(CLOUD_SPEED);
    cloud3.move(CLOUD_SPEED);
    cloud4.move(CLOUD_SPEED);
    cloud5.move(CLOUD_SPEED);
    hill1.move(TOPO_SPEED);
    hill2.move(TOPO_SPEED);
    hill3.move(TOPO_SPEED);

    
    dash1.draw();
    dash2.draw();
    dash3.draw();
    dash4.draw();
    dash5.draw();
    dash6.draw();
    cloud1.draw();
    cloud2.draw();
    cloud3.draw();
    cloud4.draw();
    cloud5.draw();
    hill1.draw();
    hill2.draw();
    hill3.draw();
    //obstacle1.draw();
    

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(0, can.height / 1.5 + can.height / 12, 150, 20);

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(300, can.height / 1.5 + can.height / 12, 150, 20);

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(600, can.height / 1.5 + can.height / 12, 150, 20);

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(900, can.height / 1.5 + can.height / 12, 150, 20);







    // ctx.fillStyle = "#00a551";
    // ctx.beginPath()
    // ctx.arc(300,can.height / 2, 50, -.15, .15, true);
    // ctx.fill()
// eddy.emote("sad");

    // eddy.draw(0, 0, 300, 500, 2, 2);
    moose.draw();
    eddy.draw();
    //ctx.drawImage(eddy._face,eddy._x - eddy._face.width / 2, eddy._y - eddy._face.height);

    JUMP_FRAMES++;

    if(eddy._lost) LOSS_FRAMES++;
    if(eddy._won) WIN_FRAMES++;


}