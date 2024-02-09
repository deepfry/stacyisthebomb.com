const music = {
    chipi: new Audio("./assets/audio/chipi.mp3"),
}

const reds = ['#de2828', '#eb542a', '#eb972a', '#fce57e']

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

$(document).on('mousemove', function(e) {
    $('.sparkEmitter').css({ 'left': `60px`, 'top': `-5px` });
    $('.bomb').css({ 'left': `${e.clientX}px`, 'top': `${e.clientY}px` });
})

$(document).on('click', '.start', function() {
    $(this).remove()
    $('.stacyHeads').css({
        'background-image': 'url(./assets/img/stacyspin-big.gif)',
        'animation':'5000ms infinite linear spin'
    })
    playBgMusic(music.chipi);
    $('.boom').show().fadeout(200);

})

function konamiCodeSuccess() {
    // Replace this with whatever function you want to run when the Konami Code is entered
    alert('Konami Code entered!'); // Example: Show an alert
  }

  // Konami Code sequence
  var konamiCode = [
    38, 38, // up, up
    40, 40, // down, down
    37, 39, // left, right
    37, 39, // left, right
    66, 65, // B, A
    13      // Enter
  ];
  var konamiCodePosition = 0;

    $(document).keydown(function(e) {
    // Check if the key pressed by the user matches the next key in the Konami Code sequence
    if (e.keyCode === konamiCode[konamiCodePosition]) {
      konamiCodePosition++;
      
      // If the entire Konami Code sequence is entered correctly
      if (konamiCodePosition === konamiCode.length) {
        // Run your function here
        konamiCodeSuccess();
        konamiCodePosition = 0; // Reset the position for the next attempt
      }
    } else {
      // Reset the position if the user enters a key that does not match the sequence
      konamiCodePosition = 0;
    }
  });