const formContainer = document.getElementsByClassName("frm");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const steps = document.getElementsByClassName("steps");
const error = document.getElementById("error-message");
const btns = document.getElementsByClassName("btn");
const selectTyped = document.getElementsByClassName('.typed');

const languages = JSON.parse(document.getElementById('langs').innerText);
const skills = JSON.parse(document.getElementById('skil').innerText);
const hobbies = JSON.parse(document.getElementById('hobs').innerText);

const ratelang = document.getElementById("rate-lang-block");
const ratelang2 = document.getElementById("rate-lang-block");
const langoptions = document.getElementById('optionlist');
const loptions = document.getElementById('loptions');
const btnsave = document.getElementById("btnsave");

const hlang = document.getElementById('h-lang');
const hlang2 = document.getElementById('h-lang2');
const langzito = document.getElementsByClassName('input-lang');
const rateLs = document.getElementById('langbtns');
const delbtn = document.getElementsByClassName('btn2');
const addqualific = document.getElementById('addItem');
const addemp = document.getElementById('addjobdet');
maingridview = document.getElementById('maingridview');
btnrem = document.getElementsByClassName('delbtn');
maingridemp = document.getElementById('maingridemp');
btnrememp = document.getElementsByClassName('delemp');
myDatePic1 = document.getElementsByClassName('datepic1');
myDatePic2 = document.getElementsByClassName('datepic2');
myDatePic3 = document.getElementsByClassName('datepic3');

 let backPressedOnce = false;

  function showExitModal() {
    document.getElementById("exitModal").style.display = "flex";
  }

  function closeExitModal() {
    document.getElementById("exitModal").style.display = "none";
  }

  function pushHistoryState() {
    history.pushState({ page: "stay" }, "", "");
  }

  // Setup on load
  window.onload = () => {
    pushHistoryState();
  };

  window.onpopstate = function () {
    if (!backPressedOnce) {
      pushHistoryState(); // prevent leaving
      showExitModal();
      backPressedOnce = true;

      setTimeout(() => {
        backPressedOnce = false;
        closeExitModal();
      }, 3000); // reset after 3 seconds
    } else {
      // Second back press: allow leaving
      closeExitModal();
      history.go(-2);
    }
  };

let currentStep = 0;
let langChk = 0;
let rateLAnguage = 
  '<div class="lanbtnsx">'+
  '<p class="rate-Langs" width=50px>languagePlaceHolder</p>'+
  '<button class="btnx btn1l" id="btn1x" style="--colour:#C0FCC5FF">2</button>' +
  '<button class="btnx btn1l" id="btn2x" style="--colour:#C0FCC5FF">2</button>' +
  '<button class="btnx btn1l" id="btn3x" style="--colour:#8AFC80FF">3</button>' +
  '<button class="btnx btn1l" id="btn4x" style="--colour:#84FC34FF">4</button>' +
  '<button class="btnx btn1l" id="btn5x" style="--colour:#0DFC05FF">5</button>'+
  '<button class="btnx btn1l" id="btn5x" style="--colour:#0DFC05FF">Remove</button>'+
  '</div>';
  
let qualibox = `<div class="qualigrid">
  <div class="form-container frmqua">
  <div class="frmitem" >
  <label >Qualification</label>
  <input type="text" placeholder="Enter Qualification" class="input" name="qualix" />
  </div>
  </div>
  <div class="form-container frmins">
  <div class="frmitem" >
  <label >Institution</label>
  <input type="text" placeholder="Enter Institution name" class="input" name="instix" />
  </div>
  </div>
  <div class="form-container">
  <div class="frmitem" >
  <label class="datelab">From...</label>
  <div class="datething"><input type="date" class="datepic3" id="datepicker3" style="visibility: hidden; position: absolute;">
  <label class="labdate3"  onclick="document.getElementById('datepicker3event').showPicker();">Date</label>
  </div>
  </div>
  </div>
  <div class="form-container frmyr">
  <div class="frmitem" >
  <label >Attachments</label>
  <input placeholder="Add+" type="text" class="input" name="attx"/>
  </div>
  </div>
  <div class="form-container gridrow1">
   <div class="delbtn"></div>
  </div>
  </div>`;
let empbox = `<div class="empingrid">
  <div class="form-container frmqua">
  <div class="frmitem" >
  <label >Employer</label>
  <input type="text" placeholder="Enter Employer/Company" class="input" name="empix" />
  </div>
  </div>
  <div class="form-container frmins">
  <div class="frmitem" >
  <label >Institution</label>
  <input type="text" placeholder="Enter Job title name" class="input" name="jobtit" />
  </div>
  </div>
 <div class="form-container">
  <div class="frmitem" >
  <label class="datelab">To...</label>
  <div class="datething"><input type="date" class="datepic2" id="datepicker2" style="visibility: hidden; position: absolute;"><label class="labdate2"'+
    onclick="document.getElementById('datepicker2event').showPicker();">Date</label></div>
  </div> 
  </div>
  <div class="form-container">
  <div class="frmitem" >
  <label class="datelab">From...</label>
  <div class="datething"><input type="date" class="datepic1" id="datepicker1" style="visibility: hidden; position: absolute;">
  <label class="labdate1"  onclick="document.getElementById('datepicker1event').showPicker();">Date</label>
  </div>
  </div>
  </div>
  <div class="form-container frmitem empresprow1">
  <label >Job responsibilities</label>
  <input type="text" placeholder="Enter Job responsibilities separated by a double foward slash //" class="input" name="-resp"/>
  </div>  
  <div class="form-container gridrow1">
   <div class="delemp"></div>
  </div>  
  </div>`;


