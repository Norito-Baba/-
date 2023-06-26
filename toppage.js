function randomClick() {
    location.href="random10.html"
}
function endlessClick(){
    location.href="endless.html"
}

let button1 = document.getElementById('random10');
button1.onclick=randomClick;
let button2 = document.getElementById('endless');
button2.onclick=endlessClick;