const FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfV9yA5bCdlBmn-VihPp4ybMoiW_iHuN6fRC0sAzmZKIV9WzQ/formResponse";
const ENTRY_SCRIPT = "entry.1729689486"; // <-- yahan apna real entry ID daalo

(function () {
  const form = document.getElementById('ik-form');
  const scriptEl = document.getElementById('ik-script');
  const submitBtn = document.getElementById('ik-submit-btn');
  const msgEl = document.getElementById('ik-msg');
  const iframe = document.getElementById('ik-hidden-iframe');

  function showMsg(text, ok) {
    msgEl.textContent = text;
    msgEl.className = 'ik-msg ' + (ok ? 'ok' : 'err');
  }

  let awaitingResponse = false;

  iframe.addEventListener('load', function () {
    if (!awaitingResponse) return;
    awaitingResponse = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Script';
    showMsg('Cut! Aapka script safaltapoorvak submit ho gaya.', true);
    form.reset();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const script = scriptEl.value.trim();
    if (!script) {
      showMsg('Kripya apna script likhein.', false);
      return;
    }
    if (ENTRY_SCRIPT.includes('XXXX')) {
      showMsg('Setup abhi baaki hai: script.js me entry ID daalein.', false);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    awaitingResponse = true;

    form.action = FORM_ACTION_URL;
    form.method = 'POST';
    form.target = 'ik-hidden-iframe';
    scriptEl.name = ENTRY_SCRIPT;

    form.submit();
  });
})();
