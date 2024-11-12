import { paginationContainer } from './constants.js';
import { configureScroll } from './helpers.js';


export function pagination(totalPages, filter, processFiltered) {
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('li');
    pageButton.classList.add('page-button');
    pageButton.textContent = i;

    pageButton.addEventListener('click', async () => {
      document.querySelectorAll('.page-button').forEach(button => button.classList.remove('active'));
      pageButton.classList.add('active');
      filter.page = i;
      await processFiltered(filter);
      configureScroll();
    });

    paginationContainer.appendChild(pageButton);
  }
  paginationContainer.firstChild.classList.add('active');
}


