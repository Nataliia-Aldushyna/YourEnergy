import axios from 'axios';
import iziToast  from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function fetchQuote() {
  try {
    const response = await axios.get('/quote');
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

export default fetchQuote;