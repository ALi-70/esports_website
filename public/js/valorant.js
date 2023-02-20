// header
$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

// *********************** product card slider *****************
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

// *********************** form js *****************


function validateemailphone(){
var em = document.getElementById('emailphone').value;  
var em1 = document.getElementById('message').value;
var pattern_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
var pattern = /[9876][0-9]{9}/;  
  if(isNaN(em)){
    document.getElementById('div1').innerHTML = "Not valid email";
    document.getElementById('div1').style.color = "red";   
    // document.getElementById('join_now').disabled = true;
  if (pattern_email.test(em)== true) {
    document.getElementById('div1').innerHTML = "";
    document.getElementById('div1').style.color = "";   
    // document.getElementById('join_now').disabled = false;

    return em;
  }
    console.log("char");
  }
  else {
    document.getElementById('div1').innerHTML = "Not valid number";
    document.getElementById('div1').style.color = "red";
    // document.getElementById('join_now').disabled = true;
console.log('hell fire error')
if(pattern.test(em) == true && (em.length == 10)){
  document.getElementById('div1').innerHTML = "";
  document.getElementById('div1').style.color = "";
  // document.getElementById('join_now').disabled = false;

  return em;
}
    console.log("number");
  }
}

function validatemessage()
{
  var em1 = document.getElementById('emailphone').value;
  var em = document.getElementById('message').value;
  console.log("validateemailphone",validateemailphone());

  if(em.length < 1 ) {
    // document.getElementById('join_now').disabled = true;
    document.getElementById('div2').innerHTML = "Enter atleast 1 character";
    document.getElementById('div2').style.color = "red";
  }
  else{
    document.getElementById('div2').innerHTML = "";
    document.getElementById('div2').style.color = "";
    // document.getElementById('join_now').disabled = false;
    return em;
  }
}



function btndisable(){
  if(validateemailphone() && validatemessage()){
    document.getElementById('join_now').disabled = false;
  }else{
    document.getElementById('join_now').disabled = true;
  }

}
// ----------------------valdation end---------------------

var fconfig = {
  apiKey: "AIzaSyDhGjYbpp3zIUlzllultyAB9ofmbSZNn40",
  authDomain: "d-exch.firebaseapp.com",
  projectId: "d-exch",
  storageBucket: "d-exch.appspot.com",
  messagingSenderId: "853337712947",
  appId: "1:853337712947:web:1d86b600520c51c967f646"
};
firebase.initializeApp(fconfig);
  // console.log('result',firebase.initializeApp(fconfig));
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: "invisible"
})
window.recaptchaVerifier.render();
var firestore = firebase.firestore();



 function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function GoogleSignIn(){
  console.log('result1');

    const provider = new firebase.auth.GoogleAuthProvider();
      console.log('provider',provider);
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // console.log('result',result);
        // console.log('email',result.user.email);
          var token = result.credential.accessToken;
          var user = result.user;
          var email = result.user.email;
          console.log('email444444',result.user.email);
          firestore.collection("ventisports_clients").doc(uuidv4()).set({
            active: 1,
            deleted: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            id: uuidv4(),
            UserID: "fifa",
            login_type: 'google',
            gmail_id: result.user.email,

        })
        .then(() => {
            console.log('date entered23');
        })
        .catch((err) => {
            console.error(err);
        });
        }).catch(function(error) {
            console.log('error',error);
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        }); 
}

function FacebookSignIn() {
    const provider = new firebase.auth.FacebookAuthProvider();
    console.log('fbprovider',provider);
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log('result',result);
        // console.log('email',result.user.facebook);
          var token = result.credential.accessToken;
          var user = result.user;
          var email = result.user.email;
          firestore.collection("ventisports_clients").doc(uuidv4()).set({
            active: 1,
            deleted: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            id: uuidv4(),
            message: validatemessage(),
            UserID: "fifa",
            login_type: 'facebook',
            // facebook_id: result.user.facebook,

        })


        }).catch(function(error) {
            console.log('error',error);
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        }); 
}




