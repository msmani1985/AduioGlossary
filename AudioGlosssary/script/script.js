var toggES="En";
var max = 60
var min = 20
var data
var vart = 0;
var varj = 0;
var nclexDoc
var tocDoc
var initDoc
var xml1;
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
var chapter_counter = 0,
    question_no = -1
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
        $("#sidemenu").css("display", "none");
        $("#main_cont").css("display", "block");
    } else {


        $("#sidemenu").addClass("sideNav");
        $("#sidemenu").css("display", "block");
        $("#main_cont").css("display", "block");
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

function bodyloaded1() {
    document.addEventListener('dataLoaded', createUI)
    document.addEventListener('dataLoaded', createUI1)
    modelObj = new DtataProvider('xml/chapter.xml', createUI)
    modelObj1 = new DtataProvider1('xml/terms.xml', createUI1)
    psbi = null
    document.getElementById('previous').disabled = true
    document.getElementById('next').disabled = false
    if ($(window).width() < 750) {

        // onSideNav method used to dispaly an hide the alphabet menu
        onSidenav();
        $("#sidemenu").css("display", "none");
        $("#main_cont").css("display", "block");
    }
}

function createUI(e) // to load data into the UI
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
            // console.log(modalData[k].name)
    }
}

function alpha_list(e) {

    var MYLIST = document.getElementById('myLi') // chapter level data
     
    var lix = document.createElement('li')
        //	lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-warning\" style=\"width:42px;height:25px;font-size:15px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"All\" value=\"All\">"
    lix.innerHTML = '<input data-toggle="tooltip" title="All alphabet wise term list" type="button" class="btns1 btn-warning" style=" width: 35px;    height: 25px;   font-size: 15px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 6px;    padding-right: 1em;" onclick="onSelection3(this)" id="All" value="All">'
        // lix.innerHTML="<button type=\"button\" class=\"btn btn-default\" onclick=\"onSelection3(this)\" id=\"All\" value=\"All\">All</button>"
    MYLIST.appendChild(lix)

    GroupArray = e;
    var cahperList = document.getElementById('chapterList')
        

    if (cahperList.options[cahperList.selectedIndex] == undefined) {
        var currentChap = cahperList.options[0].value
    } else {
        var currentChap = cahperList.options[cahperList.selectedIndex].value
    }
    var gName;
    var varfound = [];
    //console.log("dafdfadf");
    
    if (currentChap == 'All Chapters') {
        
        var varprev = "";
        for (vari = 65; vari < 91; vari++) {
            if ($(xml1).find("group[name='" + String.fromCharCode(vari) + "']").length == 0) {} else {
                if (varprev != String.fromCharCode(vari)) {
                    varfound.push(String.fromCharCode(vari));
                    varprev = "";
                } else

                { //alert( varprev+" " +String.fromCharCode(vari)+" " + $(xml1).find("group[name='"+String.fromCharCode(vari)+"']").length);
                    varprev = ""
                }

                varprev = String.fromCharCode(vari);
            }
        }
         
        if (varprev != "") {
                       
            varfound[varfound.length - 1] = (varprev + "-" + "Z");
             
        }
    } else {

        for (var t = 0; t < modalData.length; t++) {
            if (modalData[t].name == currentChap) {
                var chapterNumberOnly = modalData[t].name
                var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
                var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,';
                break;
            }
        }
        var vargname = [];
        var varfound = [];


        $(xml1).find("audio[chapter*='" + chapterNumberOnly2 + "']").each(function() {
            if ($.inArray($(this).parent().attr("name").charCodeAt(0), vargname) < 0) {
                vargname.push($(this).parent().attr("name").charCodeAt(0))
            } else {
                //alert("found");
            }
        })
        vargname = vargname.sort();
        varprev = 65;
        // alert(vargname);
        for (vari = 0; vari < vargname.length; vari++) {
            //alert(varprev + " " + vargname[vari])
            if (varprev == vargname[vari]) {
                varfound.push(String.fromCharCode(vargname[vari]));
                // alert(vargname[vari])
                varprev = vargname[vari] + 1
            } else {
                varfound.push(String.fromCharCode(varprev) + "-" + String.fromCharCode(vargname[vari]))
                    // varprev=vargname[vari]+1
                    // alert(String.fromCharCode(vargname[vari]));
                varprev = vargname[vari] + 1
            }

        }
        if (varprev != 91) {
            
            varfound[varfound.length - 1] = varfound[varfound.length - 1].split("-")[0] + "-" + "Z";
           // alert( varfound[varfound.length - 1]) ;  
        }

    }


    /*
        
          for (var t = 0; t < modalData.length; t++) {
            for (var j = 0; j < GroupArray.length; j++) {
              for (var i = 0; i < GROUP.length; i++) // loading chapter headdings to dropdown box
      {
       
        gName=GROUP[i];
             if (currentChap == 'All Chapters') {
          // console.log("*.pdf")
          //for (var t = 0; t < GroupArray.length; t++) {
               if (gName == GroupArray[j].groupname) {
                   varfound.push(i);
                   break;
               }
          //}
        } else if (gName == 'All') {
           if (gName == GroupArray[j].groupname) {
          varfound.push(i)
          break;
           }
        } 
        else if (modalData[t].name == currentChap) {
           var chapterNumberOnly = modalData[t].name
          var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
          var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,';
          for (var varj = 0; varj < GroupArray[j].AudioList.length; varj++) // loading chapter headdings to dropdown box
            {
           if (GroupArray[j].AudioList[varj].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
           if (gName == GroupArray[j].groupname) {
            // console.log(gName +GroupArray[j].groupname )
              varfound.push(i);
              break;
           }
           }
            }
        }
      }
        }
    }*/


    //console.log(varfound.length)
    varprev = 0;
    var varmyli;
    var varcharnumber = 64;

    for (var i = 0; i < varfound.length; i++) {
        // console.log(varfound[i+1].charCodeAt(0) + " " + varfound[i].charCodeAt(0))

        //console.log(String.fromCharCode(varcharnumber))
        
        if (varfound[i].indexOf("-") > 0) {
            var lix = document.createElement('li')
                // lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-info\" style=\"width:42px;height:25px;font-size:17px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"" + GROUP[i] + "index\" value=\"" + GROUP[i] + "\">"
            lix.innerHTML = '<input data-toggle="tooltip" title="' + varfound[i] + ' term list" type="button" class="btns1 btn-info" style="    width: 35px;    height: 25px;   font-size: 15px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 3px;    padding-right: 1em" onclick="onSelection3(this)" id="' + varfound[i] + 'index" value="' + varfound[i] + '">'
            MYLIST.appendChild(lix)
        } else

        {
            var lix = document.createElement('li')
                // lix.innerHTML = "<input type=\"button\" class=\"btns1 btn-info\" style=\"width:42px;height:25px;font-size:17px;font-weight:bold\" onclick=\"onSelection3(this)\" id=\"" + GROUP[i] + "index\" value=\"" + GROUP[i] + "\">"
            lix.innerHTML = '<input  data-toggle="tooltip" title="' + varfound[i] + ' term list" type="button" class="btns1 btn-info" style="    width: 35px;    height: 25px;   font-size: 15px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 6px;    padding-right: 1em;" onclick="onSelection3(this)" id="' + varfound[i] + 'index" value="' + varfound[i] + '">'
            MYLIST.appendChild(lix)
        }

//alert(varfound[i]);

    }
}

