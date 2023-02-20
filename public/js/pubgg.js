//owl carousel js

$(window).scroll(function(){
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});
// owl carousel js
$('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2000,
        nav: true,
        dots: false,

        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 4
          }
        },
      });

 //first carousel

//owl carousel js End

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


//*************VALIDATION START PHONE / EMAIL AND MESSAGE**********************//

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

/**********VALIDATION END PHONE / EMAIL AND MESSAGE ***********************************/



//FIREBASE CONNECTION START//

var fconfig = {
  apiKey: "AIzaSyDhGjYbpp3zIUlzllultyAB9ofmbSZNn40",
  authDomain: "d-exch.firebaseapp.com",
  projectId: "d-exch",
  storageBucket: "d-exch.appspot.com",
  messagingSenderId: "853337712947",
  appId: "1:853337712947:web:1d86b600520c51c967f646"
};
firebase.initializeApp(fconfig);
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
//FIREBASE CONNECTION END//


//JOIN NOW CONNECTION START//

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
            UserID: "Pubg",
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
//JOIN-NOW CONNECTION END//



//GOOGLE WITH SIGN IN START//

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
            message: validatemessage(),
            UserID: "pubg",
            login_type: 'google',
            gmail_id: result.user.email,

        })
        .then(() => {
            console.log('date entered23');
                 var mail_obj={
                  to: [result.user.email],
            message: {
              subject: 'Thankyou For Join Us',
              html: `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en" class="os-html">
 <head>
 <title></title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <!--[if mso]>
 <xml>
 <o:OfficeDocumentSettings>
 <o:PixelsPerInch>96</o:PixelsPerInch>
 <o:AllowPNG/>
 </o:OfficeDocumentSettings>
 </xml>
 <![endif]-->
 <link type="text/css" href="https://app-rsrc.getbee.io/public/resources/preview/OverlayScrollbars.css" rel="stylesheet">
 <script type="text/javascript" src="https://app-rsrc.getbee.io/public/resources/preview/OverlayScrollbars.min.js"></script>
 <script>
 document.addEventListener("DOMContentLoaded", function() {
 OverlayScrollbars(document.querySelectorAll("body"), { });
 });
 </script>
 <style>
 *{
 box-sizing: border-box;
 }
 body{
 margin: 0;
 padding: 0;
 }
 a[x-apple-data-detectors] {
 color: inherit !important;
 text-decoration: inherit !important;
 }
 #MessageViewBody a {
 color: inherit;
 text-decoration: none;
 }
 p{
 line-height: inherit
 }
 .desktop_hide,
 .desktop_hide table{
 mso-hide: all;
 display: none;
 max-height: 0px;
 overflow: hidden;
 }
 @media (max-width:720px) {
 .social_block.desktop_hide .social-table {
 display: inline-block!important;
 }
 .row-content {
 width: 100%!important;
 }
 .mobile_hide {
 display: none;
 }
 .stack .column {
 width: 100%;
 display: block;
 }
 .mobile_hide {
 min-height: 0;
 max-height: 0;
 max-width: 0;
 overflow: hidden;
 font-size: 0px;
 }
 .desktop_hide,
 .desktop_hide table {
 display: table!important;
 max-height: none!important;
 }
 }
 </style>
 </head>
 <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;" class="os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-overflow os-host-overflow-y os-host-transition">
 <div class="os-resize-observer-host observed">
 <div class="os-resize-observer" style="left: 0px; right: auto;"></div>
 </div>
 <div class="os-padding">
 <div class="os-viewport os-viewport-native-scrollbars-invisible os-viewport-native-scrollbars-overlaid" style="overflow-y: scroll;">
 <div class="os-content" style="padding: 0px; height: 100%; width: 100%;">
 <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
 <tbody>
 <tr>
 <td>
 <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
 <tbody>
 <tr>
 <td>
 <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #11042b; color: #000000; width: 700px;" width="700">
 <tbody>
 <tr>
 <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
 <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:15px;">
 <div class="alignment" align="center">
 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
 </tr>
 </tbody>
 </table>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="image_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="padding-left:15px;padding-right:15px;width:100%;padding-bottom:5px;">
 <div class="alignment" align="left" style="line-height:10px"><a href="https://ventisports.com/" target="_blank" style="outline:none" tabindex="-1"><img src="https://storage.punterguru.com/images/1674831979881logo.png" style="display: block; height: auto; border: 0; width: 123px; max-width: 100%;" alt="Your Logo" title="Your Logo"></a></div>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
 <table class="button_block block-2" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad">
 <div class="alignment" align="right">
 <!--[if mso]>
 <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://google.com" style="height:42px;width:94px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#f53c87">
 <w:anchorlock/>
 <v:textbox inset="0px,0px,0px,0px">
 <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
 <![endif]--><a href="https://ventisports.com/" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#f53c87;border-radius:4px;width:auto;border-top:0px solid #8a3b8f;font-weight:400;border-right:0px solid #8a3b8f;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Play Now</span></span></a><!--[if mso]>
 </center>
 </v:textbox>
 </v:roundrect>
 <![endif]-->
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
 <tbody>
 <tr>
 <td>
 <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #11042b; color: #000000; width: 700px;" width="700">
 <tbody>
 <tr>
 <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
 <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:25px;">
 <div class="alignment" align="center">
 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
 </tr>
 </tbody>
 </table>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad">
 <h1 style="margin: 0; color: #f53c87; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 43px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Thanks for your subscription</strong></h1>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
 <tbody>
 <tr>
 <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
 <div style="font-family: sans-serif">
 <div class="" style="font-size: 14px; mso-line-height-alt: 21px; color: #ffffff; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
 <p style="margin: 0; font-size: 14px; mso-line-height-alt: 21px;">Thank you for subscribing to Venti Sports! we bring you the best in online combat gaming news and strategies.</p>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
 <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
 <div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/d12425a2-57e5-445b-896d-425ad79fd2ca/anonymous/wallpaperflare.com_wallpaper.jpg" style="display: block; height: auto; border: 0; width: 350px; max-width: 100%;" width="350" alt="Services Company" title="Services Company"></div>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
 <tbody>
 <tr>
 <td>
 <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #11042b; color: #000000; width: 700px;" width="700">
 <tbody>
 <tr>
 <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
 <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="width:100%;text-align:center;padding-top:5px;">
 <h1 style="margin: 0; color: #f53c87; font-size: 23px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">About Us</span></h1>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
 <tbody>
 <tr>
 <td class="pad" style="padding-top:10px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
 <div style="color:#ffffff;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:180%;text-align:center;direction:ltr;letter-spacing:0px;mso-line-height-alt:25.2px; text-align: justify;">
 <p style="margin: 0;">We are dedicated to providing the latest news, gear reviews and expert tips for shooters of all levels. Join our community and improve your skills today !</p>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
 <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="width:100%;text-align:center;padding-top:5px;">
 <h1 style="margin: 0; color: #f53c87; font-size: 23px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Contact Us</span></h1>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
 <tbody>
 <tr>
 <td class="pad">
 <div style="color:#ffffff;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0px;mso-line-height-alt:16.8px;">
 <p style="margin: 0; margin-bottom: 16px;">6391730537</p>
 <p style="margin: mailto:0;">vcventisports@gmail.com</p>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 <table class="social_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
 <tbody>
 <tr>
 <td class="pad" style="text-align:center;padding-top:10px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
 <div class="alignment" align="center">
 <table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
 <tbody>
 <tr>
 <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/profile.php?id=100089307935100" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
 <td style="padding:0 2px 0 2px;"><a href="https://twitter.com/vcventi" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display: block; height: auto; border: 0;"></a></td>
 <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/vcventi/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
 <td style="padding:0 2px 0 2px;"><a href="https://in.pinterest.com/vcventisports/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/pinterest@2x.png" width="32" height="32" alt="Pinterest" title="Pinterest" style="display: block; height: auto; border: 0;"></a></td>
 </tr>
 </tbody>
 </table>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
 <!-- End --><script type="text/javascript" src="https://app-rsrc.getbee.io/public/resources/preview/dark-mode/dark-mode.min.js"></script>
 </div>
 </div>
 </div>
 <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable">
 <div class="os-scrollbar-track os-scrollbar-track-off">
 <div class="os-scrollbar-handle" style="width: 100%; transform: translate(0px, 0px);"></div>
 </div>
 </div>
 <div class="os-scrollbar os-scrollbar-vertical">
 <div class="os-scrollbar-track os-scrollbar-track-off">
 <div class="os-scrollbar-handle" style="height: 98.2%; transform: translate(0px, 0px);"></div>
 </div>
 </div>
 <div class="os-scrollbar-corner"></div>
 </body>
</html>`,
            }
            }

      firebase.auth().signInAnonymously().then( (user) => {
        firestore.collection("mail_system").doc(uuidv4()).set(mail_obj)
        .then(() => {
            console.log('date  2 entered');

        })
        .catch((err) => {
            console.error(err);
        });
      }, (err) => {
        // console.log("errr", err);
      }).catch( (error) => {
        // console.log("catch err", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
//GOOGLE WITH SIGN IN END//



//FACEBOOK WITH SIGN IN START//

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
            UserID: "pubg",
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

//FACEBOOK WITH SIGN IN END//


// EMAIL LINK FOR SEND HTML START//

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
            UserID: "pubg",
            login_type: 'email',
            email_id: mail, 
        })

      })

              


      .catch(function (error) {
        console.error("errors",error);
      });
}

// EMAIL LINK FOR SEND HTML END//



// TIMER FOR OTP//

var interval
startTimer = () => {
  var timeLeft = 5;
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
// OTP TIMER END//



// MOBILE NUMBER VERIFICATION//

var confirmation
function numberverify(){
  startTimer();
    var mobile_numer =validateemailphone();
    console.log('mobile_numer',mobile_numer);
    //--------------------------------------------------phone number
    if (mobile_numer && mobile_numer.length == 10) {
  //     document.getElementById("otp").style.display = "inline-block"; 
  // document.getElementById("idotp").style.display = "inline-block";
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
  
// MOBILE NUMBER VERIFICATION END//

// OTP VALUE START//

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

// OTP VALUE END//

// OTP VALUE CHECK START//

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
                console.log("kaisan ba", result);
                if (result) {
                    console.log("kaisan ba", result);
                    $('#exampleModal').modal('hide');
                    console.log("here is result2");
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
                    console.log("hi baby");
                    $('#exampleModal').modal('hide');
                    console.log("hi baby1");
                    return test_otp ;
                }

            })
    }

}

// OTP VALUE CHECK END//






