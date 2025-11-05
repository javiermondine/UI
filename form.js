// Form validation for embedded form on index.html using Constraint Validation API
(function () {
  const form = document.getElementById('practice-form');
  if (!form) return;
  const email = document.getElementById('email');
  const country = document.getElementById('country');
  const zip = document.getElementById('zip');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const success = document.getElementById('success');

  const errorFor = name => document.querySelector(`[data-error-for="${name}"]`);

  function setError(input, message) {
    input.setCustomValidity(message || '');
    const target = errorFor(input.name);
    if (target) target.textContent = message || '';
    input.reportValidity();
  }
  function clearError(input) { setError(input, ''); }

  function validateEmail() {
    if (!email.value.trim()) return setError(email, 'El email es obligatorio');
    if (!email.checkValidity()) return setError(email, 'Introduce un email válido');
    clearError(email);
  }
  function validateCountry() {
    if (!country.value.trim()) return setError(country, 'El país es obligatorio');
    clearError(country);
  }
  function validateZip() {
    const val = zip.value.trim();
    if (!val) return setError(zip, 'Introduce un código postal válido de 5 dígitos');
    if (!/^\d{5}$/.test(val)) return setError(zip, 'Introduce un código postal válido de 5 dígitos');
    clearError(zip);
  }
  function validatePassword() {
    const val = password.value;
    if (val.length < 8) return setError(password, 'La contraseña debe tener mínimo 8 caracteres, con letras y números');
    if (!/[A-Za-z]/.test(val) || !/\d/.test(val)) return setError(password, 'La contraseña debe tener mínimo 8 caracteres, con letras y números');
    clearError(password);
  }
  function validateConfirm() {
    if (!confirm.value) return setError(confirm, 'Repite tu contraseña');
    if (confirm.value !== password.value) return setError(confirm, 'Las contraseñas no coinciden');
    clearError(confirm);
  }

  email.addEventListener('input', validateEmail);
  country.addEventListener('input', validateCountry);
  zip.addEventListener('input', validateZip);
  password.addEventListener('input', () => { validatePassword(); if (confirm.value) validateConfirm(); });
  confirm.addEventListener('input', validateConfirm);

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateEmail();
    validateCountry();
    validateZip();
    validatePassword();
    validateConfirm();

    if (form.checkValidity()) {
      success.hidden = false;
      form.reset();
      ['email','country','zip','password','confirm'].forEach(n => errorFor(n).textContent = '');
    } else {
      form.reportValidity();
    }
  });
})();
