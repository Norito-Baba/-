var cor=0,inc=0;
var MAX,x=1;
var AllQandA,num;
var syutudaizumi=[];


function inanswer(){
    if (answer.value==AllQandA[num].answer){
        answer.disabled=true;
        answerbutton.disabled=true;
        nextbutton.disabled=false;
        nextbutton.style.display='inline';
        cor+=1;
        CorI.innerHTML="正解："+AllQandA[num].answer;
    }
    else{
        answer.disabled=true;
        answerbutton.disabled=true;
        nextbutton.disabled=false;
        nextbutton.style.display='inline';
        inc+=1;
        nextbutton.value="結果発表"
        CorI.innerHTML="不正解 正しい答え："+AllQandA[num].answer;
    }
}

function nextquestion(){
    a=0;
    let ps=document.getElementById("problemstatement");
    let pq=document.getElementById("pquestion");
    let pa=document.getElementById("panswer");
    let pnb=document.getElementById("pnbutton");
    if(inc>=1){
        ps.innerHTML="<b>結果発表</b>";
        pq.innerHTML="正解数："+cor;
        pa.innerHTML="<a href='endless.html'>もう一度挑戦する</a>";
        CorI.innerHTML=null;
        pnb.innerHTML="<a href='index.html'>タイトルに戻る</a>";
        document.getElementById("tweet").style.display='block'
        document.getElementById("twittersharebutton").onclick = function() {
            let text = document.getElementById("pquestion").innerText;
            let url = encodeURIComponent(location.href);
            window.open("https://twitter.com/share?text=" + text + "&url=" + url);
        }
    }
    else if(x==MAX){
        ps.innerHTML="<b>結果発表</b>";
        pq.innerHTML="正解数："+cor;
        pa.innerHTML="全問正解！おめでとう！";
        CorI.innerHTML="<a href='endless.html'>もう一度挑戦する</a>";
        pnb.innerHTML="<a href='index.html'>タイトルに戻る</a>";
        document.getElementById("tweet").style.display='block'
        document.getElementById("twittersharebutton").onclick = function() {
            let text = document.getElementById("pquestion").innerText+" "+document.getElementById("panswer").innerText;
            let url = encodeURIComponent(location.href);
            window.open("https://twitter.com/share?text=" + text + "&url=" + url);
        }
    }
    else{
        x+=1;
        ps.innerHTML="問題"+x+":次の漢字の読みをひらがなで答えよ"
        answer.disabled=false;
        answer.value="";
        answerbutton.disabled=false;
        nextbutton.disabled=true;
        nextbutton.style.display='none';
        CorI.innerHTML="<br>";
        var value=Object.keys(AllQandA);
        while(a==0){
            num = Math.floor(Math.random()*value.length);
            if(syutudaizumi.every(element => element != num)){
                a+=1;
                syutudaizumi.push(num);
            }
        }
        if(x==MAX-1){
            nextbutton.value="結果発表";
        }
        question=document.getElementById("question");
        question.innerText=AllQandA[num].question;
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
            MAX=value.length;
            num=Math.floor(Math.random()*value.length);
            syutudaizumi.push(num);
            question=document.getElementById("question");
            question.innerText=AllQandA[num].question;
            let ps=document.getElementById("problemstatement");
            let answer=document.getElementById("answer");
            let CorI=document.getElementById("CorI");
            let answerbutton=document.getElementById("answerbutton");
            let nextbutton=document.getElementById("nextbutton");
            nextbutton.disabled=true;
            nextbutton.style.display='none';
            document.getElementById("tweet").style.display='none';
            answerbutton.onclick=inanswer;
            nextbutton.onclick=nextquestion;
        }
    };
}