window.onload = () => {
  currentStep = 0;
  btns[currentStep].classList.add("highlight");
};
addqualific.addEventListener("click", addQualific);


let qualnd =0;
function addQualific() {

  maingridview = document.getElementById('maingrid');
  let qualIn = qualibox;
  let resp5  = "datepicker3" + qualnd.toString();
  qualIn = String(qualIn).replace("datepicker3", resp5);
    qualIn = String(qualIn).replace("datepicker3event", resp5);
 
  maingridview.insertAdjacentHTML('beforeend', qualIn);

 
  addRemListerns();
  qualnd++;
}
function addRemListerns() {
  maingridview = document.getElementById('maingrid');
  btnrem = document.getElementsByClassName('delbtn');
  for (let i = 0; i < maingridview.children.length; i++) {
    btnrem[i].addEventListener("click", remQulif);
    myDatePic3[i].addEventListener("change", adate);
  }
}
function remQulif(e) {
  let htmlInner = "";
  btnrem = document.getElementsByClassName('delbtn');
  for (let i = 0; i < maingridview.childNodes.length; i++) {
    if (e.target == btnrem[i]) {
      e.target.parentNode.parentNode.parentNode.children[i].remove();
    } else {
    }
  };
}
addemp.addEventListener("click", addEmpin);
let empix =0;
function addEmpin() {
  let empIn = empbox;
  let resp1 = "resp" + empix.toString();
  let resp0  = "datepicker1" + empix.toString();
  let resp2  = "datepicker2" + empix.toString();
  let resp3  = "empix" + empix.toString();
  let resp4  = "jobtit" + empix.toString();
  empIn = String(empIn).replace("-resp", resp1);
  empIn = String(empIn).replace("datepicker1", resp0);
  empIn = String(empIn).replace("datepicker2", resp2);
  empIn = String(empIn).replace("empix", resp3);
  empIn = String(empIn).replace("jobtit", resp4);
  empIn = String(empIn).replace("datepicker1event", resp0);
  empIn = String(empIn).replace("datepicker2event", resp2);
  maingridemp.insertAdjacentHTML('beforeend', empIn);
 // maingridemp.innerHTML += empIn;
  addRemListernsemp();
  empix++;
}
// myDatePic2[0].addEventListener("change", adate);
// myDatePic1[0].addEventListener("change", adate);
function addRemListernsemp() {
  maingridemp = document.getElementById('maingridemp');
  btnrememp = document.getElementsByClassName('delemp');
  for (let i = 0; i < maingridemp.children.length; i++) {
    btnrememp[i].addEventListener("click", rememp);
    myDatePic2[i].addEventListener("change", adate);
    myDatePic1[i].addEventListener("change", adate);
  

  }
}

//myDatePic.addEventListener("change",adate);
function adate() {
  date1 = document.getElementsByClassName('labdate1');
  date2 = document.getElementsByClassName('labdate2');
    date3 = document.getElementsByClassName('labdate3');
  for (let i = 0; i < maingridemp.children.length; i++) {
    if (this == myDatePic1[i]) {
     // myDatePic1[i].innerText=myDatePic1[i].value;
      date1[i].innerText = myDatePic1[i].value;
    } else if (this == myDatePic2[i]) {
     
      date2[i].innerText = myDatePic2[i].value;
    }else if (this == myDatePic3[i]) {
     
      date3[i].innerText = myDatePic3[i].value;
    }

  }

}

