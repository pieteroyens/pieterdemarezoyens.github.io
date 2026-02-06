let animalSpine = [20, 30, 28, 25, 23, 20, 18, 16, 14, 12, 12, 10, 8, 6, 4, 4, 4];
let animal;



function setup() {
  createCanvas(700, 700);

  animal = new Animal(animalSpine, 50);

}

function draw() {
  background(220);
  animal.update();
  animal.show();

  // vertexDrawTest();



  // TODO: 
  // 1: put extra head points in class
  // 2: draw vertex over these head points
}

function vertexDrawTest() {
  let anchorPoints = [];
  let sX = width/2;
  let sY = height/2;
  let r = 100
  // circle(sX, sY, r*2);
  
  for (let i=0; i<5; i++) {
    theta = PI/4 * i;
    // print(theta);
    cX = sX + r * cos(theta);
    cY = sY + r * sin(theta);
    circle(cX, cY, 10);
    anchorPoints.push([cX, cY]);
  }

  let circle2X = width / 2;
  let circle2Y = height /2 - 200;
  // circle(circle2X, circle2Y, 100);
  tX = circle2X + 50 * cos(PI);
  tY = circle2Y + 50 * sin(PI);
  circle(tX, tY, 10);
  tX2 = circle2X + 50 * cos(0);
  tY2 = circle2Y + 50 * sin(0);
  circle(tX2, tY2, 10);
  anchorPoints.push([tX,tY], [tX2, tY2]);
  
  // beginShape();
  // for (let i = 0; i < anchorPoints.length; i++) {
  //   curveVertex(anchorPoints[i][0],anchorPoints[i][1]);
  // }
  // curveVertex(anchorPoints[0][0], anchorPoints[0][1])
  // curveVertex(anchorPoints[1][0], anchorPoints[1][1])
  // curveVertex(anchorPoints[2][0], anchorPoints[2][1])


  // endShape();


  anchorPoints = [];
}


