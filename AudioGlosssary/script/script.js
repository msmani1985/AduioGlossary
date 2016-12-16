var max = 60
var min = 24
var data
var vart=0;
var varj=0;
var nclexDoc
var tocDoc
var initDoc
var sound
var Chap4Array = []
var GroupArray = []
var GroupArrayRef = []
var modalData = []
var modalData1 = []
var TermsAndDeff = []
var Defarray = []
var chapterToBeLoaded
var GROUP = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
var chapter_counter = 0, question_no = -1
var calculate_reset = 0
var click = 0
var termFlag
var isNavigating = false
var isMute = false
var FirstTerm
var FirstDefinition
var loaded = false
var audioElement1
var psbi = null
var count = 0
// onSideNav method used to dispaly an hide the alphabet menu
function onSidenav() {

	if ($("#sidemenu").attr("class").indexOf("sideNav") > 0) {

		$("#sidemenu").toggleClass("sideNav", "sideNav1");
		$("#sidemenu").css("display", "");
		$("#main_cont").css("display", "block");
	} else {


		$("#sidemenu").addClass("sideNav");
		$("#sidemenu").css("display", "block");
		$("#main_cont").css("display", "none");
	}

	if ($("#sidemenu").attr("class").indexOf("col-xs-4") > 0) {
		$("#sidemenu").toggleClass("col-xs-4", "col-xs-12");
	} else {
		$("#sidemenu").toggleClass("col-xs-12", "col-xs-4");
	}

	if ($("#main_cont").attr("class").indexOf("col-xs-4") > 0) {
		$("#main_cont").toggleClass("col-xs-4", "col-xs-12");
	} else {
		$("#main_cont").toggleClass("col-xs-12", "col-xs-4");
	}

}
function bodyloaded1 () {
  document.addEventListener('dataLoaded', createUI)
  document.addEventListener('dataLoaded', createUI1)
  modelObj = new DtataProvider('xml/chapter.xml', createUI)
  modelObj1 = new DtataProvider1('xml/terms.xml', createUI1)
  psbi = null
  document.getElementById('previous').disabled = true
  document.getElementById('next').disabled =false
  
}

function createUI (e) // to load data into the UI
{
  modalData = e
  var cahperList = document.getElementById('chapterList') // chapter level data
  var option
  option = document.createElement('option')
  option.setAttribute('value', 'Connection.TRANSACTION_NONE')
  option.innerHTML = 'All Chapters'
  option.value = 'All Chapters'
  cahperList.appendChild(option)
  for (var k = 0; k < modalData.length; k++) {
    option = document.createElement('option')
    option.setAttribute('value', 'Connection.TRANSACTION_NONE')
    option.innerHTML = modalData[k].name
    option.value = modalData[k].name
    cahperList.appendChild(option)
  // alert(modalData[k].name)
  }
}

