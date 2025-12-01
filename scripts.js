const slidesContainer = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
}

function nextSlide() {
  index = (index + 1) % dots.length;
  showSlide(index);
}

// Auto-slide
setInterval(nextSlide, 4000);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});
// Newsletter live validation
const form = document.getElementById('newsletterForm');
if (form) {
  const first = document.getElementById('nlFirst');
  const email = document.getElementById('nlEmail');
  const msg = document.getElementById('nlMsg');

  // Simple name validation (letters only, min 2 chars)
  const nameValid = (v) => /^[A-Za-zÀ-ž' -]{2,}$/.test(v.trim());

  function validateFirst() {
    if (!first.value.trim()) {
      msg.textContent = 'Please enter your first name.';
      first.style.borderColor = 'red';
      return false;
    } else if (!nameValid(first.value)) {
      msg.textContent = 'Name should be at least 2 letters, no numbers.';
      first.style.borderColor = 'red';
      return false;
    }
    first.style.borderColor = '';
    msg.textContent = '';
    return true;
  }

  function validateEmail() {
    if (!email.value.trim()) {
      msg.textContent = 'Please enter your email address.';
      email.style.borderColor = 'red';
      return false;
    } else if (email.validity.typeMismatch) {
      msg.textContent = 'Please enter a valid email address.';
      email.style.borderColor = 'red';
      return false;
    }
    email.style.borderColor = '';
    msg.textContent = '';
    return true;
  }

  // Validate live as user types
  first.addEventListener('input', validateFirst);
  email.addEventListener('input', validateEmail);

  // On submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validFirst = validateFirst();
    const validEmail = validateEmail();

    if (validFirst && validEmail) {
      msg.style.color = '#ffffffff';
      msg.textContent = 'Thanks for subscribing to Jungle Pals! 🦎';
      form.reset();
    } else {
      msg.style.color = '#ffffffff';
    }
  });
}

// Back to Top (jQuery, robust)
$(function () {
  const $btn = $('#backTop');

  function toggleBtn() {
    $btn.toggle($(window).scrollTop() > 150); // show after 150px (adjust if you like)
  }

  // Run once on load (in case user reloads mid-page)
  toggleBtn();

  // Show/hide on scroll
  $(window).on('scroll', toggleBtn);

  // Smooth scroll to top on click
  $btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[name="readiness"]');
  const readyBtn = document.getElementById('ready-button');
  const speciesBox = document.getElementById('Species-Location'); 
  const searchBtn = document.getElementById('search-adopt');

  if (!checkboxes.length || !readyBtn || !speciesBox || !searchBtn) return;

  // Hide the species/location box in the beginning
  speciesBox.style.display = 'none';

  // Turns off ready button until all checked
  readyBtn.disabled = true;
  function updateReadyState() {
    const allChecked = [...checkboxes].every(cb => cb.checked);
    readyBtn.disabled = !allChecked;
  }
  checkboxes.forEach(cb => cb.addEventListener('change', updateReadyState));

  // Show the box when the button is clicked
  readyBtn.addEventListener('click', () => {
    speciesBox.style.display = 'block';
    speciesBox.scrollIntoView({ behavior: 'smooth' });
  });

  // Get dropdowns and adopt div's
  const speciesSelect = document.getElementById('Species');
  const locationSelect = document.getElementById('location-selector');
  const adoptDivs = document.querySelectorAll('#adopt-images > .adopt-card');

  // Hide all adopt images from the beginning
  adoptDivs.forEach(div => div.style.display = 'none');

  // 'No Results" div if there's nothing
  let noResults = document.getElementById('no-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.display = 'none';
    noResults.style.textAlign = 'center';
    noResults.style.padding = '20px';
    noResults.style.fontWeight = 'bold';
    noResults.textContent = 'No results found.';
    document.getElementById('adopt-images').appendChild(noResults);
  }

  // Filter adopt images when searching
  searchBtn.addEventListener('click', () => {
    const selectedSpecies = speciesSelect.value;
    const selectedLocation = locationSelect.value;

    let anyShown = false; // hide the others

    adoptDivs.forEach(div => {
      const matchesSpecies = div.dataset.species === selectedSpecies;
      const matchesLocation = div.dataset.location === selectedLocation;

      if (matchesSpecies && matchesLocation) {
        div.style.display = 'block';
        anyShown = true;
      } else {
        div.style.display = 'none';
      }
    });

    // Show or hide the "No Results" message
    noResults.style.display = anyShown ? 'none' : 'block';

    // Go to results
    const resultsSection = document.getElementById('adopt-images');
    if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Pop-Up Message for form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contactform form');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your query has been sent!');
    contactForm.reset();
  });
});

// The hover effect for contact info boxes
$(document).ready(function() {
  $('.mb-4').hover(
    function() {
      $(this).css({
        'transform': 'scale(1.05)',
        'box-shadow': '0 10px 20px rgba(0,0,0,0.3)'
      });
    },
    function() {
      $(this).css({
        'transform': 'scale(1)',
        'box-shadow': '0 4px 10px rgba(0,0,0,0.2)'
      });
    }
  );
});

$(document).ready(function() {
  const $checkboxes = $('input[name="readiness"]');
  const $readyBtn = $('#ready-button');
  const $speciesBox = $('#Species-Location');
  const $searchBtn = $('#search-adopt');
  const $speciesSelect = $('#Species');
  const $locationSelect = $('#location-selector');
  const $adoptDivs = $('#adopt-images > .adopt-card');
  const $noResults = $('#no-results');

  // hide the species/location and "No results" from the start
  $speciesBox.hide();
  $adoptDivs.hide();
  $noResults.hide();

  // Allow the ready button only when all the checkboxes are checked
  $checkboxes.on('change', function() {
    const allChecked = $checkboxes.length === $checkboxes.filter(':checked').length;
    $readyBtn.prop('disabled', !allChecked);
  });

  $readyBtn.on('click', function() {
    $speciesBox.slideDown();
    $('html, body').animate({ scrollTop: $speciesBox.offset().top }, 600);
  });

  // Filter adoption cards on search
  $searchBtn.on('click', function() {
    const selectedSpecies = $speciesSelect.val();
    const selectedLocation = $locationSelect.val();
    let anyShown = false;

    $adoptDivs.each(function() {
      const $this = $(this);
      const matches = $this.data('species') === selectedSpecies && $this.data('location') === selectedLocation;
      $this.toggle(matches);
      if (matches) anyShown = true;
    });

    $noResults.toggle(!anyShown);

    // Scroll to results
    if (anyShown || !anyShown) {
      $('html, body').animate({ scrollTop: $('#adopt-images').offset().top }, 600);
    }
  });
});


  $('nav a').hover(
    function() {
      $(this).css({'color': '#ff7f50', 'transition': 'color 0.3s ease'});
    },
    function() {
      $(this).css({'color': '', 'transition': 'color 0.3s ease'});
    }
  );
;






