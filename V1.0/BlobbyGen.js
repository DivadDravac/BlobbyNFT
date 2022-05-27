
//AnimationParam
var Refresh = 1;
var MicSecPerImage = 40;
var RefreshLenth = 60;
var NbSample = 6;
var Ouverture = Math.PI * 200/360;
var OffsetVision = 10;


var BlobParam;
//BlobParam
var NbBlobs;// = 15;
var MaxDist;// = 50;
var CenterForce;// = 0.06


var Cells = [];
var Paths = [];
var chars = '0123456789ABCDEF'.split('');
var compteur = 0 ;
var xlinkns = "http://www.w3.org/1999/xlink";
var svgns = 'http://www.w3.org/2000/svg';

var elementsAt = function( x, y ){
    var elements = [];
    
    var PathsGroup = document.getElementById('Paths');
    var currentPath = PathsGroup.firstElementChild;
    var point = document.getElementById('Calque_1').createSVGPoint();
    point.x = x;
    point.y = y;

    for(var index = 0; index < NbBlobs; index++)
    {
      var test = currentPath.isPointInStroke(point);
      
      if (test)
      {
        elements.push(currentPath);
      }
      currentPath = currentPath.nextSibling;
    }
    
    return elements;
}

var checkPath = function(id, selfAffinity, xPos, yPos, RotA, RotB, RotC, RotD)
{
  var angleToGo = 0;
  var nbPath = 0
  var x = 0, y = 0;
  var listBuffer = [];
  
  for(let angleIterCheck = 0; angleIterCheck <= NbSample; angleIterCheck++)
  {

    var angleToCheck = (angleIterCheck - NbSample/2) * Ouverture/NbSample;

    x = (RotC * (Math.cos(angleToCheck)) + RotD * (Math.sin(angleToCheck))) * OffsetVision;
    y = (RotA * (Math.cos(angleToCheck)) + RotB * (Math.sin(angleToCheck))) * OffsetVision;

    listBuffer = elementsAt(xPos + x, yPos + y);
  
    for (var overElement = 0; overElement < listBuffer.length; overElement++ )
    {
      if(listBuffer[overElement].id != id)
      {
        if (Math.abs(parseFloat( listBuffer[overElement].getAttribute("affinity")) - selfAffinity) < 10)
        {
          
          angleToGo = angleToGo + 360*angleToCheck/Math.PI;
        }
        else
        {
          
          angleToGo = angleToGo - 360*angleToCheck/Math.PI;
        }
        nbPath++;
      }
    }
  }

  if (nbPath > 0)
  {
    angleToGo = angleToGo/nbPath;
  }

  return angleToGo;
}

function makeSVG(tag, attrs) {
    var el= document.createElementNS(svgns, tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

function Update(){

  for( var item in Cells)
  {
    var xforms = Cells[item].transform.baseVal; 
    var TranslateTransform = xforms.getItem(0);
    var RotateTransform = xforms.getItem(1);
    var RotA,RotB,RotC,RotD ;
    var TranslateX, TranslateY;


    var vitesse = parseFloat(BlobParam[1][item][6]);
    var BiasSet = parseFloat(BlobParam[1][item][7]);
    var Randomization = parseInt(BlobParam[1][item][5],10);

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
      //  calcul l'angle
      var angle ;
      
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

      /// Si point trop éloigné

      var angleToGo = checkPath(Cells[item].id, parseFloat(Paths[item].getAttribute("affinity")), TranslateX, TranslateY, RotA, RotB, RotC, RotD);

      var PathItems = Paths[item].getPathData();

      var a1 = TranslateX - 200;
      var b1 = TranslateY - 200;

      var dist = Math.sqrt((a1*a1)+(b1*b1));

      if (dist > MaxDist)
      //if (Math.abs(a1) > MaxDist || Math.abs(b1) > MaxDist)
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
        if(PathItems.length > 5){
          bias = -angleToGo * 0.5 + (Math.random() - 0.5)*Randomization;
        }
        else{
          bias = -angleToGo * 0.5;
        }
        
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

function init(BlobToPlot){
  
  BlobParam = BlobToPlot;

  NbBlobs = parseInt(BlobParam[0][3],10);// = 15;
  MaxDist = parseInt(BlobParam[0][1],10);
  CenterForce = parseFloat(BlobParam[0][2]);


  for (let i = 0; i<NbBlobs; i++)
  {
    
    var x = parseInt(BlobParam[1][i][0],10);
    var y = parseInt(BlobParam[1][i][1],10);
    var teta = parseInt(BlobParam[1][i][2],10);
    
    var CellBuff = makeSVG('circle', {id : "Path"+i, fill : "#"+BlobParam[1][i][3], r:parseInt(BlobParam[0][4],10)});
    CellBuff.setAttributeNS(xlinkns, 'href', '#CellDef');
    CellBuff.setAttribute("transform","translate("+x+","+y+") rotate("+teta+", 0,0)");
    document.getElementById('Blob').appendChild(CellBuff);

    
    var PathBuff = makeSVG('path', {id : "Path"+i, class :'PathStyle', stroke : "#"+BlobParam[1][i][4], "stroke-width" : parseInt(BlobParam[0][5],10) , affinity : BlobParam[1][i][8]});
    document.getElementById('Paths').appendChild(PathBuff);

    Cells.push(CellBuff);
    Paths.push(PathBuff);
  }

  setInterval(Update , MicSecPerImage);
}

