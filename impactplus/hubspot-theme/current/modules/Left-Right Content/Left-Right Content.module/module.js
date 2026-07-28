document.addEventListener('DOMContentLoaded', function () {
  const faqToggles = document.querySelectorAll('.section--leftright--accordian--toggle')

  faqToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      if (a11yClick(event) === true) {
        toggleFaq(toggle)
      }
    })

    toggle.addEventListener('keypress', function (event) {
      if (a11yClick(event) === true) {
        toggleFaq(toggle)
      }
    })
  })

  const contentInners = document.querySelectorAll(
    '.section--leftright--accordian--content--inner'
  )

  contentInners.forEach(function (contentInner) {
    contentInner.addEventListener('scroll', function () {
      this.scrollTop = 0 // Reset scroll position to the top
    })
  })

  function toggleFaq(toggle) {
    const thisGroup = toggle.closest('.section--leftright--accordian')
    const thisContent = thisGroup.querySelector('.section--leftright--accordian--content')

    if (!thisGroup.classList.contains('active')) {
      thisGroup.classList.add('active')
      slideDown(thisContent)
    } else {
      thisGroup.classList.remove('active')
      slideUp(thisContent)
    }
  }
})

function a11yClick(event) {
  // Add your accessibility click check here
  return event.type === 'click' || event.key === 'Enter' || event.key === ' '
}
