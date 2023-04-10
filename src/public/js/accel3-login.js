$('#login-form').addEventListener('submit', (event) => {
  if (!isValid || !isValidSubmit()) {
    event.preventDefault();
    return;
  }
});