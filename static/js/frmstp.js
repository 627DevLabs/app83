const formContainer = document.getElementsByClassName("frm");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const steps = document.getElementsByClassName("steps");
const error = document.getElementById("error-message");
const btns = document.getElementsByClassName("btn");
const selectTyped = document.getElementsByClassName('.typed');
const languages = JSON.parse(document.getElementById('langs').innerText);

const ratelang = document.getElementById("rate-lang-block");
const ratelang2 = document.getElementById("rate-lang-block");
const langoptions = document.getElementById('optionlist');
const loptions = document.getElementById('loptions');

const hlang = document.getElementById('h-lang');
const hlang2 = document.getElementById('h-lang2');
const langzito = document.getElementsByClassName('input-lang');
const rateLs = document.getElementsByClassName('rate-language');
const delbtn = document.getElementsByClassName('btn2');
const addqualific = document.getElementById('addItem');
const addemp = document.getElementById('addjobdet');
maingridview = document.getElementById('maingridview');
btnrem = document.getElementsByClassName('frmitemX');
maingridemp = document.getElementById('maingridemp');
btnrememp = document.getElementsByClassName('frmitemXemp');
myDatePic1 = document.getElementsByClassName('datepic1');
myDatePic2 = document.getElementsByClassName('datepic2');

let currentStep = 0;
let langChk = 0;
let rateLAnguage = '<div class="rate-language">' +
  '<p class="rate-Langs" style="--position:1">Rate Languages</p>' +
  '<button class="btn1" style="--colour:#F8FCF8FF">1</button>' +
  '<button class="btn1" style="--colour:#C0FCC5FF">2</button>' +
  '<button class="btn1" style="--colour:#8AFC80FF">3</button>' +
  '<button class="btn1" style="--colour:#84FC34FF">4</button>' +
  '<button class="btn1" style="--colour:#0DFC05FF">5</button>' +
  '<div class="bi bi-file-minus-fill me-3 btn2"></div>' +
  '</div>';
let qualibox = '<div class="qualigrid">' +
  '<div class="form-container frmqua">' +
  '<div class="frmitem" >' +
  '<label >Qualification</label>' +
  '<input type="text" placeholder="Enter Qualification" class="input" name="qualix" />' +
  '</div>' +
  '</div>' +
  '<div class="form-container frmins">' +
  '<div class="frmitem" >' +
  '<label >Institution</label>' +
  '<input type="text" placeholder="Enter Institution name" class="input" name="instix" />' +
  '</div>' +
  '</div>' +
  '<div class="form-container frmyr">' +
  '<div class="frmitem" >' +
  '<label >Year Obtained</label>' +
  '<input placeholder="Enter year" type="text" class="input" name="yobtx" />' +
  '</div>' +
  '</div>' +
  '<div class="form-container frmyr">' +
  '<div class="frmitem" >' +
  '<label >Attach Qualification</label>' +
  '<input placeholder="Enter year" type="text" class="input" name="attx"/>' +
  '</div>' +
  '</div>' +
  '<div class="form-container gridrow1">' +
  '<div class="frmitemX" >' +
  'remove' +
  '</div>' +
  '</div>' +
  '</div>';

let empbox = '<div class="empligrid">' +
  '<div class="form-container">' +
  '<div class="frmitem" >' +
  '<label >Employer</label>' +
  '<input type="text" placeholder="Enter Employer/Company name" class="input" name="employ"/>' +
  '</div>' +
  '</div>' +
  '<div class="form-container">' +
  '<div class="frmitem" >' +
  '<label >Job Title/Post</label>' +
  '<input type="text" placeholder="Enter Job title"  class="input"  name="jobtit"/>' +
  '</div>' +
  '</div>' +
  '<div class="form-container">' +
  '<div class="frmitem" >' +
  '<label >Duration from</label>' +
  '<input type="date" class="input" id="dob-input" />' +
  '</div>' +
  '</div>' +
  '<div class="form-container">' +
  '<div class="frmitem" >' +
  '<label >Duration to</label>' +
  '<input type="date" class="input" id="dob-input" />' +
  '</div>' +
  '</div>' +
  '<div class="form-container jopresp">' +
  '<div class="frmitem" >' +
  '<label >Job responsibilities</label>' +
  '<input type="text" placeholder="Enter Job responsibilities separated by a double foward slash '//'" class="input" name="jobtitle"/>'+
'</div>' +
  '</div>' +
  '<div class="form-container gridrow1x">' +
  '<div class="frmitemX" >' +
  'remove' +
  '</div>' +
  '</div>' +
  '</div>'
window.onload = () => {
  currentStep = 0;
  btns[currentStep].classList.add("highlight");
};
addqualific.addEventListener("click", addQualific);



function addQualific() {
  maingridview.innerHTML += qualibox;
  addRemListerns();
}
function addRemListerns() {
  maingridview = document.getElementById('maingridview');
  btnrem = document.getElementsByClassName('frmitemX');
  for (let i = 0; i < maingridview.children.length; i++) {
    btnrem[i].addEventListener("click", remQulif);
  }
}
function remQulif(e) {
  let htmlInner = "";
  btnrem = document.getElementsByClassName('frmitemX');
  for (let i = 0; i < maingridview.childNodes.length; i++) {
    if (e.target == btnrem[i]) {
      e.target.parentNode.parentNode.parentNode.children[i].remove();
    } else {
    }
  };
}
addemp.addEventListener("click", addEmpin);
function addEmpin() {
  maingridemp.innerHTML += empbox;
  addRemListernsemp();
}
// myDatePic2[0].addEventListener("change", adate);
// myDatePic1[0].addEventListener("change", adate);
function addRemListernsemp() {
  maingridemp = document.getElementById('maingridemp');
  btnrememp = document.getElementsByClassName('frmitemXemp');
  for (let i = 0; i < maingridemp.children.length; i++) {
    btnrememp[i].addEventListener("click", rememp);
    myDatePic2[i].addEventListener("change", adate);
    myDatePic1[i].addEventListener("change", adate);
  }
}
//myDatePic.addEventListener("change",adate);
function adate() {
for (let i = 0; i < maingridemp.children.length; i++) {
  if(this == myDatePic1[i] ){
 alert(myDatePic1[i].classList );
  }else if(this == myDatePic2[i] ){
alert("Date 2" );
  }
   
  }
 
}

function rememp(e) {
  let htmlInner = "";
  btnrememp = document.getElementsByClassName('frmitemXemp');
  for (let i = 0; i < maingridemp.childNodes.length; i++) {
    if (e.target == btnrememp[i]) {
      e.target.parentNode.parentNode.parentNode.children[i].remove();
    } else {
    }
  };
}
loptions.addEventListener("click", getLanguage);
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
      ratelang.innerHTML += rateLAnguage;
      langreplace[langreplace.length - 1].innerText = e.target.innerHTML;
      const langcnt = document.getElementById('langcnt');
      langcnt.innerText = "Rate Languages(" + langreplace.length + ")";

      langzito[langChk].value = "";
      langoptions.classList.add("hide");
    }
    langoptions.classList.add("hide");
    addListerners();
  }
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
  alert("Ohh yeah Ohh yeah");
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
