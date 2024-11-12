import axios from 'axios';
import iziToast  from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


async function fetchExercises({
  bodypart,
  muscles,
  equipment,
  keyword,
  page = 1,
  limit = 10,
}) {
  try {
    const params = {};

    if (bodypart) params.bodypart = bodypart;
    if (muscles) params.muscles = muscles;
    if (equipment) params.equipment = equipment;
    if (keyword) params.keyword = keyword;
    params.page = page;
    params.limit = limit;

    const response = await axios.get('/exercises', { params });

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

export default fetchExercises;