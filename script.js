const start_page = document.getElementById("start-page");
const info_page = document.getElementById("info-page");
const test_page = document.getElementById("test-page")
const question_page = document.getElementById("question-page")

const quit_btn= document.getElementById("continue-btn");
const continue_btn= document.getElementById("continue-btn");
const back_btn= document.getElementById("back-btn");
const start_btn= document.getElementById("start-btn");

var info = {
  "info_json": {
    "test_id": "C-20270",
    "test_title": "Maths Quiz",
    "test_thumbnail": "https://i.ibb.co/G39WyLD/images.jpg",
    "test_description": "Mathematics Quiz is a small test administered to know the students' knowledge or it is a short duration test used to know the student's knowledge and understanding in the field of Mathematics.",
    "test-author": "Soham Deogaonkar",
    "submission-time": "",
  },
  "format_json":{
    "total_questions" : "10",
    "total_time": "5 min",
    "total_time_sec" : "300",
  },
  "marking_scheme":{
    correct: "4",
    unattempted: "0",
    incorrect: "-1"
  },
  "extra-rules":{
    
  },
}

function createStartPage(){
document.getElementById("start-title").innerHTML= info.info_json.test_title;
document.getElementById("start-description").innerHTML= info.info_json.test_description;
document.getElementById("start-thumbnail").src = info.info_json.test_thumbnail;
}
createStartPage();

async function createQuestionStatement(no,total_questions){
  return await getInfoStatement(no,`There are total <snap class="text-primary">` + total_questions + ` question</snap> in this paper`)
}
async function createTotalTimeStatement(no,totalTime){
  return await getInfoStatement(no,`You will have total <snap class="text-primary">` + totalTime + ` </snap> to solve this paper`)
}
async function createMarkingSchemeStatement(no,positive,unattempted,negative) {
  let html = ""
  html += await getInfoStatement(no,`Correct answer will be rewarded <snap class="text-primary">` + positive + ` </snap> marks`)
  no += 1
  html += await getInfoStatement(no,`Unattempted question will be rewarded <snap class="text-primary">` + unattempted + ` </snap> marks`)
  no += 1
  html += await getInfoStatement(no,`Incorrect answer will be rewarded <snap class="text-primary">` + negative + ` </snap> marks`)
  no += 1
  return html
  
}
function getInfoStatement(no,statement){
  return `<p>`+ no + `. `+ statement + `</p>`
}

async function createInfoPage(){
  let no = 0
  let info_html = ""
  info_html += await createQuestionStatement(no+1,info.format_json.total_questions)
  no += 1
  info_html += await createTotalTimeStatement(no+1,info.format_json.total_time)
  no += 1
  info_html += await createMarkingSchemeStatement(
    no+1,
    info.marking_scheme.correct,
    info.marking_scheme.unattempted,
    info.marking_scheme.incorrect,
    )
  
  document.getElementById("info-rules").innerHTML = info_html
}
createInfoPage()

let questions = [{
    numb: 1,
    question: "Whats 4 + 4?",
    options: [
      "5",
      "7",
      "8",
      "9"
    ]
  },{
    numb: 2,
    question: "2 × 2 + 7?",
    options: [
      "4",
      "7",
      "18",
      "11"
    ]
  }]
//import questions from "./info.js";
function startPage(page){
  page = document.getElementById(page);
  page.classList.replace("opacity-0","opacity-100")
  page.style.zIndex = 1
}
function closePage(page) {
  page = document.getElementById(page);
  page.classList.replace("opacity-100", "opacity-0")
  page.style.zIndex = -1
}

continue_btn.onclick = ()=>{
  closePage("start-page");
  startPage("info-page")
}

back_btn.onclick = () => {
  closePage("info-page");
  startPage("start-page")
  
}

start_btn.onclick = async() => {
  closePage("info-page");
  startPage("test-page")
  
  let final = await createQuiz(questions)
  console.log(final)
  question_page.innerHTML = final
  setInterval(Timer, 100,(new Date().getTime() + (info.format_json.total_time_sec*1000)));
}

async function createOption(ques,option,key){
  var html = `
  <div class="">
    <input type="radio" name="Q`+ ques + `" id="Q` + ques + "O" + option + `" value="` + option + `">
    <label for="Q` + ques + "O" + option + `" class="box Q` + ques + "O" + option + ` w-100">
      <div class="course"> 
        <span class ="circle"></span> 
        <span class="subject">
            ` + key + `
        </span> 
      </div>
    </label>
  </div>`
  
  return html
}

async function createQues(question,options,no){
  var html = `
    <div class="card m-3">
      <div class="card-body">
        <h5>` + question + `</h5>
        <div class="options">
        <div class="row">`
  for(var i in options){
    html +=  await createOption(no,parseInt(i)+1,options[i])
  }
  html += `<div class="">
   <button id="clear-Q-` + no + `" type="button" class="btn clear-btn float-end" onClick="clearResponses(` + no + `)">Clear Response
  </button></div>`
  html += `</div></div> </div></div>`
  return html
}
var response = []
async function getSelected(question_no) {
  let options = document.querySelector('input[name="Q' + question_no + '"]:checked')
  if (options != null) {
    return options.value
  } else {
    return ""
  }
}

function getResponse() {
  for (var i in questions) {
    response[i] = getSelected(parseInt(i) + 1)
  }
  return response
  // console.log(response)
};
//setInterval(getResponse,1000,1)

document.getElementById("submit-btn").onclick = async () => {
  var res = await getResponse()
  console.log(res)
};

async function clearResponses(no) {
  let res = await getSelected(no)
  document.getElementById("Q" + no + "O" + res).checked = false;
}
async function createQuiz(quesData){
  var html = ""
  for(var i in quesData){
    html += await createQues(quesData[i].question,quesData[i].options,parseInt(i)+1)
  }
  return html
}

function Timer(endTime){
  let secLeft = (endTime - new Date().getTime())/1000
  let sec = (parseInt(secLeft) % 60)
  sec = (sec < 10) ? "0" + sec : sec
  let min = parseInt(secLeft/60)
  document.getElementById("timer").innerHTML = min + ":" + sec
  document.getElementById("timer-line").style.width = ((secLeft/info.format_json.total_time_sec)*100) + "%"
 }

