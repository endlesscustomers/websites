var formScript = 'https://js.hsforms.net/forms/v2.js';
const hubspotFormsLoaded = document.querySelector("script[src$='"+formScript+"']");

function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', e => reject(e.error));
    document.head.appendChild(script);

    if (!hubspotFormsLoaded) {
      document.head.appendChild(script);
    }
  });
} 

function subFormInj(){
  if (!$(".learningCenter--subscribe-form-target form").length){

    // Script has been added, load our hubspot form
    hbspt.forms.create({
      region: "na1",
      portalId: "145335",
      target: '#learningCenter--subscribe-form-target',
      formId: $('#learningCenter--subscribe-form-target').attr('data-subId')
    });
  } 
}

// Inject form
['click', 'scroll', 'mousemove', 'touchstart'].forEach(function(e) {
  window.addEventListener(e, formInteraction, {
    once: true
  });
});
var userInter = false;

function formInteraction() {
  if ($(".learningCenter--subscribe-form-target form").length){
    if (!userInter) {

      userInter = true;
      if (hubspotFormsLoaded) {
        subFormInj();
      }
      injectScript('https://js.hsforms.net/forms/v2.js')
        .then(() => {
        subFormInj()
      }).catch(error => {
        console.error(error);
      });
    }
  }
}