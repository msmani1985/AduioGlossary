var chapterArray=[];
var modalData=[];
var currentQnum;
var currentChapterList=[];
var sound ;
var click=0;
var termFlag;
var audioSrcDef;
var audioSrc;
var isNavigating=false;
var isMute=false;

var allQuestionList=[];

function bodyloaded()
{
document.addEventListener("dataLoaded",createUI)//event to load data and creat UI
modelObj=new flashcardDtataProvider("xmlfiles/All.xml",createUI);//creting instance for model passing xml url
}




function createUI(e)//to load data into the UI
{
   

    //var chapterHeddingDeff=document.getElementById("chapterHeddingDeff");//variable declaration for UI locations
    //var termContent=document.getElementById("termContent");
   // var chapterHeadding=document.getElementById("chapterHedding");
   // var definitionContent=document.getElementById("definitionContent");
    modalData=e;//loading data to variable 
	
	//alert("prinjumon1"+modalData)
    var questionlist = modalData[0].queistionlist;
    currentChapterList=questionlist.slice(0,questionlist.length);//coping array 
	//alert(currentChapterList[1].meaning.length);
    currentQ=0;
    var cahperList=document.getElementById("chapterList");//chapter level data
    var option;
	//alert("prinjumon2")
		//DefaultOption for All Chapters;
		option = document.createElement("option");
        option.setAttribute("value", "Connection.TRANSACTION_NONE")
        option.innerHTML ="All";
        option.value="All";
        cahperList.appendChild(option);
	
    for(var i=0;i<modalData.length;i++)//loading chapter headdings to dropdown box
    {
        option = document.createElement("option");
        option.setAttribute("value", "Connection.TRANSACTION_NONE")
        option.innerHTML = modalData[i].name;
        option.value=modalData[i].name;
        cahperList.appendChild(option);
		for(var j=0;j< modalData[i].queistionlist.length;j++)//loading chapter headdings to dropdown box
		{
			allQuestionList.push(modalData[i].queistionlist[j]);
		}
    }
			currentChapterList=allQuestionList.slice(0,allQuestionList.length);
			chapterArray=e;
	
		var cahperList=document.getElementById("chapterList");
		var currentChap=cahperList.options[cahperList.selectedIndex].value; 
		var option1;
		var myDiv = document.getElementById("section");
		var selectList = document.createElement("select");
		for(var t=0;t<chapterArray.length;t++)
			{
			    selectList.id = "mySelect";
				myDiv.appendChild(selectList);
		for(var j=0;j< chapterArray[t].queistionlist.length;j++)//loading chapter headdings to dropdown box
		{
			var option = document.createElement("option");
			option.value = chapterArray[t].queistionlist[j].term;
			option.text = chapterArray[t].queistionlist[j].term;
			selectList.appendChild(option);
	   
		}
			   
	}
	
	
	
	
	
	
	
	
	
	//alert(currentChapterList.length);
	/*
	if(localStorage.currentChapter)
	{
	
		cahperList.selectedIndex=localStorage.currentChapter;
		onselectionViewModelChanges();
	}
	else
	{
		cahperList.selectedIndex=0;
	}
	
	
	if(localStorage.currentquestion)
	{
		currentQ=localStorage.currentquestion
	}
	
	
	
	
    chapterHeadding.innerHTML=cahperList.options[cahperList.selectedIndex].value; 
    chapterHeddingDeff.innerHTML=cahperList.options[cahperList.selectedIndex].value; 
    loadQuestion();//loading current question*/
 
}


function getTerms()
{
	  alert("Chaters Length "+chapterArray.length);
      alert("Total Question "+currentChapterList.length);
	  var cahperList=document.getElementById("chapterList");
	  var currentChap=cahperList.options[cahperList.selectedIndex].value; 
	  alert("selected Chapter "+currentChap);
	  var option1;
	  var myDiv = document.getElementById("section");
	  var selectList = document.createElement("select");
  for(var t=0;t<chapterArray.length;t++)
  {
       selectList.id = "mySelect";
       myDiv.appendChild(selectList);
	   for(var j=0;j< chapterArray[t].queistionlist.length;j++)//loading chapter headdings to dropdown box
		{
	    var option = document.createElement("option");
        option.value = chapterArray[t].queistionlist[j].term;
        option.text = chapterArray[t].queistionlist[j].term;
        selectList.appendChild(option);
		}
  }
}

