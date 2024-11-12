import icons from '../images/icons.svg';

// Функция для форматирования числа до одного знака после запятой
function formatToSingleDecimal(num) {
  return parseFloat(num).toFixed(1);
}

// Функция для приведения первой буквы к верхнему регистру
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Функция для отрисовки карточек из localStorage
export function createExerciseCardsFromLocalStorage() {
  const cards = JSON.parse(localStorage.getItem('favorites_exercises_ls_key')) || [];
  if (cards.length === 0) {
    const wrapperSecnd = document.getElementById('wrapper-secnd');
    wrapperSecnd.innerHTML = `<li class="text-exer"><p>It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p></li>`;
    return;
  }
  // Проверка, сколько карточек получено из localStorage


  const cardsHtml = cards
    .map(
      ({ _id, name, bodyPart, target, rating, burnedCalories, time }) => `
        <li class="exr-card fav-exr-card">
          <div class="workout-title">
            <div class="workout-title-left fav-workout-title-left">
              <p class="workout-title-name">WORKOUT</p>
              <svg data-modal="${_id}" class="trash-icon" width="16" height="16">
                  <use href="${icons}#icon-trash"></use>
              </svg>
            </div>
         <div class="workout-title-right">
          <button aria-label="start-trainig" class="workout-start" data-modal-open="${_id}">Start
          <svg class="workout-arw" width="16" height="16">
            <use href="${icons}#arw-top"></use>
          </svg>
          </button>
        </div>
          </div>
          <div class="workout-details">
            <p class="workout-run-man-wrapper">
              <svg class="workout-run-man" width="16" height="16">
                <use href="${icons}#runn-man"></use>
              </svg>
            </p>
            <p class="workout-details-disc">${capitalizeFirstLetter(name)}</p>
          </div>
          <div class="workout-stats">
            <p class="workout-stats-cal"><span class="workout-stats-title">Burned calories: </span>${burnedCalories} / ${time}</p>
            <p class="workout-stats-part"><span class="workout-stats-title">Body part: </span>${capitalizeFirstLetter(bodyPart)}</p>
            <p class="workout-stats-target"><span class="workout-stats-title">Target: </span>${capitalizeFirstLetter(target)}</p>
          </div>
        </li>`
    )
    .join('');

  // Вставляем новый HTML в контейнер
  const wrapperSecnd = document.getElementById('wrapper-secnd');
  if (wrapperSecnd) {
    wrapperSecnd.innerHTML = cardsHtml;
  }
}

// Функция для удаления упражнения из localStorage и перерендеринга списка
function removeFavoriteExercise(exerciseId, element) {
  // Добавляем класс анимации
  element.classList.add('animate-remove');

  // Ждем окончания анимации перед удалением из localStorage
  element.addEventListener('animationend', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites_exercises_ls_key')) || [];
    const updatedFavorites = favorites.filter(ex => ex._id !== exerciseId);
    localStorage.setItem('favorites_exercises_ls_key', JSON.stringify(updatedFavorites));

    // Обновляем DOM после завершения анимации
    createExerciseCardsFromLocalStorage();
  }, { once: true }); // Событие срабатывает один раз
}

// Обработчик для всех кнопок удаления
document.addEventListener('DOMContentLoaded', () => {
  const wrapperSecnd = document.getElementById('wrapper-secnd');
  
  const quoteElement = document.querySelector('.quote');
  const authorElement = document.querySelector('.quote-author');

  const storedQuote = localStorage.getItem('dailyQuote');
  if (storedQuote) {
      const parsedQuote = JSON.parse(storedQuote);
      quoteElement.textContent = parsedQuote.quote;
      authorElement.textContent = parsedQuote.author;
  }


  if (wrapperSecnd) {
    wrapperSecnd.addEventListener('click', (event) => {
      const trashBtn = event.target.closest('[data-modal]');
      if (trashBtn) {
        const exerciseId = trashBtn.getAttribute('data-modal');
        const exerciseCard = trashBtn.closest('.fav-exr-card'); // родительский элемент карточки
        removeFavoriteExercise(exerciseId, exerciseCard);
      }
    });

    // Начальная отрисовка карточек из localStorage
    createExerciseCardsFromLocalStorage();
  }
});


