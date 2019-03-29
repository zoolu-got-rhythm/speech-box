
let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");



function plotDialogueBoxCoords(originPoint, width, height, borderRadius, spacesBetweenPoints){

    let lastPoint;

    var pointsArray = [];

    let widthMinusBorderRadius = (width - borderRadius * 2);
    let xDistance = widthMinusBorderRadius / spacesBetweenPoints;

    for(let xLocation = 0; xLocation <= widthMinusBorderRadius; xLocation += xDistance){
        pointsArray.push(new Point(originPoint.x + xLocation, originPoint.y));
        if(xLocation == widthMinusBorderRadius)
            lastPoint = new Point(originPoint.x + xLocation, originPoint.y);
    }

    let topRightCurve = plotAngleCurvCoords(new Point(lastPoint.x, lastPoint.y + borderRadius), borderRadius, 10);
    pointsArray.push(...topRightCurve);

    return pointsArray;
}


function plotAngleCurvCoords(centerPoint, radius, nOfPoints){

    var pointsArray = [];

    for(let i = 1; i < nOfPoints; i++){
        var x = centerPoint.x + radius * Math.cos((degreesToRadians(90) * (i / nOfPoints)) - degreesToRadians(90));
        var y = centerPoint.y + radius * Math.sin((degreesToRadians(90) * (i / nOfPoints)) - degreesToRadians(90));
        pointsArray.push(new Point(x, y));
    }

    var x = centerPoint.x + radius * Math.cos(degreesToRadians(90) - degreesToRadians(90));
    var y = centerPoint.y + radius * Math.sin(degreesToRadians(90) - degreesToRadians(90));
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

let plotArr = plotDialogueBoxCoords(origin, 200, 200, 50, 10);
let circlePlotArr = plotAngleCurvCoords(origin, 50, 8);

drawCoords(ctx, plotArr);




