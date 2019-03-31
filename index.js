
//TODO:
// refactor straight line loop logic
// put straight line plotting into it's own specific function

let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");

const CURVE_ANGLE_ENUM = {
    TOP_LEFT: 0,
    TOP_RIGHT: 1,
    BOTTOM_LEFT: 2,
    BOTTOM_RIGHT: 3
};


function plotDialogueBoxCoords(originPoint, width, height, borderRadius, spacesBetweenPoints){

    let lastPoint;

    var pointsArray = [];

    // draw from top-left to top-right along x axis

    let widthMinusBorderRadius = (width - borderRadius * 2);
    let xDistance = widthMinusBorderRadius / spacesBetweenPoints;

    for(var xLocation = 0; xLocation < widthMinusBorderRadius; xLocation += xDistance){
        pointsArray.push(new Point(originPoint.x + xLocation, originPoint.y));
    }

    pointsArray.push(new Point(originPoint.x + xLocation, originPoint.y));


    if(xLocation == widthMinusBorderRadius){
        lastPoint = new Point(originPoint.x + xLocation, originPoint.y);
        console.log("hit 1")
    }

    let topRightCurve = plotAngleCurvCoords(
        new Point(lastPoint.x, lastPoint.y + borderRadius),
        borderRadius,
        6,
        CURVE_ANGLE_ENUM.TOP_RIGHT);

    pointsArray.push(...topRightCurve);



    // draw from top-right to bottom-right along y axis

    let heightMinusBorderRadius = height - (borderRadius * 2);
    let yDistance = heightMinusBorderRadius / (spacesBetweenPoints);

    for(var yLocation = 0; yLocation < heightMinusBorderRadius; yLocation += yDistance){
        pointsArray.push(new Point(originPoint.x + widthMinusBorderRadius + borderRadius, originPoint.y + yLocation + borderRadius ));
    }

    pointsArray.push(new Point(originPoint.x + widthMinusBorderRadius + borderRadius, originPoint.y + yLocation + borderRadius ));

    if(yLocation == heightMinusBorderRadius){
        console.log("hit 2");
        lastPoint = new Point(originPoint.x + widthMinusBorderRadius + borderRadius, originPoint.y + yLocation + borderRadius );
    }

    console.log(yLocation);
    console.log("y distance");
    console.log(heightMinusBorderRadius);

    let bottomRightCurve = plotAngleCurvCoords(
        new Point(lastPoint.x - borderRadius, lastPoint.y),
        borderRadius,
        6,
        CURVE_ANGLE_ENUM.BOTTOM_RIGHT);

    pointsArray.push(...bottomRightCurve);

    // for()


    return pointsArray;
}

function plotStraightLineCoords(){

}


function plotAngleCurvCoords(centerPoint, radius, nOfPoints, curveAngleEnum){

    var pointsArray = [];

    let curveAngleDegreesToSubtract;

    switch (curveAngleEnum){
        case CURVE_ANGLE_ENUM.TOP_RIGHT:
            curveAngleDegreesToSubtract = degreesToRadians(90);
            break;
        case CURVE_ANGLE_ENUM.BOTTOM_RIGHT:
            curveAngleDegreesToSubtract = degreesToRadians(0);
        default:
            // throw "curve angle not specified"; // why does this always execute?
            break;
    }

    for(let i = 1; i < nOfPoints; i++){
        var x = centerPoint.x + radius * Math.cos((degreesToRadians(90) * (i / nOfPoints)) - curveAngleDegreesToSubtract);
        var y = centerPoint.y + radius * Math.sin((degreesToRadians(90) * (i / nOfPoints)) - curveAngleDegreesToSubtract);
        pointsArray.push(new Point(x, y));
    }

    var x = centerPoint.x + radius * Math.cos(degreesToRadians(90) - curveAngleDegreesToSubtract);
    var y = centerPoint.y + radius * Math.sin(degreesToRadians(90) - curveAngleDegreesToSubtract);
    pointsArray.push(new Point(x, y));

    return pointsArray;
}

function degreesToRadians(degrees){
    return (degrees / 180) * Math.PI;
}


// ctx = canvasContext to draw to

function drawCoords(ctx, arr){
    let prevCoOrd;
    for(let i = 0; i < arr.length; i++){
        let currentPoint = arr[i];

        if(i % 2 == 0){
            ctx.strokeStyle = "lime";
        }else{
            ctx.strokeStyle = "pink";
        }

        if(i >= 1){
            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.moveTo(prevCoOrd.x, prevCoOrd.y);// start
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.stroke();
        }
        prevCoOrd = currentPoint;
    }
}

function Point(x, y){
    this.x = x;
    this.y = y;
}

let origin = new Point(200, 200);

let plotArr = plotDialogueBoxCoords(origin, 200, 100, 25, 8);
let circlePlotArr = plotAngleCurvCoords(origin, 50, 8);

drawCoords(ctx, plotArr);




