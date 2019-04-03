
//TODO:
// refactor straight line loop logic
// put straight line plotting into it's own specific function
// throw error if arguments don't meet param constraints

let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");

const CURVE_ANGLE_ENUM = {
    TOP_LEFT: 0,
    TOP_RIGHT: 1,
    BOTTOM_LEFT: 2,
    BOTTOM_RIGHT: 3
};


function plotDialogueBoxCoords(originPoint, width, height, borderRadius, spacesBetweenPoints, speechTriangleWidth){

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

    var heightMinusBorderRadius = height - (borderRadius * 2);
    var yDistance = heightMinusBorderRadius / (spacesBetweenPoints / 2);

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







    // draw from top-left to bottom-left along y axis




    let spacesForLeft;
    // wrap into function
    if(spacesBetweenPoints / 2 <= 5){
        spacesForLeft = 5
    }else{
        if((spacesBetweenPoints / 2) % 2 == 0){
            spacesForLeft = (spacesBetweenPoints / 2) + 1;
        }else{
            spacesForLeft = spacesBetweenPoints / 2;
        }
    }
    // wrap into function

    var yDistance = heightMinusBorderRadius / spacesForLeft;


    for(var y = spacesForLeft; y > 0; y--){
        if(getMiddleOfOddNumber(spacesForLeft) == y){
            pointsArray.push(new Point(originPoint.x - (borderRadius * 2 - (speechTriangleWidth)),
                (originPoint.y + borderRadius) + (y * yDistance)));
        }else{
            pointsArray.push(new Point(originPoint.x - borderRadius,
                (originPoint.y + borderRadius) + (y * yDistance)));
        }
    }

    pointsArray.push(new Point(originPoint.x - borderRadius, (originPoint.y + borderRadius) + (y * yDistance)));
    console.log("end of bottom-left to top-left y value");
    console.log(y * yDistance);

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

    // var x = centerPoint.x + radius * Math.cos(degreesToRadians(90) - curveAngleDegreesToSubtract);
    // var y = centerPoint.y + radius * Math.sin(degreesToRadians(90) - curveAngleDegreesToSubtract);
    // pointsArray.push(new Point(x, y));

    return pointsArray;
}

function degreesToRadians(degrees){
    return (degrees / 180) * Math.PI;
}


// ctx = canvasContext to draw to

function drawCoordsWithLines(canvas, plotArr, coloursArr, lineWidth){
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;

    let prevCoOrd;
    for(let i = 0; i < plotArr.length; i++){
        let currentPoint = plotArr[i];
        let currentColour;
        if(i % 2 == 0){
            currentColour = coloursArr[0];
        }else{
            currentColour = coloursArr[1];
        }

        ctx.strokeStyle = currentColour;
        if(i >= 1){
            ctx.beginPath();
            ctx.moveTo(prevCoOrd.x, prevCoOrd.y);// start
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.stroke();


            // join end of line to start of line
            if(i == plotArr.length - 1){
                ctx.beginPath();
                ctx.strokeStyle = currentColour === coloursArr[0] ? coloursArr[1] : coloursArr[0];
                ctx.moveTo(plotArr[plotArr.length - 1].x, plotArr[plotArr.length - 1].y);
                ctx.lineTo(plotArr[0].x, plotArr[0].y);
                ctx.stroke();

            }



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
            ctx.fillStyle = "rgba(211, 255, 90, 0.5)";
        }else{
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        }

        ctx.fillRect(currentPoint.x - 2.5, currentPoint.y - 2.5, 5, 5)
    }
}

function drawCoordsWithTimer(ctx, plotArr, coloursArr, lineWidth, onDoneCallback){
    let prevCoOrd;
    let i = 0;
     // start
    var timer = window.setInterval(()=>{
        let currentPoint = plotArr[i];

        if(i % 2 == 0){
            ctx.strokeStyle = coloursArr[0];
        }else{
            ctx.strokeStyle = coloursArr[1];
        }

        ctx.lineWidth = lineWidth;

        if(i >= 1){
            if(i == plotArr.length){
                clearInterval(timer);
                ctx.beginPath();
                ctx.strokeStyle = ctx.strokeStyle === coloursArr[0] ? coloursArr[1] : coloursArr[0];
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
let plotArr = plotDialogueBoxCoords(origin, 150, 60, 15, 6, 8);
// let circlePlotArr = plotAngleCurvCoords(origin, 50, 8);

// drawCoOrdsWithDots(canvas, plotArr);
// drawCoordsWithLines(canvas, plotArr, ["lime", "green"]);

drawCoordsWithTimer(ctx, plotArr, ["lime", "lime"], 4, function(plotArrRef){
    window.setInterval(function(){
        wiggleDialogueBox(plotDialogueBoxCoords(origin, 150, 60, 15, 6, 8));
    }, 50);
});

// wiggleDialogueBox(plotDialogueBoxCoords(origin, 150, 60, 15, 6, 8));


function wiggleDialogueBox(plotArr){
    var originCoOrdOffsetX, originCoOrdOffsetY;

    let plotArrCopy = plotArr.slice(); // could use slice
    for(let i = 0; i < plotArrCopy.length; i++){
        var coOrd = plotArrCopy[i];
        var randXOffset = generateRandomNegOrPosNumberInRangeX(2);
        var randomYOffset = generateRandomNegOrPosNumberInRangeX(2);


        coOrd.x += randXOffset;
        coOrd.y += randomYOffset;





    }

    // drawCoOrdsWithDots(canvas, plotArrCopy);
    drawCoordsWithLines(canvas, plotArr, ["lime", "lime"], 4);
}

function generateRandomNegOrPosNumberInRangeX(x){
    let division = x / 2;
    return (0 - division) + Math.round(Math.random() * x)
}

function getMiddleOfOddNumber(n){
    if(n % 2 == 0 && n > 3){
        throw "parsed number must be odd and must be greater than 3";
    }else{
        return Math.ceil(n / 2);
    }
}

console.log("middle number of odd", getMiddleOfOddNumber(7));






