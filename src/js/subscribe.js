import createSubscription from './utils/createSubscription';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.newsletter-form');
  const emailInput = form.querySelector('.newsletter-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const email = emailInput.value;
    if (emailPattern.test(email)) {

        createSubscription(email);
        emailInput.value = ''; 

    } else { 
      iziToast.show({
        title: 'Error',
        message: 'Please enter a valid email address.',
        position: 'center',
        color: 'red',
      });
    }
  });
});
