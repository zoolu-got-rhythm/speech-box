
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

    const widthMinusBorderRadius = (width - borderRadius * 2);
    let xDistance = widthMinusBorderRadius / spacesBetweenPoints;

    for(var xLocation = 0; xLocation < widthMinusBorderRadius; xLocation += xDistance){
        pointsArray.push(new Point(originPoint.x + xLocation, originPoint.y));
    }

    pointsArray.push(new Point(originPoint.x + xLocation, originPoint.y));


    if(xLocation == widthMinusBorderRadius){
        lastPoint = new Point(originPoint.x + xLocation, originPoint.y);
        console.log("hit 1");
    }

    let topRightCurve = plotAngleCurvCoords(
        new Point(lastPoint.x, lastPoint.y + borderRadius),
        borderRadius,
        4,
        CURVE_ANGLE_ENUM.TOP_RIGHT);

    pointsArray.push(...topRightCurve);



    // draw from top-right to bottom-right along y axis

    let heightMinusBorderRadius = height - (borderRadius * 2);
    let yDistance = heightMinusBorderRadius / (spacesBetweenPoints / 2);

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
        4,
        CURVE_ANGLE_ENUM.BOTTOM_RIGHT);

    pointsArray.push(...bottomRightCurve);


    // draw from bottom-right to bottom-left along x axis

    console.log(widthMinusBorderRadius);
    console.log("width minus border rad");
    xDistance = widthMinusBorderRadius / spacesBetweenPoints;

    console.log("x distance...");
    console.log(xDistance);
    // need to fix this
    for(var i = spacesBetweenPoints; i > 0; i--){
        pointsArray.push(new Point(originPoint.x + (i * xDistance), originPoint.y + height));
        console.log((i * xDistance));
        console.log("in loop");
    }

    console.log((i * xDistance));
    // console.log(xLocationBottom);

    pointsArray.push(new Point(originPoint.x + (i * xDistance), originPoint.y + height));


    // if(xLocationBottom == 0){
    lastPoint = new Point(originPoint.x + (i * xDistance), originPoint.y + height);
    //     console.log("hit 3");
    // }

    // console.log(xLocationBottom);

    let bottomLeftCurve = plotAngleCurvCoords(
        new Point(lastPoint.x, lastPoint.y - borderRadius),
        borderRadius,
        4,
        CURVE_ANGLE_ENUM.BOTTOM_LEFT);

    pointsArray.push(...bottomLeftCurve);







    // draw from top-right to bottom-right along y axis


    for(var y = spacesBetweenPoints / 2; y > 0; y--){
        pointsArray.push(new Point(originPoint.x - borderRadius, originPoint.y + (y * yDistance)));
    }

    // pointsArray.push(new Point(originPoint.x - borderRadius, originPoint.y + (y * yDistance)));

    lastPoint = new Point(originPoint.x, originPoint.y + borderRadius);


    console.log(yLocation);
    console.log("y distance");
    console.log(heightMinusBorderRadius);

    let topLeftCurve = plotAngleCurvCoords(
        new Point(lastPoint.x, lastPoint.y),
        borderRadius,
        4,
        CURVE_ANGLE_ENUM.TOP_LEFT);

    pointsArray.push(...topLeftCurve);







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
            break;
        case CURVE_ANGLE_ENUM.BOTTOM_LEFT:
            curveAngleDegreesToSubtract = degreesToRadians(270);
            break;
        case CURVE_ANGLE_ENUM.TOP_LEFT:
            curveAngleDegreesToSubtract = degreesToRadians(180);
            break;
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

function drawCoordsWithLines(canvas, arr){
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            if(i == arr.length - 1){
                ctx.moveTo(prevCoOrd.x, prevCoOrd.y);
                ctx.lineTo(plotArr[0].x, plotArr[0].y);
            }else{
                ctx.moveTo(prevCoOrd.x, prevCoOrd.y);// start
                ctx.lineTo(currentPoint.x, currentPoint.y);
            }
            ctx.stroke();

        }

        prevCoOrd = currentPoint;
    }


}

function drawCoOrdsWithDots(canvas, plotArr){
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < plotArr.length; i++){
        let currentPoint = plotArr[i];

        if(i % 2 == 0){
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        }else{
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        }

        ctx.fillRect(currentPoint.x - 2.5, currentPoint.y - 2.5, 5, 5)
    }
}

function drawCoordsWithTimer(ctx, plotArr, onDoneCallback){
    let prevCoOrd;
    let i = 0;
     // start
    var timer = window.setInterval(()=>{
        let currentPoint = plotArr[i];

        if(i % 2 == 0){
            ctx.strokeStyle = "lime";
        }else{
            ctx.strokeStyle = "pink";
        }

        ctx.lineWidth = 8;

        if(i >= 1){

            if(i == plotArr.length){
                clearInterval(timer);
                ctx.moveTo(prevCoOrd.x, prevCoOrd.y);
                ctx.lineTo(plotArr[0].x, plotArr[0].y);
                ctx.stroke();
                if(typeof onDoneCallback !== "undefined")
                    onDoneCallback(plotArr);
            }else{
                ctx.beginPath();
                ctx.moveTo(prevCoOrd.x, prevCoOrd.y);// start
                ctx.lineTo(currentPoint.x, currentPoint.y);
                ctx.stroke();
            }

        }
        prevCoOrd = currentPoint;
        i++;



    }, 1000 / 60);

     // end
}

function Point(x, y){
    this.x = x;
    this.y = y;
}

let origin = new Point(200, 200);

// spaces between points argument must be even number of 4 or greather (i think)
// add a width must be greather than height constraint
let plotArr = plotDialogueBoxCoords(origin, 150, 80, 15, 6);
let circlePlotArr = plotAngleCurvCoords(origin, 50, 8);

drawCoOrdsWithDots(canvas, plotArr);

// drawCoordsWithTimer(ctx, plotArr, function(plotArrRef){
//     window.setInterval(function(){
//         wiggleDialogueBox(plotDialogueBoxCoords(origin, 150, 80, 15, 6));
//     }, 200);
// });

function wiggleDialogueBox(plotArr){
    var originCoOrdOffsetX, originCoOrdOffsetY;

    let plotArrCopy = plotArr.slice(); // could use slice
    for(let i = 0; i < plotArrCopy.length; i++){
        var coOrd = plotArrCopy[i];
        var randXOffset = generateRandomNegOrPosNumberInRangeX(2);
        var randomYOffset = generateRandomNegOrPosNumberInRangeX(2);



        if(i === plotArrCopy.length - 1){
            console.log("assigning original rand offsets");
            coOrd.x += originCoOrdOffsetX;
            coOrd.y += originCoOrdOffsetY;
            console.log(originCoOrdOffsetX);
            console.log(originCoOrdOffsetY);
        }else if(i == 0){
            console.log('is zero');
            originCoOrdOffsetX = randXOffset;
            originCoOrdOffsetY = randomYOffset;
            coOrd.x += originCoOrdOffsetX;
            coOrd.y += originCoOrdOffsetY;
            console.log(originCoOrdOffsetX);
            console.log(originCoOrdOffsetY);
        }else{
            coOrd.x += randXOffset;
            coOrd.y += randomYOffset;
        }




    }

    drawCoords(canvas, plotArrCopy);
}

function generateRandomNegOrPosNumberInRangeX(x){
    let division = x / 2;
    return (0 - division) + Math.round(Math.random() * x)
}





