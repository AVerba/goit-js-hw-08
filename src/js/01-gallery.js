// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryRef = document.querySelector('.gallery');

const createGallaryItem=({preview,original,description})=>{
    const wrapper = document.createElement('div');
    wrapper.innerHTML=`
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
    return wrapper.firstElementChild;

}
const clearGallary = (ref) => {
ref.innerHTML = '';
};
const renderGallaryItems=(items, ref)=>{
clearGallary(ref);
const gallaryCard = items.map((item) => createGallaryItem(item));
ref.append(...gallaryCard);
}


renderGallaryItems(galleryItems, galleryRef);
const lightbox =  new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom'});