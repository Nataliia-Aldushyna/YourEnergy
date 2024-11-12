import { processFetchExercises } from './processFetch.js';
import { createExerciseCards } from './createCards.js';
import { filterStore } from './store-filter.js';
import { searchInput, searchButton, exrListEl, paginationContainer, selectedCategory } from './constants.js';

let currentPage = 1;
let itemsPerPage = 10;

function getFilterParams() {
  const keyword = filterStore.filter.keyword || '';
  const category = selectedCategory ? selectedCategory.textContent : '';

  return {
    keyword,
    category,
    page: currentPage,
    limit: itemsPerPage,
  };
}

async function searchExercises(currentPage) {
  paginationContainer.innerHTML = '';
  const filter = { ...filterStore.filter };
  filter.keyword = searchInput.value.trim();
  filter.page = currentPage

  delete filter.bodypart;
  delete filter.equipment;

  const data = await processFetchExercises(filter);

  if (data && data.results) {
    exrListEl.innerHTML = '';
    paginationContainer.innerHTML = '';
    const exerciseMarkup = createExerciseCards(data.results);
    exrListEl.insertAdjacentHTML('beforeend', exerciseMarkup);
    renderPagination(data.totalPages);
  } else {
    exrListEl.innerHTML = 'No results found';
  }
}

function renderPagination(totalPages) {
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('li');
    pageButton.textContent = i;
    pageButton.classList.add('page-button');
    if (i === currentPage) pageButton.classList.add('active');

    pageButton.addEventListener('click', async () => {
      document.querySelectorAll('.page-button').forEach(button => button.classList.remove('active'));
      pageButton.classList.add('active');
      currentPage = i;
      await searchExercises(currentPage);
    });

    paginationContainer.appendChild(pageButton);
  }
}

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  currentPage = 1;
  await searchExercises(currentPage);
});

searchInput.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    currentPage = 1;
    await searchExercises(currentPage);
  }
});
