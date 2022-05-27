
var GenomeString;
var Genome = [];

var GenomeParser = function (GenomeStringInput)
{
    GenomeString = GenomeStringInput;

    Genome = GenomeString.split('$');

    Genome.sort();
    console.log(Genome);
}

var ExecuterFonction = function(charTitreFonction)
{
    var funcs = Genome.filter(func => func[0] == charTitreFonction);

    var index = Math.floor( Math.random()*funcs.length);

    LireFonction(funcs[index]);
}

var LireFonction = function(charFonction)
{
    var index = charFonction.length;
    while(index--)
    {
        InterpreterCarac(charFonction[charFonction.length - index]);
    }
}

var InterpreterCarac = function(charCarac)
{
    console.log(charCarac);

    switch (charCarac) {
        case 1:
            break;
    
        default:
            break;
    }
}


var randomColor = function () {
    var color = '';
    for (var i = 0; i < 6; i++)
        color += chars[Math.floor(Math.random() * 16)];
    return color;
}

var randomizeColor = function (colorToRand) {

    var newColor = "";

    for (var i = 0; i < 3; i++)
    {
        var newVal = -1;
        var randToAdd = -1;

        while(newVal < 16 || newVal > 255)
        {
            randToAdd = Math.floor((Math.random()*32))-12;
            newVal = parseInt(colorToRand[i*2] + colorToRand[i*2+1], 16) + randToAdd;
        }
        
        newColor = newColor + newVal.toString(16);
    }

    return newColor;
}

var GenerateBlobHash = function (ID) {

    var GeneratedBlob = [];
    var GeneratedStat = [];
    var GeneratedCells = [];

    var MaxDist = 90 + Math.floor((Math.random()*50));
    var CenterForce = 0.01 + (Math.random()/MaxDist);
    var NbBlobs = 10 + Math.floor((Math.random()*16));
    var CellSize = 4 + Math.floor((Math.random()*6));
    var PathSize = 4 + Math.floor((Math.random()*5));

    GeneratedStat.push(ID);
    GeneratedStat.push(MaxDist);
    GeneratedStat.push(CenterForce);
    GeneratedStat.push(NbBlobs);
    GeneratedStat.push(CellSize);
    GeneratedStat.push(PathSize);

    var RandCol1 = randomColor();
    var RandCol2 = randomColor();

    var Affinity = Math.random()*90;

    var Randomization = Math.floor((Math.random()*60));

    for (let i = 0; i < NbBlobs; i++)
    {
        var GeneratedCell = [];
        
        var PosX = 180 + Math.floor((Math.random()*40));
        var PosY = 180 + Math.floor((Math.random()*40));
        var Angle = 180 - Math.floor((Math.random()*360));

        var CouleurCell = randomizeColor(RandCol1);
        var CouleurPath = randomizeColor(RandCol2);

        
        var Vitesse = 0.5 + Math.random();
        var BiasSet = 1 + Math.random()*2;

        RandomizationCell = Randomization + Math.floor((Math.random()*60));
        AffinityCell = Affinity +Math.random()*10;
        
        GeneratedCell.push(PosX);
        GeneratedCell.push(PosY);
        GeneratedCell.push(Angle);
        GeneratedCell.push(CouleurCell);
        GeneratedCell.push(CouleurPath);
        GeneratedCell.push(RandomizationCell);
        GeneratedCell.push(Vitesse);
        GeneratedCell.push(BiasSet);
        GeneratedCell.push(AffinityCell);

        GeneratedCells.push(GeneratedCell);
    }

    GeneratedBlob.push(GeneratedStat);
    GeneratedBlob.push(GeneratedCells);

    return GeneratedBlob;
}


var GetHash = function (StructBlob) {

     var Hash = 
    StructBlob[0][0] + "Y" +
    StructBlob[0][1] + "Y" +
    StructBlob[0][2] + "Y" +
    StructBlob[0][3] + "Y" +
    StructBlob[0][4] + "Y" +
    StructBlob[0][5] + "Z" ;

    for (let i = 0; i < StructBlob[1].length; i++)
    {
        Hash = Hash +  
        StructBlob[1][i][0] + "Y" + 
        StructBlob[1][i][1] + "Y" +
        StructBlob[1][i][2] + "Y" +
        StructBlob[1][i][3] + "Y" +
        StructBlob[1][i][4] + "Y" +
        StructBlob[1][i][5] + "Y" +
        StructBlob[1][i][6] + "Y" +
        StructBlob[1][i][7] + "Y" +
        StructBlob[1][i][8] ;

        if (i != StructBlob[1].length-1)
        {
            Hash = Hash +  "X";
        }
    }

    return Hash;
}

var GetStruct = function (HashIn) {

    var Sub = HashIn.split("Z");
    var BlobSpecBuff = Sub[0].split("Y");
    var CellsSpecBuff = Sub[1].split("X");
    var CellSpec = [];
    var BlobSpec = [];

    for(var i = 0; i < parseInt( BlobSpecBuff[3],10); i++)
    {
        var CellSpecBuff = CellsSpecBuff[i].split("Y");
        CellSpec.push(CellSpecBuff);
        
    }

    BlobSpec.push(BlobSpecBuff);
    BlobSpec.push(CellSpec);

    return BlobSpec;
}

var MixNFT = function (StructBlob1, StructBlob2) {

    var StructNewBlob = StructBlob1;
    var NbNewBlob = Math.floor( (parseInt(StructBlob1[0][3], 10) + parseInt( StructBlob2[0][3], 10))/2);

    StructNewBlob[0][0] = parseInt(StructBlob1[0][0], 16) * parseInt( StructBlob2[0][0], 16);//ID
    StructNewBlob[0][1] = (parseInt(StructBlob1[0][1], 10) + parseInt( StructBlob2[0][1], 10))/2; //MaxDist 
    StructNewBlob[0][2] = (parseFloat(StructBlob1[0][2]) + parseFloat( StructBlob2[0][2]))/2 ;//CenterForce 
    StructNewBlob[0][3] = NbNewBlob ; //  NbBlobs 
    StructNewBlob[0][4] = (parseInt(StructBlob1[0][4], 10) + parseInt( StructBlob2[0][4], 10))/2;// CellSize 
    StructNewBlob[0][5] = (parseInt(StructBlob1[0][5], 10) + parseInt( StructBlob2[0][5], 10))/2;//  PathSize 

    for(var index = 0; index < StructBlob2[1].length; index++)
    {
        StructNewBlob[1].push(StructBlob2[1][index]);
    }

    var delta = StructNewBlob[1].length - NbNewBlob;

    for(var i = 0; i < delta; i++)
    {
        var RandIndex = Math.floor( Math.random() * (StructNewBlob[1].length-1) );

        StructNewBlob[1].splice( RandIndex , 1);
    }

    return StructNewBlob;
}

