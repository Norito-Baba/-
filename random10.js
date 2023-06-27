var c=0,i=0;
var n=10,x=1;
var AllQandA,num;
var syutudaizumi=[];


function inanswer(){
    if (answer.value==AllQandA[num].answer){
        answer.disabled=true;
        answerbutton.disabled=true;
        nextbutton.disabled=false;
        c+=1;
        CorI.innerHTML="正解："+AllQandA[num].answer;
    }
    else{
        answer.disabled=true;
        answerbutton.disabled=true;
        nextbutton.disabled=false;
        i+=1;
        CorI.innerHTML="不正解；正答："+AllQandA[num].answer;
    }
}

function nextquestion(){
    x+=1;
    let ps=document.getElementById("problemstatement");
    ps.innerHTML="問題"+x+"：次の漢字の読みをひらがなで答えよ"
    answer.disabled=false;
    answer.value="";
    answerbutton.disabled=false;
    CorI.innerHTML=null;
    var value=Object.keys(AllQandA);
    num = Math.floor(Math.random()*value.length);
    question=document.getElementById("question");
    question.innerText=AllQandA[num].question;
}


window.onload=function(){
    var obj=new XMLHttpRequest();
    obj.open("get","./data.json");
    obj.send();
    obj.onreadystatechange=function(){
	    if(obj.readyState==4&&obj.status==200){
            AllQandA=JSON.parse(obj.response);
            var value=Object.keys(AllQandA);
            num = Math.floor(Math.random()*value.length);
            question=document.getElementById("question");
            question.innerText=AllQandA[num].question;
            let ps=document.getElementById("problemstatement");
            let answer=document.getElementById("answer");
            let CorI=document.getElementById("CorI");
            let answerbutton=document.getElementById("answerbutton");
            let nextbutton=document.getElementById("nextbutton");
            nextbutton.disabled=true;
            answerbutton.onclick=inanswer;
            nextbutton.onclick=nextquestion;
        }
    };
}