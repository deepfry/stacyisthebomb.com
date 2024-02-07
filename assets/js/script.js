const music = {
    chipi: new Audio("./assets/audio/chipi.mp3"),
}

$(document).on('mousemove', function(e) {
    $('.sparkEmitter').css({ 'left': `60px`, 'top': `-5px` });
    $('.bomb').css({ 'left': `${e.clientX}px`, 'top': `${e.clientY}px` });
})

reds = ['#de2828', '#eb542a', '#eb972a', '#fce57e']

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var sparki = 0;

function emitSpark(el) {
    var d = 50;
    var s = getRandomNum(5, 10);
    var elem = el != undefined ? el : $('.sparkEmitter');
    sparki = sparki > 99 ? 0 : sparki += 1;
    $(elem).append(`<div class="spark spark${sparki}" style="opacity:1; background:${reds[getRandomNum(0,3)]}; height:${s}px; width:${s}px;"></div>`);
    $(`.spark${sparki}`).animate({
        top: `${getRandomNum(d*-1,d)}px`,
        left: `${getRandomNum(d*-1,d)}px`,
        opacity: 0
    }, {
        duration: 200,
        complete: function() {
            $(this).remove()
        }
    });
}

var emitSparks = setInterval(emitSpark, 20)

function playBgMusic(music) {
    if (!music.isPaused) {
        music.volume = 0.3;
        music.play();
        music.addEventListener('timeupdate', function() {
            if (music.currentTime > music.duration - .25) {
                this.currentTime = 0;
                this.play();
            }
        })
    }

}

$(document).on('click', '.start', function() {
    $(this).remove()
    $('.stacyHeads').css({
        'background-image': 'url(./assets/img/stacyspin-big.gif)',
        'animation':'5000ms infinite linear spin'
    })
    playBgMusic(music.chipi);
    $('.boom').show().fadeout(200);

})