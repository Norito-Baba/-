var c=0,i=0;
var AllQandA,num;
function inanswer(){
    if (answer.value==AllQandA[num].answer){
        c+=1;
        CorI.innerText="正解"
    }
    else{
        i+=1;
        CorI.innerText="不正解"
    }
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
            let answer=document.getElementById("answer");
            let CorI=document.getElementById("CorI");
            let answerbutton=document.getElementById("answerbutton")
            answerbutton.onclick=inanswer;
            return console.log(AllQandA);
        }
    };
}