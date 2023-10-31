// 変数定義
var cor=0,inc=0;//正解数，不正解数
var MAX,x=1;//問題の最大数，現在の出題数
var AllQandA,num;//全ての問題の内容，問題の番号
var syutudaizumi=[];//出題した問題


function inanswer(){
    // 解答ボタンが押された時の処理
    if (answer.value==AllQandA[num].answer){
        // 正解
        answer.disabled=true;//文字入力欄の無効化
        answerbutton.disabled=true;//解答ボタンの無効化
        nextbutton.disabled=false;//次の問題ボタンの有効化
        nextbutton.style.display='inline';//次の問題ボタンを表示
        cor+=1;//正解数＋１
        CorI.innerHTML="正解："+AllQandA[num].answer;//正解した旨の文字列を表示
    }
    else{
        // 不正解
        answer.disabled=true;//文字入力欄の無効化
        answerbutton.disabled=true;//解答ボタンの無効化
        nextbutton.disabled=false;//次の問題ボタンの有効化
        nextbutton.style.display='inline';//次の問題ボタンを表示
        inc+=1;//不正解数＋１
        nextbutton.value="結果発表"//次の問題ボタンの文字列を結果発表に変更
        CorI.innerHTML="不正解 正しい答え："+AllQandA[num].answer;//間違えた旨の文字列を表示
    }
}

function nextquestion(){
    // 次の問題ボタンが押された時の処理
    a=0;//変数aを0に
    let ps=document.getElementById("problemstatement");//問題文の要素を取得
    let pq=document.getElementById("pquestion");//問題の漢字の要素を取得
    let pa=document.getElementById("panswer");//解答入力欄の要素を取得
    let pnb=document.getElementById("pnbutton");//解答ボタンの要素を取得
    if(inc>=1){
        //前の問題が不正解だった時
        ps.innerHTML="<b>結果発表</b>";//問題文の文字列を「結果発表」に変更
        pq.innerHTML="正解数："+cor;//問題の漢字を表示していた部分の文字列を正解数表示に変更
        pa.innerHTML="<a href='endless.html'>もう一度挑戦する</a>";//解答入力欄の文字列を再挑戦のリンクに変更
        CorI.innerHTML=null;//正解，不正解の文字列を非表示に
        pnb.innerHTML="<a href='index.html'>タイトルに戻る</a>";//解答ボタンをトップページへのリンクに変更
        document.getElementById("tweet").style.display='block'//Tweetボタンを表示
        document.getElementById("twittersharebutton").onclick = function() {
            //あらかじめ文字が入力されたTweet画面を開く処理
            let text = document.getElementById("pquestion").innerText;
            let url = encodeURIComponent(location.href);
            window.open("https://twitter.com/share?text=" + text + "&url=" + url);
        }
    }
    else if(x==MAX){
        // 用意された問題をすべて正解した場合
        ps.innerHTML="<b>結果発表</b>";//問題文の文字列を「結果発表」に変更
        pq.innerHTML="正解数："+cor;//問題の漢字を表示していた部分の文字列を正解数表示に変更
        pa.innerHTML="全問正解！おめでとう！";//解答入力欄の文字列を祝う文字列に変更
        CorI.innerHTML="<a href='endless.html'>もう一度挑戦する</a>";//正解，不正解の文字列を再挑戦のリンクに変更
        pnb.innerHTML="<a href='index.html'>タイトルに戻る</a>";//解答ボタンをトップページへのリンクに変更
        document.getElementById("tweet").style.display='block'//Tweetボタンを表示
        document.getElementById("twittersharebutton").onclick = function() {
            //あらかじめ文字が入力されたTweet画面を開く処理
            let text = document.getElementById("pquestion").innerText+" "+document.getElementById("panswer").innerText;
            let url = encodeURIComponent(location.href);
            window.open("https://twitter.com/share?text=" + text + "&url=" + url);
        }
    }
    else{
        //前の問題に正解し，まだ問題がある場合
        x+=1;//出題数+1
        ps.innerHTML="問題"+x+":次の漢字の読みをひらがなで答えよ"//次の問題文を表示
        answer.disabled=false;//文字入力欄の有効化
        answer.value="";//文字入力欄を空白に
        answerbutton.disabled=false;//解答ボタンの有効化
        nextbutton.disabled=true;//次の問題ボタンの無効化
        nextbutton.style.display='none';//次の問題ボタンを非表示に
        CorI.innerHTML="<br>";//正解or不正解時の文字列を空行に
        var value=Object.keys(AllQandA);//問題内容の配列を取得
        while(a==0){//出題していない問題を取得するまでループ
            num = Math.floor(Math.random()*value.length);//ランダムな問題を取得
            if(syutudaizumi.every(element => element != num)){
                //取得した問題がこれまで出題されていなかった場合
                a+=1;//ループを抜ける
                syutudaizumi.push(num);//取得した問題を出題済に変更
            }
        }
        if(x==MAX-1){
            //次の問題が最終問題の場合
            nextbutton.value="結果発表";//次の問題ボタンの表示を「結果発表」に変更
        }
        question=document.getElementById("question");//問題の漢字の要素を取得
        question.innerText=AllQandA[num].question;//取得した問題を問題の漢字として表示
    }
}


window.onload=function(){
    // 画面表示時の処理
    var obj=new XMLHttpRequest();//Requestを作成
    obj.open("get","./data.json");//中身を入手，対象はdata.json
    obj.send();//Request送信
    obj.onreadystatechange=function(){//帰ってきたときの処理
        if(obj.readyState==4&&obj.status==200){//正常に帰ってきたかどうか確認
            AllQandA=JSON.parse(obj.response);//帰ってきた問題のデータを変数に格納
            var value=Object.keys(AllQandA);//問題内容の配列を取得
            MAX=value.length;//問題の最大数を取得
            num=Math.floor(Math.random()*value.length);//ランダムな問題を取得
            syutudaizumi.push(num);//取得した問題を出題済に変更
            question=document.getElementById("question");//問題の漢字の要素を取得
            question.innerText=AllQandA[num].question;//取得した問題を問題の漢字として表示
            let ps=document.getElementById("problemstatement");//問題文の要素を取得
            let answer=document.getElementById("answer");//解答欄の要素を取得
            let CorI=document.getElementById("CorI");//正誤表示の要素を取得
            let answerbutton=document.getElementById("answerbutton");//解答ボタンの要素を取得
            let nextbutton=document.getElementById("nextbutton");//次の問題ボタンの要素を取得
            nextbutton.disabled=true;//次の問題ボタンを無効化
            nextbutton.style.display='none';//次の問題ボタンを非表示に
            document.getElementById("tweet").style.display='none';//Tweetボタンを非表示に
            answerbutton.onclick=inanswer;//解答ボタンが押された場合inanswer関数を実行
            nextbutton.onclick=nextquestion;//次の問題ボタンが押された場合nextquestion関数を実行
        }
    };
}