import axios from 'axios';
import iziToast  from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function createSubscription(email) {
  console.log(email)
  try {
    const response = await axios.post('/subscription', { email });
    if(response) {
      iziToast.show({
        title: 'Congrats',
        message: response.data.message,
        position: 'center',
        color: 'green',
      });
    }
    return response.data;
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: error.message,
      position: 'center',
      color: 'red',
    });
  }
}

export default createSubscription;