function createUI1 (e) {
  modalData1 = e // loading data to variable
  var questionlist = modalData1[0].AudioList
  currentChapterList = questionlist.slice(0, questionlist.length) // coping array
  currentQ = 0
  var MYLIST = document.getElementById('myLi') // chapter level data
  var lix = document.createElement('li')
  //	lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-warning\" style=\"width:42px;height:25px;font-size:15px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"All\" value=\"All\">"
  lix.innerHTML = '<input type="button" class="btns1 btn-warning" style=" width: 35px;    height: 25px;    font-size: 17px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 6px;    padding-right: 1em;" onclick="onSelection3(this)" id="All" value="All">'
  // lix.innerHTML="<button type=\"button\" class=\"btn btn-default\" onclick=\"onSelection3(this)\" id=\"All\" value=\"All\">All</button>"
  MYLIST.appendChild(lix)
  for (var i = 0; i < GROUP.length; i++) // loading chapter headdings to dropdown box
  {
    var lix = document.createElement('li')
    // lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-info\" style=\"width:42px;height:25px;font-size:17px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"" + GROUP[i] + "index\" value=\"" + GROUP[i] + "\">"
    lix.innerHTML = '<input type="button" class="btns1 btn-info" style="    width: 35px;    height: 25px;    font-size: 17px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 6px;    padding-right: 1em;" onclick="onSelection3(this)" id="' + GROUP[i] + 'index" value="' + GROUP[i] + '">'
    MYLIST.appendChild(lix)
  }
  // document.getElementById("b1").disabled = true
  // document.getElementById("b2").disabled = true

  GroupArray = e
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    // for (var i = 0; i < GROUP.length; i++) //loading chapter headdings to dropdown box
    {
      document.getElementById('myLi').childNodes[la].childNodes[0].value = GROUP[la - 1]
      document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '12px'
    }
    document.getElementById('myLi').childNodes[la].style.display = 'block'
  }

  varprevious = null
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    // alert(document.getElementById("myLi").childNodes[la].childNodes[0].getAttribute("value"))
    var gname = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
    var varfound = false


    for (var t = 0; t < GroupArray.length; t++) {
      for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
      {
        {
          if (GroupArray[t].groupname == gname) {
            varfound = true
            // varprevious=document.getElementById("myLi").childNodes[la].childNodes[0]
            break
          }else {
          }
        }
      }
    }
    if (varfound == false) {
      document.getElementById('myLi').childNodes[la].style = 'display:none'
    // alert("dafdf1 " + gname)
    // alert("false")
    }
  }
  varnon = ''
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    // alert("dfasff")
    if (document.getElementById('myLi').childNodes[la].style.display == 'none') {
      if (varnon == '') {
        varnon = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
      // alert(varnon)
      }
    }else {
      if (varnon != '') {
        // alert(varnon+"-"+document.getElementById("myLi").childNodes[la].childNodes[0].value)
        document.getElementById('myLi').childNodes[la].childNodes[0].value = varnon + '-' + document.getElementById('myLi').childNodes[la].childNodes[0].value
        document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '2px'
        // document.getElementById("myLi").childNodes[la],childNodes[0].setAttribute("value",varnon + "-"+document.getElementById("myLi").childNodes[la].previousSibling,childNodes[0].getAttribute("value"))
        varnon = ''
      }
    }
  }

  var myDiv = document.getElementById('section')
  var selectList = document.createElement('select')
  var selectList1 = document.createElement('ul')
  /*************************************************************************************** */
  // Search data variable 
  // ******************************************************************************************
  var termsdetsear = ''
  /**************************************************************************************** */
  for (var t = 0; t < GroupArray.length; t++) {
   // selectList.setAttribute('id', 'termChoose')
    // selectList.setAttribute("size", "42")
    //selectList.setAttribute('style', 'width:200px')
    //selectList.setAttribute('onclick', 'onSelectDef()')
    //myDiv.appendChild(selectList)
    selectList1.setAttribute('id', 'termChoose1')
    // selectList.setAttribute("size", "42")
    selectList1.setAttribute('style', 'width:200px')
    selectList1.setAttribute('class', 'list-group')
    myDiv.appendChild(selectList1)
    // GroupArrayRef.push(GroupArray[t].groupname)
    for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
    {
      Defarray.push(GroupArray[t].AudioList[j].Audiomeaning)
      // alert(GroupArray[t].AudioList[j].chapterattr)
     // var option = document.createElement('option')
     // option.value = GroupArray[t].AudioList[j].Audioterm
      //option.text = GroupArray[t].AudioList[j].Audioterm
      //selectList.appendChild(option)
      var li = document.createElement('li')
      var a = document.createElement('a')
      li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
      a.setAttribute('onclick', 'onSelectDef_1(this)')
      //a.setAttribute('style', 'color:black;font-weight:bold;cursor:pointer')
	    a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
	  
      li.value = j
      var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
      // li.text = GroupArray[t].AudioList[j].Audioterm
      a.appendChild(t1)
      li.appendChild(a)
      selectList1.appendChild(li)
      /**********************************search data information*************************************** */
      //
      //									Search functionality and merging the 
      //
      /************************************************************************************************** */
      termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
      /**************************************************************************** ***********************/

      if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
        // termsdetsear=termsdetsear+","
      }else {
        //var option1 = document.createElement('option')
        //option1.value = GroupArray[t].AudioList[j].SpaneshTerm
        //option1.text = GroupArray[t].AudioList[j].SpaneshTerm
        //option1.setAttribute('style', 'color:blue')

        /*********************************************************************************************** */
        termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].SpaneshTerm + '",'
        /********************************************************************************************** */

        //selectList.appendChild(option1)
        /****************************************************************************************** */
        // Mobile browser side me layout
        /******************************************************************************************* */
        var li1 = document.createElement('li')
        var a = document.createElement('a')
        a.setAttribute('onclick', 'onSelectDef_1(this)')
        a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
        li1.setAttribute('class', 'list-group-item list-group-item btn-warning')
        li1.value = j
        var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
        // li1.text = GroupArray[t].AudioList[j].SpaneshTerm
        a.appendChild(t1)
        li1.appendChild(a)
        a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
        // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].SpaneshTerm+'",'
        selectList1.appendChild(li1)
        /********************************************************************************************************* */

      }
      //option1.setAttribute('style', 'color:blue')
      li1.setAttribute('style', 'color:blue')
      if (GroupArray[t].groupname == 'A') {
        vart =t;
        varj=0;
        FirstTerm = GroupArray[t].AudioList[0].Audioterm
        FirstDefinition = GroupArray[t].AudioList[0].Audiomeaning
        termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[0].Audioterm + '",'

        var TC = document.getElementById('termContent')
        TC.innerHTML = FirstTerm
        var DC = document.getElementById('definitionContent')
        DC.innerHTML = FirstDefinition
        				//adding Audio button to definiton frame
				var audioElement = document.createElement('audio');
        
        audioElement.setAttribute('src', "media/" + (GroupArray[t].AudioList[0].AudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
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
       

				audioElement.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
				$('.play').click(function () {
          try
          {
					audioElement.play();
        
           
    } catch (e) {
        audioElement.innerHTML=""
    }
				});

				$('.pause').click(function () {
					audioElement.pause();
				});

				//adding definition audion button

				if (GroupArray[t].AudioList[0].defAudioUrl == undefined) {
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
          DefaudioElement.setAttribute('src', "media/" + (GroupArray[t].AudioList[0].defAudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
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
                      try
          {
						DefaudioElement.play();        
           
    } catch (e) {
        Defa
    }

					});

				}

				//Adding audio button to sentence
				if (GroupArray[t].AudioList[0].AudioSentence == "") {

					//	var Sterm = document.getElementById("SenTerm");
					//		Sterm.innerHTML = "";
					//	var SenAud = document.getElementById('SenAudion');
					//SenAud.innerHTML = "";

				} else {
					var Sterm = document.getElementById("SenTerm");
					Sterm.innerHTML = GroupArray[t].AudioList[0].AudioSentence;

					var SentenceaudioElement = document.createElement('audio');
          $(SentenceaudioElement).attr('src', "media/" + (GroupArray[t].AudioList[0].defAudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
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
                                  try
          {
											SentenceaudioElement.play();
    } catch (e) {
        console.log("Error");
    }

					});

				}

				//adding Audio button to Term frame
				var TOappnd = document.getElementById('Audio1');
				TOappnd.innerHTML = "";
        audioElement1.setAttribute('src', "media/" + (GroupArray[t].AudioList[0].AudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
				//alert("media/" + GroupArray[t].AudioList[j].AudioUrl);
				audioElement1.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
				//audioElement1.play();
				var TOappnd = document.getElementById('Audio1');
				var Abtn = document.createElement("button");
				Abtn.setAttribute("id", "play");
				Abtn.setAttribute("class", "play");
				Abtn.setAttribute("onmouseover", "mOver(this)");
				Abtn.setAttribute("onmouseout", "mOut(this)");
				Abtn.innerHTML = "Play Def Audio";
				TOappnd.appendChild(Abtn);
				audioElement1.preload = "none";
				audioElement1.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
				$('.play').click(function () {
                                            try
          {
															audioElement1.play();
    } catch (e) {
        console.log("Error");
    }

				});

				$('.pause').click(function () {
					audioElement1.pause();
				});


        $('#b1').css('background', '#9AC97B')
        $('#b1').css('color', 'white')
      }
    }
  }
  // alert(termsdetsear)
  /******************************************************************************************************* */
  var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
  data = {'ale': termdsdetsear1}
  search()
  /********************************************************************************************************** */
  $('#bl').attr('disabled', true)
  $('#b2').attr('disabled', true)
  document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
}

function onPrevious () {
  
  if (count == 0) {
    document.getElementById('previous').disabled = true
    document.getElementById('next').disabled = false
  }else {
    
     document.getElementById('previous').disabled = false
    document.getElementById('next').disabled = false
    onSelectDef(document.getElementById('termChoose1').childNodes[count-1].childNodes[0]);
    document.getElementById('number_term').innerHTML = count + '/' + document.getElementById('termChoose1').childNodes.length
    count = count - 1 
    if (count == 0) {
    document.getElementById('previous').disabled = true
    document.getElementById('next').disabled = false
    }
  }
}

function onNext () {
  // alert(document.getElementById("termChoose").length + " " + count)
  count = count + 1
  
  if (count < document.getElementById('termChoose1').childNodes.length) {
    document.getElementById('previous').disabled = false
    document.getElementById('next').disabled = false
    onSelectDef(document.getElementById('termChoose1').childNodes[count].childNodes[0])
    document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
    if (count >= document.getElementById('termChoose1').childNodes.length-1) {
      
        document.getElementById('previous').disabled = false
        document.getElementById('next').disabled = true
      }
  }else {
    document.getElementById('previous').disabled = false
    document.getElementById('next').disabled = true
  }
}

function removeLastComma (str) {
  return str.replace(/,(\s+)?$/, '')
}

function search () {
  typeof $.typeahead === 'function' && $.typeahead(
    {
      input: '.js-typeahead-input',
      minLength: 1,
      maxItem: 15,
      order: 'asc',
      hint: true,
      group: {
        template: '{{group}} Chapters!'
      },
      maxItemPerGroup: 5,
      backdrop: {
        'background-color': '#fff'
      },
      // href: "alpha1.html",
      // dropdownFilter: "all beers",
      emptyTemplate: 'No result for "{{query}}"',
      source: {
        Terms: {
          data: data.ale
        }
      },
      callback: {
        onClickAfter: function (node, a, item, event) {
          // href key gets added inside item from options.href configuration
          var x1 = document.getElementById('termChoose1').childNodes;
          for (var x = 0;x < x1.length;x++) {
            
            if (x1[x].childNodes[0].text == item.display) {
              //x1.selectedIndex = x
              count=x;
              
              if(x==0)
              {
                  document.getElementById('previous').disabled = true
                  document.getElementById('next').disabled = false
              }
              else
              {
                document.getElementById('previous').disabled = false
                document.getElementById('next').disabled = false
              }
              
              if(x==x1.length-1)
              {
                  document.getElementById('previous').disabled = false
                  document.getElementById('next').disabled = true
              }
              
              document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
              onSelectDef(x1[x].childNodes[0]);
              break
            }
          }
        }
      },
      debug: true
    })
}

function ToViewSpanTerm () {
  // document.getElementById("b3").value="English Term"
  // document.getElementById("b3").style="	background-color: #7D81D1;"
  if (document.getElementById('b3').value == 'English Terms') {
    document.getElementById('b3').value = 'Spanish Terms'
    document.getElementById('b3').style = '	background-color: #D17DD0;'

          var TC = document.getElementById("termContent");
					TC.innerHTML = GroupArray[vart].AudioList[varj].Audioterm;
					var TCp = document.getElementById("termContentPro");
					TCp.innerHTML = GroupArray[vart].AudioList[varj].pronc;
					var DC = document.getElementById("definitionContent");
					DC.innerHTML = GroupArray[vart].AudioList[varj].Audiomeaning;
					if (GroupArray[vart].AudioList[varj].SpaneshTerm == "") {
            var TC = document.getElementById("spanitem_1");
						TC.style.display = "none";
          } else {
						var TC = document.getElementById("spanitem_1");
						TC.style.color = "blue";
						TC.innerHTML = '<span class="badge" >Related Spanish term</span> ' + GroupArray[t].AudioList[j].SpaneshTerm;
					}

          

  }else {
    document.getElementById('b3').value = 'English Terms'
  
    document.getElementById('b3').style = '	background-color: #7D81D1;'
     var TC = document.getElementById("termContent");
					TC.innerHTML = GroupArray[vart].AudioList[varj].SpaneshTerm;
					//var TCp = document.getElementById("termContentPro");
					//TCp.innerHTML = GroupArray[vart].AudioList[varj].pronc;
					var DC = document.getElementById("definitionContent");
					DC.innerHTML = GroupArray[vart].AudioList[varj].Audiomeaning;
					if (GroupArray[vart].AudioList[varj].SpaneshTerm == "") {
            var TC = document.getElementById("spanitem_1");
						TC.style.display = "none";
          } else {
						var TC = document.getElementById("spanitem_1");
						TC.style.color = "blue";
						TC.innerHTML = '<span class="badge" >Related Spanish term</span> ' + GroupArray[t].AudioList[j].SpaneshTerm;
					}
  }

}
/************************************************************* */
//
//
//   The following functiona trigged only when you  select
//     chapter wise dropdown follwoing trigged the following        
//      function
/************************************************************* */
function onSelection2 () {
  psbi = null
  // alert("daff")
  var bx = document.getElementById('box')
  if (bx == null) {
  }else {
    $('#box').remove()
  }
  var bx1 = document.getElementById('box1')

  if (bx1 == null) {}else {
    $('#box1').remove()
  }
  var list = []
  list = document.getElementsByClassName('btns1')
  for (var i = 0;i < list.length;i++) {
    list[i].className = list[i].className.replace('btn-warning', 'btn-info')
  }
  document.getElementById('All').className = document.getElementById('All').className.replace('btn-info', 'btn-warning')
  // document.getElementById("b1").disabled = true
  // document.getElementById("b2").disabled = true
  var cahperList = document.getElementById('chapterList')
  var currentChap = cahperList.options[cahperList.selectedIndex].value
  // alert(currentChap)
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    // for (var i = 0; i < GROUP.length; i++) //loading chapter headdings to dropdown box
    {
      document.getElementById('myLi').childNodes[la].childNodes[0].value = GROUP[la - 1]
      document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '12px'
    }
    document.getElementById('myLi').childNodes[la].style.display = 'block'
  }

  varprevious = null
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    // alert(document.getElementById("myLi").childNodes[la].childNodes[0].getAttribute("value"))
    var gname = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
    var varfound = false
    for (var t = 0; t < modalData.length; t++) {
      if (modalData[t].name == currentChap) {
        var chapterNumberOnly = modalData[t].name
        var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
        var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'

        for (var t = 0; t < GroupArray.length; t++) {
          for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
          {
            if (GroupArray[t].AudioList[j].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
              if (GroupArray[t].groupname == gname) {
                varfound = true
                // varprevious=document.getElementById("myLi").childNodes[la].childNodes[0]
                break
              }else {
              }
            }
          }
        }
      }
    }
    if (varfound == false) {
      document.getElementById('myLi').childNodes[la].style = 'display:none'
    // alert("dafdf1 " + gname)
    // alert("false")
    }
  }
  varnon = ''
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    if (document.getElementById('myLi').childNodes[la].style.display == 'none') {
      if (varnon == '') {
        varnon = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
      // alert(varnon)
      }
    }else {
      if (varnon != '') {

        // alert(varnon+"-"+document.getElementById("myLi").childNodes[la].childNodes[0].value)
        document.getElementById('myLi').childNodes[la].childNodes[0].value = varnon + '-' + document.getElementById('myLi').childNodes[la].childNodes[0].value
        // document.getElementById("myLi").childNodes[la],childNodes[0].setAttribute("value",varnon + "-"+document.getElementById("myLi").childNodes[la].previousSibling,childNodes[0].getAttribute("value"))
        document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '2px'
        varnon = ''
      }
    }
  }

  var sectiondatacount = 0
  for (var t = 0; t < modalData.length; t++) {
    if (modalData[t].name == currentChap) {
      //var x = document.getElementById('termChoose')
      //x.remove()
      var x = document.getElementById('termChoose1')
      x.remove()
      var chapterNumberOnly = modalData[t].name
      var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
      var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'
      var myDiv = document.getElementById('section')
      //var selectList = document.createElement('select')
      /************************************************************************ */
      // Change for Mobile layout design
      /************************************************************************* */
      var selectList1 = document.createElement('ul')


      /*************************************************************************** */
      // myDiv.appendChild(selectList)
      // myDiv.appendChild(selectList1)
      /*************************************************************************** */
      var termsdetsear = ''
      for (var t = 0; t < GroupArray.length; t++) {
        //selectList.setAttribute('id', 'termChoose')
        // selectList.setAttribute("size", "42")
        //selectList.setAttribute('style', 'width:200px')
        //selectList.setAttribute('onclick', 'onSelectDef(this)')
        //myDiv.appendChild(selectList)

        selectList1.setAttribute('id', 'termChoose1')
        // selectList.setAttribute("size", "42")
        selectList1.setAttribute('style', 'width:200px')
        selectList1.setAttribute('class', 'list-group')
        myDiv.appendChild(selectList1)


        for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
        {
          if (GroupArray[t].AudioList[j].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
            sectiondatacount++
            // alert(GroupArray[t].AudioList[j].Audioterm)
          //  var option = document.createElement('option')
           // option.value = GroupArray[t].AudioList[j].Audioterm
           // option.text = GroupArray[t].AudioList[j].Audioterm
            //selectList.appendChild(option)
            termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
            /*********************************************************************************** */
            // li tag create and a tag created
            /*********************************************************************************** */
            var li = document.createElement('li')
            var a = document.createElement('a')
            li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
            a.setAttribute('onclick', 'onSelectDef_1(this)')
        	a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
            li.value = j
            var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
            // li.text = GroupArray[t].AudioList[j].Audioterm
            a.appendChild(t1)
            li.appendChild(a)
            selectList1.appendChild(li)
            /**************************************************************************************** */
            /************************************************************************************************** */
            // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].Audioterm+'",'
            /**************************************************************************** ***********************/
            if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
            }else {
              // alert(GroupArray[t].AudioList[j].SpaneshTerm)
              //var option1 = document.createElement('option')
              //option1.value = GroupArray[t].AudioList[j].SpaneshTerm
              //option1.text = GroupArray[t].AudioList[j].SpaneshTerm
              //option1.setAttribute('style', 'color:blue')
              //selectList.appendChild(option1)
              /*************************************************************************************** */
              // li and a tag create for spanish trm with ble font color
              /*************************************************************************************** */
              /*********************************************************************************************** */
              termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].SpaneshTerm + '",'
              /********************************************************************************************** */

              var li = document.createElement('li')
              var a = document.createElement('a')
              li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
              a.setAttribute('onclick', 'onSelectDef_1(this)')
              a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
              li.value = j
              var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
              // li.text = GroupArray[t].AudioList[j].Audioterm
              a.appendChild(t1)
              li.appendChild(a)
              selectList1.appendChild(li)
              /**************************************************************************************** */						var li = document.createElement('li')

            // termsdetsear=termsdetsear+","+ GroupArray[t].AudioList[j].SpaneshTerm
            }
          }
        }
      // var termdsdetsear1=JSON.parse("["+removeLastComma(termsdetsear)+"]")
      // data=  {"ale": termdsdetsear1}
      // console.log(termdsdetsear1)
      // search()
      }
      // alert(data)

      if (sectiondatacount == 0) {
        var toreport = document.createElement('div')
        toreport.setAttribute('id', 'box')
        toreport.innerHTML = 'No Terms/Definitions in the Selected Letter'
        var ToappendBox = document.getElementById('Definition')
        ToappendBox.appendChild(toreport)

        var toreport1 = document.createElement('div')
        toreport1.setAttribute('id', 'box1')
        toreport1.innerHTML = 'No Terms/Definitions in the Selected Letter'
        var ToappendBox1 = document.getElementById('Term')
        ToappendBox1.appendChild(toreport1)

        //var x = document.getElementById('termChoose')
        //x.remove()
        var x = document.getElementById('termChoose1')
        x.remove()

        var myDiv = document.getElementById('section')
        //var selectList = document.createElement('select')
        //selectList.setAttribute('id', 'termChoose')
        // selectList.setAttribute("size", "42")
        //selectList.setAttribute('style', 'width:200px')
        // selectList.setAttribute("onclick","onSelectDef()")
        //myDiv.appendChild(selectList)
        /* list item  */
        var selectList1 = document.createElement('ul')
        selectList1.setAttribute('id', 'termChoose1')
        // selectList.setAttribute("size", "42")
        selectList1.setAttribute('style', 'width:200px')
        myDiv.appendChild(selectList1)

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onSelectDef_1(this)')
        a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
        li.value = -1
        var t1 = document.createTextNode('No Term.......!')
        // li.text = GroupArray[t].AudioList[j].Audioterm
        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)

        /**************************/


        //var option = document.createElement('option')
        //option.value = 'empty'
        //option.text = 'No Terms......!'
        //selectList.appendChild(option)

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onSelectDef_1(this)')
        a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
        li.value = -1
        var t1 = document.createTextNode('No Term.......!')
        // li.text = GroupArray[t].AudioList[j].Audioterm
        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)

        var TC = document.getElementById('termContent')
        TC.innerHTML = ''
        var DC = document.getElementById('definitionContent')
        DC.innerHTML = ''
        var tcontext = document.getElementById('TermContext')
        tcontext.innerHTML = ''
        var Audio = dmyDiv.appendChild(selectList)
        ocument.getElementById('Audio')
        Audio.innerHTML = ''
        var Audio1 = document.getElementById('Audio1')
        Audio1.innerHTML = ''

        document.getElementById('b1').disabled = true
        document.getElementById('b2').disabled = true
      }
    } else if (currentChap == 'All Chapters') {
      for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
        // for (var i = 0; i < GROUP.length; i++) //loading chapter headdings to dropdown box
        {
          document.getElementById('myLi').childNodes[la].childNodes[0].value = GROUP[la - 1]
          document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '12px'
        }
        document.getElementById('myLi').childNodes[la].style.display = 'block'
      }

      for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
        // alert(document.getElementById("myLi").childNodes[la].childNodes[0].getAttribute("value"))
        var gname = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
        var varfound = false

        for (var t = 0; t < GroupArray.length; t++) {
          if (GroupArray[t].groupname == gname) {
            varfound = true
            // varprevious=document.getElementById("myLi").childNodes[la].childNodes[0]
            break
          }else {
          }
        }

        if (varfound == false) {
          document.getElementById('myLi').childNodes[la].style = 'display:none'
        }
      }

      //var x = document.getElementById('termChoose')
      //x.remove()

      var x = document.getElementById('termChoose1')
      x.remove()

      var myDiv = document.getElementById('section')
      //var selectList = document.createElement('select')

      var selectList1 = document.createElement('ul')
      var termsdetsear = ''
      for (var t = 0; t < GroupArray.length; t++) {
     //   selectList.setAttribute('id', 'termChoose')
        // selectList.setAttribute("size", "42")
       // selectList.setAttribute('style', 'width:200px')
       // selectList.setAttribute('onclick', 'onSelectDef(this)')

        selectList1.setAttribute('id', 'termChoose1')
        // selectList.setAttribute("size", "42")
        selectList1.setAttribute('style', 'width:200px')
        // selectList1.setAttribute("onclick", "onSelectDef(this)")
        myDiv.appendChild(selectList1)
       // myDiv.appendChild(selectList)

        for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
        {
         // var option = document.createElement('option')
         // option.value = GroupArray[t].AudioList[j].Audioterm
         // option.text = GroupArray[t].AudioList[j].Audioterm

          var li = document.createElement('li')
          var a = document.createElement('a')
          li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
          a.setAttribute('onclick', 'onSelectDef_1(this)')
          a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
          li.value = j
          var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
          // li.text = GroupArray[t].AudioList[j].Audioterm
          a.appendChild(t1)
          li.appendChild(a)
          selectList1.appendChild(li)
         // selectList.appendChild(option)
          termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
          if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
          }else {
            // alert(GroupArray[t].AudioList[j].SpaneshTerm)
           // var option1 = document.createElement('option')
           // option1.value = GroupArray[t].AudioList[j].SpaneshTerm
            //option1.text = GroupArray[t].AudioList[j].SpaneshTerm
            //option1.setAttribute('style', 'color:blue')
            //selectList.appendChild(option1)
            termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].SpaneshTerm + '",'
            var li = document.createElement('li')
            var a = document.createElement('a')
            li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
            a.setAttribute('onclick', 'onSelectDef_1(this)')
            a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
            li.value = j
            var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
            // li.text = GroupArray[t].AudioList[j].Audioterm
            a.appendChild(t1)
            li.appendChild(a)
            selectList1.appendChild(li)
            // option1.value = GroupArray[t].AudioList[j].SpaneshTerm
            // option1.text = GroupArray[t].AudioList[j].SpaneshTerm

            //selectList.appendChild(option1)
          }
        }
      }
    }
  }
  count=0;
  document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
  var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
  console.log(termdsdetsear1)
  data = {'ale': termdsdetsear1}
  search()
}

