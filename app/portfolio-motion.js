'use client'

// Preserve the sketchbook design: variance 6, motion 5, density 4.
// DOM-only motion avoids rerendering the book and forms during navigation.
export function setupPortfolioMotion(root, signal) {
  const nav = root.querySelector('.nav')
  const navList = root.querySelector('.nav__links')
  const toggle = root.querySelector('#navToggle')
  const menu = root.querySelector('#mobileMenu')
  const sections = [...root.querySelectorAll('section[id]')]
  const links = [...root.querySelectorAll('.nav__links a, .mobile-menu a')]
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const revealTargets = [...root.querySelectorAll('.section__header, .about__text, .stat, .service-card, .skill-group, .tool-item, .timeline__card, .edu__card, .project-card, .projects__intro, .project-experience__intro, .contact__desc, .contact__link, .contact__card')]
  let sectionObserver, revealObserver, frame = 0, active = '', destination = null
  let arrivalAnimation, menuFocusFrame = 0

  function closeMenu(restoreFocus = false) {
    cancelAnimationFrame(menuFocusFrame)
    menu.classList.remove('open')
    menu.inert = true
    menu.setAttribute('aria-hidden', 'true')
    toggle.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
    if (restoreFocus) toggle.focus()
  }

  closeMenu()
  menu.querySelectorAll('a').forEach((link, index) => link.style.setProperty('--menu-order', index))
  toggle.addEventListener('click', () => {
    if (menu.classList.contains('open')) return closeMenu(true)
    menu.inert = false
    menu.classList.add('open')
    menu.setAttribute('aria-hidden', 'false')
    toggle.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    // Wait for the menu to become visible before moving keyboard focus.
    menuFocusFrame = requestAnimationFrame(() => {
      menu.querySelector('a').focus({ preventScroll: true })
    })
  }, { signal })
  document.addEventListener('keydown', event => {
    if (!menu.classList.contains('open')) return
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); return }
    if (event.key !== 'Tab') return
    const items = [toggle, ...menu.querySelectorAll('a')]
    const current = items.indexOf(document.activeElement)
    if ((event.shiftKey && current <= 0) || (!event.shiftKey && current === items.length - 1)) {
      event.preventDefault()
      items[event.shiftKey ? items.length - 1 : 0].focus()
    }
  }, { signal })

  function markActive(id) {
    active = ['terminal-project', 'network-lab-project'].includes(id) ? 'projects' : id
    links.forEach(link => {
      const selected = link.hash === `#${active}`
      link.classList.toggle('active', selected)
      if (selected) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
    const selected = navList.querySelector('a.active')
    navList.style.setProperty('--nav-indicator-opacity', selected ? '1' : '0')
    if (selected) {
      const item = selected.getBoundingClientRect(), list = navList.getBoundingClientRect()
      navList.style.setProperty('--nav-indicator-x', `${item.left - list.left + 10}px`)
      navList.style.setProperty('--nav-indicator-width', Math.max(0, item.width - 20))
    }
  }

  function updateSection() {
    nav.classList.toggle('scrolled', window.scrollY > 50)
    if (destination) return
    const probe = nav.offsetHeight + 100
    const current = sections.filter(section => section.getBoundingClientRect().top <= probe).at(-1)
    markActive(current?.id === 'hero' ? '' : current?.id || '')
  }

  function observeSections() {
    sectionObserver?.disconnect()
    const navHeight = nav.offsetHeight
    root.style.setProperty('--nav-height', `${navHeight}px`)
    sectionObserver = new IntersectionObserver(updateSection, {
      rootMargin: `-${navHeight}px 0px -${Math.max(0, window.innerHeight - navHeight - 120)}px 0px`,
      threshold: 0,
    })
    sections.forEach(section => sectionObserver.observe(section))
    markActive(active)
    updateSection()
  }

  revealTargets.forEach(element => {
    const siblings = [...element.parentElement.children].filter(child => revealTargets.includes(child))
    element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 4) * 55}ms`)
    element.classList.add('motion-reveal')
    if (reduceMotion.matches || element.getBoundingClientRect().top < window.innerHeight * .94) {
      element.classList.add('is-revealed')
    }
  })
  root.classList.add('motion-ready')
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-revealed')
      revealObserver.unobserve(entry.target)
    })
  }, { threshold: .1, rootMargin: '0px 0px -32px 0px' })
  revealTargets.forEach(element => {
    if (!element.classList.contains('is-revealed')) revealObserver.observe(element)
  })

  function cancelNavigation() {
    cancelAnimationFrame(frame)
    frame = 0
    destination = null
    delete root.dataset.navigating
    updateSection()
  }

  function navigate(section, pushHistory = true) {
    cancelNavigation()
    arrivalAnimation?.cancel()
    closeMenu()
    destination = section
    root.dataset.navigating = section.id
    markActive(section.id)
    if (pushHistory && location.hash !== `#${section.id}`) history.pushState(null, '', `#${section.id}`)
    const start = window.scrollY
    const targetY = () => Math.max(0, Math.min(
      section.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 20,
      document.documentElement.scrollHeight - window.innerHeight,
    ))
    const distance = targetY() - start
    const duration = reduceMotion.matches ? 0 : Math.min(1250, 440 + Math.sqrt(Math.abs(distance)) * 9)
    const started = performance.now()

    function finish() {
      destination = null
      frame = 0
      delete root.dataset.navigating
      section.querySelectorAll('.motion-reveal').forEach(element => element.classList.add('is-revealed'))
      const heading = section.querySelector('h2, h1')
      if (heading) {
        heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
        if (!reduceMotion.matches) arrivalAnimation = heading.animate([
          { opacity: .5, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 550, easing: 'cubic-bezier(.22,1,.36,1)' })
      }
      updateSection()
    }

    function step(now) {
      const progress = duration === 0 ? 1 : Math.min(1, (now - started) / duration)
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
      // Recalculate the destination if lazy project embeds finish loading en route.
      window.scrollTo({ top: start + (targetY() - start) * eased, behavior: 'instant' })
      if (progress < 1) frame = requestAnimationFrame(step)
      else finish()
    }
    frame = requestAnimationFrame(step)
  }

  root.addEventListener('click', event => {
    const anchor = event.target.closest('a')
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const href = anchor.getAttribute('href')
    if (!href?.startsWith('#')) { if (menu.contains(anchor)) closeMenu(); return }
    const target = document.getElementById(href.slice(1))
    if (!target || !sections.includes(target)) return
    event.preventDefault()
    navigate(target)
  }, { signal })
  for (const name of ['wheel', 'touchstart', 'pointerdown']) {
    window.addEventListener(name, () => { if (frame) cancelNavigation() }, { signal, passive: true })
  }
  window.addEventListener('keydown', event => {
    if (frame && ['Escape', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Tab', ' '].includes(event.key)) cancelNavigation()
  }, { signal })
  window.addEventListener('popstate', () => {
    const target = document.getElementById(location.hash.slice(1) || 'hero')
    if (target && sections.includes(target)) navigate(target, false)
  }, { signal })
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) closeMenu()
    observeSections()
  }, { signal })
  reduceMotion.addEventListener('change', () => {
    if (!reduceMotion.matches) return
    if (destination) navigate(destination, false)
    arrivalAnimation?.cancel()
    revealTargets.forEach(element => element.classList.add('is-revealed'))
  }, { signal })
  const navResize = new ResizeObserver(() => markActive(active))
  navResize.observe(navList)
  observeSections()

  return () => {
    cancelAnimationFrame(frame)
    arrivalAnimation?.cancel()
    sectionObserver.disconnect()
    revealObserver.disconnect()
    navResize.disconnect()
    root.classList.remove('motion-ready')
    delete root.dataset.navigating
    closeMenu()
  }
}