function onSelection1()
{
	//alert("Chaters Length "+chapterArray.length);
	//alert("Total Question "+currentChapterList.length);
	var cahperList=document.getElementById("chapterList");
	var currentChap=cahperList.options[cahperList.selectedIndex].value; 
	alert("selected Chapter "+currentChap);
	var option1;
	 
  for(var t=0;t<chapterArray.length;t++)
  {
    
  
     if(chapterArray[t].name==currentChap)
    {  

		//creating List Element
	//	var list = document.getElementById("demo");
       // var entry = document.createElement('li');
		
		//creating section Wlement
	    var myDiv = document.getElementById("section");
	    var selectList = document.createElement("select");
        selectList.id = "mySelect";
        myDiv.appendChild(selectList);
	 for(var j=0;j< chapterArray[t].queistionlist.length;j++)//loading chapter headdings to dropdown box
		{
	    var option = document.createElement("option");
        option.value = chapterArray[t].queistionlist[j].term;
		
		
		var termcontent=chapterArray[t].queistionlist[j].term;
	
         option.text = chapterArray[t].queistionlist[j].term;
		 //document.write(chapterArray[t].queistionlist[j].meaning);
		
        selectList.appendChild(option);
		
		
		//entry.appendChild(document.createTextNode(chapterArray[t].queistionlist[j].meaning));
	    //list.appendChild(entry);
		
	   
		}
  }

  }







}







function onselectionViewModelChanges()
{

    var chapterHeddingDeff=document.getElementById("chapterHeddingDeff");
    var cahperList=document.getElementById("chapterList");
    var chapterHeadding=document.getElementById("chapterHedding");
	
	var currentTerm=cahperList.options[cahperList.selectedIndex].value; 
    chapterHeadding.innerHTML=currentTerm;
    chapterHeddingDeff.innerHTML=currentTerm;//changing c
	
	localStorage.currentChapter=cahperList.selectedIndex;
	
	
	if(cahperList.selectedIndex!=0)
	{
	
    var questionlist = modalData[cahperList.selectedIndex-1].queistionlist;
    currentChapterList=questionlist.slice(0,questionlist.length);
	
	}
		
	
	if(cahperList.selectedIndex==0)
	{
	
    currentChapterList=allQuestionList.slice(0,allQuestionList.length);
	}

}







function onSelection()//onchange of option box
{
onselectionViewModelChanges();

    currentQ=0;
    click=1;
 if(termFlag==0)
        {
          termFlag=1;  
          flipInto(); 
        }
        
     
      loadQuestion();
      loadAudio();
      tabClickTerm(); 
}
function loadShuffile()//to shuffile current chapter list
{
        
    shuffle(currentChapterList);  //passing data to shuffile function
    currentQ=0;//settin shuffled question as first question 
    
    if(termFlag==0)//to plip if definition tab is active
        {
          termFlag=1; //changing term tab into active 
          flipInto(); //flip to term
        }
        
     
      loadQuestion();
      tabClickTerm(); //term active effect
}
function shuffle(data){ //to shuffile the loaded data
    for(var j, x, i = data.length; i; j = Math.floor(Math.random() * i), x = data[--i], data[i] = data[j], data[j] = x);
    return data;
};

function loadQuestion()//loading the current question
{
    audioSrcDef=currentChapterList[currentQ].deffAudio;
    audioSrc=currentChapterList[currentQ].termAudio;
    var termContent=document.getElementById("termContent");
    var definitionContent=document.getElementById("definitionContent");
    termContent.innerHTML=currentChapterList[currentQ].term;
    definitionContent.innerHTML=currentChapterList[currentQ].meaning;
    setButtonstate();
	click=1;//flag for flip condition
	audioPlay(audioSrc);//play sound
	localStorage.currentquestion=currentQ;
		var muteBt=document.getElementById("muteBt");

	if(!audioSrc || audioSrc==undefined){
		muteBt.className ="audiodisable";  
	}
	else
	{
		muteBt.className ="muteBtAct";  
	}
	
 
}
 
