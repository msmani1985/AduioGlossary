//FlashcardDataProvider.js provides model for the flashcard
//includes xml loder and parser classes to handile the data

function dataconfigprovider(url, fuc) {
    //main class used as a data handler 

    xmlLoader(url, parseXML);

    dataconfigprovider.prototype.callfunction = fuc

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
        //if (r==true)
        // {
        localStorage.flashcardmodelxml = (new XMLSerializer()).serializeToString(xml);
        // }
        //else
        //{

        // }
    }

    function parseXML(xml) {

        if (!localStorage.flashcardmodelxml) {
            storeConformation(xml)
        }
        var list = []; //stores the chapter list
        xmlconfig=xml;
        /*$(xml).find("chapter").each(function() {
            //parsing   
            var chpVo = new chapterVO();
            chpVo.name = $(this).text();
            //alert(chpVo.name);
            list.push(chpVo)
        });*/
        dataconfigprovider.prototype.callfunction(list)
            // setTimeout(dataloaded,500,list)
    }

    
}

function xmlLoader(xmlPath, parserFunction) //xml loading 
{
    //loads the xml file and handling the success and error conditions
    $.ajax({
        url: xmlPath,
        success: parserFunction, //calling parsing function
        dataType: "xml",
        error: function() {
            if (localStorage.flashcardmodelxml) {
                parseXML(StringtoXML(localStorage.flashcardmodelxml))
            } else {
                // alert("please check your network");
            }
        }
    });
}
