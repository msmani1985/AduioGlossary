var max=60;
var min=24;
var data;

var nclexDoc;
var tocDoc;
var initDoc;
var sound;
var Chap4Array = [];
var GroupArray = [];
var GroupArrayRef = [];
var modalData = [];
var modalData1 = [];
var TermsAndDeff = [];
var Defarray = [];
var chapterToBeLoaded;
var GROUP = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var chapter_counter = 0, question_no = -1;
var calculate_reset = 0;
var click = 0;
var termFlag;
var isNavigating = false;
var isMute = false;
var FirstTerm;
var FirstDefinition;
var loaded = false;
var audioElement1;
function onSidenav()
{
	
if($("#sidemenu").attr("class").indexOf("sideNav")>0)
	{
				$("#sidemenu").toggleClass("sideNav","sideNav1");
				$("#sidemenu").css("display","");
			
	}
	else
	{
		
		$("#sidemenu").addClass("sideNav");
		$("#sidemenu").css("display","block");
	}
	
}
function bodyloaded1() {
	document.addEventListener("dataLoaded", createUI);
	document.addEventListener("dataLoaded", createUI1);
	modelObj = new DtataProvider("xml/chapter.xml", createUI);
	modelObj1 = new DtataProvider1("xml/terms.xml", createUI1);
	
}
function createUI(e) //to load data into the UI
{

	modalData = e;
	var cahperList = document.getElementById("chapterList"); //chapter level data
	var option;
	option = document.createElement("option");
	option.setAttribute("value", "Connection.TRANSACTION_NONE")
	option.innerHTML = "All Chapters";
	option.value = "All Chapters";
	cahperList.appendChild(option);
	for (var k = 0; k < modalData.length; k++) {
		option = document.createElement("option");
		option.setAttribute("value", "Connection.TRANSACTION_NONE")
		option.innerHTML = modalData[k].name;
		option.value = modalData[k].name;
		cahperList.appendChild(option);
		//alert(modalData[k].name);
	}
}
function createUI1(e) {

	modalData1 = e; //loading data to variable


	var questionlist = modalData1[0].AudioList;
	currentChapterList = questionlist.slice(0, questionlist.length); //coping array
	currentQ = 0;
	var MYLIST = document.getElementById("myLi"); //chapter level data

	var lix = document.createElement("li");
	lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-warning\" style=\"width:30px;height:25px;font-size:15px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"All\" value=\"All\">";
	
	//lix.innerHTML="<button type=\"button\" class=\"btn btn-default\" onclick=\"onSelection3(this)\" id=\"All\" value=\"All\">All</button>"
	MYLIST.appendChild(lix);

	for (var i = 0; i < GROUP.length; i++) //loading chapter headdings to dropdown box
	{

		var lix = document.createElement("li");
		lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-info\" style=\"width:30px;height:25px;font-size:17px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"" + GROUP[i] + "index\" value=\"" + GROUP[i] + "\">";
		MYLIST.appendChild(lix);

	}
	//document.getElementById("b1").disabled = true;
	//document.getElementById("b2").disabled = true;

	GroupArray = e;

	var myDiv = document.getElementById("section");
	var selectList = document.createElement("select");
			var termsdetsear="";
	for (var t = 0; t < GroupArray.length; t++) {
		selectList.setAttribute("id", "termChoose");
		selectList.setAttribute("size", "42");
		selectList.setAttribute("style", "width:200px");
		selectList.setAttribute("onclick", "onSelectDef(this)");
		myDiv.appendChild(selectList);
		//GroupArrayRef.push(GroupArray[t].groupname);

		for (var j = 0; j < GroupArray[t].AudioList.length; j++) //loading chapter headdings to dropdown box
		{
			Defarray.push(GroupArray[t].AudioList[j].Audiomeaning);
			//alert(GroupArray[t].AudioList[j].chapterattr);
			var option = document.createElement("option");
			option.value = GroupArray[t].AudioList[j].Audioterm;
			option.text = GroupArray[t].AudioList[j].Audioterm;
			selectList.appendChild(option);
			termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].Audioterm+'",';
			  if(GroupArray[t].AudioList[j].SpaneshTerm==undefined||GroupArray[t].AudioList[j].SpaneshTerm=="")
			  {
				 // termsdetsear=termsdetsear+",";
			 }else{
            var option1 = document.createElement("option");
			option1.value = GroupArray[t].AudioList[j].SpaneshTerm;
			option1.text = GroupArray[t].AudioList[j].SpaneshTerm;
			option1.setAttribute("style", "color:blue");
			termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].SpaneshTerm+'",';
			selectList.appendChild(option1);
			}
			option1.setAttribute("style", "color:blue");
			if (GroupArray[t].groupname == "A") {

				FirstTerm = GroupArray[t].AudioList[0].Audioterm;
				FirstDefinition = GroupArray[t].AudioList[0].Audiomeaning;
				var TC = document.getElementById("termContent");
				TC.innerHTML = FirstTerm;
				var DC = document.getElementById("definitionContent");
				DC.innerHTML = FirstDefinition;
				$("#b1").css("background", "#9AC97B");
				$("#b1").css("color", "white");

			}
			
			
		}
	}
	console.log(termsdetsear);
	
	var termdsdetsear1=JSON.parse("["+removeLastComma(termsdetsear)+"]");
	alert(termdsdetsear1);
	data=  {"ale": termdsdetsear1};
	alert(termdsdetsear1);
	console.log(data.ale);
