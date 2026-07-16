/* ==========================================================================
   Sri Andavar Beds - Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Navbar Scroll Effect & Hamburger Menu
    // ----------------------------------------------------------------------
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header Scroll Event
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        highlightActiveLink();
    });

    // Toggle Mobile Navigation
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });

    // Highlight active nav link on scroll
    function highlightActiveLink() {
        let currentSectionId = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 150; // offset for sticky header

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // Product Inquire Sync & Direct WhatsApp Redirects
    // ----------------------------------------------------------------------
    const inquirySelect = document.getElementById('product-select');
    const contactSection = document.getElementById('contact');
    const userNameInput = document.getElementById('user-name');

    // Product Card "Inquire Now" buttons redirect directly to WhatsApp
    document.querySelectorAll('.select-product-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            const message = `Hi Sri Andavar Beds, I am interested in inquiring about the ${productName}. Please share details and pricing.`;
            const waUrl = `https://wa.me/917397503213?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    });

    // Navbar "Get Quote" button redirects directly to WhatsApp
    const btnNav = document.querySelector('.btn-nav');
    if (btnNav) {
        btnNav.addEventListener('click', (e) => {
            e.preventDefault();
            const message = "Hi Sri Andavar Beds, I would like to get a quote for a mattress. Please help me choose the right option.";
            const waUrl = `https://wa.me/917397503213?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    // Hero "Get in Touch" button redirects directly to WhatsApp
    const heroGetInTouch = document.querySelector('.hero-actions .btn-secondary');
    if (heroGetInTouch) {
        heroGetInTouch.addEventListener('click', (e) => {
            e.preventDefault();
            const message = "Hi Sri Andavar Beds, I want to connect with you regarding mattresses.";
            const waUrl = `https://wa.me/917397503213?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    // Phone links redirect to WhatsApp
    document.querySelectorAll('.phone-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const message = "Hi Sri Andavar Beds, I have an inquiry.";
            const waUrl = `https://wa.me/917397503213?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    });

    // ----------------------------------------------------------------------
    // Interactive 3D Size Planner / Calculator
    // ----------------------------------------------------------------------
    const calcType = document.getElementById('calc-type');
    const calcStandard = document.getElementById('calc-standard');
    const calcWidth = document.getElementById('calc-width');
    const calcLength = document.getElementById('calc-length');
    const calcThick = document.getElementById('calc-thick');
    const calcQty = document.getElementById('calc-qty');
    
    const labelWidthVis = document.getElementById('lbl-width-vis');
    const labelLengthVis = document.getElementById('lbl-length-vis');
    const labelThickVis = document.getElementById('lbl-thick-vis');
    const visualTypeLabel = document.getElementById('visual-type-label');
    const mattressBox = document.getElementById('mattress-box-3d');
    const btnSyncForm = document.getElementById('btn-sync-form');

    // Trigger update on any planner changes
    [calcType, calcStandard, calcWidth, calcLength, calcThick, calcQty].forEach(input => {
        input.addEventListener('change', updatePlanner);
        input.addEventListener('input', updatePlanner);
    });

    function updatePlanner() {
        // Standard bed measurements preset configuration
        const standardSizes = {
            single: { w: 36, l: 72 },
            double: { w: 48, l: 75 },
            queen: { w: 60, l: 78 },
            king: { w: 72, l: 78 }
        };

        const standardVal = calcStandard.value;

        // Toggle width/length input editability based on category selection
        if (standardVal === 'custom') {
            calcWidth.removeAttribute('readonly');
            calcLength.removeAttribute('readonly');
        } else {
            calcWidth.setAttribute('readonly', true);
            calcLength.setAttribute('readonly', true);
            // Apply preset values
            calcWidth.value = standardSizes[standardVal].w;
            calcLength.value = standardSizes[standardVal].l;
        }

        const widthVal = parseFloat(calcWidth.value) || 0;
        const lengthVal = parseFloat(calcLength.value) || 0;
        const thicknessVal = parseFloat(calcThick.value) || 0;
        const typeText = calcType.options[calcType.selectedIndex].text;

        // Update labels on 3D layout
        labelWidthVis.innerText = `${widthVal}" W`;
        labelLengthVis.innerText = `${lengthVal}" L`;
        labelThickVis.innerText = `${thicknessVal}" T`;
        visualTypeLabel.innerText = typeText.split(' (')[0];

        // 3D Scale Calculations
        // Base proportions are based on a standard Queen (60" W x 78" L x 6" T)
        const baseW = 60;
        const baseL = 78;
        const baseT = 6;

        const wScale = widthVal / baseW;
        const lScale = lengthVal / baseL;
        const tScale = thicknessVal / baseT;

        // Apply 3D Matrix scale styles
        if (mattressBox) {
            mattressBox.style.transform = `rotateX(-16deg) rotateY(-22deg) scale3d(${wScale}, ${tScale}, ${lScale})`;
        }
    }

    // Sync Planner details directly to the bottom contact form
    btnSyncForm.addEventListener('click', () => {
        const typeText = calcType.value;
        const standardText = calcStandard.options[calcStandard.selectedIndex].text;
        const widthVal = calcWidth.value;
        const lengthVal = calcLength.value;
        const thicknessVal = calcThick.value;
        const qtyVal = calcQty.value;

        // Pre-fill fields
        inquirySelect.value = "Custom Configured Mattress";
        
        const summaryWrapper = document.getElementById('dimensions-summary-wrapper');
        const summaryTextarea = document.getElementById('dimensions-summary');
        
        summaryWrapper.style.display = 'block';
        summaryTextarea.value = `PRODUCT CONFIGURATION DETAIL:\n-------------------------------------\nMattress Category: ${typeText}\nSize Preference: ${standardText}\nTarget Width: ${widthVal} Inches\nTarget Length: ${lengthVal} Inches\nThickness: ${thicknessVal} Inches\nQuantity Request: ${qtyVal} units`;
        
        // Scroll to form
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Highlight form inputs
        setTimeout(() => {
            userNameInput.focus();
        }, 800);
    });

    // Initialize planner visual
    updatePlanner();

    // ----------------------------------------------------------------------
    // FAQ Accordion
    // ----------------------------------------------------------------------
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Collapse other items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-header').setAttribute('aria-expanded', false);
            });

            // Toggle selected item
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', true);
            }
        });
    });

    // ----------------------------------------------------------------------
    // Form Submission Actions (WhatsApp redirects)
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const b2bForm = document.getElementById('b2b-quick-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('user-name').value;
            const phone = document.getElementById('user-phone').value;
            const email = document.getElementById('user-email').value;
            const product = document.getElementById('product-select').value;
            const messageText = document.getElementById('user-message').value;
            const dimensions = document.getElementById('dimensions-summary').value;

            let message = `Hi Sri Andavar Beds, I have an inquiry:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}
- Product: ${product}`;

            if (dimensions && document.getElementById('dimensions-summary-wrapper').style.display !== 'none') {
                message += `\n\n${dimensions}`;
            }

            if (messageText) {
                message += `\n\nMessage: ${messageText}`;
            }

            const waUrl = `https://wa.me/917397503213?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
            contactForm.reset();
            document.getElementById('dimensions-summary-wrapper').style.display = 'none';
        });
    }

    if (b2bForm) {
        b2bForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('b2b-name').value;
            const company = document.getElementById('b2b-company').value;
            const phone = document.getElementById('b2b-phone').value;
            const volume = document.getElementById('b2b-volume').value;

            const message = `Hi Sri Andavar Beds, I want to request a B2B callback/quote:
- Name: ${name}
- Company: ${company}
- Phone: ${phone}
- Est. Volume: ${volume}`;
            
            const waUrl = `https://wa.me/917397503213?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
            b2bForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // Dynamic Gallery Image Loader (Autoscroll)
    // ----------------------------------------------------------------------
    const galleryTrack = document.getElementById('gallery-track');
    if (galleryTrack) {
        const extensions = ['jpeg', 'jpg', 'png', 'webp'];
        const formats = [
            (idx) => `  (${idx})`,
            (idx) => ` (${idx})`,
            (idx) => `(${idx})`,
            (idx) => `${idx}`
        ];
        const loadedImages = [];
        let detectedFormat = null;
        let detectedExt = null;

        function detectFirstImage(formatIdx, extIdx) {
            if (formatIdx >= formats.length) {
                // All formats failed, initialize slider with fallback
                initializeSlider();
                return;
            }
            if (extIdx >= extensions.length) {
                // Try next format
                detectFirstImage(formatIdx + 1, 0);
                return;
            }

            const formatFn = formats[formatIdx];
            const ext = extensions[extIdx];
            const imgName = formatFn(1);
            const imgUrl = `assets/gallery/${imgName}.${ext}`;
            const tempImg = new Image();

            tempImg.onload = () => {
                loadedImages.push(imgUrl);
                detectedFormat = formatFn;
                detectedExt = ext;
                // Start loading the rest sequentially
                loadRemainingImages(2);
            };

            tempImg.onerror = () => {
                detectFirstImage(formatIdx, extIdx + 1);
            };

            tempImg.src = imgUrl;
        }

        function loadRemainingImages(index) {
            if (index > 100) { // Safety limit
                initializeSlider();
                return;
            }

            const imgName = detectedFormat(index);
            const imgUrl = `assets/gallery/${imgName}.${detectedExt}`;
            const tempImg = new Image();

            tempImg.onload = () => {
                loadedImages.push(imgUrl);
                loadRemainingImages(index + 1);
            };

            tempImg.onerror = () => {
                // Stop loading once we reach the end of the sequence
                initializeSlider();
            };

            tempImg.src = imgUrl;
        }

        function initializeSlider() {
            // Fallbacks in case assets/gallery is empty during initial load
            if (loadedImages.length === 0) {
                const fallbacks = [
                    'assets/luxury_bedroom_mattress.png',
                    'assets/luxury_bedroom_mattress.png',
                    'assets/luxury_bedroom_mattress.png',
                    'assets/luxury_bedroom_mattress.png'
                ];
                fallbacks.forEach(src => loadedImages.push(src));
            }

            // Clear track
            galleryTrack.innerHTML = '';

            // Create image elements for loaded array
            loadedImages.forEach(src => {
                const wrapper = document.createElement('div');
                wrapper.className = 'gallery-img-wrapper';
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Sri Andavar Beds Factory & Product Gallery';
                img.loading = 'lazy';
                wrapper.appendChild(img);
                galleryTrack.appendChild(wrapper);
            });

            // Duplicate for seamless infinite scrolling loop
            const count = loadedImages.length;
            for (let i = 0; i < count; i++) {
                const wrapper = galleryTrack.children[i].cloneNode(true);
                galleryTrack.appendChild(wrapper);
            }
        }

        // Start discovery from image 1
        detectFirstImage(0, 0);
    }

    // ----------------------------------------------------------------------
    // Dynamic Bonic Catalogue Loader
    // ----------------------------------------------------------------------
    const bonicGallery = document.getElementById('bonic-gallery');
    if (bonicGallery) {
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];
        // Try common filename formats
        const formatFns = [
            (idx) => `${idx}`,
            (idx) => `bonic${idx}`,
            (idx) => `bonic (${idx})`,
            (idx) => `bonic_${idx}`,
            (idx) => `  (${idx})`,
            (idx) => ` (${idx})`,
            (idx) => `(${idx})`
        ];
        
        const loadedBonicImages = [];
        let detectedBonicFormat = null;
        let detectedBonicExt = null;
        
        function detectFirstBonicImage(formatIdx, extIdx) {
            if (formatIdx >= formatFns.length) {
                // All formats failed, show fallback instructions
                displayBonicFallback();
                return;
            }
            if (extIdx >= extensions.length) {
                detectFirstBonicImage(formatIdx + 1, 0);
                return;
            }
            
            const formatFn = formatFns[formatIdx];
            const ext = extensions[extIdx];
            const imgName = formatFn(1);
            const imgUrl = `assets/bonic/${imgName}.${ext}`;
            const tempImg = new Image();
            
            tempImg.onload = () => {
                loadedBonicImages.push(imgUrl);
                detectedBonicFormat = formatFn;
                detectedBonicExt = ext;
                loadRemainingBonicImages(2);
            };
            
            tempImg.onerror = () => {
                detectFirstBonicImage(formatIdx, extIdx + 1);
            };
            
            tempImg.src = imgUrl;
        }
        
        function loadRemainingBonicImages(index) {
            if (index > 40) { // Safety cap
                renderBonicGallery();
                return;
            }
            
            const imgName = detectedBonicFormat(index);
            const imgUrl = `assets/bonic/${imgName}.${detectedBonicExt}`;
            const tempImg = new Image();
            
            tempImg.onload = () => {
                loadedBonicImages.push(imgUrl);
                loadRemainingBonicImages(index + 1);
            };
            
            tempImg.onerror = () => {
                renderBonicGallery();
            };
            
            tempImg.src = imgUrl;
        }
        
        function renderBonicGallery() {
            if (loadedBonicImages.length === 0) {
                displayBonicFallback();
                return;
            }
            
            bonicGallery.innerHTML = '';
            loadedBonicImages.forEach((src, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'bonic-img-wrapper';
                
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Bonic Pillow and Mattress Catalogue Image ${index + 1}`;
                img.loading = 'lazy';
                
                wrapper.appendChild(img);
                bonicGallery.appendChild(wrapper);

                // Add click listener for lightbox
                wrapper.addEventListener('click', () => {
                    openLightbox(src, img.alt);
                });
            });
        }
        
        function displayBonicFallback() {
            bonicGallery.innerHTML = `
                <div class="bonic-placeholder" style="width: 100%;">
                    <div class="text-center" style="padding: 10px; width: 100%;">
                        <span style="font-size: 32px; display: block; margin-bottom: 10px;">🛏️</span>
                        <p style="font-weight: 600; margin-bottom: 4px; color: var(--color-navy); font-size: 15px;">Bonic Catalogue Images</p>
                        <p style="font-size: 13px; color: var(--color-gray-text); line-height: 1.5; margin: 0 auto; max-width: 280px;">
                            Please create the <code>assets/bonic/</code> folder and place your images inside named as <code>1.jpg</code>, <code>2.jpg</code>, etc. to view them here.
                        </p>
                    </div>
                </div>
            `;
        }
        
        // Start detection
        detectFirstBonicImage(0, 0);
    }

    // ----------------------------------------------------------------------
    // Lightbox Overlay View
    // ----------------------------------------------------------------------
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        if (lightboxCaption) {
            lightboxCaption.innerText = alt;
        }
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // Match CSS transition timing
    }

    if (lightbox) {
        // Close on clicking close button or outside image content
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxClose) {
                closeLightbox();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // ----------------------------------------------------------------------
    // Dynamic Accessory Image Format Detector
    // ----------------------------------------------------------------------
    const accessoryImages = document.querySelectorAll('.dynamic-accessory-img');
    if (accessoryImages.length > 0) {
        const formats = ['jpg', 'jpeg', 'png', 'webp'];
        
        accessoryImages.forEach(img => {
            const filename = img.getAttribute('data-filename');
            if (!filename) return;
            
            // Function to try loading formats sequentially
            function tryFormat(index) {
                if (index >= formats.length) {
                    // Fallback to standard luxury mattress render if none loaded
                    img.src = 'assets/luxury_bedroom_mattress.png';
                    return;
                }
                
                const ext = formats[index];
                const testUrl = `assets/accessories/${filename}.${ext}`;
                const tempImg = new Image();
                
                tempImg.onload = () => {
                    img.src = testUrl;
                };
                
                tempImg.onerror = () => {
                    tryFormat(index + 1);
                };
                
                tempImg.src = testUrl;
            }
            
            // Start probing
            tryFormat(0);
        });
    }

    // ----------------------------------------------------------------------
    // Dynamic Specialty Image Format Detector
    // ----------------------------------------------------------------------
    const specialtyImages = document.querySelectorAll('.dynamic-specialty-img');
    if (specialtyImages.length > 0) {
        const formats = ['jpg', 'jpeg', 'png', 'webp'];
        
        specialtyImages.forEach(img => {
            const filename = img.getAttribute('data-filename');
            if (!filename) return;
            
            function tryFormat(index) {
                if (index >= formats.length) {
                    img.src = 'assets/luxury_bedroom_mattress.png';
                    return;
                }
                
                const ext = formats[index];
                const testUrl = `assets/specialty/${filename}.${ext}`;
                const tempImg = new Image();
                
                tempImg.onload = () => {
                    img.src = testUrl;
                };
                
                tempImg.onerror = () => {
                    tryFormat(index + 1);
                };
                
                tempImg.src = testUrl;
            }
            
            tryFormat(0);
        });
    }
});
