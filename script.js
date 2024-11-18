function populateMovieRow(rowId, start, end) {
    const row = document.getElementById(rowId);
    for (let i = start; i <= end; i++) {
        const imagePath = `assets/imgs/movies/${i}.png`;
        const card = createMovieCard(imagePath);
        row.appendChild(card);
    }
}
function createMovieCard(imagePath) {
    const card = document.createElement('div');
    const randomPercentage = Math.floor(Math.random() * 101);
    const randomOre = Math.floor(Math.random() * 2) + 2;
    const minutiRandom = Math.floor(Math.random() * 60);
    const minutiTot = randomOre * 60 + minutiRandom;
    const tempoRimanente = Math.floor(minutiTot * (1 - randomPercentage / 100));
    card.className = 'cardPreview ';
    card.innerHTML = `
    <div class="card border-0 bg-dark text-light">
        <img src="${imagePath}" class="img-fluid rounded px-1" alt="Movie Thumbnail">
        <div class="card-body cardNascosta">
            <div class="bg-dark text-light d-flex">
                <div class="px-0.5 px-md-2">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
                <div class="px-0.5 px-md-2">
                    <i class="bi bi-plus-circle"></i>
                </div>
                <div class="px-0.5 px-md-2">
                    <i class="bi bi-hand-thumbs-up"></i>
                </div>
                <div class="px-0.5 px-md-2">
                    <i class="bi bi-chevron-down"></i>
                </div>
            </div>
            <div class="progress-container">
                <div class="progress progress-bar progress-bar-striped bg-danger" role="progressbar" aria-label="Warning striped example" style="width: ${randomPercentage}%" 
                aria-valuenow="${randomPercentage}" aria-valuemin="0" aria-valuemax="100">${randomPercentage}% </div>            
                <p class="text-wrap">Rimangono: </br> ${Math.floor(tempoRimanente / 60)} h e ${(tempoRimanente % 60)} min di ${randomOre} h e ${minutiRandom} min</p>                
            </div>
        </div>
    </div>`;

    return card;
}



//slider
function initializeSlider(rowId) {
    const slider = document.getElementById(rowId);
    const row = slider.closest('.sliderRow');
    const prevButton = row.querySelector('.prvBtn');
    const nextButton = row.querySelector('.nxtBtn');
    let currentTranslate = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    //nxtBTN
    nextButton.addEventListener('click', () => {
        currentTranslate -= 1000;
        currentTranslate = Math.max(currentTranslate, -slider.scrollWidth + row.offsetWidth);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    });

    //prvBtn
    prevButton.addEventListener('click', () => {
        currentTranslate += 1000;
        currentTranslate = Math.min(currentTranslate, 0);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    });

    // da telefono
    slider.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startX = e.touches[0].clientX;
        isDragging = true;
        slider.style.transition = 'none';
    });

    slider.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        slider.style.transform = `translateX(${currentTranslate + diff}px)`;
    });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        currentTranslate += currentX - startX;
        currentTranslate = Math.max(Math.min(currentTranslate, 0), -slider.scrollWidth + row.offsetWidth);
        slider.style.transition = 'transform 0.3s ease-out';
        slider.style.transform = `translateX(${currentTranslate}px)`;
    });
}
// Popolamento delle righe
document.addEventListener('DOMContentLoaded', () => {
    populateMovieRow('continueWatching', 1, 6);
    populateMovieRow('newReleases', 7, 12);
    populateMovieRow('popular', 13, 18);
    populateMovieRow('diTendenza', 1, 6);
    populateMovieRow('otherTitles', 7, 12);
    populateMovieRow('forYou', 13, 18);

    initializeSlider('continueWatching');
    initializeSlider('newReleases');
    initializeSlider('popular');
    initializeSlider('diTendenza');
    initializeSlider('otherTitles');
    initializeSlider('forYou');


});
//comparsa e scomparsa righe
document.addEventListener('DOMContentLoaded', function () {
    const righe = document.querySelectorAll('.rigaGenerale');

    const observer = new IntersectionObserver((entries,) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {// Mostra la riga rimuovendo la classe .nascosta

                entry.target.classList.remove('nascosta');
            } else {
                entry.target.classList.add('nascosta');// Nasconde la riga aggiungendo la classe.nascosta
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.1
    });

    righe.forEach(riga => {

        riga.classList.add('nascosta');
        observer.observe(riga);
    });
});

//far veere la card da telefono
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth < 756) {
        const cards = document.querySelectorAll('.cardPreview');
        let ulitmaCardAperta = null;

        cards.forEach(card => {
            card.addEventListener('click', () => {

                const cardBody = card.querySelector('.card-body');

                if (ulitmaCardAperta && ulitmaCardAperta !== cardBody) {
                    ulitmaCardAperta.classList.add('cardNascosta');


                } else {
                    cardBody.classList.toggle('cardNascosta');
                    ulitmaCardAperta = cardBody.classList.contains('cardNascosta') ? null : cardBody;
                }


            });

        });
    }
});