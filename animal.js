class Animal {
    constructor(segmentSizes, segmentDistance) {
        this.position = createVector();
        this.velocity = createVector();
        this.segmentDistance = segmentDistance

        let startX = width/2;
        let startY = height/2;

        this.segments = []

        for (let i = 0; i < segmentSizes.length; i++) {
            let startingPos = createVector(startX, startY);
            this.segments.push(new Segment(segmentSizes[i], startingPos));
              
            startX += segmentDistance;
          }
        this.segments[0].isHead = true;
    }



    update(){

        let angle = 0;

        for (let i=0; i<this.segments.length; i += 1){

            let segment = this.segments[i];
            // let position = segment.position;
            if (i===0){ 
                this.followMouse(7, this.segmentDistance);
                segment.position = this.position;
                segment.angle = atan2(this.velocity.y, this.velocity.x);
            }
            else {
                let newPos = this.constrainDistance(segment.position, this.segments[i-1].position, 30);
                if (p5.Vector.dist(newPos, segment.position) !== 0) {
                    // make sure the direction vector based is pointing toward the 
                    // center of the next segment
                    let direction = p5.Vector.sub(this.segments[i-1].position, segment.position);
                    angle = atan2(direction.y, direction.x);
                    segment.angle = angle;
                }

                segment.position = newPos;
            }

            segment.updateSides();

        }

    }

    followMouse(maxSpeed, maxDistance) {

        let mousePos = createVector(mouseX, mouseY);
        if ((p5.Vector.dist(mousePos, this.position) > maxDistance) && mouseIsPressed) {
            let direction = p5.Vector.sub(mousePos, this.position);
            direction.setMag(maxSpeed);
            this.velocity = direction.copy();
            this.position.add(this.velocity);
        }
    }

    constrainDistance(point, anchor, distance) {
        // let p = point.copy();
        let distanceBetween = p5.Vector.sub(point, anchor);
        distanceBetween.normalize();
        distanceBetween.mult(distance);
        let finalPos = p5.Vector.add(anchor, distanceBetween);
        // return ((p.sub(anchor).setMag(distance)).add(anchor));
        return finalPos;
    }


    drawOutline() {
        fill(255);
        let anchorPoints = [];
        // add the left sides first
        beginShape();
        for (let i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i]
            anchorPoints.push([segment.leftSideX, segment.leftSideY]);
            curveVertex(segment.leftSideX, segment.leftSideY);
            
        }
        for (let i = this.segments.length -1; i >= 0; i--) {
            let segment = this.segments[i]
            anchorPoints.push([segment.rightSideX, segment.rightSideY]);
            curveVertex(segment.rightSideX, segment.rightSideY);
        }
        for (let i = 0; i < 3; i++){
            curveVertex(anchorPoints[i][0], anchorPoints[i][1]);
        }


        endShape();

    }

    show(){
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i].show(true, true);
        }

        this.drawOutline();
    }
}