search();
	$("#bl").attr('disabled',true);
	$("#b2").attr('disabled',true)
}

function removeLastComma(str) {
   return str.replace(/,(\s+)?$/, '');   
}


function search()
{
	console.log("["+data.ale[0]+"]")
 typeof $.typeahead === 'function' && $.typeahead({
            input: ".js-typeahead-input",
            minLength: 1,
            maxItem: 15,
            order: "asc",
            hint: true,
            group: {
                template: "{{group}} Chapters!"
            },
            maxItemPerGroup: 5,
            backdrop: {
                "background-color": "#fff"
            },
            href: "/Chapters/{{group}}/{{display}}/",
           // dropdownFilter: "all beers",
            emptyTemplate: 'No result for "{{query}}"',
            source: {
                ale: {
                    data: data.ale
                },
                
            },
            callback: {
                onClickAfter: function (node, a, item, event) {

                    // href key gets added inside item from options.href configuration
                    alert(item.href);

                }
            },
            debug: true
        });

}

function ToViewSpanTerm()
{
//document.getElementById("b3").value="English Term";
//document.getElementById("b3").style="	background-color: #7D81D1;"
if(document.getElementById("b3").value=="English Terms")
{
	
	document.getElementById("b3").value="Spanish Terms";
document.getElementById("b3").style="	background-color: #D17DD0;"
}
else
{	
document.getElementById("b3").value="English Terms";
document.getElementById("b3").style="	background-color: #7D81D1;"
var x = document.getElementById("termChoose");
x.remove();
var myDiv = document.getElementById("section");
var selectList = document.createElement("select");
for (var t = 0; t < GroupArray.length; t++) {
	
		for (var j = 0; j < GroupArray[t].AudioList.length; j++) //loading chapter headdings to dropdown box
		{	
		selectList.setAttribute("id", "termChoose");
		selectList.setAttribute("size", "42");
		selectList.setAttribute("style", "width:200px");
		selectList.setAttribute("onclick", "onSelectDef(this)");
		myDiv.appendChild(selectList);
		if(GroupArray[t].AudioList[j].SpaneshTerm==undefined||GroupArray[t].AudioList[j].SpaneshTerm=="")
			  {
			 }else{
            var option= document.createElement("option");
			option.value = GroupArray[t].AudioList[j].SpaneshTerm;
			option.text = GroupArray[t].AudioList[j].SpaneshTerm;
			option.setAttribute("style", "color:blue");
			selectList.appendChild(option);
			}
		
		}
					
	}
}
}

