const API_KEY = '19898377-57901115ac9869933867a4527';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        console.log({ hits });
        this.page += 1;
        return hits;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }

  resetPage() {
    this.page = 1;
  }
}
