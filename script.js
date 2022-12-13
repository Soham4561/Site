const start_page = document.getElementById("start-page");
const info_page = document.getElementById("info-page");
const quit_btn = document.querySelector("#quit-btn");
const continue_btn= document.getElementById("continue-btn");

continue_btn.onclick = ()=>{
    start_page.classList.replace("opacity-100","opacity-0");
    
    info_page.classList.replace("opacity-0","opacity-100");
    
    }