function onSelection2() {

	var bx = document.getElementById("box");
	if (bx == null) {}
	else {
		$("#box").remove();
	}
	var bx1 = document.getElementById("box1");

	if (bx1 == null) {}
	else {
		$("#box1").remove();

	}
	//document.getElementById("b1").disabled = true;
	//document.getElementById("b2").disabled = true;
	var cahperList = document.getElementById("chapterList");
	var currentChap = cahperList.options[cahperList.selectedIndex].value;
	//alert(currentChap);

	var sectiondatacount = 0;
	for (var t = 0; t < modalData.length; t++) {
		if (modalData[t].name == currentChap) {
			var x = document.getElementById("termChoose");
			x.remove();
			var chapterNumberOnly = modalData[t].name;
			var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10);
			var chapterNumberOnly2 = "\," + chapterNumberOnly1.trim() + "\,";
			var myDiv = document.getElementById("section");
			var selectList = document.createElement("select");
			for (var t = 0; t < GroupArray.length; t++) {
				selectList.setAttribute("id", "termChoose");
				selectList.setAttribute("size", "42");
				selectList.setAttribute("style", "width:200px");
				selectList.setAttribute("onclick", "onSelectDef(this)");
				myDiv.appendChild(selectList);
            var termsdetsear="";				
				for (var j = 0; j < GroupArray[t].AudioList.length; j++) //loading chapter headdings to dropdown box
				{
					if (GroupArray[t].AudioList[j].chapterattr.indexOf("\," + chapterNumberOnly1.trim() + "\,") > -1) {
						sectiondatacount++;
						// alert(GroupArray[t].AudioList[j].Audioterm);
						var option = document.createElement("option");
						option.value = GroupArray[t].AudioList[j].Audioterm;
						option.text = GroupArray[t].AudioList[j].Audioterm;
						selectList.appendChild(option);
						termsdetsear=termsdetsear+GroupArray[t].AudioList[j].Audioterm;
						
						if(GroupArray[t].AudioList[j].SpaneshTerm==undefined||GroupArray[t].AudioList[j].SpaneshTerm=="")
			            {
			            }else{
						    //alert(GroupArray[t].AudioList[j].SpaneshTerm);
							var option1 = document.createElement("option");
							option1.value = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.text = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.setAttribute("style", "color:blue");
							selectList.appendChild(option1);
							termsdetsear=termsdetsear+","+ GroupArray[t].AudioList[j].SpaneshTerm;
							} 

					}
				}
				data = {
				"ale": [termsdetsear]};
			}
			alert(data);

			if (sectiondatacount == 0) {

				var toreport = document.createElement("div");
				toreport.setAttribute("id", "box");
				toreport.innerHTML = "No Terms/Definitions in the Selected Letter";
				var ToappendBox = document.getElementById("Definition");
				ToappendBox.appendChild(toreport);

				var toreport1 = document.createElement("div");
				toreport1.setAttribute("id", "box1");
				toreport1.innerHTML = "No Terms/Definitions in the Selected Letter";
				var ToappendBox1 = document.getElementById("Term");
				ToappendBox1.appendChild(toreport1);

				var x = document.getElementById("termChoose");
				x.remove();
				var myDiv = document.getElementById("section");
				var selectList = document.createElement("select");
				selectList.setAttribute("id", "termChoose");
				selectList.setAttribute("size", "42");
				selectList.setAttribute("style", "width:200px");
				//selectList.setAttribute("onclick","onSelectDef()");
				myDiv.appendChild(selectList);
				var option = document.createElement("option");
				option.value = "empty";
				option.text = "No Terms......!";
				selectList.appendChild(option);
				var TC = document.getElementById("termContent");
				TC.innerHTML = "";
				var DC = document.getElementById("definitionContent");
				DC.innerHTML = "";
				var tcontext = document.getElementById("TermContext");
				tcontext.innerHTML = "";
				var Audio = document.getElementById("Audio");
				Audio.innerHTML = "";
				var Audio1 = document.getElementById("Audio1");
				Audio1.innerHTML = "";

				document.getElementById("b1").disabled = true;
				document.getElementById("b2").disabled = true;
			}
		} else if (currentChap == "All Chapters") {

			var x = document.getElementById("termChoose");
			x.remove();
			var myDiv = document.getElementById("section");
			var selectList = document.createElement("select");
			for (var t = 0; t < GroupArray.length; t++) {
				selectList.setAttribute("id", "termChoose");
				selectList.setAttribute("size", "42");
				selectList.setAttribute("style", "width:200px");
				selectList.setAttribute("onclick", "onSelectDef(this)");
				myDiv.appendChild(selectList);
				for (var j = 0; j < GroupArray[t].AudioList.length; j++) //loading chapter headdings to dropdown box
				{
					var option = document.createElement("option");
					option.value = GroupArray[t].AudioList[j].Audioterm;
					option.text = GroupArray[t].AudioList[j].Audioterm;
					selectList.appendChild(option);
					if(GroupArray[t].AudioList[j].SpaneshTerm==undefined||GroupArray[t].AudioList[j].SpaneshTerm=="")
			            {
			            }else{
						   // alert(GroupArray[t].AudioList[j].SpaneshTerm);
							var option1 = document.createElement("option");
							option1.value = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.text = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.setAttribute("style", "color:blue");
							selectList.appendChild(option1);
							} 
				}
			}
		}
	}
}
function onSelection3(obj) {
//btn-info
var list=[];
list=document.getElementsByClassName("btns1");

for(var i=0;i<list.length;i++)
{
	
	list[i].className=list[i].className.replace("btn-warning","btn-info");
}

obj.className=obj.className.replace("btn-info","btn-warning")
	var bx = document.getElementById("box");
	if (bx == null) {}
	else {
		$("#box").remove();
	}
	var bx1 = document.getElementById("box1");

	if (bx1 == null) {}
	else {
		$("#box1").remove();

	}

	//document.getElementById("b1").disabled = false;
	//document.getElementById("b2").disabled = false;
	var attr = obj;
	var gName = attr.value;
	var gcount = 0;
	//alert("here\t"+attr.value);
	var cahperList = document.getElementById("chapterList");
	var currentChap = cahperList.options[cahperList.selectedIndex].value;
	//alert("selected ChapterValue "+currentChap);
	if (gName == "All" && currentChap == "All Chapters") {
		gcount++;
		onSelection2();
	}
	var option1;
	for (var t = 0; t < modalData.length; t++) {
		if (currentChap == "All Chapters") {
			for (var t = 0; t < GroupArray.length; t++) {
				if (gName == GroupArray[t].groupname) {
					gcount++;
					var x = document.getElementById("termChoose");
					x.remove();
					var myDiv = document.getElementById("section");
					var selectList = document.createElement("select");
					selectList.setAttribute("id", "termChoose");
					selectList.setAttribute("size", "42");
					selectList.setAttribute("style", "width:200px");
					selectList.setAttribute("onclick", "onSelectDef(this)");
					
					myDiv.appendChild(selectList);
					for (var j = 0; j < GroupArray[t].AudioList.length; j++) //loading chapter headdings to dropdown box
					{
						var option = document.createElement("option");
						option.value = GroupArray[t].AudioList[j].Audioterm;
						option.text = GroupArray[t].AudioList[j].Audioterm;
						
						if(GroupArray[t].AudioList[j].SpaneshTerm==undefined||GroupArray[t].AudioList[j].SpaneshTerm=="")
			            {
			            }else{
						   // alert(GroupArray[t].AudioList[j].SpaneshTerm);
							var option1 = document.createElement("option");
							option1.value = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.text = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.setAttribute("style", "color:blue");
							selectList.appendChild(option1);
							} 
						
						selectList.appendChild(option);
					}
				}
			}
		} else if (gName == "All") {
			gcount++;
			onSelection2();
		} else if (modalData[t].name == currentChap) {
			gcount++;
			var cntvar = 0;
			var chapterNumberOnly = modalData[t].name;
			var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10);
			var chapterNumberOnly2 = "\," + chapterNumberOnly1.trim() + "\,";
			for (var t = 0; t < GroupArray.length; t++) {
				if (GroupArray[t].groupname == gName) {
					var x = document.getElementById("termChoose");
					x.remove();
					var myDiv = document.getElementById("section");
					var selectList = document.createElement("select");
					selectList.setAttribute("id", "termChoose");
					selectList.setAttribute("size", "42");
					selectList.setAttribute("style", "width:200px");
					selectList.setAttribute("onclick", "onSelectDef(this)");
					myDiv.appendChild(selectList);
					for (var j = 0; j < GroupArray[t].AudioList.length; j++) {
						if (GroupArray[t].AudioList[j].chapterattr.indexOf("\," + chapterNumberOnly1.trim() + "\,") > -1) {
							cntvar++;
							var option = document.createElement("option");
							option.value = GroupArray[t].AudioList[j].Audioterm;
							option.text = GroupArray[t].AudioList[j].Audioterm;
							selectList.appendChild(option);
					   if(GroupArray[t].AudioList[j].SpaneshTerm==undefined||GroupArray[t].AudioList[j].SpaneshTerm=="")
			            {
			            }else{
						    //alert(GroupArray[t].AudioList[j].SpaneshTerm);
							var option1 = document.createElement("option");
							option1.value = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.text = GroupArray[t].AudioList[j].SpaneshTerm;
							option1.setAttribute("style", "color:blue");
							selectList.appendChild(option1);
							} 
						}
					}
				} else {}
			}
			if (cntvar == 0) {

				var toreport = document.createElement("div")
					toreport.setAttribute("id", "box");
				toreport.innerHTML = "No Terms/Definitions in the Selected Letter";
				var ToappendBox = document.getElementById("Definition");
				ToappendBox.appendChild(toreport);

				var toreport1 = document.createElement("div")
					toreport1.setAttribute("id", "box1");
				toreport1.innerHTML = "No Terms/Definitions in the Selected Letter";
				var ToappendBox1 = document.getElementById("Term");
				ToappendBox1.appendChild(toreport1);

				var x = document.getElementById("termChoose");
				x.remove();
				var myDiv = document.getElementById("section");
				var selectList = document.createElement("select");
				selectList.setAttribute("id", "termChoose");
				selectList.setAttribute("size", "42");
				selectList.setAttribute("style", "width:200px");
				//selectList.setAttribute("onclick","onSelectDef(this)");
				myDiv.appendChild(selectList);
				var option = document.createElement("option");
				option.value = "empty";
				option.text = "No Terms.....!";
				selectList.appendChild(option);
				myDiv.appendChild(selectList);
				var TC = document.getElementById("termContent");
				TC.innerHTML = "";
				var DC = document.getElementById("definitionContent");
				DC.innerHTML = "";
				var tcontext = document.getElementById("TermContext");
				tcontext.innerHTML = "";
				var Audio = document.getElementById("Audio");
				Audio.innerHTML = "";
				var Audio1 = document.getElementById("Audio1");
				Audio1.innerHTML = "";
				document.getElementById("b1").disabled = true;
				document.getElementById("b2").disabled = true;
			}
		}
	}
	if (gcount == 0) {
		var toreport = document.createElement("div")
			toreport.setAttribute("id", "box");
		toreport.innerHTML = "No Terms/Definitions in the Selected Letter";
		var ToappendBox = document.getElementById("Definition");
		ToappendBox.appendChild(toreport);

		var toreport1 = document.createElement("div")
			toreport1.setAttribute("id", "box1");
		toreport1.innerHTML = "No Terms/Definitions in the Selected Letter";
		var ToappendBox1 = document.getElementById("Term");
		ToappendBox1.appendChild(toreport1);

		var x = document.getElementById("termChoose");
		x.remove();
		var myDiv = document.getElementById("section");
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "termChoose");
		selectList.setAttribute("size", "42");
		selectList.setAttribute("style", "width:200px");
		//selectList.setAttribute("onclick","onSelectDef(this)");
		myDiv.appendChild(selectList);
		var option = document.createElement("option");
		option.value = "empty";
		option.text = "No Terms..!";
		selectList.appendChild(option);
		myDiv.appendChild(selectList);
		var TC = document.getElementById("termContent");
		TC.innerHTML = "";
		var DC = document.getElementById("definitionContent");
		DC.innerHTML = "";
		var tcontext = document.getElementById("TermContext");
		tcontext.innerHTML = "";
		var Audio = document.getElementById("Audio");
		Audio.innerHTML = "";
		var Audio1 = document.getElementById("Audio1");
		Audio1.innerHTML = "";

		var defad = document.getElementById("defAudio");
		defad.innerHTML = "";

		var senad = document.getElementById("SenAudion");
		senad.innerHTML = "";

		var seterm = document.getElementById("SenTerm");
		seterm.innerHTML = "";

		document.getElementById("b1").disabled = true;
		document.getElementById("b2").disabled = true;

	}
}
function GroupRefVO() {
	//contains the chapter level details
	var queistionlist;
	var name;
}
function queistionVO() {
	//contains the queistion level details
	var qType;
	var term;
	var meaning;
	var termAudio;
	var deffAudio;
}
function onSelectDef(tgt) {

if($("#sidemenu").attr("class").indexOf("sideNav")>0)
	{
				$("#sidemenu").toggleClass("sideNav","sideNav1");
				$("#sidemenu").css("display","");
			
	}
	else
	{
		
		$("#sidemenu").addClass("sideNav");
		$("#sidemenu").css("display","block");
	}

audioElement1.pause();
//TAudioption.currentTime = 0;
	var currAud=0;
	var bx = document.getElementById("box");
	if (bx == null) {}
	else {
		$("#box").remove();
	}
	var bx1 = document.getElementById("box1");
	if (bx1 == null) {}
	else {
		$("#box1").remove();
	}
	// bx1.remove();
//	document.getElementById("b1").disabled = false;
	//document.getElementById("b2").disabled = false;
	//$("#b1").css("background", "#9AC97B");
	//$("#b2").css("font-weight","normal");
	//$("#b1").css("color", "white");
	//$("#b2").css("background", "#369CCD");
	//$("#b2").css("color", "black");
	//$("#b1").css("font-weight","normal");
	var cahperList = document.getElementById("chapterList");
	var currentChap = cahperList.options[cahperList.selectedIndex].value;
	var termList = document.getElementById("termChoose");
	var selectedterm = termList.options[termList.selectedIndex].value;
	
	//	alert(selectedterm);
	var cnt = 0;
	for (var t = 0; t < modalData.length; t++) {
		for (var j = 0; j < GroupArray[t].AudioList.length; j++) {
			if (GroupArray[t].AudioList[j].Audioterm == selectedterm) {
				cnt++;
				var TC = document.getElementById("termContent");
				TC.innerHTML = GroupArray[t].AudioList[j].Audioterm;
				var DC = document.getElementById("definitionContent");
				DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;
			//	var tcontext = document.getElementById("TermContext");
			//	tcontext.innerHTML = GroupArray[t].AudioList[j].Audioterm;

				//audioPlay(GroupArray[t].AudioList[j].AudioUrl);
				var TermFileAudio = GroupArray[t].AudioList[j].AudioUrl;
				var defAudio = GroupArray[t].AudioList[j].defAudioUrl;
				var SenAudio = GroupArray[t].AudioList[j].senAudioUrl;

				$(function () {
					$("#termChoose").click(function () {
						$('#' + "Term").siblings().hide();

						$('#' + "Term").show();
						//$('#' + "Term").flip({
							//direction : 'tb',
							//color : 'white'
						//});
						$('#' + "Term").siblings().hide();
					});
				});

				//adding Audio button to definiton frame
				var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', "media/" + GroupArray[t].AudioList[j].AudioUrl);
				var TOappnd = document.getElementById('Audio');
				TOappnd.innerHTML = "";
				var Abtn = document.createElement("button");
				Abtn.setAttribute("id", "play1");
				Abtn.setAttribute("class", "play");
				Abtn.setAttribute("onmouseover", "mOver1(this)");
				Abtn.setAttribute("onmouseout", "mOut1(this)");
				Abtn.innerHTML = "Play Term Audio";
				TOappnd.appendChild(Abtn);
				//audioElement.play();
				$('.play').click(function () {
					audioElement.play();
				});

				$('.pause').click(function () {
					audioElement.pause();
				});

				//adding definition audion button

				if (GroupArray[t].AudioList[j].defAudioUrl == undefined) {
					var DefAud = document.getElementById('defAudio');
					DefAud.innerHTML = "";

				//	var Sentitle = document.getElementById('senTitle');
				//	Sentitle.innerHTML = "";

					//var Senterm = document.getElementById('SenTerm');
				//	Senterm.innerHTML = "";

					var SenAud = document.getElementById('SenAudion');
					SenAud.innerHTML = "";
				} else {
					var DefaudioElement = document.createElement('audio');
					DefaudioElement.setAttribute('src', "media/" + GroupArray[t].AudioList[j].defAudioUrl);
					var DefAud = document.getElementById('defAudio');
					DefAud.innerHTML = "";
					var Abtn = document.createElement("button");
					Abtn.setAttribute("id", "Defplay");
					Abtn.setAttribute("class", "Defplayplay");
					Abtn.setAttribute("onmouseover", "DefplaymOver(this)");
					Abtn.setAttribute("onmouseout", "DefplaymOut(this)");
					Abtn.innerHTML = "Play Def Audio";
					DefAud.appendChild(Abtn);
					//DefaudioElement.play();
					$('.Defplayplay').click(function () {
						DefaudioElement.play();
					});

				}

				//Adding audio button to sentence
				if (GroupArray[t].AudioList[j].AudioSentence == "") {

				//	var Sterm = document.getElementById("SenTerm");
			//		Sterm.innerHTML = "";
				//	var SenAud = document.getElementById('SenAudion');
					//SenAud.innerHTML = "";

				} else {
					var Sterm = document.getElementById("SenTerm");
					Sterm.innerHTML = GroupArray[t].AudioList[j].AudioSentence;

					var SentenceaudioElement = document.createElement('audio');
					$(SentenceaudioElement).attr('src', "media/" + GroupArray[t].AudioList[j].defAudioUrl);
					var SenAud = document.getElementById('SenAudion');
					SenAud.innerHTML = "";
					var Abtn = document.createElement("button");
					Abtn.setAttribute("id", "Senplay");
					Abtn.setAttribute("class", "Senplayplay");
					Abtn.setAttribute("onmouseover", "SenplaymOver(this)");
					Abtn.setAttribute("onmouseout", "SenplaymOut(this)");
					Abtn.innerHTML = "Play sen Audio";
					SenAud.appendChild(Abtn);
					//SentenceaudioElement.play();
					$('.Senplayplay').click(function () {
						SentenceaudioElement.play();
					});

				}
                
				//adding Audio button to Term frame
				var TOappnd = document.getElementById('Audio1');
				TOappnd.innerHTML = "";
				audioElement1.setAttribute('src', "media/" + GroupArray[t].AudioList[j].AudioUrl);
				//alert("media/" + GroupArray[t].AudioList[j].AudioUrl);
				audioElement1.play();
				var TOappnd = document.getElementById('Audio1');
				var Abtn = document.createElement("button");
				Abtn.setAttribute("id", "play");
				Abtn.setAttribute("class", "play");
				Abtn.setAttribute("onmouseover", "mOver(this)");
				Abtn.setAttribute("onmouseout", "mOut(this)");
				Abtn.innerHTML = "Play Def Audio";
				TOappnd.appendChild(Abtn);
				audioElement1.preload = "none";
				$('.play').click(function () {
					audioElement1.play();
				});

				$('.pause').click(function () {
					audioElement1.pause();
				});
			}else if(GroupArray[t].AudioList[j].SpaneshTerm == selectedterm)//Spanes Definition Display Frame
			{
			// SpanURL
				var TC = document.getElementById("termContent");
				TC.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
				var DC = document.getElementById("definitionContent");
				DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;
				//var tcontext = document.getElementById("TermContext");
				//tcontext.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
				//span term Audio 
				var TOappnd = document.getElementById('Audio1');
				TOappnd.innerHTML = "";
				audioElement1.setAttribute('src', "media/span/media/" + GroupArray[t].AudioList[j].SpanURL+".mp3");
				
				//alert("media/span/media/" + GroupArray[t].AudioList[j].SpanURL);
				audioElement1.play();
				var TOappnd = document.getElementById('Audio1');
				var Abtn = document.createElement("button");
				Abtn.setAttribute("id", "play");
				Abtn.setAttribute("class", "play");
				Abtn.setAttribute("onmouseover", "mOver(this)");
				Abtn.setAttribute("onmouseout", "mOut(this)");
				Abtn.innerHTML = "Play Def Audio";
				TOappnd.appendChild(Abtn);
				audioElement1.preload = "none";
				$('.play').click(function () {
					audioElement1.play();
				});

				$('.pause').click(function () {
					audioElement1.pause();
				});
				
				
				//sapn Definition Audio
			     var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', "media/span/media/" + GroupArray[t].AudioList[j].SpanURL+".mp3");
				var TOappnd = document.getElementById('Audio');
				TOappnd.innerHTML = "";
				var Abtn = document.createElement("button");
				Abtn.setAttribute("id", "play1");
				Abtn.setAttribute("class", "play");
				Abtn.setAttribute("onmouseover", "mOver1(this)");
				Abtn.setAttribute("onmouseout", "mOut1(this)");
				Abtn.innerHTML = "Play Term Audio";
				TOappnd.appendChild(Abtn);
				//audioElement.play();
				$('.play').click(function () {
					audioElement.play();
				});

				$('.pause').click(function () {
					audioElement.pause();
				});	
				
				
				
				
               $(function () {
					$("#termChoose").click(function () {
						$('#' + "Term").siblings().hide();

						$('#' + "Term").show();
						//$('#' + "Term").flip({
							//direction : 'tb',
							//color : 'white'
						//});
						$('#' + "Term").siblings().hide();
					});
				});
              
			}
		}
	}
	if (cnt == 0) {
		//alert("Not found");
	}
}

