
var GenomeString;
var Genome = [];
var Init = false;
var CellAGenerer = 0;
//var counter = 0;

function CellGeneree ()
{
    if (CellAGenerer > 0)
    {
        CellAGenerer--;
    }
    
}

var Niveau = 0;
var chars = "ABCDEFGHIJKLMOPQRSTUVWXYZ$%abcdefghijklmnopqrstuvwxyz0123456789+-<>/=*'_?°@#.({[]})".split('');
//var chars = "ABCDEFGHIJKLMOPQRSTUVWXYZ0123456789+-<>/=*'_?°@#.({[]})".split('');

var RandGenome = function()
{
    var GenomeA = "$A";

    for(var indexBase = 0; indexBase < 30000 ; indexBase++)
    {
        GenomeA = GenomeA + chars [Math.floor(Math.random() * chars.length)];
    }
    
    return GenomeA;
}

String.prototype.replaceAt = function(index, replacement) {
    //console.log(replacement);
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

var Sex = function (Parent1String, Parent2String)
{

    Parent1 = Parent1String.split('$');
    Parent2 = Parent2String.split('$');

    var Fils = Parent1String;

    for(var indexFunc = 0; indexFunc < chars.length;indexFunc++)
    {
        //Calcul combien d'iterration de la fonction A il y a dans chaque parents
        NB1 = Parent1.filter(func => func[0] == chars[indexFunc]).length;
        NB2 = Parent2.filter(func => func[0] == chars[indexFunc]).length;

        //Nombre aléatoire entre min et max
        NBFils = Math.floor(Math.random() * Math.abs(NB1-NB2)) + Math.min(NB1, NB2);

        var Parent1Copie = [];
        var Parent2Copie = [];

        for(var CopiesFct = 0 ; CopiesFct < NBFils; CopiesFct++)
        {
            var fctACopier = "$";
            var Place = 0;
            var ParentConcerne;
            var ParentConcerneCopie= [];
            var ParentConcerneString = "";

            if (Parent1Copie.length < Parent1.filter(func => func[0] == chars[indexFunc]).length && 
            Parent2Copie.length < Parent2.filter(func => func[0] == chars[indexFunc]).length)
            {
                if(Math.random() < 0.5 )
                {
                    ParentConcerne = Parent1;
                    ParentConcerneCopie = Parent1Copie;
                    ParentConcerneString = Parent1String;
                    //console.log("Parent1");
                }
                else
                {
                    ParentConcerne = Parent2;
                    ParentConcerneCopie = Parent2Copie;
                    ParentConcerneString = Parent2String;
                    //console.log("Parent2");
                }
            }
            else
            {
                if (Parent1Copie.length < Parent1.filter(func => func[0] == chars[indexFunc]).length)
                {
                    ParentConcerne = Parent1;
                    ParentConcerneCopie = Parent1Copie;
                    ParentConcerneString = Parent1String;
                    //console.log("Parent1");
                }
                else
                {
                    ParentConcerne = Parent2;
                    ParentConcerneCopie = Parent2Copie;
                    ParentConcerneString = Parent2String;
                    //console.log("Parent2");
                }
            }

            var NumFctACopier = Math.floor(Math.random() * ParentConcerne.filter(func => func[0] == chars[indexFunc]).length);

            while(ParentConcerne.indexOf(NumFctACopier) != -1)
            {
                NumFctACopier = Math.floor(Math.random() * ParentConcerne.filter(func => func[0] == chars[indexFunc]).length);
            }

            ParentConcerneCopie.push(NumFctACopier);
            
            fctACopier = fctACopier+ParentConcerne.filter(func => func[0] == chars[indexFunc])[NumFctACopier];
            
            Place = ParentConcerneString.indexOf(fctACopier);
            
            Fils = Fils.replaceAt(Place,fctACopier);

        }

    }

    return Fils;
}

var InitGenome = function (GenomeStringInput)
{
    //GenomeString = GenomeStringInput;

    //GenomeString = RandGenome();
    GenomeString = Genomecopie2;
    //GenomeString = Sex(RandGenome(), RandGenome());

    Genome = GenomeString.split('$');

    Init = true;

}

var ExecuterFonction = function(charTitreFonction)
{
    //console.log(Genome);
    if (Init)
    {
        var retour = 0;
        Niveau ++;
    
        var funcs = Genome.filter(func => func[0] == charTitreFonction);
    
        if (funcs !=0)
        {
            var index = Math.floor( Math.random()*funcs.length);
            //console.log("Execution de " + charTitreFonction +" : "+ funcs[index]);
            retour = LireFonction(funcs[index]);
        }
        else{
            //console.log("Pas de fonction nommee " + charTitreFonction);
        }
    
        Niveau --;
        //console.log("Retour " + retour);
        return retour;
    }
    else
    {
        //console.log("Genome non initialise");
    }
    
}

var LireFonction = function(charFonction)
{


    var index = charFonction.length-1;
    var Memoire = 0.0;
    var TamponVal = 0.0;

    while(index--)
    {
        //parcoure chaque instriction en partant du début
        charCarac = charFonction[charFonction.length - index-1];

        //si c'est une fonction 
        if ((charCarac >='A'.charCodeAt(0)+ Niveau && charCarac <='Z'.charCodeAt(0))||(charCarac >='a'.charCodeAt(0)+ Niveau && charCarac <='z'.charCodeAt(0)))
        {
            //console.log("Appel de la nouvelle fonction : " + charCarac);
            TamponVal = ExecuterFonction(charCarac);
            //console.log("Resultat de la fonction : " + charCarac + " = " + TamponVal);

        }
        //si c'est une valeur
        else if(charCarac >='0' && charCarac <='9')
        {
            var indexInt = 0;
            var TamponValChar = "";
            
            while(charFonction[charFonction.length - index-1 + indexInt] >='0' 
            && charFonction[charFonction.length - index-1 + indexInt] <='9')
            {
                TamponValChar = TamponValChar + charFonction[charFonction.length - index-1 + indexInt];
                indexInt++;
            }

            //console.log(parseInt(TamponValChar));
            TamponVal = parseFloat(TamponValChar);
            index = index - (indexInt-1); //avance 
        }
        else
        {
            switch (charCarac) {
                //operations basiques
                case '-':
                    //console.log("Soustraction de : "+Memoire+" et "+TamponVal);
                    Memoire = Memoire - TamponVal;
                    break;
                case '+':
                    //console.log("Addition de : "+Memoire+" et "+TamponVal);
                    Memoire = Memoire + TamponVal;
                    break;
                case '/':
                    if (TamponVal != 0)
                    {
                        Memoire = Memoire / TamponVal;
                    }
                    else
                    {
                        Memoire = 0;
                    }
                    break;
                case '*':
                    //console.log("Multiplication de : "+Memoire+" et "+TamponVal);
                    Memoire = Memoire * TamponVal;
                    break;
                case '<':
                    Memoire = Memoire < TamponVal;
                    break;
                case '>':
                    Memoire = Memoire > TamponVal;
                    break;
                case '=':
                    Memoire = Memoire == TamponVal;
                    break;

                //saute une case si tampon est différent de 0
                case "'":
                    if (index > 0 && Memoire != 0)
                    {
                        //console.log("Saute prochain codon");
                        index --;
                    }
                    break;

                //assigne
                case '_':
                    if (Memoire == 0)
                    {
                        Memoire = TamponVal;
                    }

                    var PlaceToWrite = charFonction[charFonction.length - index];

                    if((PlaceToWrite >= 'A'.charCodeAt(0) && PlaceToWrite <= 'Z'.charCodeAt(0))||(PlaceToWrite >= 'a'.charCodeAt(0) && PlaceToWrite <= 'z'.charCodeAt(0)))
                    {
                        //Ecriture dans la memoire
                        //console.log("Ecrire dans la memoire ");
                        
                        EcritureMemoire(PlaceToWrite, Memoire);
                        
                        index--;

                    }
                    else 
                    {
                        //console.log("Fin de la fonction avec retour :" + Memoire);
                        return Memoire;
                    }

                    //console.log( Genome);
                    break;
                   
                    //Rand
                case '?':
                    //console.log("Crée une bebette");
                    TamponVal=Math.random();
                    break;

                case '°':
                    //console.log("Crée une bebette");
                    Memoire = Math.sin(TamponVal);
                    break;
                case '%':
                    Memoire = Date.now();
                //créé
                case '.':
                    //console.log("Crée une bebette");
                    CellAGenerer++;
                    break;

                default:
                    //console.log("Appel Interdit de "+charCarac);
                    break;
            }
        }
    }

    return 0;
}

function EcritureMemoire(PlaceToWrite, Val)
{

    //counter++; 

    var funcs = Genome.filter(func => func[0] == PlaceToWrite);

    var valToPrint = PlaceToWrite;
    
    if (Val >= 0) 
    {
        valToPrint = valToPrint + Math.floor(Val);
    }
    else
    {
        valToPrint = valToPrint + (-Math.floor(Val)) + "-";
    }
    
    valToPrint = valToPrint + "_";
    
    if (funcs !=0)
    {
        //console.log("Remplace la valeur a une place");
        var index1 = Math.floor( Math.random()*funcs.length);
        var TamponEcriture = Genome.indexOf(funcs[index1]);
    
        var placeEcriture = "";
    
        for(var iEcriture = 0; iEcriture < valToPrint.length; iEcriture++)
        {
            placeEcriture = placeEcriture + Genome[TamponEcriture][iEcriture];
        }
        
        Genome[TamponEcriture]= Genome[TamponEcriture].replace( placeEcriture, valToPrint);
        
    }
    else{
        var Artefacts = Genome.filter(func => (func[0] < 'A'.charCodeAt(0) && func[0] > 'Z'.charCodeAt(0))||(func[0] < 'A'.charCodeAt(0) && func[0] > 'Z'.charCodeAt(0)));
    
        if (Artefacts !=0)
        {
            //console.log("Remplace la valeur a une place");
            var index1 = Math.floor( Math.random()*funcs.length);
            var TamponEcriture = Genome.indexOf(funcs[index1]);
    
            var placeEcriture = "";
    
            for(var iEcriture = 0; iEcriture < valToPrint.length; iEcriture++)
            {
                placeEcriture = placeEcriture + Genome[TamponEcriture][iEcriture];
            }
            
            Genome[TamponEcriture]= Genome[TamponEcriture].replace( placeEcriture, valToPrint);
    
        }
        else
        {
            //console.log("Ecriture de la valeur à une nouvelle place : "+ valToPrint);
            Genome.push(valToPrint);
        }
    }
}
