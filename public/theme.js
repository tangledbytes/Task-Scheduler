// w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
// var targetWidth = 470;
// if ( w <= targetWidth) {     
//     document.querySelector('.drop').style.display = 'none';
// }else if(w > targetWidth){
//     document.querySelector('.drop').style.display = 'flex';
// }

function swapStyleSheet(sheet) {
    document.querySelector('.stylesheet').setAttribute("href", sheet); 
    localStorage.theme = sheet; 
}

function initate() {
    if(localStorage.theme != undefined){
    document.querySelector('.stylesheet').setAttribute("href",localStorage.theme);
    }
    var style1 = document.getElementById("stylesheet1");
    var style2 = document.getElementById("stylesheet2");

    style1.onclick = function () { swapStyleSheet("/stylesheets/home.css") };
    style2.onclick = function () { swapStyleSheet("/stylesheets/home-dark.css"); };
}

// document.querySelector('.navs').addEventListener('click',function(){
//     if(document.querySelector('.drop').style.display == 'none'){
//         document.querySelector('.navs').style.backgroundColor = '#232626';
//         document.querySelector('.drop').style.display = 'block';
//     }
//     else{
//         document.querySelector('.navs').style.backgroundColor = 'white';
//         document.querySelector('.drop').style.display = 'none';
//     }
// });
document.querySelector('.hamburger').addEventListener('click',function(){
    document.querySelector('.dropdown').classList.toggle('drop');
    if(document.querySelector('.login-form').style.zIndex != -1){
        document.querySelector('.login-form').style.zIndex = -1;
    }
    else{
        document.querySelector('.login-form').style.zIndex = 0;
    }
});
window.onload = initate;