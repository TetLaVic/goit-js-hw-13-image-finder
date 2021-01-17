import template from './template.hbs';
import './styles.css';
import ApiService from './apiService.js';
import LoadMoreBtn from './loadMoreBtn.js';
import notifications from './pnotify.js';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newApiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
  event.preventDefault();
  clearList();
  newApiService.query = event.currentTarget.elements.query.value;
  newApiService.resetPage();
  loadMoreBtn.show();
  fetchImages();
}

function createImgCardMarkup(items) {
  if (items.length === 0) {
    notifications.onError();
  }

  if (items.length < newApiService.perPage) {
    loadMoreBtn.hide();
  }

  const galleryMarkup = items.map(item => template(item)).join('');
  return galleryMarkup;
}

function populateList(listMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', listMarkup);
}

function clearList() {
  refs.gallery.innerHTML = '';
}

function fetchImages() {
  newApiService
    .fetchImages()
    .then(loadMoreBtn.enable())
    .then(createImgCardMarkup)
    .then(populateList)
    .then(
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      }),
    );
}
