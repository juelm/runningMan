export class Person{

    constructor(context, img, x, y){
        this._image = new Image();
        this._image.src = img;
        this._ctx = context;
        this._x = x;
        this._y = y;
        this.image.onload = this.draw;
    }

    move(newX, newY){
        this._x = newX;
        this._y = newY;
    }

    draw(){
        this._ctx.drawImage(image, this._x, this._y);
    }
}