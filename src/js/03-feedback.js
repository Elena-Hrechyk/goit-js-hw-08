import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');

const KEY_LOCAL = 'feedback-form-state';
const saveCurrentInput = localStorage.getItem(KEY_LOCAL) ?? {
  email: '',
  message: '',
};

reloadPage();

feedbackForm.addEventListener('submit', onSubmitForm);
feedbackForm.addEventListener('input', throttle(saveInputData, 500));

function onSubmitForm(evt) {
  evt.preventDefault();
  const currentInput = JSON.parse(localStorage.getItem(KEY_LOCAL));
  evt.currentTarget.reset();
  console.log(currentInput);
  localStorage.removeItem(KEY_LOCAL);
}

function saveInputData() {
  saveCurrentInput['email'] = emailInput.value.trim();
  saveCurrentInput['message'] = messageInput.value.trim();
  localStorage.setItem(KEY_LOCAL, JSON.stringify(saveCurrentInput));
}

function reloadPage() {
  const currentInput = JSON.parse(localStorage.getItem(KEY_LOCAL));

  if (currentInput) {
    emailInput.value = currentInput.email ?? '';
    messageInput.value = currentInput.message ?? '';
  }
}