function nextQuestion()//load next question
{
    var nextQB=document.getElementById("nextQ");//seting next button state
    click=1;
    
    if(nextQB.className!="")
    {
            
        return 
            
    }
    
      isNavigating=true;

    if(termFlag==0)
        {
           
          flipInto(); 
          tabClickTerm();
        }
   
   
    tabClickTerm(); 
     isNavigating=false;
      currentQ++; 
    loadQuestion();
     
}
 
function previousQuestion()//loading previous question
{
    var prevQ=document.getElementById("prevQ");
	
	
    click=1;
    if(prevQ.className!="")
    {
        return 
            
    }
    
    isNavigating=true;
    
    if(termFlag==0)
        {
         
          flipInto();  
          tabClickTerm();
        }
     tabClickTerm(); 
     isNavigating=false;
     currentQ--;
     loadQuestion();
    
   
} 
//to load current question form local data
function getQuestion(Qnum)
{
    
    currentQ= Qnum;  
    
    loadQuestion(modalData) ;
}

function tabClickDef()//defenition term active state
{
    
    termFlag=0;
    click=0;
    var b2=document.getElementById("b2");
    var b1=document.getElementById("b1");
    b2.className="activedef";
    b1.className="inactiveterm"; 
    
    loadAudio();
}

function tabClickTerm()//term term activating
{

  termFlag=1;
  click=1;
  var b2=document.getElementById("b2");
    var b1=document.getElementById("b1");
    b1.className="activeterm";
    b2.className="inactivedeff"; 
    loadAudio();
}
function setButtonstate()//setting next and previous button state
{ 
    
    var prevQ=document.getElementById("prevQ");
    var nextQB=document.getElementById("nextQ");
    var totalQus=currentChapterList.length-1;
    nextQB.className ="";
     prevQ.className ="";
     
    if(currentQ<=0)
    {
        prevQ.className ="inactive";  
       
    }   
    if(currentQ>=totalQus)
    {
        nextQB.className ="inactive";   
       
    }
}

function rotateFlip()//flip toggle
{
 
    if(click==0)
    {
        rotateFlip1();  
        
    }
    else{  
      // debugger;
        click=0;
        $('#cbox2').siblings().hide();
        $('#cbox2').show() ;
        $('#cbox2').flip({
            direction:'tb',
            color:'white' 
        })
        $('#cbox2').siblings().hide();  
        tabClickDef();  
    } 
     
}
function rotateFlip1()//cheking flags
{
    if(click==1)
    {
        click=0;
        rotateFlip();   
          
    }
    else{
        click=1;
   
   rotateFlip();
   flipInto();
    tabClickTerm();  
    } 
     
}

function flipInto()//conditional flip
{
    
      $('#cbox1').siblings().hide();
        $('#cbox1').show() ;
        $('#cbox1').flip({
            direction:'tb',
            color:'white' 
        })
        $('#cbox1').siblings().hide();  
    
    
    
}
function audioPlay(src)//to load and play audio
{
     if(isNavigating==true)
         return
         
    if(sound)//killing previous audio
    {
      sound.stop();  
      sound=null;
    }
    
     if(src==undefined)
        return;
    
    
    sound= new buzz.sound(src,{
    formats: [ "ogg", "mp3", "aac" ]
    });
    sound.load();
    sound.play();
    
             if(isMute)//checking is mute
                {
                     sound.pause();//mute true
                 }
}

function loadAudio()//loading audio
{
    
    if(click==0)
        {
            
         audioPlay(audioSrcDef); 
         
        }
        else
            {
             audioPlay(audioSrc);    
                
            }
    
}


function audioMute()
{
    var muteBt=document.getElementById("muteBt");
   
   $('#muteBt').toggleClass("muteBtAct");
   if(isMute==false)
        {
             if(sound)
              sound.pause();     
             isMute=true
       
        }
        else
         {
             isMute=false
             if(sound)
             sound.play();
           
            }
   
   
}