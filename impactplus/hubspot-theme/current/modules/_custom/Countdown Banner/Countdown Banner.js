const countdownElement = document.getElementById('countdown');

if (countdownElement) {
  const countdownTime = countdownElement.getAttribute('data-count');
  const countTo = countdownTime.toString().slice(0, -3);

  doomsday({
    datetime: countTo,
    callback: function() {
      document.querySelector('#countdown--days .countdown--count').innerHTML = doomsdayCounter.days;
      document.querySelector('#countdown--hours .countdown--count').innerHTML = doomsdayCounter.hours;
      document.querySelector('#countdown--minutes .countdown--count').innerHTML = doomsdayCounter.minutes;
      document.querySelector('#countdown--seconds .countdown--count').innerHTML = doomsdayCounter.seconds;
    },
    complete: function() {
      // Completion callback here
    }
  });
}