function createUI1(e) {
    modalData1 = e // loading data to variable
    var questionlist = modalData1[0].AudioList
    currentChapterList = questionlist.slice(0, questionlist.length) // coping array
    currentQ = 0
    alpha_list(e);
    document.getElementById("b3").disabled = true;
    document.getElementById("b4").disabled = true;
    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
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
                /**********************************search data information*************************************** */
                //
                //									Search functionality and merging the 
                //
                /************************************************************************************************** */
            termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
                /**************************************************************************** ***********************/

            if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
                // termsdetsear=termsdetsear+","
                Englishwordonly(selectList1, j, t);


            } else {


                /*********************************************************************************************** */
                termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].SpaneshTerm + '",'
                    /********************************************************************************************** */
                EnglishSpanshword(selectList1, j, t);



                /********************************************************************************************************* */

            }
            //option1.setAttribute('style', 'color:blue')
            //  li1.setAttribute('style', 'color:blue')
            if (GroupArray[t].groupname == 'A') {
                vart = t;
                varj = 0;
                FirstTerm = GroupArray[t].AudioList[0].Audioterm
                FirstDefinition = GroupArray[t].AudioList[0].Audiomeaning
                termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[0].Audioterm + '",'

                var TC = document.getElementById('termContent')
                TC.innerHTML = FirstTerm
                var DC = document.getElementById('definitionContent')
                DC.innerHTML = FirstDefinition
                audio_tag("media/"+GroupArray[t].AudioList[0].AudioUrl,"Audio1","play1")
                $('#b1').css('background', '#9AC97B')
                $('#b1').css('color', 'white')
            }
        }
    }
    // console.log(termsdetsear)
    /******************************************************************************************************* */
    console.log(termsdetsear);
    
    try {
        var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
        data = { 'ale': termdsdetsear1 }
        search()
    } catch (e) {
        console.log(e);
    }




    /********************************************************************************************************** */
    $('#bl').attr('disabled', true)
    $('#b2').attr('disabled', true)
        //document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
}

function Englishwordonly(selectList1, varj, vart) {
    //alert("welcom");
    document.getElementById("b3").disabled = false;
    document.getElementById("b4").disabled = false;
    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
    var li = document.createElement('li')   
     
    var a = document.createElement('a')
    li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
    a.setAttribute('onclick', 'onSelectDef_1(this,true)')
        //a.setAttribute('style', 'color:black;font-weight:bold;cursor:pointer')
    a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");

    li.value = varj
        // var t2 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
    var varterms= (GroupArray[vart].AudioList[varj].Audioterm);
    
    if(varterms.length>=130)
   {   
       var t1 = document.createTextNode(varterms.substring(1,45) + "...")
       a.setAttribute("data-terms",varterms);   
       li.setAttribute("data-toggle","tooltip");
       li.setAttribute("title",varterms)}
    else
    {
        var t1 = document.createTextNode(varterms)
        a.setAttribute("data-terms",varterms);
        li.setAttribute("data-toggle","tooltip");
        li.setAttribute("title","English Term only");
    }
        // li.text = GroupArray[t].AudioList[j].Audioterm
    a.appendChild(t1)
    
    li.appendChild(a)
    selectList1.appendChild(li)
        // onSelectDef_1(selectList1.childNodes[0].childNodes[0],true);


}

