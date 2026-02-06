class Segment {
    constructor(size, startingPos, isHead) {
        this.size = size;
        this.position = startingPos;
        this.angle = 0;
        this.isHead = isHead;
        
        this.leftSidePos;
        this.rightSidePos;

        this.quarter_away = PI/2;

        this.frontX = 0;
        this.frontY = 0;
        this.leftSideX = 0;
        this.leftSideY = 0;
        this.rightSideX = 0;
        this.rightSideY = 0;
    }

    updateSides() { 
        this.frontX = this.position.x + this.size * cos(this.angle);
        this.frontY = this.position.y + this.size * sin(this.angle);
        
        this.leftSideX = this.position.x + this.size * cos(this.angle - this.quarter_away);
        this.leftSideY = this.position.y + this.size * sin(this.angle - this.quarter_away);
        
        this.rightSideX = this.position.x + this.size * cos(this.angle + this.quarter_away);
        this.rightSideY = this.position.y + this.size * sin(this.angle + this.quarter_away);
    }

    update() {

    }

    show(showOoutline, showSides) {
    }
}