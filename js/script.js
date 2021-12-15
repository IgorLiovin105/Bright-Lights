const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if(iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        iconMenu.classList.toggle('_active');
        document.body.classList.toggle('_lock');
        menuBody.classList.toggle('_active');
        
    });
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gatoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;
            
            if(iconMenu.classList.contains('_active')) {
                iconMenu.classList.remove('_active')
                menuBody.classList.remove('_active');
                document.body.classList.remove('_lock');
            }

            window.scrollTo ({
                top: gatoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

const animItems = document.querySelectorAll('._anim__items');

if(animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for(let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + screenLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 500);
}



const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      audio = document.querySelector('.audio'),
      progresContainer = document.querySelector('.progres__container'),
      progres = document.querySelector('.progres'),
      musicTitle = document.querySelector('.song__title'),
      imgSrc = document.querySelector('.img__src'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      musicImg = document.querySelector('.music__img-img');

const songs = ['3LAU, Bright Lights — How You Love Me', 'Bright Lights, Kaleena Zanders, Kandy — War For Love', 'Pink Is Punk, Benny Benassi, Bright Lights — Ghost', 'Hardwell, Dyro, Bright Lights — Never Say Goodbye', 'Zeds Dead, Dirtyphonics, Bright Lights — Where Are You Now', 'Zedd, Bright Lights — Follow You Down'];

let songIndex = 0;

function loadSong(song) {
    musicTitle.innerHTML = song;
    audio.src = `audio/${song}.mp3`;
}

loadSong(songs[songIndex]);

function playSong() {
    player.classList.add('_play');
    musicImg.classList.add('_play');
    imgSrc.src = `img/music/pause.svg`;
    audio.play();
}

function pauseSong() {
    player.classList.remove('_play');
    musicImg.classList.remove('_play');
    imgSrc.src = `img/music/play.svg`;
    audio.pause();
}

playBtn.addEventListener("click", () => {
    const isPlaying = musicImg.classList.contains('_play');
    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});

function prevSong() {
    prev.addEventListener("click", function() {
        if(songIndex > songs.length) {
            songIndex--;
        }
    });
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length -1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

next.addEventListener("click", nextSong);

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

prev.addEventListener("click", prevSong);

function updateProgres(e) {
    const {duration, currentTime} = e.srcElement;
    const progresPercent = (currentTime / duration) * 100;
    progres.style.width = `${progresPercent}%`; 
}

audio.addEventListener("timeupdate", updateProgres);

function setProgres(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

progresContainer.addEventListener("click", setProgres);

audio.addEventListener("ended", nextSong);