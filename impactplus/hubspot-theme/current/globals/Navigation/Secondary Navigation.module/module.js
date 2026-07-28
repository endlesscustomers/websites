jQuery(function ($) {
	$(window).on('load', function () {
		var $container = $('.headerIMPlus--navigation-center')
		if (!$container.length) return

		// The span with the active class
		var $activeSpan = $container.find('.hs-menu-item--active').first()
		if (!$activeSpan.length) {
			console.log('No .hs-menu-item--active found')
			// Still reveal the container so it’s not hidden forever
			$container.addClass('ready')
			return
		}

		var containerWidth = $container.innerWidth()
		var containerScrollLeft = $container.scrollLeft()

		// Offsets relative to the document
		var containerOffsetLeft = $container.offset().left
		var spanOffsetLeft = $activeSpan.offset().left

		// Position of span inside the scroll container
		var spanLeftInContainer = spanOffsetLeft - containerOffsetLeft + containerScrollLeft
		var spanCenterInContainer = spanLeftInContainer + $activeSpan.outerWidth() / 2

		// Target scrollLeft to center the span
		var rawScrollLeft = spanCenterInContainer - containerWidth / 2

		// Clamp between 0 and max scrollable width
		var maxScrollLeft = $container[0].scrollWidth - containerWidth
		var newScrollLeft = Math.max(0, Math.min(rawScrollLeft, maxScrollLeft))

		// Apply scroll (no animation)
		$container.scrollLeft(newScrollLeft)

		// Reveal after scroll is set (triggers fade-in)
		$container.addClass('ready')
	})
})

function setGlobalHeaderHeightCssVar() {
	const globalHeader = document.querySelector('.headerIMPlus-navigation-container--inner-container')
	const height = globalHeader ? globalHeader.offsetHeight : 0
	document.documentElement.style.setProperty('--impact-global-header-height', `${height}px`)
}

function getElementDocumentTop(element) {
	return element.getBoundingClientRect().top + window.scrollY
}

function getSecondaryNavScrollOffset() {
	const secondaryNav = document.querySelector('.headerIMPlus--secondary')
	if (!secondaryNav) return 0
	return secondaryNav.offsetHeight + 20
}

function setActiveSecondaryNavItem() {
	const navRoot = document.querySelector('.headerIMPlus--secondary')
	if (!navRoot) return

	const navCenter = navRoot.querySelector('.headerIMPlus--navigation-center')
	if (!navCenter) return

	const menuLinks = Array.from(navCenter.querySelectorAll('a[href^="#"]')).filter((link) => {
		const href = link.getAttribute('href')
		return href && href.length > 1
	})

	if (!menuLinks.length) return

	const scrollPosition = window.scrollY + getSecondaryNavScrollOffset()
	const sections = menuLinks
		.map((link) => document.querySelector(link.getAttribute('href')))
		.filter(Boolean)
		.sort((a, b) => getElementDocumentTop(a) - getElementDocumentTop(b))

	let activeSection = null
	for (const section of sections) {
		if (getElementDocumentTop(section) <= scrollPosition) {
			activeSection = section
		}
	}

	navRoot.querySelectorAll('.hs-menu-item--active').forEach((el) => {
		el.classList.remove('hs-menu-item--active')
		handleSecondaryNavigationVisibility('hide')
	})

	if (!activeSection) return

	const sectionHash = '#' + activeSection.id
	const activeLink = menuLinks.find((link) => link.getAttribute('href') === sectionHash)
	if (!activeLink) return

	const activeTarget = activeLink.closest('span') || activeLink
	activeTarget.classList.add('hs-menu-item--active')

	handleSecondaryNavigationVisibility('show')

	const mobileLinks = navRoot.querySelectorAll('.headerIMPlus--sidebar-items a')
	const mobileLink = Array.from(mobileLinks).find((link) => link.getAttribute('href') === sectionHash)
	mobileLink?.closest('li')?.classList.add('hs-menu-item--active')

	handleSecondaryNavigationVisibility('show')
}

function handleSecondaryNavigationVisibility(action) {
	const secondaryNavigation = document.querySelector('.headerIMPlus--secondary')
	if (!secondaryNavigation) return

	if (action === 'hide') {
		secondaryNavigation.classList.add('visuallyhidden')
	} else {
		secondaryNavigation.classList.remove('visuallyhidden')
	}
}

$(document).ready(function () {
	const $header = $('.headerIMPlus--secondary')
	const $spacer = $('.headerIMPlus--secondary--spacer')
	let lastScrollTop = 0
	let scrollStart = 0
	let ticking = false

	setGlobalHeaderHeightCssVar()
	$(window).on('resize load', setGlobalHeaderHeightCssVar)

	const bodyClassObserver = new MutationObserver(setGlobalHeaderHeightCssVar)
	bodyClassObserver.observe(document.body, {
		attributes: true,
		attributeFilter: ['class'],
	})

	$(window).on('scroll', function () {
		setGlobalHeaderHeightCssVar()

		const currentScroll = $(this).scrollTop()
		const headerHeight = $header.outerHeight()
		const globalHeaderHeight = $('.headerIMPlus-navigation-container--inner-container').outerHeight()

		// First: Add active class after 200px
		if (currentScroll > globalHeaderHeight) {
			if (!$header.hasClass('headerIMPlus-secondary--scrolled headerIMPlus--secondary--shown')) {
				$header.addClass('headerIMPlus-secondary--scrolled headerIMPlus--secondary--shown')

				// Get header height and apply to spacer
				$spacer.css('height', headerHeight + 'px')
			}
		} else {
			if ($header.hasClass('headerIMPlus-secondary--scrolled')) {
				$header.removeClass('headerIMPlus-secondary--scrolled headerIMPlus--secondary--tucked headerIMPlus--secondary--shown')
				$spacer.css('height', '0')
			}
		}

		setActiveSecondaryNavItem()
	})

	$(window).on('load hashchange', setActiveSecondaryNavItem)
})

/* Mobile sticky */
$('.headerIMPlus--sidebar-dropdown-arrow').on('click', function () {
	if ($('.headerIMPlus--secondary').hasClass('opened')) {
		$('.headerIMPlus--secondary').removeClass('opened')
		$('.headerIMPlus--secondary .headerIMPlus--sidebar-items').slideUp(400, function () {})
	} else {
		$('.headerIMPlus--secondary').addClass('opened')
		$('.headerIMPlus--secondary .headerIMPlus--sidebar-items').slideDown(400, function () {})
	}
})