function rememp(e) {
  let htmlInner = "";
  btnrememp = document.getElementsByClassName('delemp');
  for (let i = 0; i < maingridemp.childNodes.length; i++) {
    if (e.target == btnrememp[i]) {
      e.target.parentNode.parentNode.parentNode.children[i].remove();
    } else {

    }
  };
}
loptions.addEventListener("click", getLanguage);
langCnt = 0;
function getLanguage(e) {
  if (e.target.nodeName == "UL") {
    if (langChk == 0) {
      langzito[langChk].value = e.target.innerHTML;
    } else {
      const langreplace = document.getElementsByClassName('rate-Langs');
      for (langz in langreplace) {

        if (langreplace[langz].innerText == e.target.innerHTML) {
          alert("Language already on the rate list!!!");
          langzito[langChk].value = "";
          langoptions.classList.add("hide");
          return;
        }
      }
      addLang =rateLAnguage;
      newLang = addLang.replace("btn1x", "btn1x" + langCnt);
      newLang = newLang.replace("btn2x", "btn2x" + langCnt);
      newLang = newLang.replace("btn3x", "btn3x" + langCnt);
      newLang = newLang.replace("btn4x", "btn4x" + langCnt);
      newLang = newLang.replace("btn5x", "btn5x" + langCnt);
      newLang = newLang.replace("languagePlaceHolder", e.target.innerHTML);
      //   newLang = newLang.replace("btn1", "hi");
      //      newLang = newLang.replace("btn1", "hi");
      //         newLang = newLang.replace("btn1", "hi");
      //            newLang = newLang.replace("btn1", "hi");
      rateLs.innerHTML += newLang;
      languageoptions();
     // alert(rateLs.children.length);
      //langreplace[langreplace.length - 1].innerText = e.target.innerHTML;
      langcnt = document.getElementById('langcnt');
      langcnt.innerText = "Rate Languages(" + (langreplace.length -1)+ ")";

      langzito[langChk].value = "";
      langoptions.classList.add("hide");
      langcnt++;
    }
    langoptions.classList.add("hide");
    addListerners();
  }
}
function languageoptions() {
  btn1ls = document.getElementsByClassName('btn1l');

  for (let i = 0; i < btn1ls.length; i++) {
    btn1ls[i].addEventListener("click", highlightBtn);   
  }
}
function highlightBtn(e){
  e.preventDefault();

}
function addListerners() {
  for (let i = 0; i < ratelang.children.length; i++) {
    delbtn[i].addEventListener("click", remLanguage);
  }

}
function remLanguage(e) {
  let htmlInner = "";
  for (let i = 0; i < ratelang.childNodes.length; i++) {

    if (e.target == delbtn[i]) {

      e.target.parentNode.parentNode.children[i].remove();
      const langreplace = document.getElementsByClassName('rate-Langs');
      const langcnt = document.getElementById('langcnt');
      langcnt.innerText = "Rate Languages(" + langreplace.length + ")";
    } else {
    }
  };

}
for (let i = 0; i < langzito.length; i++) {
  element = langzito[i];
  langzito[i].addEventListener("keyup", getlang);
  langzito[i].addEventListener("unfocus", hidepopup);

}
function hidepopup() {

}
for (let i = 0; i < btns.length; i++) {
  element = btns[i];
  btns[i].addEventListener("click", activates);
}

document.getElementById('langs').innerText = "";
function getlang() {
  langoptions.classList.add("hide");
  if (this == langzito[0]) {
    langChk = 0;
  } else {
    langChk = 1;
  }
  if (this.value != "") {

    loptions.innerHTML = "";
    for (lang in languages) {
      inputLan = this.value.toLowerCase();
      inlang = String(languages[lang].name).toLowerCase();
      if (String(inlang).startsWith(inputLan)) {
        langoptions.classList.remove("hide")
        loptions.innerHTML += "<ul >" + languages[lang].name + "</ul>"
      } else {
      };
    }
    langoptions.classList.remove("hide")
  }
}
function rateOtherLangs() {
  loptions.innerHTML += "<ul >" + languages[lang].name + "</ul>"
}

function activates() {
 langoptions.classList.add("hide")
  for (let i = 0; i < formContainer.length; i++) {
    const element = formContainer[i];
    if (btns[i] == this) {
      element.classList.remove("hide");
      element.classList.add('form-active');
      element.classList.add('form-active-animate');

      setTimeout(() => {
        element.classList.remove('form-active-animate');
        element.classList.remove('form-active');
      }, 1000);
    } else {
      element.classList.add("hide");
    }
    btns[i].classList.remove("highlight");
  }
  this.classList.add("highlight");
};

//Password verification
const passwordVerify = (password) => {
  const regEx =
    /^(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[\$\%\^\&\!@\#\*\(\)\+\=`~\?\>\<])/;
  return regEx.test(password) && password.length >= 8;
};

//Phone verification
const phoneVerify = (number) => {
  const regEx = /^[0-9]{10}$/;
  return regEx.test(number);
};

//email verification
const emailVerify = (input) => {
  const regEx = /^[a-z0-9_]+@[a-z]{3,}\.[a-z\.]{3,}$/;
  return regEx.test(input);
};
const areFieldsFilled = () => {
  const currentStepContainer = formContainer[currentStep];
  const inputs = currentStepContainer.querySelectorAll("input");
  for (let input of inputs) {
    const inputValue = input.value.trim();
    switch (input.type) {
      case "email":
        if (!emailVerify(inputValue)) {
          error.innerText = "Please enter correct e-mail";
          return false;
        }
        break;
      case "number":
        if (!parseInt(inputValue)) {
          error.innerText = "Please enter correct number";
          return false;
        }
        if (input.id == "phone-input" && !phoneVerify(inputValue)) {
          error.innerText = "Phone number should have 10 digits";
          return false;
        }
        break;
      case "password":
        if (!passwordVerify(inputValue)) {
          error.innerText =
            "Password should have uppercase,lowercase,special symbols, number and length >= 8";
          return false;
        }
        break;
      default:
        if (inputValue === "") {
          error.innerText = "Please enter both the values first";
          return false;
        }
        break;
    }
  }
  error.innerText = "";
  return true;
};
