document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.getElementById('reviews_testimonials');
  const preloader = document.getElementById('preloader');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const reviewForm = document.getElementById('reviewForm');

  const reviewsPerLoad = 3;
  let errorMsgDisplayed = false;

  function fetchReviews() {
    preloader.style.display = 'block';
    loadMoreBtn.disabled = true;

    fetch(`https://randomuser.me/api/?results=${reviewsPerLoad}&nat=us`)
      .then(userResponse => userResponse.json())
      .then(userData => {
        const users = userData.results;

        return fetch(`https://baconipsum.com/api/?type=all-meat&paras=${reviewsPerLoad}&start-with-lorem=0`)
          .then(textResponse => textResponse.json())
          .then(texts => {
            const reviews = users.map((user, index) => ({
              name: `${user.name.first} ${user.name.last}`,
              body: texts[index],
              avatar: user.picture.medium
            }));

            renderReviews(reviews);

            if (errorMsgDisplayed) {
              const errorMsg = document.getElementById('error-msg');
              if (errorMsg) {
                errorMsg.remove();
                errorMsgDisplayed = false;
              }
            }

            reviewsContainer.scrollTo({
              top: reviewsContainer.scrollHeight,
              behavior: 'smooth'
            });
          })
      })
      .catch(() => {
        if (!errorMsgDisplayed) {
          const errorMsg = document.createElement('div');
          errorMsg.id = 'error-msg';
          errorMsg.textContent = '⚠︎ Something went wrong while loading reviews ⚠︎';
          errorMsg.style.color = 'red';
          errorMsg.style.textAlign = 'center';
          reviewsContainer.appendChild(errorMsg);
          errorMsgDisplayed = true;
        }
      })
      .finally(() => {
        preloader.style.display = 'none';
        loadMoreBtn.disabled = false;
      });
  }

  function renderReviews(reviews) {
    if (reviews.length === 0) {
      const noMore = document.createElement('div');
      noMore.textContent = 'No more reviews.';
      noMore.style.textAlign = 'center';
      reviewsContainer.appendChild(noMore);
      loadMoreBtn.style.display = 'none';
      return;
    }

    reviews.forEach(review => {
      const testimonial = document.createElement('div');
      testimonial.classList.add('testimonial');

      const img = document.createElement('img');
      img.src = review.avatar;
      img.alt = review.name;
      img.classList.add('testimonial_img');

      const content = document.createElement('div');
      content.classList.add('testimonial_content');

      const name = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = review.name;
      name.appendChild(strong);

      const body = document.createElement('p');
      body.textContent = review.body;

      content.appendChild(name);
      content.appendChild(body);

      testimonial.appendChild(img);
      testimonial.appendChild(content);

      reviewsContainer.appendChild(testimonial);
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = reviewForm.elements['name'];
    const reviewInput = reviewForm.elements['review'];

    const newReview = {
      name: nameInput.value,
      body: reviewInput.value,
      avatar: 'images/review_photo.jpg'
    };

    renderReviews([newReview]);

    reviewsContainer.scrollTo({
      top: reviewsContainer.scrollHeight,
      behavior: 'smooth'
    });

    reviewForm.reset();
  }

  fetchReviews();

  loadMoreBtn.addEventListener('click', fetchReviews);

  reviewForm.addEventListener('submit', handleFormSubmit);
});