function emailLink(){
    var mail = validateemailphone();
    console.log('mob_mail',mail);
    const actionCodeSettings = {
      url: 'https://ventisports.com/',
      handleCodeInApp: true,
  };
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().sendSignInLinkToEmail(mail, actionCodeSettings)
              .then(() => {
            firestore.collection("ventisports_clients").doc(uuidv4()).set({
            active: 1,
            deleted: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            id: uuidv4(),
            message: validatemessage(),
            UserID: "fifa",
            login_type: 'email',
            email_id: mail,

        })


        // console.error("result",result);
                window.localStorage.setItem('emailForSignIn',mail);

      })
      .catch(function (error) {
        console.error("errors",error);
      });
}



function joinnow(){
var pattern_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
  if (pattern_email.test(validateemailphone()) == true ){
    document.getElementById('otpmsg').style.display = "none";
    document.getElementById('emailmsg').style.display = "block";
      console.log ("mf1")

    var mail = validateemailphone();
    console.log('mob_mail',mail);
    const actionCodeSettings = {
      url: 'https://ventisports.com/',
      handleCodeInApp: true,
  };
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().sendSignInLinkToEmail(mail, actionCodeSettings)
              .then(() => { 
            firestore.collection("ventisports_clients").doc(uuidv4()).set({
            active: 1,
            deleted: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            id: uuidv4(),
            message: validatemessage(),
            UserID: "freefire",
            login_type: 'email',
            email_id: mail,

        })
      })
      .catch(function (error) {
        console.error("errors",error);
      });
  }else{

    console.log ("mf2")
    document.getElementById('otpmsg').style.display = "block";
    document.getElementById('emailmsg').style.display = "none";

    numberverify()


  }
}
var interval
startTimer = () => {
  var timeLeft = 180;
  document.getElementById("otp_timer").innerHTML = ""
  document.getElementById("otp_resend").style.display = "none";
  document.getElementById("otp_timer").style.display = "inline-block";
  interval = setInterval(() => {
    if (timeLeft > 0) {
      var pass_time = timeLeft--;
      // document.getElementById("otp_resend").style.visibility = "visible";
      document.getElementById("otp_timer").innerHTML = pass_time + " " + "s";
    } else {
      pauseTimer();
      interval = null;
      timeLeft = null
      document.getElementById("otp_timer").style.display = "none";
      document.getElementById("otp_resend").style.display = "inline-block";
    }
  }, 1000);
}
pauseTimer = () => {
  clearInterval(interval);
}


var confirmation
function numberverify(){
  startTimer();

  // pauseTimer();   
  // startTimer();

    var mobile_numer =validateemailphone();
    console.log('mobile_numer',mobile_numer);
    //--------------------------------------------------phone number
    if (mobile_numer && mobile_numer.length == 10) {
        console.log('mob_mail2',mobile_numer);
        const appVerifier = window.recaptchaVerifier;
        console.log("123456789", appVerifier)
        const phoneValue = "+91" + mobile_numer;
        console.log('sdgahbj', phoneValue);
        firebase.auth().signInWithPhoneNumber(phoneValue,appVerifier)
            .then((confirmationResult) => {
                if (confirmationResult) {
                    window.confirmationResult = confirmationResult;
                    confirmation = window.confirmationResult;
                    console.log("console", confirmation)
                    return true;
                }
            }).catch(error => console.log(error));
    } else {
        $('#otp_box').hide();
        alert('Enter the number please')
        return false
    }
}
var test_otp = false;
function otpverify(){
  
  console.log("getotpval()",getotpval())
  console.log("confirmation()",confirmation);

    //--------------------------------------------------phone number
    if (getotpval() && confirmation) {
        console.log("hey babe")
        // document.getElementById("otp_submit").disabled = false;
        confirmation
            .confirm(getotpval())
            .then((result) => {
                console.log("kaisan ba", result)
                if (result) {
                    console.log("kaisan ba", result)
                    alert('otp Verified')
                    

            firestore.collection("ventisports_clients").doc(uuidv4()).set({
            active: 1,
            deleted: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            id: uuidv4(),
            message: validatemessage(),
            UserID: "pubg",
            login_type: 'otp verify',
            phone_number: validateemailphone(),

        })
                    return test_otp = true;
                } else {
                    console.log("hi baby")
                    return test_otp ;
                }

            })
    }

}

