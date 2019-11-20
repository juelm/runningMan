



const FPS = 30;
const SHIP_SIZE = 30;
const TURN_SPEED = 360;
const SHIP_THRUST = 2;
const FRICTION_COEFF = 0.7;
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
        //this._image = new Image();
        this.src = img;
        this._x = x;
        this._y = y;
        this._running = false;
        this.leftFoot;
        this.rightFoot;

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

        // ctx.moveTo(
        //     previousX,
        //     previousY
        //     );

        // currentX = previousX;
        // currentY = previousY;
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
            currentX + legLength * Math.cos(.25 * Math.PI),
            currentY + legLength * Math.sin(.25 * Math.PI),
            );

        ctx.moveTo(
            currentX,
            currentY
            );

        ctx.lineTo(      
            currentX + legLength * Math.cos(.75 * Math.PI),
            currentY + legLength * Math.sin(.75 * Math.PI),
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
        // ctx.arc(this._x + this._radius, this._y + this._radius, this._radius, 0, 2 * Math.PI, false);
        // ctx.arc(this._x - this._radius, this._y - this._radius, this._radius, 1 * Math.PI, 2 * Math.PI, false);
        // ctx.arc(this._x - this._radius * 2, this._y - this._radius * 2, this._radius, 1 * Math.PI, 2 * Math.PI, false);
        // ctx.arc(this._x - this._radius * 3, this._y - this._radius * 5, this._radius, 1 * Math.PI, 2 * Math.PI, false);
        // ctx.arc(this._x + this._radius, this._y, this._radius, 0, 360, true);
        // ctx.arc(this._x + this._radius * 2, this._y, this._radius, 0, 360, true);
        // ctx.arc(this._x + this._radius * 2, this._y + this._radius, this._radius, 0, 360, true);
        // ctx.arc(this._x + this._radius, this._y + this._radius, this._radius, 90, 270, true);
        // ctx.arc(this._x , this._y + this._radius, this._radius, 90, 270, true);
        ctx.closePath();
        //ctx.arc(600, can.height / 3, 0, 15, true);
        ctx.fill()
    }

    move(velocity){
        if(this._x <= -this._width){
            this._x = can.width;
        }else this._x -= velocity / FPS;
        //this._x -= velocity / FPS;
    }

}



let ship = {
    x: can.width / 2,
    y: can.height / 2,
    r: SHIP_SIZE / 2,
    heading: 90 / 180 * Math.PI,
    rotation: 0,
    thrusting: false,
    thrust: {x: 0, y: 0}

}

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
            ship.rotation = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: //Up Arrow
            ship.thrusting = true; 
            break;
        case 39: //Right Arrow
        ship.rotation = - TURN_SPEED / 180 * Math.PI / FPS;
                break;

    }
}
function keyup(/** @type {keyboarkdEvent}*/ ev){
    //console.log(ev);
    switch(ev.keyCode){
        case 37: //Left Arrow
            ship.rotation = 0;
            break;
        case 38: //Up Arrow
            ship.thrusting = false; 
            break;
        case 39: //Right Arrow
        ship.rotation = 0;
                break;

    }
}

setInterval(update, 1000 / FPS);

function update(){

    //draw space
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



    if(ship.thrusting){
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.heading) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.heading) / FPS;
    }else{
        ship.thrust.x -= FRICTION_COEFF * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION_COEFF * ship.thrust.y / FPS;
    }

    //console.log(ship.thrusting);


    // //draw ship
    ctx.strokeStyle = "white";
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.beginPath();
    ctx.moveTo(
    ship.x + 4 / 3 * ship.r * Math.cos(ship.heading),
    ship.y - 4 / 3 * ship.r * Math.sin(ship.heading)
    );

    ctx.lineTo(
        ship.x - ship.r * (2 / 3 * Math.cos(ship.heading) + Math.sin(ship.heading)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.heading) -  Math.cos(ship.heading))
    );

    ctx.lineTo(
        ship.x - ship.r * (2 / 3 * Math.cos(ship.heading) - Math.sin(ship.heading)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.heading) +  Math.cos(ship.heading))
    );

    ctx.closePath();

    ctx.stroke();

    eddy.draw(0, 0, 300, 500, 2, 2);

    // ctx.drawImage(image, 0, 0, 300, 500, 10, 10, 100, 200);

    ship.heading += ship.rotation;

    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    if(ship.x < 0) ship.x = can.width;
    if(ship.x > can.width) ship.x = 0;
    if(ship.y < 0) ship.y = can.height;
    if(ship.y > can.height) ship.y = 0;

}