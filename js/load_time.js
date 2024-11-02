(function() {
  function formatLoadTime(timeInMs) {
    return (timeInMs / 1000).toFixed(2);
  }

  window.addEventListener('load', function() {
    var loadTime;

    var navigationEntry = performance.getEntriesByType('navigation')[0];
    loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;

    var loadTimeFormatted = formatLoadTime(loadTime);

    var footer = document.querySelector('.footer_load_info');

    if (footer) {
      footer.textContent = 'Saul here in: ' + loadTimeFormatted + ' seconds!';
    }
  });
})();
