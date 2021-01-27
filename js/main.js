// GLOBALS VARABLE

var globalFetch;

var filteredMovies = [];

var API_KEY = 'a5809abe'

// PAGINATION

var PER_PAGE = 10;
var current_page = 1;

// PAGINATION

// GLOBALS VARABLE

var genresArray = [];

var elForm = document.querySelector('.form');
if (elForm) {
    var elInputName = document.querySelector('.form__input-name');
    var elInputBal = document.querySelector('.form__input-bal');
    var elSelectCat = document.querySelector('.form__select1');
    var elSelectSort = document.querySelector('.form__select2');
    var elResult = document.querySelector('.result-list');
    var elTemplate = document.querySelector('.item-template').content;
    var elMarkBtn = document.querySelector('.inner-list');
    var elCount = document.querySelector('.search-result__span');
    var elModalTitle = $_('.modal-title');
    var elModalBody = $_('.modal-body');
    var elModalImg = $_('.modal-img');
    
}

// CATEGORIYALAR


// CATEGORIYALARNI ISHLASHI

movies.forEach(function (movie) {
    movie.categories.forEach(function (janr) {
        if (!genresArray.includes(janr)) {
            genresArray.push(janr);
        }
    });
});

// CATEGORIYALARNI ISHLASHI


genresArray.sort(); 

genresArray.forEach(function (janr) {
    var elOption = document.createElement('option', janr);
    elOption.value = janr;
    elOption.textContent = janr;
    
    elSelectCat.appendChild(elOption);
});

// CATEGORIYALAR



elForm.addEventListener('submit', function (evt) {
    
    evt.preventDefault();
    var InputRating = elInputBal.value;
    
    var regExpInputName = new RegExp(elInputName.value, 'gi');

    filteredMovies = movies.filter(function (movieName) { 
        return movieName.title.toString().match(regExpInputName) && movieName.imdbRating >= InputRating;
    });
    
    
    filteredMovies = movies.filter(function (movie) {
        var hello = elSelectCat.value === 'All' || movie.categories.includes(elSelectCat.value); 
        return movie.title.match(regExpInputName) && hello;
    })
    
    elResult.innerHTML = '';
    
    var elVideosFragment = document.createDocumentFragment();
    
    filteredMovies.forEach(function (movie) {
        var templateClone = elTemplate.cloneNode(true);
        $_('h3', templateClone).textContent = movie.title;
        $_('img', templateClone).src = movie.bigThumbnail;
        $_('.item__year', templateClone).textContent = movie.year;
        $_('.item__star', templateClone).textContent = movie.imdbRating;
        $_('.watch', templateClone).href = `https://www.youtube.com/watch?v=${movie.youtubeId}`;
        $_('.watch', templateClone).setAttribute('target', '_blank');
        $_('.info', templateClone).dataset.imdbId = movie.imdbId;
        $_('.mark', templateClone).dataset.imdbId = movie.imdbId;
        // $_('.modal-title', templateClone).textContent = movie.title;
        // $_('.modal-title', templateClone).textContent = movie.title;
    
        elVideosFragment.appendChild(templateClone);
    });
    
    elResult.appendChild(elVideosFragment);

    elCount.textContent = filteredMovies.length;
    
    
});


var elInfo = document.querySelector('.info');
elResult.addEventListener(`click`, evt => {
    
    if (evt.target.matches('.info')) {
        console.log(elModalTitle);
        var movieModal = filteredMovies.find(movieName => movieName.imdbId === evt.target.dataset.imdbId);
        elModalTitle.textContent = movieModal.title;
        elModalBody.textContent = movieModal.summary;
        elModalImg.src = movieModal.bigThumbnail        ;
        
    }
    
});