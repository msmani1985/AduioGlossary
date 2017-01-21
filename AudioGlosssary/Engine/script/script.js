/**********************************************************************************************************************************************************************************************************/
//                                    Audio Glossary for LWW 
//                                    -----------------------  
//      Developer : Subramani .M
//      Version : 1.0
//      Techonology : HTML5, CSS, bootstrap 3.0, Ajax, Javascript
//      Modules : Side menu,  Chapter list, All and Alphabetic list.
//      
//

/***************************************************************************************************************************************************************************************************** */
var toggES = "En";
var onload1=false;
var max = 60
var min = 20
var data
var vart = 0;
var varj = 0;
var nclexDoc
var tocDoc
var initDoc
var xml1;
var xmlconfig;
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
function config()
{
    
$('#LCP').html($(xmlconfig).find("copyright").text());
$('#MCP').html($(xmlconfig).find("copyright").text());

$('.title').html($(xmlconfig).find("title").text());
$('.subtitle').html($(xmlconfig).find("edition").text());
$('.Author').html($(xmlconfig).find("author").text());
}
function bodyloaded1() {
    document.getElementById("loadder1").style.display="block";
    document.addEventListener('dataLoaded', createUI)
    document.addEventListener('dataLoaded', createUI1)
    modelObj = new DtataProvider('Assets/xml/chapter.xml', createUI)
    modelObj1 = new DtataProvider1('Assets/xml/terms.xml', createUI1)
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
// Alphabetic list for left hand side
function alpha_list(e) {

    var MYLIST = document.getElementById('myLi') // chapter level data

    var lix = document.createElement('li')
    
    lix.innerHTML = '<input type="button" class="btns1 btn-warning" style=" width: 35px;    height: 25px;   font-size: 15px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 6px;    padding-right: 1em;" onclick="onSelectAlphaMenu(this)" id="All" value="All">'
    
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
    

    if (currentChap == 'All Chapters') {
/*
        var varprev = "";
        for (vari = 65; vari < 91; vari++) {
            
            if ($(xml1).find("group[name='" + String.fromCharCode(vari) + "']").length == 0) { 
                
            } else {
                if (varprev != String.fromCharCode(vari)) {
                    varfound.push(String.fromCharCode(vari));
                     varprev = vari + 1
                } else { 
                      varfound.push(String.fromCharCode(varprev) + "-" + String.fromCharCode(vari))
    
    
                varprev = vari+ 1
                //varprev = String.fromCharCode(vari);
                   // varprev = ""
                }
              
            }
        }

        if (varprev != 91) {

            varfound[varfound.length - 1] = varfound[varfound.length - 1].split("-")[0] + "-" + "Z";
    
        }*/
         var vargname = [];
        var varfound = [];
        $(xml1).find("audio").each(function () {
            if ($.inArray($(this).parent().attr("name").charCodeAt(0), vargname) < 0) {
                vargname.push($(this).parent().attr("name").charCodeAt(0))
            } else {
        
            }
        })
        vargname = vargname.sort();
        varprev = 65;
        
        for (vari = 0; vari < vargname.length; vari++) {
            
            if (varprev == vargname[vari]) {
                varfound.push(String.fromCharCode(vargname[vari]));
    
                varprev = vargname[vari] + 1
            } else {
                varfound.push(String.fromCharCode(varprev) + "-" + String.fromCharCode(vargname[vari]))
    
    
                varprev = vargname[vari] + 1
            }

        }
        if (varprev != 91) {

            varfound[varfound.length - 1] = varfound[varfound.length - 1].split("-")[0] + "-" + "Z";
    
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


        $(xml1).find("audio[chapter*='" + chapterNumberOnly2 + "']").each(function () {
            if ($.inArray($(this).parent().attr("name").charCodeAt(0), vargname) < 0) {
                vargname.push($(this).parent().attr("name").charCodeAt(0))
            } else {
        
            }
        })
        vargname = vargname.sort();
        varprev = 65;
        
        for (vari = 0; vari < vargname.length; vari++) {
            
            if (varprev == vargname[vari]) {
                varfound.push(String.fromCharCode(vargname[vari]));
    
                varprev = vargname[vari] + 1
            } else {
                varfound.push(String.fromCharCode(varprev) + "-" + String.fromCharCode(vargname[vari]))
    
    
                varprev = vargname[vari] + 1
            }

        }
        if (varprev != 91) {

            varfound[varfound.length - 1] = varfound[varfound.length - 1].split("-")[0] + "-" + "Z";
    
        }

    }


    
    varprev = 0;
    var varmyli;
    var varcharnumber = 64;

    for (var i = 0; i < varfound.length; i++) {
        

        if (varfound[i].indexOf("-") > 0) {
            var lix = document.createElement('li')
        
            lix.innerHTML = '<input type="button" class="btns1 btn-info" style="    width: 35px;    height: 25px;   font-size: 15px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 3px;    padding-right: 1em" onclick="onSelectAlphaMenu(this)" id="' + varfound[i] + 'index" value="' + varfound[i] + '">'
            MYLIST.appendChild(lix)
        } else {
            var lix = document.createElement('li')
        
            lix.innerHTML = '<input type="button" class="btns1 btn-info" style="    width: 35px;    height: 25px;   font-size: 15px;    font-weight: bold;    display: inline-block;   position: relative;    z-index: 1;    padding-left: 6px;    padding-right: 1em;" onclick="onSelectAlphaMenu(this)" id="' + varfound[i] + 'index" value="' + varfound[i] + '">'
            MYLIST.appendChild(lix)
        }



    }
}
// Modal moduel for xml extract
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
        
        selectList1.setAttribute('id', 'termChoose1')
    
        selectList1.setAttribute('style', 'width:200px')
        selectList1.setAttribute('class', 'list-group')
        myDiv.appendChild(selectList1)
    
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
    
            if (GroupArray[t].groupname == 'A') {
                if(FirstTerm==undefined)
                {
                vart = t;
                varj = 0;
                FirstTerm = GroupArray[t].AudioList[0].Audioterm
                FirstDefinition = GroupArray[t].AudioList[0].Audiomeaning
                termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[0].Audioterm + '",'

                var TC = document.getElementById('termContent')
                TC.innerHTML = FirstTerm
                var DC = document.getElementById('definitionContent')
                DC.innerHTML = FirstDefinition
                
                if(GroupArray[t].AudioList[0].AudioUrl=="")
                {
                     onload1=true;
                    audio_tag("Assets/media/" + "undefined", "Audio1", "play1")
                }
                else
                {
                     onload1=true;
                audio_tag("Assets/media/" + GroupArray[t].AudioList[0].AudioUrl, "Audio1", "play1")
                }
                $('#b1').css('background', '#9AC97B')
                $('#b1').css('color', 'white')
            }
            }
        }
    }
    

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

    document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
    
    onClickTerm(document.getElementById('termChoose1').childNodes[0].childNodes[0])
}
// English only terms listed
function Englishwordonly(selectList1, varj, vart) {
    
    document.getElementById("b3").disabled = false;
    document.getElementById("b4").disabled = false;
    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
    var li = document.createElement('li')

    var a = document.createElement('a')
    li.setAttribute('class', 'items list-group-item list-group-itemn-action btn-warning')

    a.setAttribute('onclick', 'onClickTerm_1(this,true,true)')
    
    a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");

    li.value = varj
    
    var varterms = (GroupArray[vart].AudioList[varj].Audioterm);

    if (varterms.length >= 130) {
        var t1 = document.createTextNode(varterms.substring(1, 45) + "...")
        a.setAttribute("data-terms", varterms);
        li.setAttribute("data-toggle", "tooltip");
        li.setAttribute("title", varterms)
    }
    else {
        var t1 = document.createTextNode(varterms)
        a.setAttribute("data-terms", varterms);
        //li.setAttribute("data-toggle", "tooltip");
       // li.setAttribute("title", "English Term only");
    }
    
    a.appendChild(t1)

    li.appendChild(a)
    selectList1.appendChild(li)
    


}


