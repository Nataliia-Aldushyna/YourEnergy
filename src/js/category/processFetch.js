import fetchFilters from '../utils/fetchFilters.js';
import { createCategoryCards, createExerciseCards } from './createCards.js';
import { exrListEl, quoteText, quoteAuthor } from './constants.js';
import fetchExercises from '../utils/fetchExercises.js';
import fetchQuote from '../utils/fetchQuote.js';
import { quoteStorage } from './strore-quote.js'

export async function processFetchCategory(filter) {
  const data = await fetchFilters(filter);
  if (data.totalPages === null) {
    exrListEl.innerHTML = 'Sorry, there are no category';
    return;
  }
  exrListEl.innerHTML = '';
  const cardMarkup = createCategoryCards(data.results);
  exrListEl.insertAdjacentHTML('beforeend', cardMarkup);

  return data;
}

export async function processFetchExercises(filter) {
  const data = await fetchExercises(filter);
  if (data.totalPages === null) {
    exrListEl.innerHTML = 'Sorry, there are no exercises';
    return;
  }
  exrListEl.innerHTML = '';
  const cardMarkup = createExerciseCards(data.results);
  exrListEl.insertAdjacentHTML('beforeend', cardMarkup);

  return data;
}

export async function processFetchQuote() {  
  let data = quoteStorage.getQuoteIfToday();

  if (!data) {   
    data = await fetchQuote();
    if (data) {
      quoteStorage.saveQuote(data);
    }
  }
  
  quoteText.textContent = data?.quote ?? 'No quote available';
  quoteAuthor.textContent = data?.author ?? 'Unknown';

  return data;
}