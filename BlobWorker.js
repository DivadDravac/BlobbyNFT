
importScripts("LZWEncoder.js","NeuQuant.js","GIFEncoder.js","GenomesBlobs.js","Genome.js","BlobbyGen.js");//"path-data-polyfill.js"

self.onmessage = function (msg) {
    switch (msg.data.aTopic) {
        case 'Init':
            InitInterface("$AE_$E3+E_");

            function MAJ ()
            {
              Update();
              console.log("test");
            }
            
            setInterval(MAJ , MicSecPerImage);
            break;
        default:
            
    }
}