// English and spanish terms listed
function EnglishSpanshword(selectList1, varj, vart) {

    
    /****************************************************************************************** */
    // Mobile browser side me layout
    /******************************************************************************************* */

    document.getElementById("b3").disabled = false;
    document.getElementById("b4").disabled = false;
    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
    var li1 = document.createElement('li')
    //li1.setAttribute("data-toggle", "tooltip");
    //li1.setAttribute("title", "English and Spanish Terms");
    var a = document.createElement('a')
    a.setAttribute('onclick', 'onClickTerm_1(this,true,true)')
    a.setAttribute("style", "        font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");

    li1.setAttribute('class', 'list-group-item list-group-item btn-warning')
    li1.value = varj

    var t1 = document.createTextNode(GroupArray[vart].AudioList[varj].Audioterm)
    var t2 = document.createTextNode(GroupArray[vart].AudioList[varj].SpaneshTerm)
    var t3 = document.createTextNode(", ")
    var s1 = document.createElement('span')
    s1.setAttribute("style", "color:black");
    //s1.setAttribute("data-toggle", "tooltip");
    //s1.setAttribute("title", "English Term");
    var s2 = document.createElement('span')
    s2.setAttribute("style", "color:blue");
    //s2.setAttribute("data-toggle", "tooltip");
    //s2.setAttribute("title", "Spanish Term");
    var s3 = document.createElement('span')
    s3.setAttribute("style", "color:black");

    s1.appendChild(t1)
    s2.appendChild(t2)
    s3.appendChild(t3)

    
    a.appendChild(s1)
    a.appendChild(s3)
    a.appendChild(s2)
    li1.appendChild(a)
    a.setAttribute("style", "     font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
    
    selectList1.appendChild(li1)

    

}
// Previous button functionality 
function onPrevious() {
   
    if(count>=document.getElementById('termChoose1').childNodes.length)
        {
            count=count-1;
        }
    if (count == 0) {
        document.getElementById('previous').disabled = true
        document.getElementById('next').disabled = false
    } else {

        document.getElementById('previous').disabled = false
        document.getElementById('next').disabled = false
        try {
            
            onClickTerm(document.getElementById('termChoose1').childNodes[count - 1].childNodes[0]);
        }
        catch (e)
        { }
        
        
        if (count == 0) {
            document.getElementById('previous').disabled = true
            document.getElementById('next').disabled = false
        }
        else {
            document.getElementById('number_term').innerHTML = count + '/' + document.getElementById('termChoose1').childNodes.length;
            count = count - 1
        }
    }
}
// Next button functionality 
function onNext() {
    


    if (count < document.getElementById('termChoose1').childNodes.length) {
        count = count + 1
        document.getElementById('previous').disabled = false
        document.getElementById('next').disabled = false
        
        onClickTerm(document.getElementById('termChoose1').childNodes[count].childNodes[0])
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
// Remove last comma for search functionality 
function removeLastComma(str) {
    return str.replace(/,(\s+)?$/, '').replace(/\n/g, "");
}
// Search functionality 
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

        emptyTemplate: 'No result for "{{query}}"',
        source: {
            Terms: {
                data: data.ale
            }
        },
        callback: {
            onClickAfter: function (node, a, item, event) {

              hideKeyboard();                  
                var varleft = "";
                var x1 = document.getElementById('termChoose1').childNodes;
                for (var x = 0; x < x1.length; x++) {

                    if (x1[x].childNodes[0].text.replace(/\n/g, "").indexOf(" , ") > -1) {
                        varleft = x1[x].childNodes[0].text.replace(/\n/g, "").split(",")[0];
                    }
                    else {
                        varleft = x1[x].childNodes[0].text.replace(/\n/g, "");
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
                        ($(".js-typeahead-input").val($(".js-typeahead-input").val().replace(/\n/g, "").trim()));
                        document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
                        onClickTerm(x1[x].childNodes[0]);
                        break
                    }
                }

            },

            onSubmit: function (node, form, item, event) {
                event.preventDefault()
                hideKeyboard();
                var itemdisplay = ($(".js-typeahead-input").val())
                var varleft = "";
                var x1 = document.getElementById('termChoose1').childNodes;
                var varfoundterm=false;
                for (var x = 0; x < x1.length; x++) {
                    if (x1[x].childNodes[0].text.replace(/\n/g, "").indexOf(" , ") > -1) {
                        varleft = x1[x].childNodes[0].text.replace(/\n/g, "").split(",")[0];
                    }
                    else {
                        varleft = x1[x].childNodes[0].text.replace(/\n/g, "");
                    }
//alert(varleft.trim() == itemdisplay.replace(/\n/g, "").trim());
                    if (varleft.trim().toUpperCase() == itemdisplay.replace(/\n/g, "").trim().toUpperCase()) {

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

                        document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
                        onClickTerm(x1[x].childNodes[0]);
                        varfoundterm=true;
                        break
                    }
                    else {
                         varfoundterm=false;   
                       // $("#myModal").modal('show');

                    }
                }
                if(varfoundterm==false)
                {
                            $("#myModal").modal('show');
                }
            }
        },
        debug: true
    })
}
// English toggle button functionality 
function ToViewEnglishTerm() {
    
    toggES = "En";
    var groupName = "";
   
    for (vark = 0; vark < document.getElementById("myLi").childNodes.length; vark++) {

        if (document.getElementById('myLi').childNodes[vark].childNodes[0].outerHTML.indexOf("btn-warning") > 0) {
            groupName = document.getElementById('myLi').childNodes[vark].childNodes[0].value;
            break;
        }
    } {
 
       
        
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
                                   
                                    if (GroupArray[t].groupname == gName1) {
                                        spanish_list.push(GroupArray[t].AudioList[j].Audioterm);

                                    }
                                    
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
                                                
                                                if (GroupArray[t].groupname == gName1) {

                                                    spanish_list.push(GroupArray[t].AudioList[j].Audioterm);

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

    termsdetsear = "";
    for (varj = 0; varj < spanish_list.length; varj++) {
        termsdetsear = termsdetsear + '"' + spanish_list[varj] + '",'
        /********************************************************************************************** */

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onClickTerm_1(this,true,true)')
        a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
        li.value = varj
        var t1 = document.createTextNode(spanish_list[varj])
        
        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)
     
        /**************************************************************************************** */
        var li = document.createElement('li')

       


    }

     if(document.getElementById('termChoose1').childNodes.length>0)
   { onClickTerm(document.getElementById('termChoose1').childNodes[0].childNodes[0])}
    count = 0
    document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
    try {
        var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
        console.log(termdsdetsear1)
        data = { 'ale': termdsdetsear1 }
        search()
    } catch (e) {

    }
     document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-default", "btn-info");
        document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
}
 
// Spanish toggle button  functionality 

function ToViewSpanTerm() {
    toggES = "SP";

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
                    if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') { } else {

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

                                  
                                    if (GroupArray[t].groupname == gName1) {
                                        spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);

                                    }
                                   
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
                                if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') { } else {
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
                                               
                                                if (GroupArray[t].groupname == gName1) {

                                                    spanish_list.push(GroupArray[t].AudioList[j].SpaneshTerm);

                                                  
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

    spanish_list = spanish_list.sort(function (a, b) {
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
    termsdetsear = "";
    for (varj = 0; varj < spanish_list.length; varj++) {
        termsdetsear = termsdetsear + '"' + spanish_list[varj] + '",'
        /********************************************************************************************** */

        var li = document.createElement('li')
        var a = document.createElement('a')
        li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
        a.setAttribute('onclick', 'onClickTerm_1(this,true,true)')
        a.setAttribute("style", "    color: blue;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
        li.value = varj
        var t1 = document.createTextNode(spanish_list[varj])

        a.appendChild(t1)
        li.appendChild(a)
        selectList1.appendChild(li)
       
        /**************************************************************************************** */
        var li = document.createElement('li')

      


    }
    if(document.getElementById('termChoose1').childNodes.length==0)
    {
       notermsfound_func();
    }
    else
    {onClickTerm(document.getElementById('termChoose1').childNodes[0].childNodes[0])}
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
function notermsfound_func()
{
     var toreport = document.createElement('div')
              

                var x = $('#termChoose1')
                x.remove()

                var myDiv = document.getElementById('section')
                
                /* list item  */
                var selectList1 = document.createElement('ul')
                selectList1.setAttribute('id', 'termChoose1')
                
                selectList1.setAttribute('style', 'width:200px')
                myDiv.appendChild(selectList1)

                var li = document.createElement('li')
                var a = document.createElement('a')
                li.setAttribute('class', 'list-group-item list-group-itemn-action btn-warning')
               // a.setAttribute('onclick', 'onClickTerm_1(this,true,true)')
                a.setAttribute("style", "    color: black;    font-weight: bold;    cursor: pointer;    display: inline-block;    position: relative;    z-index: 1;    padding-left: 10em;    padding-right: 10em;    margin-left: -10em; margin-right:-10em;padding: 10px 10.6em;");
                li.value = -1
                var t1 = document.createTextNode('No Spanish Terms!')

                a.appendChild(t1)
                li.appendChild(a)
                selectList1.appendChild(li)
                
                var TC = document.getElementById("termContent");
                TC.innerHTML = "No Spanish Term"
                var TC = document.getElementById("Audio1");
                TC.style.display="none";
                var TC = document.getElementById("termContentPro1");
                TC.style.display="none";
                //Definition
                var TC = document.getElementById("Definition");
                TC.style.display="none";
                
                document.getElementById('number_term').innerHTML = '0/0';
                
                document.getElementById('next').disabled = true
                document.getElementById('previous').disabled = true
               
               

}
/************************************************************* */
//
//
//   The following functiona trigged only when you  select
//     chapter wise dropdown follwoing trigged the following        
//      function
/************************************************************* */
function onSelectChapterList() {

    var bx = document.getElementById('box')
    if (bx == null) { } else {
        $('#box').remove()
    }
    var bx1 = document.getElementById('box1')

    if (bx1 == null) { } else {
        $('#box1').remove()
    }
    var list = []
    list = document.getElementsByClassName('btns1')
    for (var i = 0; i < list.length; i++) {
        list[i].className = list[i].className.replace('btn-warning', 'btn-info')
    }
    document.getElementById('All').className = document.getElementById('All').className.replace('btn-info', 'btn-warning')
  
    var cahperList = document.getElementById('chapterList')
    var currentChap = cahperList.options[cahperList.selectedIndex].value
    
    $('#myLi').remove();
    var myli = document.createElement("ol");
    myli.setAttribute("id", "myLi");
    document.getElementById("Select1").appendChild(myli);
    alpha_list(modalData1);
    


    var sectiondatacount = 0
    for (var t = 0; t < modalData.length; t++) {
        if (modalData[t].name == currentChap) {
          
            var x = $('#termChoose1')
            x.remove()
            var chapterNumberOnly = modalData[t].name
            var chapterNumberOnly1 = chapterNumberOnly.substring(7, 10)
            var chapterNumberOnly2 = '\,' + chapterNumberOnly1.trim() + '\,'
            var myDiv = document.getElementById('section')
     
            /************************************************************************ */
            // Change for Mobile layout design
            /************************************************************************* */
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
                        sectiondatacount++
                        
                        termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].Audioterm + '",'
                        
                        /************************************************************************************************** */
                        // termsdetsear=termsdetsear+'"'+GroupArray[t].AudioList[j].Audioterm+'",'
                        /**************************************************************************** ***********************/
                        if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
                            Englishwordonly(selectList1, j, t);
                        } else {
                          
                            /*************************************************************************************** */
                            // li and a tag create for spanish trm with ble font color
                            /*************************************************************************************** */
                            /*********************************************************************************************** */
                            termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].SpaneshTerm + '",'
                            /********************************************************************************************** */
                            EnglishSpanshword(selectList1, j, t);
                          
                                          /**************************************************************************************** */
                            var li = document.createElement('li')

                          
                        }
                    }
                }
             
                try {
                    var termdsdetsear1 = JSON.parse('[' + removeLastComma(termsdetsear) + ']')
                    console.log(termdsdetsear1)
                    data = { 'ale': termdsdetsear1 }
                    search()
                } catch (e) {

                }
            }
 

            
        } else if (currentChap == 'All Chapters') {
            var x = $('#termChoose1')
            x.remove()

            var myDiv = document.getElementById('section')
            

            var selectList1 = document.createElement('ul')
            var termsdetsear = ''
            for (var t = 0; t < GroupArray.length; t++) {
                
                selectList1.setAttribute('id', 'termChoose1')
                
                selectList1.setAttribute('style', 'width:200px')
                
                myDiv.appendChild(selectList1)
                

                for (var j = 0; j < GroupArray[t].AudioList.length; j++) // loading chapter headdings to dropdown box
                {
                    if (GroupArray[t].AudioList[j].SpaneshTerm == undefined || GroupArray[t].AudioList[j].SpaneshTerm == '') {
                        Englishwordonly(selectList1, j, t);
                    } else {
                        
                        /*************************************************************************************** */
                        // li and a tag create for spanish trm with ble font color
                        /*************************************************************************************** */
                        /*********************************************************************************************** */
                        termsdetsear = termsdetsear + '"' + GroupArray[t].AudioList[j].SpaneshTerm + '",'
                        /********************************************************************************************** */
                        EnglishSpanshword(selectList1, j, t);
                       
                        var li = document.createElement('li')
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

     
     onClickTerm(document.getElementById('termChoose1').childNodes[0].childNodes[0])

}

function display_left(vart, varchap1) 
{
  
    var x1 = $('#termChoose1')
    x1.remove()

    var myDiv = document.getElementById('section')


    var selectList1 = document.createElement('ul')
    selectList1.setAttribute('id', 'termChoose1')

    selectList1.setAttribute('style', 'width:200px')

    myDiv.appendChild(selectList1)
    {
         if (varchap1 == undefined) {
          
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
                           EnglishSpanshword(selectList1, j, vart)
                        }
                   }
                }
            }
        }
    }
}

