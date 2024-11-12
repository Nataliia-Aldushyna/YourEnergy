import axios from 'axios';
import iziToast  from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function fetchExerciseById(id) {
  try {
    axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';
    const response = await axios.get(`/exercises/${id}`);
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

export default fetchExerciseById;