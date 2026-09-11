/**
 * N BROTHERS TECHNICAL SERVICE - BESPOKE MULTI-PAGE & COMPONENT LOGIC
 * Navigation, route synchronization, booking pipeline, modal management, WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '966500000000'; // Official dispatch channel

  // --- Master Scroll Reveal Engine (Progressive Enhancement) ---
  document.documentElement.classList.add('has-scroll-reveal');

  const revealElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-in, .reveal-line'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      // Elements inside #home or top heroes reveal immediately with staggered entrance
      if (el.closest('#home') || el.closest('.page-hero') || el.closest('#page-hero')) {
        setTimeout(() => el.classList.add('is-revealed'), 80);
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // --- Sticky Navigation Bar ---
  const header = document.getElementById('main-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // --- Mobile Drawer Navigation ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.remove('translate-x-full');
    mobileDrawerBackdrop.classList.remove('hidden');
    setTimeout(() => mobileDrawerBackdrop.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.add('translate-x-full');
    mobileDrawerBackdrop.classList.add('opacity-0');
    setTimeout(() => mobileDrawerBackdrop.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- Route Detection & Active Navigation Highlighting ---
  const currentPath = window.location.pathname.toLowerCase();
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  const getActiveRouteKey = () => {
    if (currentPath.includes('ac-service')) return 'ac-service';
    if (currentPath.includes('services')) return 'services';
    if (currentPath.includes('why-us')) return 'why-us';
    if (currentPath.includes('how-it-works')) return 'how-it-works';
    if (currentPath.includes('about')) return 'about';
    if (currentPath.includes('contact')) return 'contact';
    if (currentPath.includes('booking')) return 'booking';
    
    // Default to home if on index or root
    return 'home';
  };

  const activeKey = getActiveRouteKey();

  const highlightLinks = () => {
    desktopNavLinks.forEach(link => {
      const dataRoute = link.getAttribute('data-route');
      const href = link.getAttribute('href') || '';
      const matches = (dataRoute && dataRoute === activeKey) || 
                      (activeKey === 'home' && (href.endsWith('index.html') || href === '/' || href.includes('#home') || dataRoute === 'home')) ||
                      (activeKey !== 'home' && href.includes(activeKey));

      if (matches) {
        link.classList.add('text-hvac-blue', 'font-bold', 'border-b-2', 'border-hvac-blue', 'pb-1');
        link.classList.remove('text-slate-700');
      } else {
        link.classList.remove('text-hvac-blue', 'font-bold', 'border-b-2', 'border-hvac-blue', 'pb-1');
        link.classList.add('text-slate-700');
      }
    });

    mobileNavLinks.forEach(link => {
      const dataRoute = link.getAttribute('data-route');
      const href = link.getAttribute('href') || '';
      const matches = (dataRoute && dataRoute === activeKey) || 
                      (activeKey === 'home' && (href.endsWith('index.html') || href === '/' || href.includes('#home') || dataRoute === 'home')) ||
                      (activeKey !== 'home' && href.includes(activeKey));

      if (matches) {
        link.classList.add('text-hvac-blue', 'bg-slate-50', 'font-bold');
        link.classList.remove('text-slate-700');
      } else {
        link.classList.remove('text-hvac-blue', 'bg-slate-50', 'font-bold');
        link.classList.add('text-slate-700');
      }
    });
  };

  highlightLinks();

  // --- URL Query Parameter Pre-selection (e.g. ?service=AC%20Repair%20%26%20Maintenance) ---
  const serviceSelect = document.getElementById('service-select');
  const urlParams = new URLSearchParams(window.location.search);
  const paramService = urlParams.get('service');

  if (serviceSelect && paramService) {
    const decodedService = decodeURIComponent(paramService).trim();
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase() === decodedService.toLowerCase()) {
        serviceSelect.selectedIndex = i;
        serviceSelect.classList.add('ring-4', 'ring-[#087EA4]/30', 'border-[#087EA4]');
        setTimeout(() => {
          serviceSelect.classList.remove('ring-4', 'ring-[#087EA4]/30', 'border-[#087EA4]');
        }, 2500);
        break;
      }
    }
  }

  // Quick service buttons that might be on the page
  const serviceBookingButtons = document.querySelectorAll('[data-service-target]');
  serviceBookingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const targetService = button.getAttribute('data-service-target');
      if (serviceSelect && targetService) {
        serviceSelect.value = targetService;
        serviceSelect.classList.add('ring-4', 'ring-[#087EA4]/30', 'border-[#087EA4]');
        setTimeout(() => {
          serviceSelect.classList.remove('ring-4', 'ring-[#087EA4]/30', 'border-[#087EA4]');
        }, 2200);
      }
    });
  });

  // --- Interactive Booking Form Pipeline ---
  const bookingForm = document.getElementById('booking-form');
  const confirmationModal = document.getElementById('confirmation-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const modalWhatsAppBtn = document.getElementById('modal-whatsapp-btn');
  
  const modalRefId = document.getElementById('modal-ref-id');
  const modalCustomerName = document.getElementById('modal-customer-name');
  const modalCustomerPhone = document.getElementById('modal-customer-phone');
  const modalServiceName = document.getElementById('modal-service-name');
  const modalServiceTime = document.getElementById('modal-service-time');
  const modalProblemDesc = document.getElementById('modal-problem-desc');

  let activeBooking = null;

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('full-name')?.value.trim();
      const phoneNumber = document.getElementById('phone-number')?.value.trim();
      const service = document.getElementById('service-select')?.value;
      const prefDate = document.getElementById('pref-date')?.value;
      const prefTime = document.getElementById('pref-time')?.value;
      const problemDesc = document.getElementById('problem-desc')?.value.trim();

      if (!fullName || !phoneNumber || !service) {
        showToast('Please provide your name, phone number, and required service.', 'error');
        return;
      }

      const randomRefNum = Math.floor(1000 + Math.random() * 9000);
      const refId = 'NB-' + randomRefNum;

      activeBooking = {
        refId,
        fullName,
        phoneNumber,
        service,
        prefDate: prefDate || 'Earliest available date',
        prefTime: prefTime || 'Standard working hours',
        problemDesc: problemDesc || 'Appliance diagnostic inspection requested'
      };

      if (modalRefId) modalRefId.textContent = refId;
      if (modalCustomerName) modalCustomerName.textContent = fullName;
      if (modalCustomerPhone) modalCustomerPhone.textContent = phoneNumber;
      if (modalServiceName) modalServiceName.textContent = service;
      if (modalServiceTime) modalServiceTime.textContent = activeBooking.prefDate + ' (' + activeBooking.prefTime + ')';
      if (modalProblemDesc) modalProblemDesc.textContent = activeBooking.problemDesc;

      openModal();
      bookingForm.reset();
    });
  }

  const openModal = () => {
    if (!confirmationModal) return;
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!confirmationModal) return;
    confirmationModal.classList.add('hidden');
    confirmationModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);

  if (confirmationModal) {
    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) closeModal();
    });
  }

  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.addEventListener('click', () => {
      if (!activeBooking) return;
      const msg = 'Hello N Brothers Technical Service,\n\nI would like to confirm my technician booking:\n\n*Reference:* ' + activeBooking.refId + '\n*Name:* ' + activeBooking.fullName + '\n*Phone:* ' + activeBooking.phoneNumber + '\n*Service:* ' + activeBooking.service + '\n*Preferred Timing:* ' + activeBooking.prefDate + ' - ' + activeBooking.prefTime + '\n*Issue Details:* ' + activeBooking.problemDesc;
      
      const whatsappUrl = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(msg);
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }

  window.openServiceWhatsApp = (serviceName) => {
    const text = 'Hello N Brothers Technical Service, I would like to inquire about your ' + serviceName + ' service.';
    const url = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  };

  function showToast(message, type = 'info') {
    const existingToast = document.getElementById('agency-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'agency-toast';
    toast.className = 'fixed top-24 right-6 z-50 px-6 py-3.5 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-3 transition-all duration-300 transform translate-y-[-20px] opacity-0 ' +
      (type === 'error' ? 'bg-rose-600 text-white' : 'bg-[#071A2B] text-white border border-white/20');

    toast.innerHTML = 
      '<span class="w-2.5 h-2.5 rounded-full ' + (type === 'error' ? 'bg-white' : 'bg-[#19B5D8]') + ' animate-pulse"></span>' +
      '<span>' + message + '</span>';

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.remove('translate-y-[-20px]', 'opacity-0'), 10);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-20px]');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
  window.showToast = showToast;

  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !phone || !email || !message) {
        showToast('Please fill in all required contact fields.', 'error');
        return;
      }

      showToast('Thank you! Your message has been sent to our dispatch team.', 'info');
      contactForm.reset();
    });
  }

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.remove('opacity-100');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  const prefDateInput = document.getElementById('pref-date');
  if (prefDateInput) {
    const today = new Date().toISOString().split('T')[0];
    prefDateInput.min = today;
  }
});
