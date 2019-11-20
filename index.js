



const FPS = 30;
//const SHIP_SIZE = 30;
//const TURN_SPEED = 360;
//const SHIP_THRUST = 2;
//const FRICTION_COEFF = 0.7;
const BODY_WIDTH = 3;

let can = document.getElementById("gameCanvas");
let ctx = can.getContext("2d");

let width = can.width = window.innerWidth - 20;
let height = can.height = window.innerHeight - 20;

function toRadians(deg){
    return ((deg / 180) * Math.PI);
}


class Person{

    constructor(img, x, y){
        this.src = img;
        this._x = x;
        this._y = y;
        this._running = false;
        this._leftFoot = .25
        this._rightFoot = .75;
        this._leftDirection = true;
        this._rightDirection = true;

        let image = new Image()
        image.src = img;
        image.onload = function(){ctx.drawImage(image, x, y)}
        
        this._image = image;
        
    }

    move(newX, newY){
        this._x = newX;
        this._y = newY;
    }

    draw(left, top, width, height, scaleX, scaleY){

        let bodyWidth = 3;
        let neckLength = 70;
        let armLength = 100;
        let legLength = 100;
        let bodyLength = 200;

        if(this._running === true){

            if(this._leftFoot >= .5 || this._leftFoot <= .25) this._leftDirection = !this._leftDirection;

            if(this._leftDirection) {
                this._leftFoot += .5 / FPS;
            }
            else {
                this._leftFoot -= .5 / FPS;
            }


            if(this._rightFoot >= .75 || this._rightFoot <= .5) this._rightDirection = !this._rightDirection;

            if(this._rightDirection) {
                this._rightFoot -= .5 / FPS;
            }
            else {
                this._rightFoot += .5 / FPS;
            }


        }else{
            this._leftFoot = .25;
            this._rightFoot = .75;
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
        previousY = currentY + neckLength;

        ctx.lineTo(      
            currentX + armLength * Math.cos(1.75 * Math.PI),
            currentY + armLength * Math.sin(1.75 * Math.PI),
            );

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + armLength * Math.cos(1.25 * Math.PI),
            currentY + armLength * Math.sin(1.25 * Math.PI),
            );

        ctx.moveTo(
            currentX,
            currentY
            );
 

        ctx.lineTo(      
            currentX,
            currentY + bodyLength
            );
        
        currentY =  currentY + bodyLength 

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._rightFoot * Math.PI),
            currentY + legLength * Math.sin(this._rightFoot * Math.PI),
            );

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + legLength * Math.cos(this._leftFoot * Math.PI),
            currentY + legLength * Math.sin(this._leftFoot * Math.PI),
            );
        

        ctx.stroke();

    }
}

class Dash{
    constructor(x, y, width, height, color){
        this._x = x;
        this._y = y; 
        this._width = width;
        this._height = height
        this._color = color;
    }

    draw(){
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }

    move(velocity){
        if(this._x === -this._width){
            this._x = can.width;
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
    }

    draw(){
 

        ctx.fillStyle = this._color;
        ctx.beginPath()
        ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
        ctx.arc(this._x + this._radius, this._y, this._radius, 0, 2 * Math.PI, false);
        ctx.arc(this._x + this._radius * 1.5, this._y + this._radius, this._radius, 0, 2 * Math.PI, false);
        ctx.arc(this._x + this._radius * .5, this._y + this._radius * 1.5, this._radius, 0, 2 * Math.PI, false);

        ctx.closePath();
        ctx.fill()
    }

    move(velocity){
        if(this._x <= -this._width){
            this._x = can.width;
        }else this._x -= velocity / FPS;
    }

}



// let ship = {
//     x: can.width / 2,
//     y: can.height / 2,
//     r: SHIP_SIZE / 2,
//     heading: 90 / 180 * Math.PI,
//     rotation: 0,
//     thrusting: false,
//     thrust: {x: 0, y: 0}

// }

// let image = new Image()
// image.src = "../eddy.jpg";
// image.onload = function(){ctx.drawImage(image, 50, 50)}

let eddy = new Person("../eddy.jpg", 100, 100);
eddy._image.onload
eddy.draw(0, 0, 300, 500, 2, 2);

let dash1 = new Dash(0, can.height / 1.5 + can.height / 12, 150, 20, "yellow");
let dash2 = new Dash(300, can.height / 1.5 + can.height / 12, 150, 20, "yellow");
let dash3 = new Dash(600, can.height / 1.5 + can.height / 12, 150, 20, "yellow");
let dash4 = new Dash(900, can.height / 1.5 + can.height / 12, 150, 20, "yellow");

let cloud1 = new Cloud(600, can.height / 3, 20, "white");

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(/** @type {keyboarkdEvent}*/ev){
    //console.log(eddy._image.src);
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
    //console.log(ev);
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

    dash1.move(60);
    dash2.move(60);
    dash3.move(60);
    dash4.move(60);
    dash1.draw();
    dash2.draw();
    dash3.draw();
    dash4.draw();
    cloud1.draw();

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