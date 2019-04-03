
// let canvas = document.getElementById("c");

speechBoxWithText("46px arial", "hello.....", new Point(50, 50), 15);


function speechBoxWithText(textStringSpecifications, text, originCoOrdinate, borderRadius){

    console.log(originCoOrdinate);
    console.log("   ORIGINAL CO-ORD");

    var calculatedTextWidth = getTextWidth(text, textStringSpecifications);
    var calculatedTextHeight = getTextHeight(text, textStringSpecifications);

    const plotArr = plotDialogueBoxCoords(
        originCoOrdinate,
        Math.ceil(calculatedTextWidth) , // may need to round to whole number
        Math.ceil(calculatedTextHeight), // may need to round to whole number
        borderRadius,
        6,
        8);

    drawCoordsWithTimer(canvas, plotArr, ["lime", "lime"], 4, function(plotArrRef){
        window.setInterval(function(){
            clearCanvas(canvas);
            var ctx = canvas.getContext("2d");
            ctx.font = textStringSpecifications;
            ctx.fillStyle = "lime";
            ctx.fillText(text, originCoOrdinate.x - borderRadius, originCoOrdinate.y + (calculatedTextHeight - calculatedTextHeight / 4));

            let plotWithWigglesArr = wiggleDialogueBox(plotArr);
            drawCoordsWithLines(canvas, plotWithWigglesArr, ["lime", "lime"], 4);
        }, 100);
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