function EnglishSpanshword(selectList1, varj, vart) {

    //selectList.appendChild(option1)
    /****************************************************************************************** */
    // Mobile browser side me layout
    /******************************************************************************************* */

    document.getElementById("b3").disabled = false;
    document.getElementById("b4").disabled = false;
    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
    var li1 = document.createElement('li')
     li1.setAttribute("data-toggle","tooltip");
    li1.setAttribute("title","English and Spanish Terms");
    var a = document.createElement('a')
    a.setAttribute('onclick', 'onSelectDef_1(this,true)')
    a.setAttribute("style", "        font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
   
    li1.setAttribute('class', 'list-group-item list-group-item btn-warning')
    li1.value = varj
    
    var t1 = document.createTextNode(GroupArray[vart].AudioList[varj].Audioterm)
    var t2 = document.createTextNode(GroupArray[vart].AudioList[varj].SpaneshTerm)
    var t3 = document.createTextNode(", ")
    var s1 = document.createElement('span')
    s1.setAttribute("style", "color:black");
    s1.setAttribute("data-toggle","tooltip");
    s1.setAttribute("title","English Term");
    var s2 = document.createElement('span')
    s2.setAttribute("style", "color:blue");
    s2.setAttribute("data-toggle","tooltip");
    s2.setAttribute("title","Spanish Term");
    var s3 = document.createElement('span')
    s3.setAttribute("style", "color:black");
    
    s1.appendChild(t1)
    s2.appendChild(t2)
    s3.appendChild(t3)

    // li1.text = GroupArray[t].AudioList[j].SpaneshTerm
    a.appendChild(s1)
    a.appendChild(s3)
    a.appendChild(s2)
    li1.appendChild(a)
    a.setAttribute("style", "     font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
    // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].SpaneshTerm+'",'
    selectList1.appendChild(li1)

    //onSelectDef_1(selectList1.childNodes[0].childNodes[0],true)

}

function onPrevious() {

    if (count == 0) {
        document.getElementById('previous').disabled = true
        document.getElementById('next').disabled = false
    } else {

        document.getElementById('previous').disabled = false
        document.getElementById('next').disabled = false
        try
        {
        onSelectDef(document.getElementById('termChoose1').childNodes[count - 1].childNodes[0]);
        }
        catch(e)
        {}
        document.getElementById('number_term').innerHTML = count + '/' + document.getElementById('termChoose1').childNodes.length
        count = count - 1
        if (count == 0) {
            document.getElementById('previous').disabled = true
            document.getElementById('next').disabled = false
        }
    }
}

function onNext() {
    // console.log(document.getElementById("termChoose").length + " " + count)
    count = count + 1

    if (count < document.getElementById('termChoose1').childNodes.length) {
        document.getElementById('previous').disabled = false
        document.getElementById('next').disabled = false
        onSelectDef(document.getElementById('termChoose1').childNodes[count].childNodes[0])
        document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
        if (count >= document.getElementById('termChoose1').childNodes.length - 1) {

            document.getElementById('previous').disabled = false
            document.getElementById('next').disabled = true
        }
    } else {
        document.getElementById('previous').disabled = false
        document.getElementById('next').disabled = true
    }
}

function removeLastComma(str) {
    return str.replace(/,(\s+)?$/, '').replace(/\n/g,"");
}

function search() {
    typeof $.typeahead === 'function' && $.typeahead({
        input: '.js-typeahead-input',
        minLength: 1,
        maxItem: 15,
        order: 'asc',
        hint: true,
        dynamic: true,
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
            onClickAfter: function(node, a, item, event) {
                
                // href key gets added inside item from options.href configuration
                var varleft="";
                var x1 = document.getElementById('termChoose1').childNodes;
                for (var x = 0; x < x1.length; x++) {
                       
                       if(x1[x].childNodes[0].text.replace(/\n/g,"").indexOf(" , ")>-1)
                       {
                           varleft=x1[x].childNodes[0].text.replace(/\n/g,"").split(",")[0];
                       }
                       else
                       {
                           varleft=x1[x].childNodes[0].text.replace(/\n/g,"");
                       }
                    if (varleft.trim() == item.display.trim()) {
                        //x1.selectedIndex = x
                        count = x;

                        if (x == 0) {
                            document.getElementById('previous').disabled = true
                            document.getElementById('next').disabled = false
                        } else {
                            document.getElementById('previous').disabled = false
                            document.getElementById('next').disabled = false
                        }

                        if (x == x1.length - 1) {
                            document.getElementById('previous').disabled = false
                            document.getElementById('next').disabled = true
                        }
                        ($(".js-typeahead-input").val($(".js-typeahead-input").val().replace(/\n/g,"").trim())); 
                        document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
                        onSelectDef(x1[x].childNodes[0]);
                        break
                    }
                }
                
            },

            onSubmit: function(node, form, item, event) {
                event.preventDefault()
                var itemdisplay=($(".js-typeahead-input").val())
               
                var varleft="";
                var x1 = document.getElementById('termChoose1').childNodes;
                for (var x = 0; x < x1.length; x++) {

                    if(x1[x].childNodes[0].text.replace(/\n/g,"").indexOf(" , ")>-1)
                       {
                           varleft=x1[x].childNodes[0].text.replace(/\n/g,"").split(",")[0];
                       }
                       else
                       {
                           varleft=x1[x].childNodes[0].text.replace(/\n/g,"");
                       }

                       
                    if (varleft.trim() == itemdisplay.replace(/\n/g,"").trim()) {
                        //x1.selectedIndex = x
                            
                        count = x;
alert(count);
                        if (x == 0) {
                            document.getElementById('previous').disabled = true
                            document.getElementById('next').disabled = false
                        } else {
                            document.getElementById('previous').disabled = false
                            document.getElementById('next').disabled = false
                        }

                        if (x == x1.length - 1) {
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

function ToViewEnglishTerm() {
    // document.getElementById("b3").value="English Term"
    // document.getElementById("b3").style="	background-color: #7D81D1;"
    //if (document.getElementById('b4').value == 'English Terms') 
    toggES="En";
    var groupName = "";
    for (vark = 0; vark < document.getElementById("myLi").childNodes.length; vark++) {

        if (document.getElementById('myLi').childNodes[vark].childNodes[0].outerHTML.indexOf("btn-warning") > 0) {
            groupName = document.getElementById('myLi').childNodes[vark].childNodes[0].value;
            break;
        }
    } {

        document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-default", "btn-info");
        document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
        var cahperList = document.getElementById('chapterList')
        var currentChap = cahperList.options[cahperList.selectedIndex].value
        var spanish_list = [];
        if (cahperList.selectedIndex == 0) {
            var spanish_list = [];
            var x = $('#termChoose1')
            x.remove()
            var termsdetsear = ''
            var myDiv = document.getElementById('section')

            var selectList1 = document.createElement('ul')
            for (var t = 0; t < GroupArray.length; t++) {


                selectList1.setAttribute('id', 'termChoose1')

                selectList1.setAttribute('style', 'width:200px')
                selectList1.setAttribute('class', 'list-group')
                myDiv.appendChild(selectList1)

                for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
                {
                    //if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') 
                    {
                        if (groupName == "All") {
                            spanish_list.push(GroupArray[t].AudioList[j].Audioterm);
                        } else {
                            var gName = groupName;

                            if (gName.indexOf("-") == -1) {

                                if (GroupArray[t].groupname == gName) {
                                    spanish_list.push(GroupArray[t].AudioList[j].Audioterm);
                                }
                            } else {

                                for (var varcharcode = gName.split("-")[0].charCodeAt(0); varcharcode < gName.split("-")[1].charCodeAt(0) + 1; varcharcode++) {
                                    var gName1 = String.fromCharCode(varcharcode)
                                   // for (var t = 0; t < GroupArray.length; t++) {
                                        if (GroupArray[t].groupname == gName1) {
                                            spanish_list.push(GroupArray[t].AudioList[j].Audioterm);

                                        }
                                   // }
                                }
                            }

                        }
                    }
                }
            }
            // spanish_list = spanish_list.sort();
        } else {
            var spanish_list = [];

            for (var t = 0; t < modalData.length; t++) {
                if (modalData[t].name == currentChap) {

                    var x = $('#termChoose1')
                    x.remove()
                    var chapterNumberOnly = modalData[t].name
                    var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
                    var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'
                    var myDiv = document.getElementById('section')

                    var selectList1 = document.createElement('ul')


                    var termsdetsear = ''
                    for (var t = 0; t < GroupArray.length; t++) {


                        selectList1.setAttribute('id', 'termChoose1')

                        selectList1.setAttribute('style', 'width:200px')
                        selectList1.setAttribute('class', 'list-group')
                        myDiv.appendChild(selectList1)



                        for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
                        {
                            if (GroupArray[t].AudioList[j].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
                                // if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '')  
                                {
                                    if (groupName == "All") {
                                        spanish_list.push(GroupArray[t].AudioList[j].Audioterm);
                                    } else {
                                        var gName = groupName;

                                        if (gName.indexOf("-") == -1) {

                                            if (GroupArray[t].groupname == gName) {
                                                spanish_list.push(GroupArray[t].AudioList[j].Audioterm);
                                            }
                                        } else {

                                            for (var varcharcode = gName.split("-")[0].charCodeAt(0); varcharcode < gName.split("-")[1].charCodeAt(0) + 1; varcharcode++) {

                                                var gName1 = String.fromCharCode(varcharcode)
                                                    //for (var t = 0; t < GroupArray.length; t++) {
                                                if (GroupArray[t].groupname == gName1) {

                                                    spanish_list.push(GroupArray[t].AudioList[j].Audioterm);

                                                    //}
                                                }
                                            }

                                        }

                                    }
                                }
                            }
                        }
                    }
                    // spanish_list = spanish_list.sort();
                }
            }
        }
    }

termsdetsear="";
    for (varj = 0; varj < spanish_list.length; varj++) {
        termsdetsear = termsdetsear + '"' + spanish_list[varj] + '",'
            /********************************************************************************************** */

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onSelectDef_1(this,true)')
        a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
        li.value = varj
        var t1 = document.createTextNode(spanish_list[varj])
            // li.text = GroupArray[t].AudioList[j].Audioterm
        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)
            /*var TC = document.getElementById("Term");
					TC.style.display = "none";
          var TC = document.getElementById("Definition");
					TC.style.display = "none";
          var TC = document.getElementById("SpanTerms_1");
					TC.style.display = "block";
          var TC = document.getElementById("Span_Definition");
					//TC.style.display = "block";*/
            /**************************************************************************************** */
        var li = document.createElement('li')

        // termsdetsear=termsdetsear+","+ GroupArray[t].AudioList[j].SpaneshTerm


    }
    document.getElementById('previous').disabled = true
                    document.getElementById('next').disabled = true
     try {
        var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
        console.log(termdsdetsear1)
        data = { 'ale': termdsdetsear1 }
        search()
    } catch (e) {

    }                
}



function ToViewSpanTerm() {
    toggES="SP";

    {
        var groupName = "";
        for (vark = 0; vark < document.getElementById("myLi").childNodes.length; vark++) {

            if (document.getElementById('myLi').childNodes[vark].childNodes[0].outerHTML.indexOf("btn-warning") > 0) {
                groupName = document.getElementById('myLi').childNodes[vark].childNodes[0].value;
                break;
            }
        }

        document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-default", "btn-info");
        document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");

        var cahperList = document.getElementById('chapterList')
        var currentChap = cahperList.options[cahperList.selectedIndex].value
        var spanish_list = [];
        if (cahperList.selectedIndex == 0) {
            var spanish_list = [];
            var x = $('#termChoose1')
            x.remove()
            var termsdetsear = ''
            var myDiv = document.getElementById('section')

            var selectList1 = document.createElement('ul')
            for (var t = 0; t < GroupArray.length; t++) {


                selectList1.setAttribute('id', 'termChoose1')

                selectList1.setAttribute('style', 'width:200px')
                selectList1.setAttribute('class', 'list-group')
                myDiv.appendChild(selectList1)

                for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
                {
                    if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {} else {
                       
                        if (groupName == "All") {
                            spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);
                        } else {
                            
                            var gName = groupName;
 
                            if (gName.indexOf("-") == -1) {
                                    
                                if (GroupArray[t].groupname == gName) {
                                    spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);
                                }
                            } else {
                                
                                for (var varcharcode = gName.split("-")[0].charCodeAt(0); varcharcode < gName.split("-")[1].charCodeAt(0) + 1; varcharcode++) {
                                    
                                    var gName1 = String.fromCharCode(varcharcode)
                                 
                                    //for (var t = 0; t < GroupArray.length; t++) {
                                        if (GroupArray[t].groupname == gName1) {
                                            spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);

                                        }
                                    //}
                                }
                            }

                        }

                    }
                }
            }
            
        } else {
            var spanish_list = [];

            for (var t = 0; t < modalData.length; t++) {
                if (modalData[t].name == currentChap) {

                    var x = $('#termChoose1')
                    x.remove()
                    var chapterNumberOnly = modalData[t].name
                    var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
                    var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'
                    var myDiv = document.getElementById('section')

                    var selectList1 = document.createElement('ul')


                    var termsdetsear = ''
                    for (var t = 0; t < GroupArray.length; t++) {


                        selectList1.setAttribute('id', 'termChoose1')

                        selectList1.setAttribute('style', 'width:200px')
                        selectList1.setAttribute('class', 'list-group')
                        myDiv.appendChild(selectList1)



                        for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
                        {
                            if (GroupArray[t].AudioList[j].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
                                if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {} else {
                                    if (groupName == "All") {
                                        spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);
                                    } else {
                                        var gName = groupName;

                                        if (gName.indexOf("-") == -1) {

                                            if (GroupArray[t].groupname == gName) {
                                                spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);
                                            }
                                        } else {

                                            for (var varcharcode = gName.split("-")[0].charCodeAt(0); varcharcode < gName.split("-")[1].charCodeAt(0) + 1; varcharcode++) {

                                                var gName1 = String.fromCharCode(varcharcode)
                                                    //for (var t = 0; t < GroupArray.length; t++) {
                                                if (GroupArray[t].groupname == gName1) {

                                                    spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);

                                                    //}
                                                }
                                            }

                                        }

                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
        }
    }

spanish_list = spanish_list.sort(function(a, b) {
  var nameA = a.toLowerCase(); // ignore upper and lowercase
  var nameB = b.toLowerCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
termsdetsear="";
    for (varj = 0; varj < spanish_list.length; varj++) {
        termsdetsear = termsdetsear + '"' + spanish_list[varj] + '",'
            /********************************************************************************************** */

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onSelectDef_1(this,true)')
        a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
        li.value = varj
        var t1 = document.createTextNode(spanish_list[varj])
            // li.text = GroupArray[t].AudioList[j].Audioterm
        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)
            /*var TC = document.getElementById("Term");
					TC.style.display = "none";
          var TC = document.getElementById("Definition");
					TC.style.display = "none";
          var TC = document.getElementById("SpanTerms_1");
					TC.style.display = "block";
          var TC = document.getElementById("Span_Definition");
					//TC.style.display = "block";*/
            /**************************************************************************************** */
        var li = document.createElement('li')

        // termsdetsear=termsdetsear+","+ GroupArray[t].AudioList[j].SpaneshTerm


    }
     document.getElementById('previous').disabled = true
                    document.getElementById('next').disabled = true
     try {
        var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
        console.log(termdsdetsear1)
        data = { 'ale': termdsdetsear1 }
        search()
    } catch (e) {

    }
}





// for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
//{
//if (GroupArray[t].AudioList[j].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1)
// {
// sectiondatacount++

// console.log(GroupArray[t].AudioList[j].Audioterm)
//  var option = document.createElement('option')
// option.value = GroupArray[t].AudioList[j].Audioterm
// option.text = GroupArray[t].AudioList[j].Audioterm
//selectList.appendChild(option)
// termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
/*********************************************************************************** */
// li tag create and a tag created
/*********************************************************************************** */
//var li = document.createElement('li')
// var a = document.createElement('a')
// li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
// a.setAttribute('onclick', 'onSelectDef_1(this,true)')
//	a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
//  li.value = j
//  var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
// li.text = GroupArray[t].AudioList[j].Audioterm
// a.appendChild(t1)
// li.appendChild(a)
// selectList1.appendChild(li)
/**************************************************************************************** */
/************************************************************************************************** */
// termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].Audioterm+'",'
/**************************************************************************** ***********************/
// if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
// }else {
// console.log(GroupArray[t].AudioList[j].SpaneshTerm)
//var option1 = document.createElement('option')
//option1.value = GroupArray[t].AudioList[j].SpaneshTerm
//option1.text = GroupArray[t].AudioList[j].SpaneshTerm
//option1.setAttribute('style', 'color:blue')
//selectList.appendChild(option1)
/*************************************************************************************** */
// li and a tag create for spanish trm with ble font color
/*************************************************************************************** */
/*********************************************************************************************** */



///  }
// }
// var termdsdetsear1=JSON.parse("["+removeLastComma(termsdetsear)+"]")
// data=  {"ale": termdsdetsear1}
// console.log(termdsdetsear1)
// search()
//}
//}







/************************************************************* */
//
//
//   The following functiona trigged only when you  select
//     chapter wise dropdown follwoing trigged the following        
//      function
/************************************************************* */
function onSelection2() {
    psbi = null
        // console.log("daff")
    var bx = document.getElementById('box')
    if (bx == null) {} else {
        $('#box').remove()
    }
    var bx1 = document.getElementById('box1')

    if (bx1 == null) {} else {
        $('#box1').remove()
    }
    var list = []
    list = document.getElementsByClassName('btns1')
    for (var i = 0; i < list.length; i++) {
        list[i].className = list[i].className.replace('btn-warning', 'btn-info')
    }
    document.getElementById('All').className = document.getElementById('All').className.replace('btn-info', 'btn-warning')
        // document.getElementById("b1").disabled = true
        // document.getElementById("b2").disabled = true
    var cahperList = document.getElementById('chapterList')
    var currentChap = cahperList.options[cahperList.selectedIndex].value
        // console.log(currentChap)
    $('#myLi').remove();
    var myli = document.createElement("ol");
    myli.setAttribute("id", "myLi");
    document.getElementById("Select1").appendChild(myli);
    alpha_list(modalData1);
    /*
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
    // console.log(document.getElementById("myLi").childNodes[la].childNodes[0].getAttribute("value"))
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
    // console.log("dafdf1 " + gname)
    // console.log("false")
    }
  }
  varnon = ''
  var varmyli;
  for (var la = 1;la < document.getElementById('myLi').childNodes.length;la++) {
    if (document.getElementById('myLi').childNodes[la].style.display == 'none') {
      if (varnon == '') {
        varnon = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
      
      }
    }else {
      if (varnon != '') {

       
        if(varnon==document.getElementById('myLi').childNodes[la-1].childNodes[0].value)   
        {
          // console.log(varnon+"-"+document.getElementById("myLi").childNodes[la-1].childNodes[0].value)
          //document.getElementById('myLi').childNodes[la-1].childNodes[0].value =  varnon ;
          //console.log( document.getElementById('myLi').childNodes[la-1].childNodes[0].style.display);
          document.getElementById('myLi').childNodes[la-1].style.display="none";
          document.getElementById('myLi').childNodes[la-1].childNodes[0].disabled=true;
          document.getElementById('myLi').childNodes[la-1].childNodes[0].className="btn-default";
          varmyli=document.getElementById('myLi').childNodes[la].childNodes[0];
          
          varnon = ''
        }
        else
        {
          if(varnon=="A")
          {
            document.getElementById('myLi').childNodes[la-1].style.display="none";
          document.getElementById('myLi').childNodes[la-1].childNodes[0].disabled=true;
          document.getElementById('myLi').childNodes[la-1].childNodes[0].className="btn-default";
           document.getElementById('myLi').childNodes[la-1].childNodes[0].value =  varnon +'-'+document.getElementById('myLi').childNodes[la-1].childNodes[0].value ;
        varmyli=document.getElementById('myLi').childNodes[la].childNodes[0];
        // document.getElementById("myLi").childNodes[la],childNodes[0].setAttribute("value",varnon + "-"+document.getElementById("myLi").childNodes[la].previousSibling,childNodes[0].getAttribute("value"))
        document.getElementById('myLi').childNodes[la-1].childNodes[0].style.paddingLeft = '2px'
        varnon = ''
          }
          else
          {
        document.getElementById('myLi').childNodes[la].childNodes[0].value =  document.getElementById('myLi').childNodes[la].childNodes[0].value+ '-'+varnon ;
        varmyli=document.getElementById('myLi').childNodes[la].childNodes[0];
        // document.getElementById("myLi").childNodes[la],childNodes[0].setAttribute("value",varnon + "-"+document.getElementById("myLi").childNodes[la].previousSibling,childNodes[0].getAttribute("value"))
        document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '2px'
        varnon = ''
        }
        }
      }
    }
  }
  if(document.getElementById('myLi').childNodes[la-1].childNodes[0].value!="All")
  {
  if(varmyli!=undefined)
   {
  if(varnon!=document.getElementById('myLi').childNodes[la-1].childNodes[0].value)
  {
   
     var tet=varmyli.value.split("-");
    varmyli.value=tet[0] + "-"+"Z";
    varmyli.style.paddingLeft = '2px'
        varnon = ''
   }

    //console.log(varnon+document.getElementById('myLi').childNodes[la-1].childNodes[0].value);
}}*/


    var sectiondatacount = 0
    for (var t = 0; t < modalData.length; t++) {
        if (modalData[t].name == currentChap) {
            //var x = document.getElementById('termChoose')
            //x.remove()
            var x = $('#termChoose1')
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
                        // console.log(GroupArray[t].AudioList[j].Audioterm)
                        //  var option = document.createElement('option')
                        // option.value = GroupArray[t].AudioList[j].Audioterm
                        // option.text = GroupArray[t].AudioList[j].Audioterm
                        //selectList.appendChild(option)
                        termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
                            /*********************************************************************************** */
                            // li tag create and a tag created
                            /*********************************************************************************** */
                            /* var li = document.createElement('li')
            var a = document.createElement('a')
            li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')

            a.setAttribute('onclick', 'onSelectDef_1(this,true)')
            
        	a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
            li.value = j
            var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
            // li.text = GroupArray[t].AudioList[j].Audioterm
            a.appendChild(t1)
            li.appendChild(a)
            selectList1.appendChild(li)*/
                            /**************************************************************************************** */
                            /************************************************************************************************** */
                            // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].Audioterm+'",'
                            /**************************************************************************** ***********************/
                        if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
                            Englishwordonly(selectList1, j, t);
                        } else {
                            // console.log(GroupArray[t].AudioList[j].SpaneshTerm)
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
                            EnglishSpanshword(selectList1, j, t);
                            /*
                                          var li = document.createElement('li')
                                          var a = document.createElement('a')
                                          li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
                                          a.setAttribute('onclick', 'onSelectDef_1(this,true)')
                                          a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
                                          li.value = j
                                          var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
                                          // li.text = GroupArray[t].AudioList[j].Audioterm
                                          a.appendChild(t1)
                                          li.appendChild(a)
                                          selectList1.appendChild(li)
                                          /**************************************************************************************** */
                            var li = document.createElement('li')

                            // termsdetsear=termsdetsear+","+ GroupArray[t].AudioList[j].SpaneshTerm
                        }
                    }
                }
                // var termdsdetsear1=JSON.parse("["+removeLastComma(termsdetsear)+"]")
                // data=  {"ale": termdsdetsear1}
                // console.log(termdsdetsear1)
                // search()
                 try {
        var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
        console.log(termdsdetsear1)
        data = { 'ale': termdsdetsear1 }
        search()
    } catch (e) {

    }
            }
            // console.log(data)

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
                var x = $('#termChoose1')
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
                a.setAttribute('onclick', 'onSelectDef_1(this,true)')
                a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
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
                a.setAttribute('onclick', 'onSelectDef_1(this,true)')
                a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
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
            /*for (var la = 1; la < document.getElementById('myLi').childNodes.length; la++) {
                // for (var i = 0; i < GROUP.length; i++) //loading chapter headdings to dropdown box
                {
                    document.getElementById('myLi').childNodes[la].childNodes[0].value = GROUP[la - 1]
                    document.getElementById('myLi').childNodes[la].childNodes[0].style.paddingLeft = '12px'
                }
                document.getElementById('myLi').childNodes[la].style.display = 'block'
            }

            for (var la = 1; la < document.getElementById('myLi').childNodes.length; la++) {
                // console.log(document.getElementById("myLi").childNodes[la].childNodes[0].getAttribute("value"))
                var gname = document.getElementById('myLi').childNodes[la].childNodes[0].getAttribute('value')
                var varfound = false

                for (var t = 0; t < GroupArray.length; t++) {
                    if (GroupArray[t].groupname == gname) {
                        varfound = true
                            // varprevious=document.getElementById("myLi").childNodes[la].childNodes[0]
                        break
                    } else {}
                }

                if (varfound == false) {
                    document.getElementById('myLi').childNodes[la].style = 'display:none'
                }
            }*/

            //var x = document.getElementById('termChoose')
            //x.remove()

            var x = $('#termChoose1')
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
                   if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
                            Englishwordonly(selectList1, j, t);
                        } else {
                            // console.log(GroupArray[t].AudioList[j].SpaneshTerm)
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
                            EnglishSpanshword(selectList1, j, t);
                            /*
                                          var li = document.createElement('li')
                                          var a = document.createElement('a')
                                          li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
                                          a.setAttribute('onclick', 'onSelectDef_1(this,true)')
                                          a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
                                          li.value = j
                                          var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
                                          // li.text = GroupArray[t].AudioList[j].Audioterm
                                          a.appendChild(t1)
                                          li.appendChild(a)
                                          selectList1.appendChild(li)
                                          /**************************************************************************************** */
                            var li = document.createElement('li')

                            // termsdetsear=termsdetsear+","+ GroupArray[t].AudioList[j].SpaneshTerm
                        }
                    
                }
            }
        }
    }
    count = 0;
    document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
    try {
        var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
        console.log(termdsdetsear1)
        data = { 'ale': termdsdetsear1 }
        search()
    } catch (e) {

    }
    
}

function display_left(vart, varchap1) {
    //alert("welcome34");
    //var x = document.getElementById('termChoose')
    //x.remove()
    //console.log("dafff");
    var x1 = $('#termChoose1')
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


    {

        //var option = document.createElement('option')
        // option.value = GroupArray[t].AudioList[j].Audioterm
        //option.text = GroupArray[t].AudioList[j].Audioterm
        /*
                    var li = document.createElement('li')
                    var a = document.createElement('a')
                    li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
                    a.setAttribute('onclick', 'onSelectDef_1(this,true)')
                    a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
                    li.value = j
                    var t1 = document.createTextNode(GroupArray[t].AudioList[j].Audioterm)
                    // li.text = GroupArray[t].AudioList[j].Audioterm
                    a.appendChild(t1)
                    li.appendChild(a)

        			      //selectList.appendChild(option)
                    selectList1.appendChild(li)
                    */

        if (varchap1 == undefined) {
            //  alert(vart);
            if (vart == undefined) {
                for (vart = 0; vart < GroupArray.length; vart++) {
                    for (var j = 0; j < GroupArray[vart].AudioList.length; j++) // loading chapter headdings to dropdown box
                    {
                        if (GroupArray[vart].AudioList[j].SpaneshTerm == undefined || GroupArray[vart].AudioList[j].SpaneshTerm == '') {
                            Englishwordonly(selectList1, j, vart)
                        } else {

                            EnglishSpanshword(selectList1, j, vart)

                        }
                    }
                }
            } else {

                for (var j = 0; j < GroupArray[vart].AudioList.length; j++) // loading chapter headdings to dropdown box
                {
                    if (GroupArray[vart].AudioList[j].SpaneshTerm == undefined || GroupArray[vart].AudioList[j].SpaneshTerm == '') {
                        Englishwordonly(selectList1, j, vart)
                    } else {

                        EnglishSpanshword(selectList1, j, vart)

                    }
                }

            }
        } else {
            if (vart == undefined) {
                for (vart = 0; vart < GroupArray.length; vart++) {
                    for (var j = 0; j < GroupArray[vart].AudioList.length; j++) // loading chapter headdings to dropdown box
                    {
                        if (GroupArray[vart].AudioList[j].chapterattr.indexOf('\,' + varchap1.trim() + '\,') > -1) {
                            if (GroupArray[vart].AudioList[j].SpaneshTerm == undefined || GroupArray[vart].AudioList[j].SpaneshTerm == '') {
                                Englishwordonly(selectList1, j, vart)
                            } else {

                                EnglishSpanshword(selectList1, j, vart)

                            }
                        }
                    }
                }
            } else {
                for (var j = 0; j < GroupArray[vart].AudioList.length; j++) // loading chapter headdings to dropdown box
                {
                    if (GroupArray[vart].AudioList[j].chapterattr.indexOf('\,' + varchap1.trim() + '\,') > -1) {
                        if (GroupArray[vart].AudioList[j].SpaneshTerm == undefined || GroupArray[vart].AudioList[j].SpaneshTerm == '') {
                            Englishwordonly(selectList1, j, vart)
                        } else {
                            // console.log(GroupArray[t].AudioList[j].SpaneshTerm)
                            //var option1 = document.createElement('option')
                            //option1.value = GroupArray[t].AudioList[j].SpaneshTerm
                            //option1.text = GroupArray[t].AudioList[j].SpaneshTerm
                            //option1.setAttribute('style', 'color:blue')
                            //selectList.appendChild(option1)
                            EnglishSpanshword(selectList1, j, vart)
                                /*
                                              var li1 = document.createElement('li')
                                              var a = document.createElement('a')
                                              a.setAttribute('onclick', 'onSelectDef_1(this,true)')
                                              a.setAttribute('style', 'color:blue;font-weight:bold;cursor:pointer')
                                              li1.setAttribute('class', 'list-group-item list-group-item btn-warning')
                                              li1.value = j
                                              var t1 = document.createTextNode(GroupArray[t].AudioList[j].SpaneshTerm)
                                              // li1.text = GroupArray[t].AudioList[j].SpaneshTerm
                                              a.appendChild(t1)
                                              li1.appendChild(a)
                                              a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em");
                                              // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].SpaneshTerm+'",'
                                              selectList1.appendChild(li1)*/
                        }


                    }
                }
            }
        }
    }
}
/*********************************************************** */
//
//                Alphabetic selectio function
//			Followig function trgged when you select the alphabet
//
/*********************************************************** */
function onSelection3(obj) {

    // btn-
    // console.log("daffd")

    var list = []
    list = document.getElementsByClassName('btns1')

    for (var i = 0; i < list.length; i++) {
        list[i].className = list[i].className.replace('btn-warning', 'btn-info')
    }

    obj.className = obj.className.replace('btn-info', 'btn-warning')
    var bx = document.getElementById('box')
    if (bx == null) {} else {
        $('#box').remove()
    }
    var bx1 = document.getElementById('box1')

    if (bx1 == null) {} else {
        $('#box1').remove()
    }


    var attr = obj

    var gName = attr.value;

    var gcount = 0


    // console.log("here\t"+attr.value)
    var cahperList = document.getElementById('chapterList')
    var currentChap = cahperList.options[cahperList.selectedIndex].value
        // console.log("selected ChapterValue "+currentChap)

    if (gName == 'All' && currentChap == 'All Chapters') {
        // console.log("all")
        // /console.log("we")

        gcount++
        //onSelection2()
        // for (var t = 0; t < GroupArray.length; t++) {
        // if (gName == GroupArray[t].groupname) {
        gcount++

        //var x = document.getElementById('termChoose')
        //x.remove()
        display_left();

        //}
    } else {

        for (var t = 0; t < modalData.length; t++) {
            if (modalData[t].name == currentChap) {
                var chapterNumberOnly = modalData[t].name
                var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
                var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'
                break;
            }
        }

        if (currentChap == "All Chapters") {

            if (gName.indexOf("-") == -1) {

                for (var t = 0; t < GroupArray.length; t++) {
                    //for(varj=0;varj<GroupArray[t].AudioList.length;varj++){
                    //if (GroupArray[t].AudioList[varj].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
                    if (GroupArray[t].groupname == gName) {
                        // alert(gName);
                        display_left(t);

                    } else {}
                }
            } else {
                for (var varcharcode = gName.split("-")[0].charCodeAt(0); varcharcode < gName.split("-")[1].charCodeAt(0) + 1; varcharcode++) {
                    var gName1 = String.fromCharCode(varcharcode)
                    for (var t = 0; t < GroupArray.length; t++) {
                        // for(varj=0;varj<GroupArray[t].AudioList.length;varj++){
                        //    if (GroupArray[t].AudioList[varj].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
                        if (GroupArray[t].groupname == gName1) {
                            display_left(t);

                        }
                        // }

                        //}


                    }
                }
            }
        } else {

            if (gName.indexOf("-") == -1) {

                for (var t = 0; t < GroupArray.length; t++) {
                    for (varj = 0; varj < GroupArray[t].AudioList.length; varj++) {
                        if (GroupArray[t].AudioList[varj].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
                            if (gName == "All") {

                                display_left(undefined, chapterNumberOnly1);
                                break;
                            } else {

                                if (GroupArray[t].groupname == gName) {

                                    display_left(t, chapterNumberOnly1);

                                } else {}
                            }
                        }
                    }
                }
            } else {
                for (var varcharcode = gName.split("-")[0].charCodeAt(0); varcharcode < gName.split("-")[1].charCodeAt(0) + 1; varcharcode++) {
                    var gName1 = String.fromCharCode(varcharcode)
                    for (var t = 0; t < GroupArray.length; t++) {
                        for (varj = 0; varj < GroupArray[t].AudioList.length; varj++) {
                            if (GroupArray[t].AudioList[varj].chapterattr.indexOf('\,' + chapterNumberOnly1.trim() + '\,') > -1) {
                                if (GroupArray[t].groupname == gName1) {
                                    display_left(t, chapterNumberOnly1);

                                }
                            }

                        }
                    }
                }
            }
        }
    }
    /*
      if (gcount == 0) {
        // console.log("g")
        if (psbi == null) {
          // console.log(obj.parentNode.previousSibling.outerHTML)
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

        var x = $('#termChoose1')
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
        a.setAttribute('onclick', 'onSelectDef_1(this,true)')
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

        //document.getElementById('b1').disabled = true
       // document.getElementById('b2').disabled = true
      }
      count=0;
      document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
      */
}

function GroupRefVO() {
    // contains the chapter level details
    var queistionlist
    var name
}

function queistionVO() {
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
function onSelectDef_1(tar, vartlist) {
    tar.className = tar.className + ' active'
        //var x1 = document.getElementById('termChoose')
        //for (var x = 0;x < x1.length;x++) {
        //if (x1[x].value == tar.innerHTML) {
        //x1.selectedIndex = x
    onSelectDef(tar, vartlist)
        //break
        //}

    //}


}

function onSelectDef(tar, vartlist) {

    //	document.getElementById("loadder").style.display = "block";

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
            $("#sidemenu").css("display", "none");
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
 
    if (tar.childNodes.length > 1) {
        var selectedterm = tar.childNodes[0].innerHTML;
    } else {
        var selectedterm = tar.innerHTML;
    }
 if(selectedterm.indexOf("...")>-1)   
 {
    if (tar.childNodes.length > 1) {
        var selectedterm = tar.childNodes[0].getAttribute("data-terms");
    } else {
        var selectedterm = tar.getAttribute("data-terms");
    }
 }
 
    //console.log(termList.childNodes.length);
    if (vartlist == true) {
        var x1 = document.getElementById('termChoose1').childNodes;
        for (var x = 0; x < x1.length; x++) {
            //alert(x1[x].childNodes[0].text.split(",")[0]   + " " + selectedterm)
            if (x1[x].childNodes[0].text.split(",")[0] == selectedterm) {
                //x1.selectedIndex = x
                count = x;
                //alert(count);

                if (x == 0) {
                    document.getElementById('previous').disabled = true
                    document.getElementById('next').disabled = false
                } else {
                    document.getElementById('previous').disabled = false
                    document.getElementById('next').disabled = false
                }

                if (x == x1.length - 1) {
                    document.getElementById('previous').disabled = false
                    document.getElementById('next').disabled = true
                }
                // alert(count);
                document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
                    // onSelectDef(x1[x].childNodes[0]);
                break
            }
        }
    }
    
    
    
 if (tar.getAttribute("style").indexOf("color: blue;") > 0) {
        //alert(document.getElementById("thead").innerHTML)
        document.getElementById("thead").innerHTML = document.getElementById("thead").innerHTML.replace("Term","Término")
        document.getElementById("dhead").innerHTML = document.getElementById("dhead").innerHTML.replace("Definition", "Definición")
        $("#Definition").css("display", "none")
        $("#termContentPro").css("display", "none")
        $("#SpanTerms_1").css("display", "none")
        $("#Span_Definition").css("display", "none")
            //termContentPro

    }
    
    else
    {
    
    
     {
        //alert(document.getElementById("thead").innerHTML)
        document.getElementById("thead").innerHTML = document.getElementById("thead").innerHTML.replace("Término", "Term")
        document.getElementById("dhead").innerHTML = document.getElementById("dhead").innerHTML.replace("Definición", "Definition")
        $("#Definition").css("display", "block")
        $("#termContentPro").css("display", "block")
        $("#SpanTerms_1").css("display", "block")
        $("#Span_Definition").css("display", "none")
            //termContentPro

    }
    }
    //	console.log(selectedterm);
    //console.log(selectedterm);
    var cnt = 0;
    for (var t = 0; t < GroupArray.length; t++) {
        for (var j = 0; j < GroupArray[t].AudioList.length; j++) {
            if (GroupArray[t].AudioList[j].Audioterm == selectedterm) {
                //document.getElementById('b3').value = 'Spanish Terms'
                // document.getElementById('b3').style = '	background-color: #D17DD0;'


                //alert(count);
                cnt++;
                vart = t;
                varj = j;

                var TC = document.getElementById("termContent");
                TC.innerHTML = GroupArray[t].AudioList[j].Audioterm;
                //termContentPro
                var TCp = document.getElementById("termContentPro");
                TCp.innerHTML = GroupArray[t].AudioList[j].pronc;

                var DC = document.getElementById("definitionContent");
                DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;
              
                if(toggES=="En")
                {
                    audio_tag("media/"+GroupArray[t].AudioList[j].AudioUrl,"Audio1","play1")
                }
                if (GroupArray[t].AudioList[j].SpaneshTerm == "") {
                    //ToViewSpanTerm();

                    document.getElementById("ESToggle").style.visibility = "visible";
                    //	document.getElementById("ESToggle3").style.visibility = "visible";


                    document.getElementById("b3").disabled = false;
                    document.getElementById("b4").disabled = false;

                    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
                    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");

                    var TC = document.getElementById("SpanTerms_1");
                    TC.style.display = "none";
                    var TC = document.getElementById("Span_Definition");
                    //	TC.style.display = "none";

                } else {
                    //console.log("san");

                    //ToViewSpanTerm();

                    document.getElementById('ESToggle').style.visibility = 'visible'
                        //document.getElementById("ESToggle3").style.visibility = "hidden";
                    document.getElementById("b3").disabled = false;
                    document.getElementById("b4").disabled = false;
                    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-default", "btn-info");
                    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
                    var TC = document.getElementById("SpanTerms_1");
                    TC.style.display = "block";
                    var TC = document.getElementById("Span_Definition");
                    TC.style.display = "none";
                    var TC = document.getElementById("spanitem_1");
                    TC.style.color = "blue";
                    TC.innerHTML = '' + GroupArray[t].AudioList[j].SpaneshTerm;
                    if(GroupArray[t].AudioList[j].SpanURL!=undefined || GroupArray[t].AudioList[j].SpanURL!="")
                    {
                       
                     audio_tag("media/span/media/"+GroupArray[t].AudioList[j].SpanURL,"spanAudio1","spanplay1")
                      
                     }
                     else
                     {
                         $("#spanAudio1").css("display","none");
                     }
                }
                //	var tcontext = document.getElementById("TermContext");
                //	tcontext.innerHTML = GroupArray[t].AudioList[j].Audioterm;

                //audioPlay(GroupArray[t].AudioList[j].AudioUrl);<span class="badge">Relate Spanish Term</span>
                var TermFileAudio = GroupArray[t].AudioList[j].AudioUrl;
                var defAudio = GroupArray[t].AudioList[j].defAudioUrl;
                var SenAudio = GroupArray[t].AudioList[j].senAudioUrl;
                vart = t;
                varj = j;


               
            } else if (GroupArray[t].AudioList[j].SpaneshTerm == selectedterm) //Spanes Definition Display Frame
            {
                 
                // SpanURL
                //document.getElementById('b3').value = 'English Terms'
                //document.getElementById('b3').style = '	background-color: #7D81D1;'

                document.getElementById('b3').style.display = 'block'
                var TC = document.getElementById("termContent");
                TC.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
                var DC = document.getElementById("definitionContent");
                DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;
                //var tcontext = document.getElementById("TermContext");
                //tcontext.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
                //span term Audio 
                //console.log(GroupArray[t].AudioList[j].SpanURL);
                var TC = document.getElementById("spanitem_1");
                TC.style.color = "black";
                TC.style.display = "block";
                TC.innerHTML = '<span class="Senplayplay" ></span> ' + GroupArray[t].AudioList[j].Audioterm;
               
                    if(toggES=="SP")
                        {
                     audio_tag("media/span/media/"+GroupArray[t].AudioList[j].SpanURL,"Audio1","play1")
                        }
                        





            }
        }
    }
    if (cnt == 0) {
        //console.log("Not found");
    }
    //document.getElementById("loadder").style.display="none";

}

function mOver(obj) {

    // obj.class=play1
    var ply = document.getElementById('play')
    ply.className = 'play1'
        // ply.className="play1"

}

function mOver1(obj) {

    // obj.class=play1
    
    obj.className = 'play1'
        // ply.className="play1"

}

function mOut(obj) {
    
    obj.className = 'play'
        // console.log("mout"+ply.className)

}

function mOut1(obj) {
  
   obj.className = 'play'
        // console.log("mout"+ply.className)

}

function DefplaymOver(obj) {
    var ply = document.getElementById('Defplay')
    ply.className = 'Defplayplay1'
}

function DefplaymOut(obj) {
    var ply = document.getElementById('Defplay')
    ply.className = 'Defplayplay'
}

function SenplaymOver(obj) {
    var ply = document.getElementById('Senplay')
    ply.className = 'Senplayplay1'
}

function SenplaymOut(obj) {
    var ply = document.getElementById('Senplay')
    ply.className = 'Senplayplay'
}

function DisplayHelp(txt) {}

function gettingFlip() {
    $(function() {
        $('.btns').click(function() {
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

function tabClickTerm() {
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

function tabClickDef() {
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

function RotateFlip() {}

function rotateFlip() // flip toggle
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

function rotateFlip1() // cheking flags
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

function flipInto() // conditional flip
{
    $('#term').siblings().hide()
    $('#term').show()
    $('#term').flip({})
    $('#term').siblings().hide()
}



function decreaseFontSizeInternal() {
    var list = []
    list.push(document.getElementById('thead'))
    list.push(document.getElementById('termContent'))
    list.push(document.getElementById('dhead'))
    list.push(document.getElementById('definitionContent'))
    list.push(document.getElementById('termContentPro'))
    list.push(document.getElementById('spanitem_1'))
    for (i = 0; i < list.length; i++) {
        var s = 24
        if (list[i].style.fontSize) {
            s = parseInt(list[i].style.fontSize.replace('px', ''))
        }
        
        if (s >= min) {
            s -= 1
        }
        list[i].style.fontSize = s + 'px'
    }
}

function increaseFontSizeInternal() {
    var list = []
    list.push(document.getElementById('thead'))
    list.push(document.getElementById('termContent'))
    list.push(document.getElementById('dhead'))
    list.push(document.getElementById('definitionContent'))
    list.push(document.getElementById('termContentPro'))
    list.push(document.getElementById('spanitem_1'))
        //termContentPro
        //SpanTerms_1
        // console.log(list)
    for (i = 0; i < list.length; i++) {
        console.log(list[i])
        var s = 24
            // console.log(list[i].style.fontSize)
        if (list[i].style.fontSize) {
            s = parseInt(list[i].style.fontSize.replace('px', ''))
        }
        if (s <= max) {
            s += 1
        }
        list[i].style.fontSize = s + 'px'
    }
}

$(window).resize(function() {

    if ($(window).width() < 750) {

        // onSideNav method used to dispaly an hide the alphabet menu
        onSidenav();
       

    }
    else
    {

         $("#sidemenu").toggleClass("sideNav1", "sideNav");
        $("#sidemenu").css("display", "block");
        $("#main_cont").css("display", "block");
    }
})


$("#chapterList").keydown(function(e){
  if(e.keyCode == 37) { // left
 $(".js-typeahead-input").focus(); 
   document.getElementById("chapterList").selectedIndex=document.getElementById("chapterList").selectedIndex+1;
   onPrevious();
  }
  else if(e.keyCode == 39) { // right
   $(".js-typeahead-input").focus();  
  document.getElementById("chapterList").selectedIndex=document.getElementById("chapterList").selectedIndex-1;
  onNext();
  
  }
    
})
$("body").keydown(function(e) {
    
  if(e.keyCode == 37) { // left
   onPrevious();
  }
  else if(e.keyCode == 39) { // right
  onNext();
  }
  if(e.keyCode == 118) { // left
    decreaseFontSizeInternal();
  }
  else if(e.keyCode == 119) { // right
  increaseFontSizeInternal();
  }
 if(e.keyCode == 120) { // right
  $(".js-typeahead-input").focus();
  }
});

function audio_tag(audiofile,audioid,varplayid)
{
        
                
               
                
             
                if(audiofile.indexOf("undefined")==-1)
                {
                var audioElement = document.createElement('audio');
                audioElement.setAttribute("id","audiotag1")
                audioElement.setAttribute('src', (audiofile + ".mp3").replace(".mp3.mp3", ".mp3"));
                var TOappnd = document.getElementById(audioid);
                TOappnd.innerHTML = "";
                var Abtn = document.createElement("button");
                Abtn.setAttribute("id", varplayid);
                Abtn.setAttribute("class", "play");
                Abtn.setAttribute("onmouseover", "mOver1(this)");
                Abtn.setAttribute("onmouseout", "mOut1(this)");
                Abtn.setAttribute("data-toggle","tooltip");
                Abtn.setAttribute("title","Play/Repeat audio");
                Abtn.innerHTML = "Play Term Audio";
                TOappnd.appendChild(Abtn);
                //audioElement.play();


                audioElement.onloadeddata = function() {
                    document.getElementById("loadder").style.display = "none";
                }
               
                $('#'+varplayid).click(function() {
                    try {
                        audioElement.play();
                     audioElement.onplaying = function() {
                         if(varplayid=="spanplay1")
                         {$("#spanitem_1").css("background-color","yellow");
                        $("#spanitem_1").css("font-weight","bold");}
                         else
   {$("#termContent").css("background-color","yellow");
   $("#termContent").css("font-weight","bold");}

};
audioElement.onended = function() {
    $("#termContent").css("background-color","white");
    $("#spanitem_1").css("background-color","white");
    $("#spanitem_1").css("font-weight","normal");
     $("#termContent").css("font-weight","normal");
};
audioElement.onerror = function() {
    alert("Error! Something went wrong");
};
                    } catch (e) {
                        document.getElementById("loadder").style.display = "none";
                    }
                });

                $('.pause').click(function() {
                    audioElement.pause();
                });

              
              
                 document.getElementById(audioid).setAttribute("style","display:block");
}
else
{
 
 document.getElementById(audioid).setAttribute("style","display:none");
}

}