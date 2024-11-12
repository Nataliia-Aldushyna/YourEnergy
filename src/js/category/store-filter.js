class FilterStore {
  #LS_KEY = 'filter_settings';
  #filter = {};

  constructor() {
    this.#filter = this.#getFilterFromLS();
  }

  get filter() {
    return this.#filter;
  }

  updateFilter(newFilter) {
    this.#filter = { ...this.#filter, ...newFilter };
    this.#saveFilterToLS();
  }

  clearFilter() {
    this.#filter = {};
    this.#saveFilterToLS();
  }

  #getFilterFromLS() {
    try {
      const data = localStorage.getItem(this.#LS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return {};
    }
  }

  #saveFilterToLS() {
    localStorage.setItem(this.#LS_KEY, JSON.stringify(this.#filter));
  }
}

export const filterStore = new FilterStore();
