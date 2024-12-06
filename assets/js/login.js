import { formatePrice, sleep } from "./helper.js";

const sectionOne = document.querySelector(".section-one");
const sectionTwo = document.querySelector(".section-two");
const backForm = document.querySelector(".go-back");

const inpPhone = document.querySelector("#phone");
const inpAccepted = document.querySelector("#accepted");
const formCrtlElIpu = document.querySelector('[data-role="phone"]');
const errElAccepted = document.querySelector('[data-err="accepted"]');
const errElPhone = document.querySelector('[data-err="phone"]');
const btnSendCode = document.querySelector('[data-role="send-code"]');
const rootErrEl = document.querySelector('[data-err="rootErr"]');
const optInputs = document.querySelectorAll(".otp-input");
const otpVrify = document.querySelector("#otpVrify");
const editPhone = document.querySelector("#edit__phone");
const phoneNumber = document.querySelector("#phone__number");
const otpErrEl = document.querySelector("#otp__err");
// countdown start
const sendNewCode = document.getElementById("send__new__code");
const countdown = document.getElementById("count__down");
const timing = document.querySelector(".timing");

const otpCodeServer = "123456";

let startSec = 120;
let timeinterval;

let formData = {
  phone: "",
  accepted: false,
};
let errorphone = {
  isError: false,
  message: "",
};
let errAccepted = {
  isError: false,
  message: "",
};
let rootErr = {
  isError: false,
  message: "",
};
function validateMobileNumber(phoneNumber) {
  // الگوی شماره تلفن همراه ایران
  const pattern = /^09\d{9}$/;
  return pattern.test(phoneNumber);
}

inpPhone.addEventListener("input", (e) => {
  if (validateMobileNumber(inpPhone.value)) {
    errorphone = {
      isError: false,
      message: "",
    };
    formCrtlElIpu.classList.remove("invalid");
    errElPhone.classList.remove("err");
    errElPhone.textContent = errorphone.message;
    btnSendCode.disabled = false;
    formData.phone = inpPhone.value;
    return;
  } else {
    errorphone = {
      isError: true,
      message: "شماره تلفن با 09 شروع شود و بیش از 11 رقم نباشد",
    };
    errElPhone.textContent = error.message;
  }
  btnSendCode.style.pointerEvents = "auto";
});

inpPhone.addEventListener("change", (e) => {
  if (inpPhone.value.trim() === "" || errorphone.isError) {
    errorphone = {
      isError: true,
      message: "شماره تلفن با 09 شروع شود و بیش از 11 رقم نباشد",
    };
    formCrtlElIpu.classList.add("invalid");
    errElPhone.classList.add("err");
    errElPhone.textContent = errorphone.message;
    btnSendCode.disabled = true;
  } else {
    errorphone = {
      isError: false,
      message: "",
    };
    formCrtlElIpu.classList.remove("invalid");
    errElPhone.classList.remove("err");
    errElPhone.textContent = errorphone.message;
    btnSendCode.disabled = false;
    formData.phone = inpPhone.value;
    return;
  }
  btnSendCode.style.pointerEvents = "auto";
});

inpAccepted.addEventListener("change", (e) => {
  if (!e.target.checked) {
    errAccepted = {
      isError: true,
      message: "لطفا با شرایط ما موافقت کنید",
    };
  } else {
    errAccepted = {
      isError: false,
      message: "",
    };
    formData.accepted = e.target.checked;
  }
  errElAccepted.classList.add("err");
  errElAccepted.textContent = errAccepted.message;
  btnSendCode.disabled = errAccepted.isError;
  btnSendCode.style.pointerEvents = "auto";
});