function mOver(obj) {

	//obj.class=play1;
	var ply = document.getElementById("play");
	ply.className = "play1";
	//ply.className="play1";

}

function mOver1(obj) {

	//obj.class=play1;
	var ply = document.getElementById("play1");
	ply.className = "play1";
	//ply.className="play1";

}

function mOut(obj) {

	var ply = document.getElementById("play");
	ply.className = "play";
	//alert("mout"+ply.className);


}
function mOut1(obj) {

	var ply = document.getElementById("play1");
	ply.className = "play";
	//alert("mout"+ply.className);


}

function DefplaymOver(obj) {
	var ply = document.getElementById("Defplay");
	ply.className = "Defplayplay1";
}
function DefplaymOut(obj) {
	var ply = document.getElementById("Defplay");
	ply.className = "Defplayplay";
}

function SenplaymOver(obj) {
	var ply = document.getElementById("Senplay");
	ply.className = "Senplayplay1";
}
function SenplaymOut(obj) {
	var ply = document.getElementById("Senplay");
	ply.className = "Senplayplay";
}
function DisplayHelp(txt) {}
function gettingFlip() {
	$(function () {
		$('.btns').click(function () {
			var btnv = this.value;
			
			$('#' + btnv).siblings().hide();
			$('#' + btnv).show();
			$('#' + btnv).flip({
				direction : 'tb',
				color : 'white'
			});
			$('#' + btnv).siblings().hide();
		});
	});
}

