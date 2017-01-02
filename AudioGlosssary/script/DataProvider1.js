//FlashcardDataProvider.js provides model for the flashcard
//includes xml loder and parser classes to handile the data

function DtataProvider1(url, fuc) {
    //main class used as a data handler 

    xmlLoader(url, parseXML);

    DtataProvider1.prototype.callfunction = fuc

    function StringtoXML(text) {
        if (window.ActiveXObject) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(text);
        } else {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, 'text/xml');
        }
        return doc;
    }


    function storeConformation(xml) {
        var storeData = xml;
        //var r=confirm("You want to store flashcard data in your local machine ?");
        //	if (r==true)
        //  {
        localStorage.flashcardmodelxml = (new XMLSerializer()).serializeToString(xml);
        //  }
        //else
        // {

        // }
    }

    function parseXML(xml) {
        if (!localStorage.flashcardmodelxml) {
            storeConformation(xml)
        }
        var list = []; //stores the chapter list
        xml1=xml;
        $(xml).find("group").each(function () {
            //parsing   
            var chpVo = new chapterVO();
            chpVo.groupname = $(this).attr("name");
            chpVo.AudioList = [];
            $(this).find("audio").each(function () {
                var qVo = new queistionVO();
                qVo.Audioterm = $(this).find("term").text();
                qVo.pronc=$(this).find("pronc").text();//<pronc>(ab-dom-ih-no-PEL-vik)</pronc>
                qVo.Audiomeaning = $(this).find("def").text();
                qVo.AudioSentence = $(this).find("sen").text();
                qVo.SpaneshTerm = $(this).find("spanishterm").text();
                //alert($(this).find("spanishterm").text());

                qVo.chapterattr = $(this).attr("chapter");
                qVo.AudioUrl = $(this).attr("audioURL");
                qVo.defAudioUrl = $(this).attr("defaudioURL");
                qVo.senAudioUrl = $(this).attr("senaudioURL");
                qVo.SpanURL = $(this).attr("SpanURL");
                //alert(qVo.chapterattr);
                chpVo.AudioList.push(qVo)
            });
            list.push(chpVo)
        });

        DtataProvider1.prototype.callfunction(list)
            // setTimeout(dataloaded,500,list)
    }

    function dataloaded(list) //function to lod parsed data 
    {
        var event = document.createEvent("Event");
        event.initEvent('dataLoaded', true, true);
        event.data = list;
        DtataProvider1.prototype.callfunction(list)

        //document.dispatchEvent(event);
    }



    function chapterVO() {
        //contains the chapter level details
        var queistionlist;
        var name;
        var groupname;
        var AudioList;

    }

    function queistionVO() {
        //contains the queistion level details
        var qType;
        var term;
        var pronc;
        var meaning;
        var termAudio;
        var deffAudio;
        var SpaneshTerm;


        var SpaneshMeaning;
        var SpaneshAudio;
        var Audioterm;
        var Audiomeaning;
        var AudioSentence;
        var chapterattr;
        var AudioUrl;
        var defAudioUrl;
        var senAudioUrl;
        var SpanURL;
    }

}

function xmlLoader(xmlPath, parserFunction) //xml loading 
{
    //loads the xml file and handling the success and error conditions
    $.ajax({
        url: xmlPath,
        success: parserFunction, //calling parsing function
        dataType: "xml",
        error: function () {

            if (localStorage.flashcardmodelxml) {
                parseXML(StringtoXML(localStorage.flashcardmodelxml))
            } else {
                //alert("please check your network");
            }

        }

    });

}