import axios from 'axios';
import iziToast  from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function fetchFilters({ filter, page = 1, limit = 12 }) {
  try {
    const params = {};

    if (filter) params.filter = filter;
    params.page = page;
    params.limit = limit;

    const response = await axios.get('/filters', { params });
    
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

export default fetchFilters;
