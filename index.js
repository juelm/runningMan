



const FPS = 30;
const BODY_WIDTH = 3;

let can = document.getElementById("gameCanvas");
let ctx = can.getContext("2d");

let width = can.width = window.innerWidth - 20;
let height = can.height = window.innerHeight - 20;

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
        this._leftFoot = .25;
        this._leftKnee = .25;
        this._rightKnee = .75;
        this._rightFoot = .75;
        this._leftShoulder = .25;
        this._leftElbow = .75;
        this._rightShoulder = .75;
        this._rightElbow = .25;
        this._leftDirection = true;
        this._rightDirection = true;

        let image = new Image()
        image.src = img;
        image.onload = function(){ctx.drawImage(image, x, y)}

        let sadImage = new Image()
        sadImage.src = sadImg;
        sadImage.onload = function(){ctx.drawImage(sadImage, x, y)}
        
        this._image = image;
        
    }

    move(newX, newY){
        this._x = newX;
        this._y = newY;
    }

    draw(left, top, width, height, scaleX, scaleY){

        let bodyWidth = 3;
        let neckLength = 30;
        let armLength = 80;
        //let lowerArm = 100;
        let legLength = 80;

        //let lowerLeg = 100;
        let bodyLength = 100;
        let legSpeed = .025;

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
            this._leftFoot = .25;
            this._leftKnee = .25;
            this._rightFoot = .75;
            this._rightKnee = .75;
            this._leftShoulder = .25;
            this._leftElbow = .75;
            this._rightShoulder = .75;
            this._rightElbow = .25;
            
        }

        //draw head
        ctx.drawImage(this._image, left, top, width, height, this._x, this._y, width / scaleX, height / scaleY);
        
        // draw body
        ctx.strokeStyle = "white";
        ctx.lineWidth = bodyWidth;
        let currentX = this._x + (width / scaleX) * 0.5;
        let currentY = this._y + (height / scaleY) - (height - (height / scaleY)) / 6;
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
        if(this._x === -this._width){
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
        }else this._x -= velocity / FPS;

        // if(this._x <= -this._width){
        //     this._x = can.width;
        // }else this._x -= velocity / FPS;
    }

}


// let image = new Image()
// image.src = "../eddy.jpg";
// image.onload = function(){ctx.drawImage(image, 50, 50)}

let eddy = new Person("../eddy.jpg", 100, 200);
eddy._image.onload
eddy.draw(0, 0, 300, 500, 2, 2);

let dash1 = new Dash(0, can.height / 1.5 + can.height / 12, 150, 20, "yellow");
let dash2 = new Dash(300, can.height / 1.5 + can.height / 12, 150, 20, "yellow", dash1);
let dash3 = new Dash(600, can.height / 1.5 + can.height / 12, 150, 20, "yellow", dash2);
let dash4 = new Dash(900, can.height / 1.5 + can.height / 12, 150, 20, "yellow", dash3);
let dash5 = new Dash(1200, can.height / 1.5 + can.height / 12, 150, 20, "yellow", dash4);
let dash6 = new Dash(1500, can.height / 1.5 + can.height / 12, 150, 20, "yellow", dash5);

let cloud1 = new Cloud(300, can.height / 8, 20, "white");
let cloud2 = new Cloud(600, can.height / 3, 23, "white");
let cloud3 = new Cloud(900, can.height / 6, 20, "white");


document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(/** @type {keyboarkdEvent}*/ev){
    
    switch(ev.keyCode){
        case 37: //Left Arrow
            break;
        case 38: //Up Arrow
            break;
        case 39: //Right Arrow
        eddy._running = true;
        console.log(eddy._leftFoot);
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
    ctx.fillRect(0, can.height / 1.5, can.width, can.height / 6);

    //let dash1 = new Dash(0, can.height / 1.5 + can.height / 12, 150, 20, "yellow");
    if(eddy._running){
        dash1.move(60, dash6);
        dash2.move(60);
        dash3.move(60);
        dash4.move(60);
        dash5.move(60);
        dash6.move(60);
        cloud1.move(10);
        cloud2.move(10);
        cloud3.move(10);

    }

    
    dash1.draw();
    dash2.draw();
    dash3.draw();
    dash4.draw();
    dash5.draw();
    dash6.draw();
    cloud1.draw();
    cloud2.draw();
    cloud3.draw();

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(0, can.height / 1.5 + can.height / 12, 150, 20);

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(300, can.height / 1.5 + can.height / 12, 150, 20);

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(600, can.height / 1.5 + can.height / 12, 150, 20);

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(900, can.height / 1.5 + can.height / 12, 150, 20);







    ctx.fillStyle = "#00a551";
    ctx.beginPath()
    ctx.arc(300,can.height / 2, 50, -.15, .15, true);
    ctx.fill()


    eddy.draw(0, 0, 300, 500, 2, 2);


}