/*********************************************************** */
//
//                Alphabetic selectio function
//			Followig function trgged when you select the alphabet
//
/*********************************************************** */
function onSelection3 (obj) {

  // btn-
  // alert("daffd")

  var list = []
  list = document.getElementsByClassName('btns1')

  for (var i = 0;i < list.length;i++) {
    list[i].className = list[i].className.replace('btn-warning', 'btn-info')
  }

  obj.className = obj.className.replace('btn-info', 'btn-warning')
  var bx = document.getElementById('box')
  if (bx == null) {}else {
    $('#box').remove()
  }
  var bx1 = document.getElementById('box1')

  if (bx1 == null) {}else {
    $('#box1').remove()
  }

  // document.getElementById("b1").disabled = false
  // document.getElementById("b2").disabled = false
  var attr = obj
  var gName = attr.id.replace('index', '')
  // alert(gName)
  var gcount = 0


  // alert("here\t"+attr.value)
  var cahperList = document.getElementById('chapterList')
  var currentChap = cahperList.options[cahperList.selectedIndex].value
  // alert("selected ChapterValue "+currentChap)
  if (gName == 'All' && currentChap == 'All Chapters') {
    // alert("all")
    // /alert("we")
    gcount++
    onSelection2()
  }
  var option1
  //	alert(modalData.length)
  for (var t = 0; t < modalData.length; t++) {
    if (currentChap == 'All Chapters') {
      // alert("*.pdf")
      for (var t = 0; t < GroupArray.length; t++) {
        if (gName == GroupArray[t].groupname) {
          gcount++

          //var x = document.getElementById('termChoose')
          //x.remove()

          var x1 = document.getElementById('termChoose1')
          x1.remove()

          var myDiv = document.getElementById('section')
          //var selectList = document.createElement('select')
          //selectList.setAttribute('id', 'termChoose')
          // selectList.setAttribute("size", "42")
          //selectList.setAttribute('style', 'width:200px')
          //selectList.setAttribute('onclick', 'onSelectDef(this)')

          //myDiv.appendChild(selectList)

          var selectList1 = document.createElement('ul')
          selectList1.setAttribute('id', 'termChoose1')
          // selectList.setAttribute("size", "42")
          selectList1.setAttribute('style', 'width:200px')

          myDiv.appendChild(selectList1)

          for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
          {
            //var option = document.createElement('option')
           // option.value = GroupArray[t].AudioList[j].Audioterm
            //option.text = GroupArray[t].AudioList[j].Audioterm

            var li = document.createElement('li')
            var a = document.createElement('a')
            li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
            a.setAttribute('onclick', 'onSelectDef_1(this)')
            a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
            li.value = j
            var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
            // li.text = GroupArray[t].AudioList[j].Audioterm
            a.appendChild(t1)
            li.appendChild(a)

			      //selectList.appendChild(option)
            selectList1.appendChild(li)
            

            if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
            }else {
              // alert(GroupArray[t].AudioList[j].SpaneshTerm)
              //var option1 = document.createElement('option')
              //option1.value = GroupArray[t].AudioList[j].SpaneshTerm
              //option1.text = GroupArray[t].AudioList[j].SpaneshTerm
              //option1.setAttribute('style', 'color:blue')
              //selectList.appendChild(option1)

              var li1 = document.createElement('li')
              var a = document.createElement('a')
              a.setAttribute('onclick', 'onSelectDef_1(this)')
              a.setAttribute('style', 'color:blue;font-weight:bold;cursor:pointer')
              li1.setAttribute('class', 'list-group-item list-group-item btn-warning')
              li1.value = j
              var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
              // li1.text = GroupArray[t].AudioList[j].SpaneshTerm
              a.appendChild(t1)
              li1.appendChild(a)
              a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
              // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].SpaneshTerm+'",'
              selectList1.appendChild(li1)
            }

            
          }
        }
      }
    } else if (gName == 'All') {
      // alert("wel")
      gcount++
      onSelection2()
    } else if (modalData[t].name == currentChap) {
      // alert("we2")
      gcount++
      var cntvar = 0
      var chapterNumberOnly = modalData[t].name
      var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
      var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'

      for (var t = 0; t < GroupArray.length; t++) {
        if (GroupArray[t].groupname == gName) {
          //var x = document.getElementById('termChoose')
          //x.remove()
          var x = document.getElementById('termChoose1')
          x.remove()
          var myDiv = document.getElementById('section')
          //var selectList = document.createElement('select')
          //selectList.setAttribute('id', 'termChoose')
          // selectList.setAttribute("size", "42")
         // selectList.setAttribute('style', 'width:200px')
         // selectList.setAttribute('onclick', 'onSelectDef(this)')
          //myDiv.appendChild(selectList)

          var selectList1 = document.createElement('ul')
          selectList1.setAttribute('id', 'termChoose1')
          // selectList.setAttribute("size", "42")
          selectList1.setAttribute('style', 'width:200px')
          selectList1.setAttribute('onclick', 'onSelectDef(this)')
          myDiv.appendChild(selectList1)

          for (var j = 0; j < GroupArray[t].AudioList.length; j++) {
            if (GroupArray[t].AudioList[j].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
              cntvar++
            //  var option = document.createElement('option')
            //  option.value = GroupArray[t].AudioList[j].Audioterm
            //  option.text = GroupArray[t].AudioList[j].Audioterm
             // selectList.appendChild(option)

              var li = document.createElement('li')
              var a = document.createElement('a')
              li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
              a.setAttribute('onclick', 'onSelectDef_1(this)')
              a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
              li.value = j
              var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
              // li.text = GroupArray[t].AudioList[j].Audioterm
              a.appendChild(t1)
              li.appendChild(a)
              selectList1.appendChild(li)

              if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
              }else {
                // alert(GroupArray[t].AudioList[j].SpaneshTerm)
             //   var option1 = document.createElement('option')
              //  option1.value = GroupArray[t].AudioList[j].SpaneshTerm
               // option1.text = GroupArray[t].AudioList[j].SpaneshTerm
              //  option1.setAttribute('style', 'color:blue')
              //  selectList.appendChild(option1)

                var li = document.createElement('li')
                var a = document.createElement('a')
                li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
                a.setAttribute('onclick', 'onSelectDef_1(this)')
                a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
                li.value = j
                var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
                // li.text = GroupArray[t].AudioList[j].Audioterm
                a.appendChild(t1)
                li.appendChild(a)
                selectList1.appendChild(li)
              }
            }
          }
        } else {}
      }
      // console.log(myDiv.innerHTML)
      if (cntvar == 0) {
        var toreport = document.createElement('div')
        toreport.setAttribute('id', 'box')
        toreport.innerHTML = 'No Terms/Definitions in the Selected Letter'
        var ToappendBox = document.getElementById('Definition')
        ToappendBox.appendChild(toreport)

        var toreport1 = document.createElement('div')
        toreport1.setAttribute('id', 'box1')
        toreport1.innerHTML = 'No Terms/Definitions in the Selected Letter'
        var ToappendBox1 = document.getElementById('Term')
        ToappendBox1.appendChild(toreport1)

       // var x = document.getElementById('termChoose')
       // x.remove()
        var x = document.getElementById('termChoose1')
        x.remove()

        var myDiv = document.getElementById('section')
       // var selectList = document.createElement('select')
       // selectList.setAttribute('id', 'termChoose')
        // selectList.setAttribute("size", "42")
        //selectList.setAttribute('style', 'width:200px')
        // selectList.setAttribute("onclick","onSelectDef(this)")
        //myDiv.appendChild(selectList)

        var selectList1 = document.createElement('ul')
        selectList1.setAttribute('id', 'termChoose1')
        // selectList.setAttribute("size", "42")
        selectList1.setAttribute('style', 'width:200px')
        // selectList.setAttribute("onclick","onSelectDef(this)")
        myDiv.appendChild(selectList1)

        var option = document.createElement('option')
        option.value = 'empty'
        option.text = 'No Terms.....!'
        //selectList.appendChild(option)
        myDiv.appendChild(selectList)

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onSelectDef_1(this)')
        a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
        li.value = j
        var t1 = document.createTextNode('No Terms.....!')
        // li.text = GroupArray[t].AudioList[j].Audioterm
        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)
        myDiv.appendChild(selectList1)

        var TC = document.getElementById('termContent')
        TC.innerHTML = ''
        var DC = document.getElementById('definitionContent')
        DC.innerHTML = ''
        var tcontext = document.getElementById('TermContext')
        tcontext.innerHTML = ''
        var Audio = document.getElementById('Audio')
        Audio.innerHTML = ''
        var Audio1 = document.getElementById('Audio1')
        Audio1.innerHTML = ''
      // document.getElementById("b1").disabled = true
      // document.getElementById("b2").disabled = true
      }
    }
  }
  if (gcount == 0) {
    // alert("g")
    if (psbi == null) {
      // alert(obj.parentNode.previousSibling.outerHTML)
      psbi = obj.parentNode.previousSibling
    }
    var toreport = document.createElement('div')
    toreport.setAttribute('id', 'box')
    toreport.innerHTML = 'No Terms/Definitions in the Selected Letter'
    var ToappendBox = document.getElementById('Definition')
    ToappendBox.appendChild(toreport)

    var toreport1 = document.createElement('div')
    toreport1.setAttribute('id', 'box1')
    toreport1.innerHTML = 'No Terms/Definitions in the Selected Letter'
    var ToappendBox1 = document.getElementById('Term')
    ToappendBox1.appendChild(toreport1)

    //var x = document.getElementById('termChoose')
    //x.remove()

    var x = document.getElementById('termChoose1')
    x.remove()

    var myDiv = document.getElementById('section')
    //var selectList = document.createElement('select')
    //selectList.setAttribute('id', 'termChoose')
    // selectList.setAttribute("size", "42")
    //selectList.setAttribute('style', 'width:200px')
    // selectList.setAttribute("onclick","onSelectDef(this)")
    //myDiv.appendChild(selectList)

    var selectList1 = document.createElement('ul')
    selectList1.setAttribute('id', 'termChoose1')
    // selectList.setAttribute("size", "42")
    selectList1.setAttribute('style', 'width:200px')
    // selectList.setAttribute("onclick","onSelectDef(this)")
    myDiv.appendChild(selectList1)

    //var option = document.createElement('option')
    //option.value = 'empty'
    //option.text = 'No Terms..!'
    //selectList.appendChild(option)
    //myDiv.appendChild(selectList)

    var li = document.createElement('li')
    var a = document.createElement('a')
    li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
    a.setAttribute('onclick', 'onSelectDef_1(this)')
    a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
    li.value = j
    var t1 = document.createTextNode('No Terms..!')
    // li.text = GroupArray[t].AudioList[j].Audioterm
    a.appendChild(t1)
    li.appendChild(a)
    selectList1.appendChild(li)
    myDiv.appendChild(selectList1)



    var TC = document.getElementById('termContent')
    TC.innerHTML = ''
    var DC = document.getElementById('definitionContent')
    DC.innerHTML = ''
    var tcontext = document.getElementById('TermContext')
    tcontext.innerHTML = ''
    var Audio = document.getElementById('Audio')
    Audio.innerHTML = ''
    var Audio1 = document.getElementById('Audio1')
    Audio1.innerHTML = ''

    var defad = document.getElementById('defAudio')
    defad.innerHTML = ''

    var senad = document.getElementById('SenAudion')
    senad.innerHTML = ''

    var seterm = document.getElementById('SenTerm')
    seterm.innerHTML = ''

    document.getElementById('b1').disabled = true
    document.getElementById('b2').disabled = true
  }
  count=0;
  document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
}
function GroupRefVO () {
  // contains the chapter level details
  var queistionlist
  var name
}
function queistionVO () {
  // contains the queistion level details
  var qType
  var term
  var meaning
  var termAudio
  var deffAudio
}

