/* ============================================
   Dra. Gina Caiminagua – Odontóloga
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Mobile Menu ----------
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navbar__link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar?.classList.add('navbar--scrolled');
        } else {
            navbar?.classList.remove('navbar--scrolled');
        }

        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---------- Scroll Animations (IntersectionObserver) ----------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all elements immediately
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- WhatsApp Float Tooltip Auto-Show ----------
    const whatsappFloat = document.getElementById('whatsappFloat');
    const tooltip = whatsappFloat?.querySelector('.whatsapp-float__tooltip');

    if (tooltip) {
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(0)';

            setTimeout(() => {
                tooltip.style.opacity = '';
                tooltip.style.transform = '';
            }, 4000);
        }, 3000);
    }

    // ---------- Multimedia Carousel ----------
    const galleryContainer = document.getElementById('gallery-carousel');
    const videoContainer = document.getElementById('video-carousel');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox__img');
    const lightboxVideo = lightbox?.querySelector('.lightbox__video');
    const lightboxClose = lightbox?.querySelector('.lightbox__close');

    // Generate Images (21 items)
    if (galleryContainer) {
        for (let i = 1; i <= 21; i++) {
            const ext = (i === 3) ? 'png' : 'jpeg';
            const filename = `assets/gallery/image-${i.toString().padStart(2, '0')}.${ext}`;

            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `<img src="${filename}" alt="Foto Clínica ${i}" loading="lazy">`;

            item.addEventListener('click', () => openLightbox('image', filename));
            galleryContainer.appendChild(item);
        }
    }

    // Generate Videos (18 items)
    if (videoContainer) {
        for (let i = 1; i <= 18; i++) {
            const filename = `assets/gallery/video-${i.toString().padStart(2, '0')}.mp4`;

            const item = document.createElement('div');
            item.className = 'carousel-item carousel-item-video';
            item.innerHTML = `
                <video muted playsinline preload="metadata">
                    <source src="${filename}#t=0.1" type="video/mp4">
                </video>
                <div class="video-play-btn">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
            `;

            item.addEventListener('click', () => openLightbox('video', filename));

            // Hover preview
            item.addEventListener('mouseenter', () => {
                const v = item.querySelector('video');
                if (v) v.play().catch(() => { });
            });
            item.addEventListener('mouseleave', () => {
                const v = item.querySelector('video');
                if (v) { v.pause(); v.currentTime = 0; }
            });

            videoContainer.appendChild(item);
        }
    }

    // Carousel Navigation
    const setupCarouselNav = (prevBtn, nextBtn, container) => {
        if (!container) return;

        prevBtn?.addEventListener('click', () => {
            container.scrollBy({ left: -300, behavior: 'smooth' });
        });

        nextBtn?.addEventListener('click', () => {
            container.scrollBy({ left: 300, behavior: 'smooth' });
        });
    };

    setupCarouselNav(
        document.querySelector('.prev-btn'),
        document.querySelector('.next-btn'),
        galleryContainer
    );

    setupCarouselNav(
        document.querySelector('.vid-prev-btn'),
        document.querySelector('.vid-next-btn'),
        videoContainer
    );

    // Lightbox Logic
    function openLightbox(type, src) {
        if (!lightbox || !lightboxImg || !lightboxVideo) return;

        lightboxImg.classList.remove('active');
        lightboxVideo.classList.remove('active');
        lightboxVideo.pause();

        if (type === 'image') {
            lightboxImg.src = src;
            lightboxImg.classList.add('active');
        } else {
            lightboxVideo.src = src;
            lightboxVideo.classList.add('active');
            lightboxVideo.play().catch(() => { });
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
        }
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });

});
