class QuoteStorage {
  constructor() {
    this.quoteKey = 'dailyQuote';
    this.dateKey = 'quoteDate';
  }
 
  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
 
  saveQuote(data) {
    localStorage.setItem(this.quoteKey, JSON.stringify(data));
    localStorage.setItem(this.dateKey, this.getTodayDate());
  }

  getQuoteIfToday() {
    const storedDate = localStorage.getItem(this.dateKey);
    const todayDate = this.getTodayDate();

    if (storedDate === todayDate) {
      const storedQuote = localStorage.getItem(this.quoteKey);
      return storedQuote ? JSON.parse(storedQuote) : null;
    }
    return null;
  }
}

export const quoteStorage = new QuoteStorage();
