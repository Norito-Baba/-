function randomClick() {
    // ランダム10問画面への遷移処理
    location.href="./random10.html"
}
function endlessClick(){
    // 全問チャレンジ画面への遷移処理
    location.href="./endless.html"
}
window.onload=function(){
    // 画面表示時の処理
    // ランダム10問ボタンの追跡
    let button1 = document.getElementById('random10');
    button1.onclick=randomClick;
    // 全問チャレンジボタンの追跡
    let button2 = document.getElementById('endless');
    button2.onclick=endlessClick;
}