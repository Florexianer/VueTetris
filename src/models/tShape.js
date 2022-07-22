export class tShape {

    constructor() {
        this.pos1 = [{x : 5,y : 1}, {x:5,y:2},{x:4,y:2},{x:6,y:2}]
        this.pos2 = [{x : 5,y : 1}, {x:5,y:2},{x:5,y:3},{x:6,y:2}]
        this.pos3 = [{x : 4,y : 2}, {x:5,y:2},{x:5,y:3},{x:6,y:2}]
        this.pos4 = [{x : 4,y : 2}, {x:5,y:2},{x:5,y:3},{x:5,y:1}]
        this.curPos = 1
    }

    rotate(movement) {
        if(this.curPos + 1 > 4) {
            this.curPos = 1
        } else {
            this.curPos++
        }

        if(this['pos' + this.curPos].some(n => n.x + movement.x > 10)) {
            movement.x--
        } else if (this['pos' + this.curPos].some(n => n.x + movement.x < 1)) {
            movement.x++
        } else if (this['pos' + this.curPos].some(n => n.y + movement.y > 16)) {
            movement.y--
        }
    }

}