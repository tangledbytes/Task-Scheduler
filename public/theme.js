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

window.onload = initate;