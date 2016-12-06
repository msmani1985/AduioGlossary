//FlashcardDataProvider.js provides model for the flashcard
//includes xml loder and parser classes to handile the data

function flashcardDtataProvider(url,fuc)
{
    //main class used as a data handler 
    
       xmlLoader(url,parseXML);     
     
     flashcardDtataProvider.prototype.callfunction=fuc
    
              function StringtoXML(text){
                if (window.ActiveXObject){
                  var doc=new ActiveXObject('Microsoft.XMLDOM');
                  doc.async='false';
                  doc.loadXML(text);
                } else {
                  var parser=new DOMParser();
                  var doc=parser.parseFromString(text,'text/xml');
                }
                return doc;
            }

			
	function storeConformation(xml)
	{
		var storeData=xml;
		var r=confirm("You want to store flashcard data in your local machine ?");
			if (r==true)
			  {
			   localStorage.flashcardmodelxml=(new XMLSerializer()).serializeToString(xml);
			  }
			else
			  {
			 
			  }
	}		
  
    function parseXML(xml)
    {
    
	
	if(!localStorage.flashcardmodelxml)
	{
	storeConformation(xml)
	}
	
	
	

	  
   
      
       var list=[];   //stores the chapter list
   
        $(xml).find("chapter").each(function()
        {
           
            //parsing   
            var chpVo=new chapterVO();
            chpVo.name=$(this).attr("title");
            chpVo.queistionlist=[];
            $(this).find("question").each(function()
            {
                var qVo=new  queistionVO();
                qVo.term=$(this).find("wordpart").text()
                qVo.meaning=$(this).find("Meaning").text()  
                qVo.termAudio=$(this).find("wordpart").attr("audio")
                qVo.deffAudio=$(this).find("Meaning").attr("audio")
            
                chpVo.queistionlist.push(qVo)
                     
            });
            list.push(chpVo)
        });

		flashcardDtataProvider.prototype.callfunction(list)
             // setTimeout(dataloaded,500,list)
    }
    
    
    function dataloaded(list) //function to lod parsed data 
    {
         var event = document.createEvent("Event");
          event.initEvent('dataLoaded', true, true);
          event.data=list;
		  flashcardDtataProvider.prototype.callfunction(list)
          //document.dispatchEvent(event);
    }
    
    
    
    function chapterVO()
    {
        //contains the chapter level details
        var queistionlist;
        var name;
    }  
    function queistionVO()
    {
        //contains the queistion level details
        var qType;
        var term;
        var meaning;
        var termAudio;
        var deffAudio;
    }
    
}
function xmlLoader(xmlPath,parserFunction)//xml loading 
{
    //loads the xml file and handling the success and error conditions
    $.ajax({
        url: xmlPath,
        success:parserFunction, //calling parsing function
        dataType: "xml",
        error: function(){
           
		if(localStorage.flashcardmodelxml)
		 {
			parseXML(StringtoXML(localStorage.flashcardmodelxml))   
		 }
		 else
		 {
			 alert("please check your network");
		 }
           
     }

    });  
  
}