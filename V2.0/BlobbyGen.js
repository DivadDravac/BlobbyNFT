
//AnimationParam
var Refresh = 1;
var MicSecPerImage = 40;
var RefreshLenth = 100;
var NbSample = 6;   //<------- A ne surtout pas bouger
var Ouverture = Math.PI * 200/360;
var OffsetVision = 10;


var BlobParam;
//BlobParam
var NbBlobs;// = 15;
var MaxDist;// = 50;
var CenterForce;// = 0.06
var Color1,Color2;

var SpecCells = [];
// CouleurCell = [];
// CouleurPath = [];
// EpaisseurPath = [];
// DiametreCell  = [];
// Affinity = [];
// Vitesse = [];//Vitesse
// Random = [];//Random
// BiasSet = [];// BiasSet
// MaxDist = [];

var Cells = [];
var Paths = [];
var compteur = 0 ;
var xlinkns = "http://www.w3.org/1999/xlink";
var svgns = 'http://www.w3.org/2000/svg';

function InitInterface(GenomeCode){
  
  BlobParam;

  NbBlobs = 30;// = 15;
  MaxDist = 150;
  CenterForce = 0.1;

  InitGenome(GenomeCode);
  
  AddCell(200,200);
}

var elementsAt = function( x, y ){
    var elements = [];
    
    var PathsGroup = document.getElementById('Paths');
    var currentPath = PathsGroup.firstElementChild;
    var point = document.getElementById('Calque_1').createSVGPoint();
    point.x = x;
    point.y = y;

    for(var index = 0; index < PathsGroup.childElementCount; index++)
    {
      if (currentPath !=0){
        var test = currentPath.isPointInStroke(point);
      
        if (test)
        {
          elements.push(currentPath);
        }
        currentPath = currentPath.nextSibling;
      }
    }
    
    return elements;
}

var checkPath = function( xPos, yPos, RotA, RotB, RotC, RotD)
{
  var x = 0, y = 0;
  var listBuffer = [];
  for(let angleIterCheck = 0; angleIterCheck <= NbSample; angleIterCheck++)
  {
    var listSens = [];

    var angleToCheck = (angleIterCheck - NbSample/2) * Ouverture/NbSample;

    x = (RotC * (Math.cos(angleToCheck)) + RotD * (Math.sin(angleToCheck))) * OffsetVision;
    y = (RotA * (Math.cos(angleToCheck)) + RotB * (Math.sin(angleToCheck))) * OffsetVision;

    listSens = elementsAt(xPos + x, yPos + y);

    listBuffer.push(listSens);
  }
  return listBuffer;
}

var CalculDirection = function(listBuffer, CellVal)
{

  var angleToGo = 0;

  var Maximum = 0;

  for(let angleIterCheck = 0; angleIterCheck <= NbSample; angleIterCheck++)
  {
    var voteNb = 0;
    
    for (var overElement = 0; overElement < listBuffer[angleIterCheck].length; overElement++ )
    {
      
      if(listBuffer[angleIterCheck][overElement].id != Cells[CellVal].id)
      {
        var Aff = Cells.find(El => El.id == listBuffer[angleIterCheck][overElement].id).getAttribute("affinity");
        
        if (Math.abs(Aff- Cells[CellVal].getAttribute("affinity")) < 10)
        {
          voteNb++;
        }
        else if (Math.abs(Aff- Cells[CellVal].getAttribute("affinity")) > 50)
        {
          voteNb--;
        }
      }
    }
    if (voteNb > Maximum)
    {
      Maximum = voteNb;
      angleToGo = 360*((angleIterCheck - NbSample/2) * Ouverture/NbSample)/Math.PI;
    }
  }
  
  return angleToGo;
}