/**************************************************************************************************************** */
//    New Update for the select dropdown button layout varies from desktop browsers to mobile browser
//    We have modifies ths to select element to list tag.
//    onSelectDef_1 method used to check and select the corresponding index of the dropdown menu
//    Developer : Subramani M
//    Impelesys India Privat Limited 
//    Date : 08-Dec-2016
/******************************************************************************************************************* */
function onSelectDef_1 (tar) {
  tar.className = tar.className + ' active'
  //var x1 = document.getElementById('termChoose')
  //for (var x = 0;x < x1.length;x++) {
    //if (x1[x].value == tar.innerHTML) {
      //x1.selectedIndex = x
      onSelectDef(tar)
      //break
    //}
    
  //}
  
  
}

function onSelectDef(tar) {
  
	document.getElementById("loadder").style.display = "block";
	if (window.matchMedia("(min-width: 768px)").matches) {
		if ($("#sidemenu").attr("class").indexOf("sideNav") > 0) {} else {

			$("#sidemenu").addClass("sideNav");
			$("#sidemenu").css("display", "block");
			$("#main_cont").css("display", "none");

		}


		if ($("#sidemenu").attr("class").indexOf("col-xs-4") > 0) {} else {
			$("#sidemenu").toggleClass("col-xs-12", "col-xs-4");
			$("#main_cont").css("display", "block");
		}
		if ($("#main_cont").attr("class").indexOf("col-xs-4") > 0) {


			//		$("#main_cont").toggleClass("col-xs-4","col-xs-12");

		} else {


			$("#main_cont").toggleClass("col-xs-12", "col-xs-4");

		}
	} else {
		if ($("#sidemenu").attr("class").indexOf("sideNav") > 0) {
			$("#sidemenu").toggleClass("sideNav", "sideNav1");
			$("#sidemenu").css("display", "");
			$("#main_cont").css("display", "block");


		} else {

			//$("#sidemenu").addClass("sideNav");
			//$("#sidemenu").css("display","block");


		}


		if ($("#sidemenu").attr("class").indexOf("col-xs-4") > 0) {

			$("#sidemenu").toggleClass("col-xs-4", "col-xs-12");



		} else {



			//			 $("#sidemenu").toggleClass("col-xs-12","col-xs-4"); 


		}
		if ($("#main_cont").attr("class").indexOf("col-xs-4") > 0) {


			$("#main_cont").toggleClass("col-xs-4", "col-xs-12");

		} else {


			//$("#main_cont").toggleClass("col-xs-12","col-xs-4");
		}

	}
	audioElement1.pause();

	//TAudioption.currentTime = 0;
	var currAud = 0;
	var bx = document.getElementById("box");
	if (bx == null) {} else {
		$("#box").remove();
	}
	var bx1 = document.getElementById("box1");
	if (bx1 == null) {} else {
		$("#box1").remove();
	}

	var cahperList = document.getElementById("chapterList");
	var currentChap = cahperList.options[cahperList.selectedIndex].value;
	var termList = document.getElementById("termChoose1");
	//var selectedterm = termList.options[termList.selectedIndex].value;
var selectedterm = tar.innerHTML;
	//	alert(selectedterm);
//alert(selectedterm);
	var cnt = 0;
	for (var t = 0; t < modalData.length; t++) {
		for (var j = 0; j < GroupArray[t].AudioList.length; j++) {
			if (GroupArray[t].AudioList[j].Audioterm == selectedterm) {
            document.getElementById('b3').value = 'Spanish Terms'
          document.getElementById('b3').style = '	background-color: #D17DD0;'
          
          
				cnt++;
        vart=t;
        varj=j;
				var TC = document.getElementById("termContent");
				TC.innerHTML = GroupArray[t].AudioList[j].Audioterm;
				//termContentPro
				var TCp = document.getElementById("termContentPro");
				TCp.innerHTML = GroupArray[t].AudioList[j].pronc;

				var DC = document.getElementById("definitionContent");
				DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;
				if (GroupArray[t].AudioList[j].SpaneshTerm == "") {
					//ToViewSpanTerm();
					document.getElementById("ESToggle").style.visibility = "hidden";
          var TC = document.getElementById("spanitem_1");
					TC.style.display = "none";

				} else {


					//ToViewSpanTerm();
          document.getElementById('ESToggle').style.visibility = 'visible'
          var TC = document.getElementById("spanitem_1");
					TC.style.display = "block";
					var TC = document.getElementById("spanitem_1");
					TC.style.color = "blue";
					TC.innerHTML = '<span class="badge" >Related Spanish term</span> ' + GroupArray[t].AudioList[j].SpaneshTerm;
				}
				//	var tcontext = document.getElementById("TermContext");
				//	tcontext.innerHTML = GroupArray[t].AudioList[j].Audioterm;

				//audioPlay(GroupArray[t].AudioList[j].AudioUrl);<span class="badge">Relate Spanish Term</span>
				var TermFileAudio = GroupArray[t].AudioList[j].AudioUrl;
				var defAudio = GroupArray[t].AudioList[j].defAudioUrl;
				var SenAudio = GroupArray[t].AudioList[j].senAudioUrl;
                vart=t;
        varj=j;  


				//adding Audio button to definiton frame
				var audioElement = document.createElement('audio');
        
        audioElement.setAttribute('src', "media/" + (GroupArray[t].AudioList[j].AudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
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
				audioElement.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
				$('.play').click(function () {
           try
          {
															audioElement.play();
    } catch (e) {
        console.log("Error");
    }
				
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
          DefaudioElement.setAttribute('src', "media/" + (GroupArray[t].AudioList[j].defAudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
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
                       try
          {
																DefaudioElement.play();
    } catch (e) {
        $('.defplayplay').innerHTML="";
    }

					
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
          $(SentenceaudioElement).attr('src', "media/" + (GroupArray[t].AudioList[j].defAudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
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

    try {
						SentenceaudioElement.play();

    } catch (e) {
        $('.Senplayplay').innerHTML=""
    }




					});

				}

				//adding Audio button to Term frame
				var TOappnd = document.getElementById('Audio1');
				TOappnd.innerHTML = "";
        audioElement1.setAttribute('src', "media/" + (GroupArray[t].AudioList[j].AudioUrl+".mp3").replace(".mp3.mp3",".mp3"));
				//alert("media/" + GroupArray[t].AudioList[j].AudioUrl);
				audioElement1.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
            try {
audioElement1.play();

    } catch (e) {
        auioElement1.innerHTML=""
    }
				
				var TOappnd = document.getElementById('Audio1');
				var Abtn = document.createElement("button");
				Abtn.setAttribute("id", "play");
				Abtn.setAttribute("class", "play");
				Abtn.setAttribute("onmouseover", "mOver(this)");
				Abtn.setAttribute("onmouseout", "mOut(this)");
				Abtn.innerHTML = "Play Def Audio";
				TOappnd.appendChild(Abtn);
				audioElement1.preload = "none";
				audioElement1.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
				$('.play').click(function () {
					audioElement1.play();
				});

				$('.pause').click(function () {
					audioElement1.pause();
				});
			} else if (GroupArray[t].AudioList[j].SpaneshTerm == selectedterm) //Spanes Definition Display Frame
			{
				// SpanURL
        document.getElementById('b3').value = 'English Terms'
        document.getElementById('b3').style = '	background-color: #7D81D1;'
    
          document.getElementById('b3').style.display = 'block'
				var TC = document.getElementById("termContent");
				TC.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
				var DC = document.getElementById("definitionContent");
				DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;
				//var tcontext = document.getElementById("TermContext");
				//tcontext.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
				//span term Audio 
				//alert(GroupArray[t].AudioList[j].SpanURL);
				var TC = document.getElementById("spanitem_1");
				TC.style.color = "black";
        TC.style.display = "block";
				TC.innerHTML = '<span class="badge" >Related English term</span> ' + GroupArray[t].AudioList[j].Audioterm;
				var TOappnd = document.getElementById('Audio1');
				TOappnd.innerHTML = "";
				audioElement1.setAttribute('src', "media/span/media/" + GroupArray[t].AudioList[j].SpanURL + ".mp3");

				//alert("media/span/media/" + GroupArray[t].AudioList[j].SpanURL);
				audioElement1.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
         try {
audioElement1.play();
    } catch (e) {
        auioElement1.innerHTML=""
    }

				
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
				audioElement.setAttribute('src', "media/span/media/" + GroupArray[t].AudioList[j].SpanURL + ".mp3");
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
				audioElement.onloadeddata = function () {
					document.getElementById("loadder").style.display = "none";
				}
				$('.play').click(function () {
					audioElement.play();
				});

				$('.pause').click(function () {
					audioElement.pause();
				});






			}
		}
	}
	if (cnt == 0) {
		//alert("Not found");
	}
	//document.getElementById("loadder").style.display="none";
}

function mOver (obj) {

  // obj.class=play1
  var ply = document.getElementById('play')
  ply.className = 'play1'
  // ply.className="play1"

}

function mOver1 (obj) {

  // obj.class=play1
  var ply = document.getElementById('play1')
  ply.className = 'play1'
  // ply.className="play1"

}

function mOut (obj) {
  var ply = document.getElementById('play')
  ply.className = 'play'
  // alert("mout"+ply.className)

}
function mOut1 (obj) {
  var ply = document.getElementById('play1')
  ply.className = 'play'
  // alert("mout"+ply.className)

}

function DefplaymOver (obj) {
  var ply = document.getElementById('Defplay')
  ply.className = 'Defplayplay1'
}
function DefplaymOut (obj) {
  var ply = document.getElementById('Defplay')
  ply.className = 'Defplayplay'
}

function SenplaymOver (obj) {
  var ply = document.getElementById('Senplay')
  ply.className = 'Senplayplay1'
}
function SenplaymOut (obj) {
  var ply = document.getElementById('Senplay')
  ply.className = 'Senplayplay'
}
function DisplayHelp (txt) {}
function gettingFlip () {
  $(function () {
    $('.btns').click(function () {
      var btnv = this.value

      $('#' + btnv).siblings().hide()
      $('#' + btnv).show()
      $('#' + btnv).flip({
        direction: 'tb',
        color: 'white'
      })
      $('#' + btnv).siblings().hide()
    })
  })
}

function tabClickTerm () {
  $('#b1').css('background', '#9AC97B')
  $('#b1').css('color', 'white')
  $('#b2').css('background', '#369CCD')
  $('#b2').css('color', 'black')
  termFlag = 1
  click = 1
  var b2 = document.getElementById('b2')
  var b1 = document.getElementById('b1')
  b1.className = 'activeterm'
  b2.className = 'inactivedeff'
}
function tabClickDef () {
  $('#b2').css('background', '#9AC97B')
  $('#b1').css('background', '#369CCD')
  $('#b1').css('color', 'black')
  $('#b2').css('color', 'white')
  termFlag = 0
  click = 0
  var b2 = document.getElementById('b2')
  var b1 = document.getElementById('b1')
  b2.className = 'activedef'
  b1.className = 'inactiveterm'
}

function RotateFlip () {
}
function rotateFlip () // flip toggle
{
  if (click == 0) {
    rotateFlip1()
  } else {
    click = 0
    $('#Definition').siblings().hide()
    $('#Definition').show()
    $('#Definition').flip({
      direction: 'tb',
      color: 'white'
    })
    $('#Definition').siblings().hide()
    tabClickDef()
  }
}
function rotateFlip1 () // cheking flags
{
  if (click == 1) {
    click = 0
    rotateFlip()
  } else {
    click = 1
    rotateFlip()
    flipInto()
    tabClickTerm()
  }
}
function flipInto () // conditional flip
{
  $('#term').siblings().hide()
  $('#term').show()
  $('#term').flip({})
  $('#term').siblings().hide()
}

$(document).ready(function () {
  audioElement1 = document.createElement('audio')
  audioElement1.setAttribute('preload', 'none')
  audioElement1.setAttribute('id', 'Taudio')
})

function decreaseFontSizeInternal () {
  var list = []
  list.push(document.getElementById('thead'))
  list.push(document.getElementById('termContent'))
  list.push(document.getElementById('dhead'))
  list.push(document.getElementById('definitionContent'))
  list.push(document.getElementById('termContentPro'))
  list.push(document.getElementById('spanitem_1'))
  for (i = 0;i < list.length;i++) {
    var s = 24
    if (list[i].style.fontSize) {
      s = parseInt(list[i].style.fontSize.replace('px', ''))
    }
    if (s != min) {
      s -= 1
    }
    list[i].style.fontSize = s + 'px'
  }
}

function increaseFontSizeInternal () {
  var list = []
  list.push(document.getElementById('thead'))
  list.push(document.getElementById('termContent'))
  list.push(document.getElementById('dhead'))
  list.push(document.getElementById('definitionContent'))
  list.push(document.getElementById('termContentPro'))
  list.push(document.getElementById('spanitem_1'))
  //termContentPro
  //SpanTerms_1
  // alert(list)
  for (i = 0;i < list.length;i++) {
    console.log(list[i])
    var s = 24
    // alert(list[i].style.fontSize)
    if (list[i].style.fontSize) {
      s = parseInt(list[i].style.fontSize.replace('px', ''))
    }
    if (s != max) {
      s += 1
    }
    list[i].style.fontSize = s + 'px'
  }
}

$(window).resize(function () {
  
  if($(window).width()<750)
  {
    // onSideNav method used to dispaly an hide the alphabet menu
    onSidenav();
    $("#sidemenu").css("display", "");
    $("#main_cont").css("display", "block");
  }
})
