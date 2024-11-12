import { capitalizeFirstLetter, formatToSingleDecimal } from './helpers.js';
import icons from '../../images/icons.svg';

export function createCategoryCards(cards) {
  return cards
    .map(
      ({ imgURL, name, filter }) => `
         <li class="exr-category-card" data-category="${filter}" data-category-name="${name}">
        <img
          class="exr-category-card-img"
          src="${imgURL}"
          alt="${name}"
          width="265"
          height="255"
          loading="lazy"
        />
       <div class="exr-category-card-text">
           <div class="exr-category-card-title">${capitalizeFirstLetter(name)}</div>
           <div class="exr-category-card-name">${filter}</div>
      </div>`,
    )
    .join('');
}

export function createExerciseCards(cards) {
  return cards
    .map(
      ({ _id, name, bodyPart, target, rating, burnedCalories, time }) => `
          <li class="exr-card">
      <div class="workout-title">
        <div class="workout-title-left">
          <p class="workout-title-name">WORKOUT</p>
          <p class="workout-rating">${formatToSingleDecimal(rating)}
            <svg class="workout-star" width="18" height="18">
              <use href="${icons}#rating-star"></use>
            </svg>
          </p>
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
        <p class="workout-stats-cal"><span class="workout-stats-title">Burned calories: </span>${burnedCalories + ' / ' + time}</p>
        <p class="workout-stats-part"><span class="workout-stats-title">Body part: </span>${capitalizeFirstLetter(bodyPart)}</p>
        <p class="workout-stats-target"><span class="workout-stats-title">Target: </span>${capitalizeFirstLetter(target)}</p>
      </div>
    </li>`,
    )
    .join('');
}