var AngleDeMtrx = function(RotA,RotB,RotC,RotD)
{
  var angle = 0;
  if (RotC <= 0)
  {
    if (RotA >= 0)
    {
        angle = - 90 + Math.round(Math.atan2(RotA,RotC) * (180/Math.PI));
    }
    else
    {
        angle = 90 + 180 + Math.round(Math.atan2(RotA,RotC) * (180/Math.PI));
    }
    
  }
  else
  {
        angle =  - 90 + Math.round(Math.atan2(RotA,RotC) * (180/Math.PI));
  }
  return angle;
}

function makeSVG(tag, attrs) {
    var el= document.createElementNS(svgns, tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

var moyenne = function(Test)
{
  const sum = Test.reduce((a, b) => a + b, 0);
  const avg = (sum / Test.length) || 1;

  return avg;
}

function UpdateGen(itemUpdate,X, Y, Presences,Angle, NBBlobPresent)
{

  VieToUpload = Cells[itemUpdate].getAttribute("vie");
  VieToUpload = VieToUpload-1;
  Cells[itemUpdate].setAttribute("vie", VieToUpload);
  //MAJLesValeursInput
  //console.log(VieToUpload);

  EcritureMemoire('!', Angle);//Angle
  EcritureMemoire('#', X);//PosX
  EcritureMemoire('@', Y);//PoxY
  EcritureMemoire('L', NBBlobPresent);
  EcritureMemoire('K', VieToUpload);

  if (Presences != 0)
  {
    EcritureMemoire('[', Presences[0].length);//Presence1
    EcritureMemoire('{', Presences[1].length);//Presence2
    EcritureMemoire('(', Presences[2].length);//Presence3
    EcritureMemoire(')', Presences[3].length);//Presence4
    EcritureMemoire('}', Presences[4].length);//Presence5
    EcritureMemoire(']', Presences[5].length);//Presence6
  }

    SpecCells[itemUpdate][0].push(ExecuterFonction('N'));
    SpecCells[itemUpdate][1].push(ExecuterFonction('O'));
    SpecCells[itemUpdate][2].push(ExecuterFonction('P'));
    SpecCells[itemUpdate][3].push(ExecuterFonction('Q'));
    SpecCells[itemUpdate][4].push(ExecuterFonction('R'));
    SpecCells[itemUpdate][5].push(ExecuterFonction('S'));
    SpecCells[itemUpdate][6].push(ExecuterFonction('T'));
    SpecCells[itemUpdate][7].push(ExecuterFonction('U'));
    SpecCells[itemUpdate][8].push(ExecuterFonction('V'));
    SpecCells[itemUpdate][9].push(ExecuterFonction('W'));
    SpecCells[itemUpdate][10].push(ExecuterFonction('X'));
    SpecCells[itemUpdate][11].push(ExecuterFonction('Y'));
    SpecCells[itemUpdate][12].push(ExecuterFonction('Z'));
  
    for(var increment = 0; increment < SpecCells[itemUpdate].length; increment ++)
    {
      if (SpecCells[itemUpdate][increment].length > 40)
      {
        SpecCells[itemUpdate][increment].shift();
      }
    }
    

  //MAJvaleurs output
  var CouleurCell = rgbToHex(moyenne(SpecCells[itemUpdate][0]),moyenne(SpecCells[itemUpdate][1]),moyenne(SpecCells[itemUpdate][2]));
  var CouleurPath = rgbToHex(moyenne(SpecCells[itemUpdate][3]),moyenne(SpecCells[itemUpdate][4]),moyenne(SpecCells[itemUpdate][5]));
  var EpaisseurPath = 4 + Math.abs(SafeDiv(4,moyenne(SpecCells[itemUpdate][6])));

  var DiametreCell  = 3 + Math.abs(SafeDiv(4,moyenne(SpecCells[itemUpdate][7])));
  var Affinity = moyenne(SpecCells[itemUpdate][8]);
  var Vitesse = 1 + SafeDiv(1,moyenne(SpecCells[itemUpdate][9]));//Vitesse
  var Random = 10 + Math.abs(SafeDiv(100,moyenne(SpecCells[itemUpdate][10])));//Random
  var BiasSet = 2 + SafeDiv(1,moyenne(SpecCells[itemUpdate][11]));// BiasSet
  var MaxDist = 150 - Math.abs(SafeDiv(1,moyenne(SpecCells[itemUpdate][12])));

  Cells[itemUpdate].setAttribute("fill",CouleurCell);
  
  Cells[itemUpdate].setAttribute("affinity",(Affinity));
  
  Cells[itemUpdate].setAttribute("random",Random);
  Cells[itemUpdate].setAttribute("biasSet",BiasSet);
  Cells[itemUpdate].setAttribute("maxDist",MaxDist);

  Paths[itemUpdate].setAttribute("stroke",CouleurPath);

  if (VieToUpload > 0)
  {
    Cells[itemUpdate].setAttribute("r", DiametreCell);
    Paths[itemUpdate].setAttribute("stroke-width",EpaisseurPath);
    Cells[itemUpdate].setAttribute("vitesse",Vitesse);
  }
  else
  {
    Cells[itemUpdate].setAttribute("r", Math.abs(DiametreCell + DiametreCell*VieToUpload/100));
    Paths[itemUpdate].setAttribute("stroke-width",Math.abs(EpaisseurPath+ EpaisseurPath*VieToUpload/100));
    Cells[itemUpdate].setAttribute("vitesse",Math.abs(Vitesse + Vitesse*VieToUpload/100));
  }

  //console.log(ExecuterFonction('F') + " " + ExecuterFonction('G'));
  //mise a jour du phenotype

}

function Update(){
  
  for( var item in Cells)
  {
    var xforms = Cells[item].transform.baseVal; 
    var TranslateTransform = xforms.getItem(0);
    var RotateTransform = xforms.getItem(1);
    var RotA,RotB,RotC,RotD ;
    var TranslateX, TranslateY;
    var vitesse;
    var BiasSet;
    var Randomization;

    if (RotateTransform.type == SVGTransform.SVG_TRANSFORM_ROTATE){
          RotA = RotateTransform.matrix.a,
          RotC = RotateTransform.matrix.c;
          RotB = RotateTransform.matrix.b,
          RotD = RotateTransform.matrix.d;
    }

    if (TranslateTransform.type == SVGTransform.SVG_TRANSFORM_TRANSLATE){

      TranslateX = TranslateTransform.matrix.e;
      TranslateY = TranslateTransform.matrix.f;
          
      var bias = 0;
      //  calcul l'angle actuel
      var angle = AngleDeMtrx(RotA,RotB,RotC,RotD);

      // Calcul valeurs sensorielles
      var Presences = checkPath(TranslateX, TranslateY, RotA, RotB, RotC, RotD);

      // Mise a jour Du génome
      UpdateGen(item, TranslateX, TranslateY, Presences, angle, Cells.length);

      vitesse = parseFloat(Cells[item].getAttribute("vitesse"));
      BiasSet = parseFloat(Cells[item].getAttribute("biasSet"));
      Randomization = parseFloat(Cells[item].getAttribute("random"));

      // Calcul Direction fututre
      var angleToGo = CalculDirection(Presences,item );//.id, parseFloat())

      var PathItems = Paths[item].getPathData();

      var a1 = TranslateX - 200;
      var b1 = TranslateY - 200;

      var dist = Math.sqrt((a1*a1)+(b1*b1));
      /// Si point trop éloigné
      if (dist > Cells[item].getAttribute("maxDist"))
      {
        var a2 = TranslateX + RotC * vitesse - 200;
        var b2 = TranslateY + RotA * vitesse - 200;

        var distDiff = Math.sqrt((a2*a2) + (b2*b2));

        if (dist <= distDiff +1)
        {
          var a3 = TranslateX + (RotC* Math.cos(BiasSet) + RotA * Math.sin(BiasSet) ) * vitesse - 200;
          var b3 = TranslateY + (RotA* Math.cos(BiasSet) - RotC * Math.sin(BiasSet)) * vitesse - 200;

          var a4 = TranslateX + (RotC* Math.cos(-BiasSet) + RotA * Math.sin(-BiasSet)) * vitesse - 200;
          var b4 = TranslateY + (RotA* Math.cos(-BiasSet) - RotC * Math.sin(-BiasSet)) * vitesse - 200;

          var distDiffBias1 = Math.sqrt(a3*a3+b3*b3);
          var distDiffBias2 = Math.sqrt(a4*a4+b4*b4); 

          if (distDiffBias1 > distDiffBias2 + 0.5)
          {
            bias = BiasSet + (dist - MaxDist)*(dist - MaxDist)*CenterForce;
          }
          else 
          {
            bias = - BiasSet - (dist - MaxDist)*(dist - MaxDist)*CenterForce;
          }
          
        }

      }
      else
      {

        bias = -angleToGo+ (Math.random() - 0.5)*Randomization;
        
      }

      //// MAJ le chemin
        
      PathItems.shift();

      if (compteur > Refresh)
      {
        PathItems.unshift({type: "L", values: [TranslateX , TranslateY]});
        
        if (PathItems.length > RefreshLenth)
        {
          PathItems.pop();
        }

      }
      
      PathItems.unshift({type: "M", values: [TranslateX + RotC * vitesse, TranslateY + RotA* vitesse]});
      
      Paths[item].setPathData(PathItems);

      // déplace le point
      Cells[item].setAttribute("transform","translate("+(TranslateX + RotC * vitesse)+","+ (TranslateY + RotA* vitesse)+") rotate("+(angle + bias)+", 0,0)");

    }

    while(CellAGenerer > 0 && Cells.length < 20)
    {
      AddCell(TranslateX,TranslateY);
      CellAGenerer--;
    }
  }

  for( var item = 0; item < Cells.length; item++)
  {
    if (Cells[item].getAttribute("vie") < -100)
    {
      
      Cells[item].remove();
      Cells.splice(item, 1);
      //console.log(Cells.length);

      Paths[item].remove();
      Paths.splice(item, 1);
      //console.log(Cells.length);

      SpecCells.splice(item, 1);
      
      //console.log(SpecCells);
      //SpecCells.splice(item+1, 1);
      //console.log(document.getElementById('Path'+item));
      //console.log(document.getElementById('Path'+item));
    }
  }

  if (compteur > Refresh)
  {
    compteur = 0;
  }
  else
  {
    compteur ++;
  }
  
}

function componentToHex(c) {
  if(c > 255)
  {
    c=255;
  }
  var hex = Math.floor(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {

  var Max =Math.max(r, g, b);


  return "#" + componentToHex(255*Math.abs(r)/Max) + componentToHex(255*Math.abs(g)/Max) + componentToHex(255*Math.abs(b)/Max);
}

var AddCell = function(PosX,PoxY){

  ExecuterFonction('A');

  var x = PosX;
  var y = PoxY;
  var teta = ExecuterFonction('M');
  var VieToSet = Math.abs(600 + ExecuterFonction('K'));

  if (teta > 65000 || teta == true)
  {
    teta = 0;
  }

  var CellBuff = makeSVG('circle', {id : "Path"+Cells.length, vie : VieToSet});
  CellBuff.setAttributeNS(xlinkns, 'href', '#CellDef');
  CellBuff.setAttribute("transform","translate("+x+","+y+") rotate("+teta+", 0,0)");
  document.getElementById('Blob').appendChild(CellBuff);


  var PathBuff = makeSVG('path', {id : "Path"+ Cells.length, class :'PathStyle'});
  document.getElementById('Paths').appendChild(PathBuff);

  Cells.push(CellBuff);
  Paths.push(PathBuff);
  var Spec =  [[], [], [], [], [], [], [], [], [], [], [], [], []];
  SpecCells.push(Spec);
  
}


var SafeDiv = function(a,b)
{
  var ret = 0;
  if (Math.abs(b)>0.5)
  {
    ret = a/b;
  }
  else
  {
    ret = a;
  }

  return ret;

}
