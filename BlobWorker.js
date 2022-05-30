this.importScripts(["LZWEncoder.js",
"NeuQuant.js",
"GIFEncoder.js",
"path-data-polyfill.js",
"GenomesBlobs.js",
"Genome.js",
"BlobbyGen.js"]);

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText = "";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

var img = new Image();
var svg = new Blob([readTextFile("BlobbyThing.svg")], {type: "image/svg+xml"});
var url = URL.createObjectURL(svg);

img.onload = function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0,0);
  encoder.addFrame(ctx);
  URL.revokeObjectURL(url);
};

img.src = url;

InitInterface("$AE_$E3+E_");

function MAJ ()
{
  Update();
  console.log("test");
}

setInterval(MAJ , MicSecPerImage);