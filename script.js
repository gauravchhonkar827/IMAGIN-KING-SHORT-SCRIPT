const FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfV9yA5bCdlBmn-VihPp4ybMoiW_iHuN6fRC0sAzmZKIV9WzQ/formResponse";
const ENTRY_SCRIPT = "entry.1729689486"; // <-- replace with your real entry id
(function () {
  const form = document.getElementById('ik-form');
  const scriptEl = document.getElementById('ik-script');
  const upiEl = document.getElementById('ik-upi');
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
    const script = scriptEl.value.trim();
    const upi = upiEl.value.trim();
    if (!script || !upi) {
      e.preventDefault();
      showMsg('Kripya script aur UPI ID dono bharein.', false);
      return;
    }

    if (ENTRY_SCRIPT.includes('XXXX') || ENTRY_UPI.includes('YYYY')) {
      e.preventDefault();
      showMsg('Setup abhi baaki hai: script.js me entry IDs daalein.', false);
      return;
    }

    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    awaitingResponse = true;

    form.action = FORM_ACTION_URL;
    form.method = 'POST';
    form.target = 'ik-hidden-iframe';
    scriptEl.name = ENTRY_SCRIPT;
    upiEl.name = ENTRY_UPI;

    form.submit();
  });
})();