function getotpval(){
  var otp1=document.getElementById('otp1').value
  var otp2=document.getElementById('otp2').value
  var otp3=document.getElementById('otp3').value
  var otp4=document.getElementById('otp4').value
  var otp5=document.getElementById('otp5').value
  var otp6=document.getElementById('otp6').value

  var total_otp= otp1+otp2+otp3+otp4+otp5+otp6;
  return total_otp;
}


// ____________________otp________________________________________________


const OTPCodeInput = [...document.querySelectorAll('.otc-input')];
const firstInput = document.getElementById('otc-1');
const otpForm = document.getElementById('otp-form');
const otpDataParagraph = document.getElementById('otp-data');

const populateNextInput = (targetEl, inputValue) => {
  // Apply first item to first input
  targetEl.value = inputValue[0];
  // remove the first character
  const newInputValue = inputValue.substring(1);

  if (targetEl.nextElementSibling && targetEl.nextElementSibling.tagName === 'INPUT') {
    targetEl.nextElementSibling.select();
    // Do the same to the next element and next data
    if (newInputValue.length) {
      populateNextInput(targetEl.nextElementSibling, newInputValue);
    }
  }
};

const spreadNumber = (targetEl, inputValue) => {
  // one more check to secure spreading digits
  if (!inputValue || (inputValue && inputValue.length === 1)) {
    return;
  }

  populateNextInput(targetEl, inputValue);
};

const toggleSubmitButton = (disabled) => {
  const optInSubmitButton = document.getElementById("otp-submit-button");

  // optInSubmitButton.disabled = disabled;
};

const validateInputs = () => {
  const incorrectInput = OTPCodeInput.find(
    (inputElement) =>
      !inputElement.value || (inputElement.value && isNaN(inputElement.value))
  );

  if (incorrectInput) {
    toggleSubmitButton(true);
  } else {
    toggleSubmitButton(false);
  }
};

const handleOTPInputChange = (e) => {
  // remove non-digit inputs
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/\D/g, "");
  console.log(inputValue);
  // if enter more than one digits at a time, i.e copy pasting or typing really fast, spread the value to sibling inputs, otherwise do nothing
  if (inputValue.length > 1) {
    spreadNumber(e.target, inputValue);
  } else {
    e.target.value = inputValue;
    // move the pointer to next input field if use has done typing
    if (inputValue && e.target.nextElementSibling && e.target.nextElementSibling.tagName === 'INPUT') {
      e.target.nextElementSibling.select();
    }
  }

  validateInputs();
};

// setup input fields event listeners
if (OTPCodeInput) {
  OTPCodeInput.forEach(function (inputField) {
    // control on keyup to catch user intention such as 'delete', 'move forward', 'move backward'
    inputField.addEventListener("keyup", function (e) {
      // On Backspace or left arrow, go to the previous field.
      if (
        (e.keyCode === 8 || e.keyCode === 37) &&
        this.previousElementSibling &&
        this.previousElementSibling.tagName === "INPUT"
      ) {
        this.previousElementSibling.focus();
      }
        if (e.keyCode === 39 &&
        this.nextElementSibling &&
        this.nextElementSibling.tagName === "INPUT"
      ) {
        this.nextElementSibling.select();
      }
    });
   
    // inputField.addEventListener("focus", function (e) {
    //   // If the focus element is the first one, do nothing
    //   if (this === firstInput) {
    //     return;
    //   }
    //   // If value of input 1 is empty, focus it.
    //   if (firstInput.value === "") {
    //     firstInput.focus();
    //   }
    
    //   if (this.previousElementSibling.value === "") {
    //     this.previousElementSibling.focus();
    //   }
    // });

    inputField.addEventListener("input", handleOTPInputChange);
  });
}

const concatNumber = () => {
  const miniInputs = [...document.querySelectorAll(".mini")];
  otpInput.value = miniInputs.map((input) => input.value).join("");
};

if (otpForm) {
  otpForm.addEventListener("submit", concatNumber);
}



// __________________otp end_______________________________________