function tabClickTerm() {
	$("#b1").css("background", "#9AC97B");
	$("#b1").css("color", "white");
	$("#b2").css("background", "#369CCD");
	$("#b2").css("color", "black");
	termFlag = 1;
	click = 1;
	var b2 = document.getElementById("b2");
	var b1 = document.getElementById("b1");
	b1.className = "activeterm";
	b2.className = "inactivedeff";
}
function tabClickDef() {
	$("#b2").css("background", "#9AC97B");
	$("#b1").css("background", "#369CCD");
	$("#b1").css("color", "black");
	$("#b2").css("color", "white");
	termFlag = 0;
	click = 0;
	var b2 = document.getElementById("b2");
	var b1 = document.getElementById("b1");
	b2.className = "activedef";
	b1.className = "inactiveterm";

}


function RotateFlip()
{





}
function rotateFlip() //flip toggle
{
	if (click == 0) {
		rotateFlip1();
	} else {
		click = 0;
		$('#Definition').siblings().hide();
		$('#Definition').show();
		$('#Definition').flip({
			direction : 'tb',
			color : 'white'
		})
		$('#Definition').siblings().hide();
		tabClickDef();
	}
}
function rotateFlip1() //cheking flags
{
	if (click == 1) {
		click = 0;
		rotateFlip();
	} else {
		click = 1;
		rotateFlip();
		flipInto();
		tabClickTerm();
	}
}
function flipInto() //conditional flip
{
	$('#term').siblings().hide();
	$('#term').show();
	$('#term').flip({})
	$('#term').siblings().hide();
}

