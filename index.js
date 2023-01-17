const galleryContainer = document.querySelector('.images');

async function getData(query) {

  const url =`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&api_key=98add06d9b168c6c5539a8c162f4faf0&tags=${query}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  
  if (data.photos.photo.length === 0){
    const errorImage = document.createElement('div');
    errorImage.classList.add('no-images');
    errorImage.textContent = "Sorry, there`s nothing found based on your search criteria :(";
    galleryContainer.append(errorImage); 
  } else{  
      data.photos.photo.map((photo) => {
  
      if ( photo.width_m > photo.height_m ){
        const img = document.createElement('div');
        img.classList.add('gallery-img');
        img.style.background = `url('${photo.url_m})`;
        galleryContainer.append(img);
        const title = document.createElement('span');
        title.classList.add('title');
        title.textContent = photo.title;
        img.append(title);
       }  
  });
}
  // console.log(data);
}
getData('winter nature');

const searchField = document.querySelector('.search-input');
const searchButton  = document.querySelector('.button-search');
const searchClear = document.querySelector('.clear-search');

window.onload = () => {
  searchField.focus();
  searchField.onkeyup = (event) => {
    if(event.keyCode === 13){
      while(galleryContainer.firstChild) {
        galleryContainer.removeChild(galleryContainer.firstChild);
      }

      getData(searchField.value);
    }
  }
  searchButton.addEventListener('click', () => {
      while(galleryContainer.firstChild) {
        galleryContainer.removeChild(galleryContainer.firstChild);
      }

      getData(searchField.value);
    })
  }

searchClear.addEventListener('click', () => {
  searchField.focus();
  searchField.value = '';
})

console.log("Вёрстка +10\nПри загрузке приложения на странице отображаются полученные от API изображения +10\nЕсли в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10 \nПоиск +30\nДоп функционал: название фото всплывает при наведении, свои стили +10\nИтого  70 :)");