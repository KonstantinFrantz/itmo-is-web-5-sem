document.addEventListener('DOMContentLoaded', () => {
  const videoItems = document.querySelectorAll('.video_item');
  const activeVideoFrame = document.getElementById('activeVideoFrame');

  videoItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) return;

      videoItems.forEach(el => el.classList.remove('active'));
      
      item.classList.add('active');
      
      const videoId = item.querySelector('.video_thumbnail').getAttribute('data-video');
      
      activeVideoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    });
  });
});