$(document).ready(function(){
				audioElement1 = document.createElement('audio');
				audioElement1.setAttribute("preload", "none");	
				audioElement1.setAttribute("id", "Taudio");	
});

function decreaseFontSizeInternal() 
{
		var list=[];
	list.push(document.getElementById('thead'));
	list.push(document.getElementById('termContent'));
	list.push(document.getElementById('dhead'));
	list.push(document.getElementById('definitionContent'));
    for(i=0;i<list.length;i++) 
    {   
        var s = 24;
        if(list[i].style.fontSize) 
        {
            s = parseInt(list[i].style.fontSize.replace("px",""));
        } 
        if(s!=min) {
            s -= 1;
        }
        list[i].style.fontSize = s+"px"
    }
} 

function increaseFontSizeInternal() {
	var list=[];
	list.push(document.getElementById('thead'));
	list.push(document.getElementById('termContent'));
	list.push(document.getElementById('dhead'));
	list.push(document.getElementById('definitionContent'));
	//alert(list);
    for(i=0;i<list.length;i++)
    {   
		
		console.log(list[i])
        var s = 24;
		//alert(list[i].style.fontSize);
        if(list[i].style.fontSize) 
        { 
            s = parseInt(list[i].style.fontSize.replace("px",""));
        }
        if(s!=max)
        {
            s += 1; 
        } 
        list[i].style.fontSize = s+"px"
    }
} 

 