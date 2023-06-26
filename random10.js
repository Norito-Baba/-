var c=0,i=0;
function inanswer(){
    if (answer.value==AllQandA[num.answer]){
        c+=1;
        CorI.innerText="正解"
    }
    else{
        i+=1;
        CorI.innerText="不正解"
    }
}

AllQandA=JSON.parse(fs.readFileSync(data.json));
num = Math.floor(Math.random()*AllQandA.length)
document.getElementById("question")=AllQandA[num.question];

let answer=document.getElementById("answer");
let CorI=document.getElementById("CorI");
let answerbutton=document.getElementById("answerbutton")
answerbutton.onclick=inanswer;