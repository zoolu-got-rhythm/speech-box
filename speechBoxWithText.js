
//TODO:
// refactor straight line loop logic
// put straight line plotting into it's own specific function
// throw error if arguments don't meet param constraints
// fix issue with failing to run with different character lengths of parsed in text to display

// let canvas = document.getElementById("c");
// 32px dokdo
speechBoxWithText("32px dokdo", "oki", new Point(50, 50), 15);


function speechBoxWithText(textStringSpecifications, text, originCoOrdinate, borderRadius){

    console.log(originCoOrdinate);
    console.log("   ORIGINAL CO-ORD");

    var calculatedTextWidth = getTextWidth(text, textStringSpecifications);
    var calculatedTextHeight = getTextHeight(text, textStringSpecifications);

    console.log("ceil");
    let widthOfBoxToDraw = Math.ceil(calculatedTextWidth) + borderRadius;
    let heightOfBoxToDraw = Math.ceil(calculatedTextHeight) + borderRadius;
    console.log(widthOfBoxToDraw);
    console.log(heightOfBoxToDraw);

    console.log("go to nearest even number");
    // quick fix
    widthOfBoxToDraw = widthOfBoxToDraw % 2 == 0 ? widthOfBoxToDraw : widthOfBoxToDraw + 1;
    heightOfBoxToDraw = heightOfBoxToDraw % 2 == 0 ? heightOfBoxToDraw : heightOfBoxToDraw + 1;
    console.log(widthOfBoxToDraw);
    console.log(heightOfBoxToDraw);

    const plotArr = plotDialogueBoxCoords(
        originCoOrdinate,
        widthOfBoxToDraw , // may need to round to whole number
        heightOfBoxToDraw, // may need to round to whole number
        borderRadius,
        6,
        9);



    drawCoordsWithTimer(canvas, plotArr, ["lime", "pink"], 4, function(plotArrRef){
        window.setInterval(function(){


            const plotArr = plotDialogueBoxCoords(
                originCoOrdinate,
                widthOfBoxToDraw , // may need to round to whole number
                heightOfBoxToDraw, // may need to round to whole number
                borderRadius,
                6,
                9);

            clearCanvas(canvas);
            var ctx = canvas.getContext("2d");
            ctx.font = textStringSpecifications;
            ctx.fillStyle = "lime";
            ctx.fillText(text,
                (originCoOrdinate.x - (borderRadius / 2)) + generateRandomNegOrPosNumberInRangeX(1),
                (originCoOrdinate.y + (calculatedTextHeight - calculatedTextHeight / 4) + (borderRadius / 2))
                + generateRandomNegOrPosNumberInRangeX(1)
            );

            let plotWithWigglesArr = wiggleDialogueBox(plotArr);
            drawCoordsWithLines(canvas, plotWithWigglesArr, ["lime", "pink"], 4);
        }, 200);
    });
}




function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function getTextHeight(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextHeight.canvas || (getTextHeight.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    return parseInt(context.font.match(/\d+/), 10);
}

