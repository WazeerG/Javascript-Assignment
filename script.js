function myFunction() {
  const myFile = new File(['Hello World!'], 'myFile.txt', {
       type: 'text/plain',
       lastModified: new Date(),
   });
   alert("completed");
}

/*var content = getFile('Datafile.csv');
const myForm = document.getElementById("myForm");
    const csvFile = opener.OpenTextFile(content, 1, true);



    myForm.addEventListener("submit", function (e) {

      alert(csvFile.files[0]);
      e.preventDefault();
      const input = csvFile.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result;
        document.write(text);
      };

      reader.readAsText(input);
    });
*/

function LoadFile(FileName,RespType,FileType,RunMe)
{   var AJAXFileReader=new XMLHttpRequest();

    // Creates new progress bar.
    var ProgressBar=CreateSVGProgBar("ProgressBars");

    AJAXFileReader.addEventListener("progress",
        function FRProgress(AJAXFREvt)
        {   // Calculate progress.
            var X=-1;

            if (AJAXFREvt.lengthComputable)
                X=Math.trunc(AJAXFREvt.loaded/AJAXFREvt.total*100);

            ShowProgressBar(ProgressBar,FileName,X);
        });

    AJAXFileReader.addEventListener("error",function FRFailed()
        {   // This will be executed if an error occurs.
            console.log("Error:",this.status);
        });

    AJAXFileReader.addEventListener("timeout",function FRTimeOut()
        {   // This will be executed if the reading times out.
            console.log("File reading timed out!");
        });

    AJAXFileReader.addEventListener("abort",
        function FRCancel()
        {   // This will confirm reading was aborted.
            console.log("File reading cancelled by user!");
        });

    ProgressBar.addEventListener("click",
        function KillMe()
        {   // Adds an abort command to the object.
            console.log(AJAXFileReader.readyState);
            if (AJAXFileReader.readyState!=4)
            {   console.log("Aborting file reading...");
                AJAXFileReader.abort();
            }
            ProgressBar.removeEventListener("click",KillMe);
        },
        false);

    AJAXFileReader.addEventListener("load",
        function Finished()
        {   // When reading is finished, send data to external function.
            if ((this.readyState==4)&&(this.status==200))
            {   ShowProgressBar(ProgressBar,FileName,100);
                RunMe(this.response);
                //ProgressBar.click();
            }
        },
        false);

    AJAXFileReader.open("GET",FileName,true);
    AJAXFileReader.overrideMimeType(FileType);
    AJAXFileReader.responseType=RespType;
    AJAXFileReader.timeout=10000; // Setting time-out to 10 s.

    AJAXFileReader.send();
}

function CreateSVGProgBar(AnchorId)
{   // Creates new SVG progress bar.
    var Parent=document.getElementById(AnchorId);
    var NewSVG=document.createElementNS("http://www.w3.org/2000/svg","svg");
    NewSVG.setAttribute("viewBox","0 0 102 22");
    NewSVG.setAttribute("width","102");
    NewSVG.setAttribute("height","22");
    Parent.appendChild(NewSVG);
    return NewSVG;
}

function ShowProgressBar(E,N,X)
{   // Show progress bar.
    var P=X<0?"???":X+"%";

    E.innerHTML="<text x=\"50\" y=\"16\" font-size=\"12\" fill=\"black\" stroke=\"black\" text-anchor=\"middle\">"+N+"</text><rect x=\"1\" y=\"1\" width=\""+X+"\" height=\"20\" fill=\""+(X<100?"#FF0000":"#0000FF")+"\" stroke=\"none\"/><rect x=\"1\" y=\"1\" width=\"100\" height=\"20\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/><text x=\""+X/2+"\" y=\"16\" font-size=\"12\" fill=\"black\" stroke=\"black\" text-anchor=\"middle\">"+P+"</text>";
}

function TracerOn(X)
{   // This will be executed after the file is completely loaded.
    document.getElementById("Tron").innerHTML=X;
}

function PlayIt(X)
{   // This will be executed after the file is completely loaded.
    var blob_uri=URL.createObjectURL(X);
    document.getElementById("MagicalBox").appendChild(document.createElement("source")).src=blob_uri;
}

function Startup()
{   // Run after the Page is loaded.
    LoadFile("MyDatafile.txt","text","text/plain;charset=utf-8",TracerOn);
}