function onSelectAlphaMenu1(obj) 
{
    
    var list = []
    list = document.getElementsByClassName('btns1')

    for (var i = 0; i < list.length; i++) {
        list[i].className = list[i].className.replace('btn-warning', 'btn-info')
    }

    document.getElementById("All").className = document.getElementById("All").className.replace('btn-info', 'btn-warning')
   
     

    var attr = obj

    var gName = attr.value;

    var gcount = 0

 var cahperList = document.getElementById('chapterList')
    var currentChap = cahperList.options[cahperList.selectedIndex].value
    
   

    if (gName == 'All' && currentChap == 'All Chapters') {
        

        gcount++
        
        gcount++

      
        display_left();

       
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

                    } else { }
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

                                } else { }
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
    count = 0;
    document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
     
        onClickTerm(document.getElementById('termChoose1').childNodes[0].childNodes[0])
}
/*********************************************************** */
//
//                Alphabetic selectio function
//			Followig function trgged when you select the alphabet
//
/*********************************************************** */
function onSelectAlphaMenu(obj) 
{
    var list = []
    list = document.getElementsByClassName('btns1')

    for (var i = 0; i < list.length; i++) {
        list[i].className = list[i].className.replace('btn-warning', 'btn-info')
    }

    obj.className = obj.className.replace('btn-info', 'btn-warning')
    var bx = document.getElementById('box')
    if (bx == null) { } else {
        $('#box').remove()
    }
    var bx1 = document.getElementById('box1')

    if (bx1 == null) { } else {
        $('#box1').remove()
    }

  
    var attr = obj

    var gName = attr.value;

    var gcount = 0


    var cahperList = document.getElementById('chapterList')
    var currentChap = cahperList.options[cahperList.selectedIndex].value
   

    if (gName == 'All' && currentChap == 'All Chapters') {
        

        gcount++
        
        gcount++

      
        display_left();

       
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

                    } else { }
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

                                } else { }
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
    count = 0;
    document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
     
        onClickTerm(document.getElementById('termChoose1').childNodes[0].childNodes[0])
}
/*
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
*/
/**************************************************************************************************************** */
//    New Update for the select dropdown button layout varies from desktop browsers to mobile browser
//    We have modifies ths to select element to list tag.
//    onClickTerm_1 method used to check and select the corresponding index of the dropdown menu
//    Developer : Subramani M
//    Impelesys India Privat Limited 
//    Date : 08-Dec-2016
/******************************************************************************************************************* */
function onClickTerm_1(tar, vartlist,varclick) 
{
    tar.className = tar.className + ' active'
    //var x1 = document.getElementById('termChoose')
    //for (var x = 0;x < x1.length;x++) {
    //if (x1[x].value == tar.innerHTML) {
    //x1.selectedIndex = x
   
    onClickTerm(tar, vartlist,varclick)
    //break
    //}

    //}
 document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length

}