btnSendCode.addEventListener("click", (e) => {
  e.preventDefault();
  btnSendCode.style.pointerEvents = "none";
  if (
    formData.phone.trim() == "" ||
    formData.accepted == false ||
    errorphone.isError ||
    errAccepted.isError ||
    !validateMobileNumber(formData.phone)
  ) {
    rootErr = {
      isError: true,
      message: "لطفا با شرایط ما موافقت کنید و شماره تلفن خود را وارد کنید.",
    };
    rootErrEl.classList.add("err");
    rootErrEl.textContent = rootErr.message;
    btnSendCode.disabled = rootErr.isError;
  } else {
    rootErr = {
      isError: false,
      message: "",
    };
    rootErrEl.classList.remove("err");
    rootErrEl.textContent = rootErr.message;
    btnSendCode.disabled = rootErr.isError;
    btnSendCode.querySelector(".text-btn").style.display = "none";
    btnSendCode.querySelector(".loader").style.display = "inline-block";
    sleep(1000).then((res) => {
      console.log(res);
      sectionOne.classList.remove("active");
      sectionTwo.classList.add("active");
      backForm.style.display = "block";
      phoneNumber.innerHTML = formData.phone;
      optInputs[0].disabled = false;
      optInputs[0].focus();
      btnSendCode.querySelector(".text-btn").style.display = "inline-block";
      btnSendCode.querySelector(".loader").style.display = "none";
      sendNewCode.style.display = "none";
      btnSendCode.style.pointerEvents = "auto";
      countdowntimer(startSec);
    });
  }
});

backForm.addEventListener("click", backToForm);
editPhone.addEventListener("click", backToForm);
function backToForm() {
  sectionOne.classList.add("active");
  sectionTwo.classList.remove("active");
  backForm.style.display = "none";
  clearInterval(timeinterval);
  countdown.innerHTML = "02:00";
  optInputs.forEach((input) => {
    input.value = "";
    input.disabled = true;
  });
}
// otp inpus validetion

// event lisner for each input and vrify otp code
optInputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    const currentInp = input;
    const nexInp = currentInp.nextElementSibling;
    const prevInp = currentInp.previousElementSibling;
    if (currentInp.value.length > 1) {
      currentInp.value = "";
      return;
    }

    if (
      nexInp &&
      nexInp.hasAttribute("disabled") &&
      currentInp.value.length !== ""
    ) {
      nexInp.removeAttribute("disabled");
      nexInp.focus();
    }

    if (e.key === "Backspace") {
      optInputs.forEach((input, i) => {
        if (index <= i && prevInp) {
          input.setAttribute("disabled", true);
          currentInp.value = "";
          prevInp.focus();
        }
      });
    }

    // checking input value
    if (!optInputs[5].disabled && optInputs[5].value !== "") {
      otpVrify.disabled = false;
      optInputs.forEach((inp) => inp.classList.add("active"));
      return;
    }
    otpVrify.disabled = true;
    otpVrify.style.pointerEvents = "auto";
  });
});
otpVrify.addEventListener("click", () => {
  otpVrify.style.pointerEvents = "none";
  let otp = "";
  optInputs.forEach((input) => {
    otp += input.value;
  });
  if (otp.trim().length < 6 || otp !== otpCodeServer) {
    otpErrEl.textContent = "کد را به صورت صحیح وارد کنید";
    optInputs.forEach((input) => {
      input.value = "";
      input.disabled = true;
    });
    optInputs[0].disabled = false;
    optInputs[0].focus();

    otpVrify.disabled = true;
    return;
  }
  otpErrEl.textContent = "";
  otpVrify.querySelector(".text-btn").style.display = "none";
  otpVrify.querySelector(".loader").style.display = "inline-block";
  // login user
  sleep(800).then((res) => {
    otpVrify.innerHTML = "ورود موفقیت امیز بود";
    setUserFromLocalStorage({
      ...formData,
      otp: otp,
    });
    sleep(400).then((res) => {
      otpVrify.innerHTML = "کمی صبر کنید ...";
      sleep(300).then((res) => {
        otpVrify.innerHTML = "ورود ...";
        window.location.href = ".";
      });
    });
  });
});

// send new code for user
sendNewCode.addEventListener("click", (e) => {
  e.preventDefault();
  countdowntimer(startSec);
});
// counter down timer
function countdowntimer(time) {
  timing.style.display = "flex";
  sendNewCode.style.display = "none";
  timeinterval = setInterval(function () {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    countdown.innerHTML =
      minutes.toString().padStart(2, "0") +
      ":" +
      (seconds < 10 ? "0" : seconds);
    time--;
    if (time === 0) {
      countdown.innerHTML = "02:00";
      timing.style.display = "none";
      sendNewCode.style.display = "flex";
      clearInterval(timeinterval);
    }
  }, 1000);
}
// add user data from local storage
function setUserFromLocalStorage(data) {
  localStorage.setItem("user", JSON.stringify(data));
}
