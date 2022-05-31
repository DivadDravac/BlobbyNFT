
importScripts("LZWEncoder.js","NeuQuant.js","GIFEncoder.js","GenomesBlobs.js","Genome.js","BlobbyGen.js");//"path-data-polyfill.js"

self.onmessage = function (msg) {
    switch (msg.data.aTopic) {
        case 'InitSVG':

            console.log(msg.data.canvas.firstChild);

            InitInterface("$AE_$E3+E_");

            function MAJ ()
            {
              Update();
            }
            
            setInterval(MAJ , MicSecPerImage);
            break;
        case 'InitGIF':
        
            InitInterface("$AE_$E3+E_");

            function MAJ ()
            {
                Update();
                console.log("test");
            }
            
            setInterval(MAJ , MicSecPerImage);
            break;
        
        default:
            console.log("Erreur");
            break;
            
    }
}

