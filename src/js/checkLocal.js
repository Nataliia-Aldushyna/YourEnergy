import {createExerciseCardsFromLocalStorage} from './favExer.js'
let previousFavorites = JSON.parse(localStorage.getItem('favorites_exercises_ls_key')) || [];

// Функция для проверки изменений в localStorage
function checkLocalStorageForChanges() {
  const currentFavorites = JSON.parse(localStorage.getItem('favorites_exercises_ls_key')) || [];

  // Сравниваем текущее и предыдущее состояние
  if (JSON.stringify(currentFavorites) !== JSON.stringify(previousFavorites)) {
    // Если изменилось, обновляем previousFavorites и перерисовываем
    previousFavorites = currentFavorites;
    createExerciseCardsFromLocalStorage();
  }
}

// Запускаем проверку каждые 2 секунды
setInterval(checkLocalStorageForChanges, 2000);