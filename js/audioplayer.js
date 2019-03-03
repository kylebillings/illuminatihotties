(function iife() {
    "use strict";
    const show = (el) => el.classList.remove("hide");
    const hide = (el) => el.classList.add("hide");

    function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
        el = el.parentNode;
      }
      return el;
    }

    function hideAllButtons(button) {
      button.querySelectorAll(".play, .pause, .speaker").forEach(hide);
    }

    function getPlay(button) {
      return button.querySelector(".play");
    }

    function getPause(button) {
      return button.querySelector(".pause");
    }

    function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
    }

    function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
    }

    function pauseAllButtons() {
      const buttons = document.querySelectorAll(".playButton");
      buttons.forEach(function hidePause(button) {
        if (isPlaying(button)) {
          showPlayButton(button);
        }
      });
    }

    function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
    }

    function getAudio() {
      return document.querySelector("audio");
    }

    function playAudio(player, src) {
      player.volume = 1.0;
      player.setAttribute("src", "tracks/track.mp3");

      player.play();
    }

    function showButton(button, opts) {
      if (opts.playing) {
        showPlayButton(button);
      } else {
        showPauseButton(button);
      }
    }

    function pauseAudio(player) {
      player.pause();
    }

    function manageAudio(player, opts) {
      if (opts.playing) {
        pauseAudio(player);
      } else {
        playAudio(player, opts.src);
      }
    }

    function togglePlayButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
        playing
      });
      manageAudio(player, {
        src: button.getAttribute("data-audio"),
        playing
      });
    }

    function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      togglePlayButton(button);
    }

    function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
    }
    initButton(".wrapf");
  }());
