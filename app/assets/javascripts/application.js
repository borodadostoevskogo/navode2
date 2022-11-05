// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
// require turbolinks
//= require jquery3
//= require jquery_ujs
//= require jquery.slick
//= require_tree .

var csrfToken = document.querySelector("meta[name=csrf-token]").content


// const sendForm = (url, data) => {

// }

const registerForm = document.querySelector('#register-form')
if (registerForm) {
  registerForm.addEventListener('submit', (event) => {

    registerForm.querySelector('.message').innerHTML = ''
    registerForm.querySelector('.message').classList.remove('-active')

    const url = '/register'
    const data = new URLSearchParams(new FormData(registerForm)).toString()
    console.log(data)

    $.ajax({
      method: 'POST',
      url: url,
      data: data,
      dataType: 'script',
    })

    event.preventDefault()
  })
}

const tokenForm = document.querySelector('#token-form')
if (tokenForm) {
  tokenForm.addEventListener('submit', (event) => {

    tokenForm.querySelector('.message').innerHTML = ''
    tokenForm.querySelector('.message').classList.remove('-active')


    const url = '/approve'
    const data = new URLSearchParams(new FormData(tokenForm)).toString()
    console.log(data)

    $.ajax({
      method: 'POST',
      url: url,
      data: data,
      dataType: 'script',
    })

    event.preventDefault()
  })
}

const signInForm = document.querySelector('#signin-form')
if (tokenForm) {
  signInForm.addEventListener('submit', (event) => {

    signInForm.querySelector('.message').innerHTML = ''
    signInForm.querySelector('.message').classList.remove('-active')

    const url = '/signin'
    const data = new URLSearchParams(new FormData(signInForm)).toString()
    console.log(data)

    $.ajax({
      method: 'POST',
      url: url,
      data: data,
      dataType: 'script',
    })

    event.preventDefault()
  })
}









const mobileOverlay = document.querySelector('#mobile-overlay')
mobileOverlay.addEventListener('click', () => {
  document.body.classList.remove('-auth')
  document.body.classList.remove('-user')
})

const userAuthButtons = document.querySelectorAll('.auth-form-trigger')
userAuthButtons.forEach(item => {
  console.log(item)
  item.addEventListener('click', () => {
    if (item.classList.contains('header-button')) {
      item.classList.toggle('-active')
    }
    document.body.classList.toggle('-auth')
  })
})

const userOptionsButtons = document.querySelectorAll('.user-options-trigger')
userOptionsButtons.forEach(item => {
  console.log(item)
  item.addEventListener('click', () => {
    if (item.classList.contains('header-button')) {
      item.classList.toggle('-active')
    }
    document.body.classList.toggle('-user')
  })
})


const logoutButton = document.querySelector('.logout-trigger')
logoutButton.addEventListener('click', () => {
  $.ajax({
    method: 'POST',
    url: 'signout',
    dataType: 'script',
  })
})

// const headerUserButton = document.querySelector('.header-button.-user')
// headerUserButton.addEventListener('click', () => {
//   headerUserButton.parentNode.classList.toggle('-active')
//   document.body.classList.toggle('-auth')
// })

// const tapbarUserButton = document.querySelector('.tapbar-icon.-profile')
// tapbarUserButton.addEventListener('click', () => {
//   document.body.classList.toggle('-auth')
// })


// const headerButtons = document.querySelectorAll('.header-button')
// headerButtons.forEach(item => {
//   item.addEventListener('click', () => {
//     document.querySelector('#overlay').classList.toggle('-active')
//     item.parentNode.classList.toggle('-active')
//   })
// })

const formLinks = document.querySelectorAll('.tooltip-item .link')
formLinks.forEach(item => {
  item.addEventListener('click', () => {
    showTooltipItem(item.getAttribute('data-to'))
  })
})

const showTooltipItem = (slug) => {
  document.querySelectorAll('.tooltip-item').forEach(item => { item.classList.remove('-active') })
  document.querySelector('.tooltip-item.-' + slug).classList.add('-active')
}













$(document).on('click', '#search-form.-unactive', function() {
  if (window.innerWidth > 1024) {
    $('body').addClass('-form-expanded')
  } else {
    console.log('ok!')
  }
});
$(document).on('click', '#overlay', function() {
  $('body').removeClass('-form-expanded');
});

$(document).on('mouseenter', '.images-slider .triggers .trigger', function() {
  var image = $(this).attr('data-image');

  $(this).parent().siblings('.images').find('.image[data-image="' + image +'"]').siblings().removeClass('-active');
  $(this).parent().siblings('.images').find('.image[data-image="' + image +'"]').addClass('-active');
  
  $(this).parent().siblings('.dots').find('.dot[data-image="' + image +'"]').siblings().removeClass('-active');
  $(this).parent().siblings('.dots').find('.dot[data-image="' + image +'"]').addClass('-active');

});

$(document).on('mouseleave', '.images-slider .triggers', function() {
  $(this).siblings('.images').find('.image').removeClass('-active');
  $(this).siblings('.dots').find('.dot').removeClass('-active');
  $(this).siblings('.dots').find('.dot[data-image="1"]').addClass('-active');
});


const initSlider = () => {
  $('#mobile-gallery').slick({
    arrows: false
  });
}

if (window.innerWidth <= 768) {
  initSlider();
}