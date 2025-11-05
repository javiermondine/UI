// Constraint Validation API + validación en vivo
(function () {
  const form = document.getElementById('practice-form');
  const email = document.getElementById('email');
  const country = document.getElementById('country');
  const zip = document.getElementById('zip');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const success = document.getElementById('success');

  const errorFor = name => document.querySelector(`[data-error-for="${name}"]`);

  // Helpers
  function setError(input, message) {
    input.setCustomValidity(message || '');
    const target = errorFor(input.name);
    if (target) target.textContent = message || '';
    input.reportValidity();
  }

  function clearError(input) {
    setError(input, '');
  }

  // Validaciones específicas
  function validateEmail() {
    if (!email.value.trim()) {
      return setError(email, 'El email es obligatorio');
    }
    if (!email.checkValidity()) {
      return setError(email, 'Introduce un email válido');
    }
    clearError(email);
  }

  function validateCountry() {
    if (!country.value.trim()) {
      return setError(country, 'El país es obligatorio');
    }
    clearError(country);
  }

  function validateZip() {
    const val = zip.value.trim();
    if (!val) {
      return setError(zip, 'Introduce un código postal válido de 5 dígitos');
    }
    const re = /^\d{5}$/;
    if (!re.test(val)) {
      return setError(zip, 'Introduce un código postal válido de 5 dígitos');
    }
    clearError(zip);
  }

  function validatePassword() {
    const val = password.value;
    if (val.length < 8) {
      return setError(password, 'La contraseña debe tener mínimo 8 caracteres, con letras y números');
    }
    const hasLetter = /[A-Za-z]/.test(val);
    const hasNumber = /\d/.test(val);
    if (!hasLetter || !hasNumber) {
      return setError(password, 'La contraseña debe tener mínimo 8 caracteres, con letras y números');
    }
    clearError(password);
  }

  function validateConfirm() {
    if (!confirm.value) {
      return setError(confirm, 'Repite tu contraseña');
    }
    if (confirm.value !== password.value) {
      return setError(confirm, 'Las contraseñas no coinciden');
    }
    clearError(confirm);
  }

  // Eventos de validación en vivo
  email.addEventListener('input', validateEmail);
  country.addEventListener('input', validateCountry);
  zip.addEventListener('input', validateZip);
  password.addEventListener('input', () => {
    validatePassword();
    // también revalidar confirm si ya tiene valor
    if (confirm.value) validateConfirm();
  });
  confirm.addEventListener('input', validateConfirm);

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    // Ejecutar todas las validaciones
    validateEmail();
    validateCountry();
    validateZip();
    validatePassword();
    validateConfirm();

    if (form.checkValidity()) {
      success.hidden = false;
      // feedback visual breve
      success.classList.add('pop');
      setTimeout(() => success.classList.remove('pop'), 400);
      form.reset();
      // limpiar mensajes de error
      ['email', 'country', 'zip', 'password', 'confirm'].forEach(n => errorFor(n).textContent = '');
    } else {
      // Forzar que el navegador muestre el tooltip de error si faltó alguno
      form.reportValidity();
    }
  });
})();