function onClickTerm(tar, vartlist,varclick)

 {
    
   
     if(varclick==undefined)
     {
    
     for(var vark=0;vark<document.getElementById('termChoose1').childNodes.length;vark++)
     {
         
         document.getElementById('termChoose1').childNodes[vark].childNodes[0].className=document.getElementById('termChoose1').childNodes[vark].childNodes[0].className.replace(" " + "btn-warning","");
     }

     //alert((tar.offsetTop))

     if(tar.parentElement.parentElement.scrollTop>3000)
     {
      
        //document.documentElement.scrollTop=document.documentElement.scrollHeight;
        
        
        window.scrollTo(0, 250);
        //document.documentElement.scrollTop=document.documentElement.scrollTop+200
     }
     else
     {
         window.scrollTo(0, 0);
     }
     
      tar.parentElement.parentElement.scrollTop = (tar.parentElement.offsetTop);
      console.log(tar.parentElement.parentElement.scrollTop)
     tar.className=tar.className + " " + "btn-warning";
}
else
{
    //alert("asdfdsfsd");
      for(var vark=0;vark<document.getElementById('termChoose1').childNodes.length;vark++)
     {
         
         document.getElementById('termChoose1').childNodes[vark].childNodes[0].className=document.getElementById('termChoose1').childNodes[vark].childNodes[0].className.replace(" " + "btn-warning","");
     }
     tar.className=tar.className + " " + "btn-warning";
}
    //	document.getElementById("loadder").style.display = "block";

    if (window.matchMedia("(min-width: 768px)").matches) {
        if ($("#sidemenu").attr("class").indexOf("sideNav") > 0) { } else {

            $("#sidemenu").addClass("sideNav");
            $("#sidemenu").css("display", "block");
            $("#main_cont").css("display", "none");

        }


        if ($("#sidemenu").attr("class").indexOf("col-xs-4") > 0) { } else {
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
    if (bx == null) { } else {
        $("#box").remove();
    }
    var bx1 = document.getElementById("box1");
    if (bx1 == null) { } else {
        $("#box1").remove();
    }

    var cahperList = document.getElementById("chapterList");
    var currentChap = cahperList.options[cahperList.selectedIndex].value;
    var termList = document.getElementById("termChoose1");
    //var selectedterm = termList.options[termList.selectedIndex].value;

    if (tar.childNodes.length > 1) {
        var selectedterm = tar.childNodes[0].text;
    } else {
        var selectedterm = tar.text;
    }
    if (selectedterm.indexOf("...") > -1) {
        if (tar.childNodes.length > 1) {
            var selectedterm = tar.childNodes[0].getAttribute("data-terms");
        } else {
            var selectedterm = tar.getAttribute("data-terms");
        }
    }

    //console.log(termList.childNodes.length);
   // if (vartlist == true)
     {
        var x1 = document.getElementById('termChoose1').childNodes;
       
        for (var x = 0; x < x1.length; x++) {
           
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
                //  count=0;
                // document.getElementById('number_term').innerHTML = count + 1 + '/' + document.getElementById('termChoose1').childNodes.length
                // onClickTerm(x1[x].childNodes[0]);
                break
            }
        }
    }



    if (tar.getAttribute("style").indexOf("color: blue;") > 0) {
        //alert(document.getElementById("thead").innerHTML)
        document.getElementById("thead").innerHTML = document.getElementById("thead").innerHTML.replace("Term", "Término")
        document.getElementById("dhead").innerHTML = document.getElementById("dhead").innerHTML.replace("Definition", "Definición")
        $("#Definition").css("display", "none")
        $("#termContentPro1").css("display", "none")
        $("#SpanTerms_1").css("display", "none")
        $("#Span_Definition").css("display", "none")
        //termContentPro

    }

    else {


        {
            //alert(document.getElementById("thead").innerHTML)
            document.getElementById("thead").innerHTML = document.getElementById("thead").innerHTML.replace("Término", "Term")
            document.getElementById("dhead").innerHTML = document.getElementById("dhead").innerHTML.replace("Definición", "Definition")
            $("#Definition").css("display", "block")
            $("#termContentPro1").css("display", "block")
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
            
                if(TCp.innerHTML=="")
                {
                     $("#termContentPro1").css("display", "none")
                }
                var DC = document.getElementById("definitionContent");
                DC.innerHTML = GroupArray[t].AudioList[j].Audiomeaning;

                if (toggES == "En") {
                    if(GroupArray[t].AudioList[j].AudioUrl=="")
                    {audio_tag("Assets/media/" + "undefined", "Audio1", "play1")}
                    else
                    {audio_tag("Assets/media/" + GroupArray[t].AudioList[j].AudioUrl, "Audio1", "play1")}
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
                    document.getElementById('b4').className = document.getElementById('b4').className.replace("btn-info", "btn-default");
                    document.getElementById('b3').className = document.getElementById('b3').className.replace("btn-info", "btn-default");
                    var TC = document.getElementById("SpanTerms_1");
                    TC.style.display = "block";
                    if (GroupArray[t].AudioList[j].SpaneshDef == undefined || GroupArray[t].AudioList[j].SpaneshDef == '') {

                        var TC = document.getElementById("Span_Definition");
                        TC.style.display = "none";
                    }
                    else {
                        var DC = document.getElementById("spandefinitionContent");
                        DC.innerHTML = GroupArray[t].AudioList[j].SpaneshDef;
                        var TC = document.getElementById("Span_Definition");
                        TC.style.display = "block";
                    }




                    var TC = document.getElementById("spanitem_1");
                    TC.style.color = "blue";
                    TC.innerHTML = '' + GroupArray[t].AudioList[j].SpaneshTerm;
                    if (GroupArray[t].AudioList[j].SpanURL != undefined || GroupArray[t].AudioList[j].SpanURL != "") {

                        audio_tag("Assets/media/span/media/" + GroupArray[t].AudioList[j].SpanURL, "spanAudio1", "spanplay1")

                    }
                    else {
                        $("#spanAudio1").css("display", "none");
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
                if (GroupArray[t].AudioList[j].SpaneshDef != undefined && GroupArray[t].AudioList[j].SpaneshDef != "") {
                    var DC = document.getElementById("definitionContent");
                    DC.innerHTML = GroupArray[t].AudioList[j].SpaneshDef;
                    var TC = document.getElementById("Span_Definition");
                    TC.style.display = "block";
                }
                else {
                    var TC = document.getElementById("Span_Definition");
                    TC.style.display = "none";
                }
                //var tcontext = document.getElementById("TermContext");
                //tcontext.innerHTML = GroupArray[t].AudioList[j].SpaneshTerm;
                //span term Audio 
                //console.log(GroupArray[t].AudioList[j].SpanURL);
                var TC = document.getElementById("spanitem_1");
                TC.style.color = "black";
                TC.style.display = "block";
                TC.innerHTML = '<span class="Senplayplay" ></span> ' + GroupArray[t].AudioList[j].Audioterm;

                if (toggES == "SP") {
                    if(GroupArray[t].AudioList[j].SpanURL=="")
                    {audio_tag("Assets/media/span/media/" + "undefined", "Audio1", "play1")}
                    else
                    {audio_tag("Assets/media/span/media/" + GroupArray[t].AudioList[j].SpanURL, "Audio1", "play1")}
                }






            }
        }
    }
    if (cnt == 0) {
        //console.log("Not found");
    }
    //document.getElementById("loadder").style.display="none";

}

function mOver(obj) 
{

    // obj.class=play1
    var ply = document.getElementById('play')
    ply.className = 'play1'
    // ply.className="play1"

}

function mOver1(obj)
{

    // obj.class=play1

    obj.className = 'play1'
    // ply.className="play1"

}

function mOut(obj)
 {

    obj.className = 'play'
    // console.log("mout"+ply.className)

}

function mOut1(obj) 
{

    obj.className = 'play'
    // console.log("mout"+ply.className)

}
/*
function DefplaymOver(obj) 
{
    var ply = document.getElementById('Defplay')
    ply.className = 'Defplayplay1'
}

function DefplaymOut(obj)
 {
    var ply = document.getElementById('Defplay')
    ply.className = 'Defplayplay'
}

function SenplaymOver(obj) 
{
    var ply = document.getElementById('Senplay')
    ply.className = 'Senplayplay1'
}

function SenplaymOut(obj) 
{
    var ply = document.getElementById('Senplay')
    ply.className = 'Senplayplay'
}

function DisplayHelp(txt) { }

function gettingFlip() 
{
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

function tabClickTerm() 
{
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

function tabClickDef()
 {
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

function RotateFlip() { }

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
*/


function decreaseFontSizeInternal() 
{
    var list = []
    list.push(document.getElementById('thead'))
    list.push(document.getElementById('sthead'))
    list.push(document.getElementById('termContent'))
    list.push(document.getElementById('dhead'))
    list.push(document.getElementById('sdhead'))
    list.push(document.getElementById('definitionContent'))
    list.push(document.getElementById('termContentPro'))
    list.push(document.getElementById('spanitem_1'))
    list.push(document.getElementById('spandefinitionContent'))
    for (i = 0; i < list.length; i++) {
        var s = 24
        if (list[i].style.fontSize) {
            s = parseInt(list[i].style.fontSize.replace('px', ''))
        }

        if (s >= min) {
            s -= 1
        }
        else {
            try {
                document.getElementById("spanplay1").style.marginTop = "0px";
                document.getElementById("spanplay1").style.marginLeft = "-18px";
            }
            catch (e) {

            }
        }
        list[i].style.fontSize = s + 'px'

    }
}

function increaseFontSizeInternal()
 {
    var list = []
    list.push(document.getElementById('thead'))
    list.push(document.getElementById('dhead'))
    list.push(document.getElementById('sthead'))
    list.push(document.getElementById('sdhead'))
    list.push(document.getElementById('termContent'))

    list.push(document.getElementById('definitionContent'))
    list.push(document.getElementById('termContentPro'))
    list.push(document.getElementById('spanitem_1'))
    list.push(document.getElementById('spandefinitionContent'))
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
        try {
            document.getElementById("spanplay1").style.marginTop = "-100px";
            document.getElementById("spanplay1").style.marginLeft = "100px";
        }
        catch (e)
        { }
    }
}

$(window).resize(function () {

    if ($(window).width() < 750) {

        // onSideNav method used to dispaly an hide the alphabet menu
        onSidenav();


    }
    else {

        $("#sidemenu").toggleClass("sideNav1", "sideNav");
        $("#sidemenu").css("display", "block");
        $("#main_cont").css("display", "block");
    }
})


$("#chapterList").keydown(function (e) {
    if (e.keyCode == 37) { // left
        $(".js-typeahead-input").focus();
        document.getElementById("chapterList").selectedIndex = document.getElementById("chapterList").selectedIndex + 1;
        onPrevious();
    }
    else if (e.keyCode == 39) { // right
        $(".js-typeahead-input").focus();
        document.getElementById("chapterList").selectedIndex = document.getElementById("chapterList").selectedIndex - 1;
        onNext();

    }

})

$("body").keydown(function (e) {

if(e.ctrlKey)
{
    if (e.keyCode == 37) { // left
        e.preventDefault
        onPrevious();
    }
    else if (e.keyCode == 39) { // right
        e.preventDefault
        onNext();
    }
      
    
    if (e.keyCode == 120) { // right
        $(".js-typeahead-input").focus();
    }
}
if(e.altKey)

{
    console.log(e.keyCode);
     if (e.keyCode == 116) { // left
        e.preventDefault
        ToViewEnglishTerm();
    }
    if (e.keyCode == 117) { // left
        e.preventDefault
        ToViewSpanTerm();
    }
    if (e.keyCode == 173) { // left
        e.preventDefault
        decreaseFontSizeInternal();
    }
    else if (e.keyCode == 61) { // right
        e.preventDefault
        increaseFontSizeInternal();
    }
}
});
function audioplay()
{
 
         
            try {
                setTimeout(function () {     
                    
                   audioElement.play();
                }, 150);
                
               

            } catch (e) {
               
                document.getElementById("loadder").style.display = "none";
            }
 
}
function audio_tag(audiofile, audioid, varplayid) 
{
    //document.getElementById(audioid).setAttribute("style", "display:none");
    
    if(typeof(audioElement) == "object") {
        
 audioElement.pause();
 audioElement = null;
};
  $("#termContent").css("background-color", "white");
                    $("#spanitem_1").css("background-color", "white");
                    $("#spanitem_1").css("font-weight", "bold");
                    $("#termContent").css("font-weight", "bold");
    if (audiofile.indexOf("undefined") == -1) 
    {
       
        //var audioElement = document.createElement('audio');
       
        audioElement =new Audio();
        
        audioElement.setAttribute("id", "audiotag1")
        audioElement.setAttribute('src', (audiofile + ".mp3").replace(".mp3.mp3", ".mp3"));
         //alert((audiofile + ".mp3").replace(".mp3.mp3", ".mp3"));
        var TOappnd = document.getElementById(audioid);
        TOappnd.innerHTML = "";
        var Abtn = document.createElement("button");
        Abtn.setAttribute("id", varplayid);
        Abtn.setAttribute("class", "play");
        Abtn.setAttribute("onmouseover", "mOver1(this)");
        Abtn.setAttribute("onmouseout", "mOut1(this)");
        Abtn.setAttribute("data-toggle", "tooltip");
        Abtn.setAttribute("title", "Play/Repeat audio");
        Abtn.innerHTML = "Play Term Audio";
        TOappnd.appendChild(Abtn);

       
        
        $('<audio src="'+ audiofile +'">').load(function() {
               document.getElementById(audioid).setAttribute("style", "display:block");
               document.getElementById("Audio2").setAttribute("style", "display:block");
           
               

        }).bind('error', function() {
            document.getElementById(audioid).setAttribute("style", "display:none");
            document.getElementById("Audio2").setAttribute("style", "display:none");
             document.getElementById("loadder1").style.display="none";
        });
        
        
                 audioElement.onplaying = function () {
                  document.getElementById("loadder").style.display="block";
                    if (varplayid == "spanplay1") {
                        $("#spanitem_1").css("background-color", "yellow");
                        $("#spanitem_1").css("font-weight", "bold");
                    }
                    else {
                        $("#termContent").css("background-color", "yellow");
                        $("#termContent").css("font-weight", "bold");
                    }

                };
                audioElement.onended = function () {
                    document.getElementById("loadder").style.display="none";
                     document.getElementById("loadder1").style.display="none";
                    $("#termContent").css("background-color", "white");
                    $("#spanitem_1").css("background-color", "white");
                    $("#spanitem_1").css("font-weight", "bold");
                    $("#termContent").css("font-weight", "bold");
                };
        //audioElement.play();
           

        audioElement.onloadeddata = function () 
        {  
               setTimeout(function () {    
                  
                   {audioElement.play();}
                }, 150);

        }
      /*   $('#' + "Audio2_Play").click(function () {
          
            try {
                setTimeout(function () {      
                   audioElement.play();
                }, 150);
                
               

            } catch (e) {
               
                document.getElementById("loadder").style.display = "none";
            }
        });
        pro_audio*/
        $('#' + "pro_audio").click(function () {
          
            try {
                setTimeout(function () {      
                   audioElement.play();
                }, 150);
                
               

            } catch (e) {
               
                document.getElementById("loadder").style.display = "none";
            }
        });
        $('#' + varplayid).click(function () {
          
            try {
                setTimeout(function () {      
                   audioElement.play();
                }, 150);
                
               

            } catch (e) {
               
                document.getElementById("loadder").style.display = "none";
            }
        });

        $('.pause').click(function () {
            audioElement.pause();
        });



        document.getElementById(audioid).setAttribute("style", "display:block");
        document.getElementById("Audio2").setAttribute("style", "display:block");
    }
    else 
    {
        
        document.getElementById("Audio2").setAttribute("style", "display:none");
        document.getElementById(audioid).setAttribute("style", "display:none");
        
    }

}

var hideKeyboard = function() {
 document.activeElement.blur();
 var inputs = document.querySelectorAll('input');
 for(var i=0; i < inputs.length; i++) {
  inputs[i].blur();
 }
};