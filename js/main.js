// Main JavaScript untuk Portofolio Website

// DOM Elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
const modal = document.getElementById('video-modal');
const closeModalBtn = document.getElementById('close-modal');
const videoFrame = document.getElementById('video-frame');
const navLinks = document.querySelectorAll('a[href^="#"]');
const fadeElements = document.querySelectorAll('.fade-in');

// Mobile Menu Toggle
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.add('hidden');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('shadow-sm');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.add('shadow-sm');
    }
});

// Smooth scrolling for anchor links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Video Modal Functions
function openModal(videoId) {
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    videoFrame.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for modal
closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Scroll animation for fade-in elements
function checkFadeElements() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

// Initialize fade elements on load
window.addEventListener('load', () => {
    checkFadeElements();
});

// Check fade elements on scroll
window.addEventListener('scroll', checkFadeElements);

// Form validation for contact form
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all fade elements as visible if they're in viewport on load
    checkFadeElements();

    // Add hover effect to all cards with hover-card class
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });

    // Download CV button tracking (simulated)
    const downloadCvButtons = document.querySelectorAll('a[href*="Saepurrohman_CV.pdf"]');
    downloadCvButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('CV download initiated');
            // In a real implementation, you might want to track this event with analytics
        });
    });
});

// Simulate download CV functionality with a fallback message
document.querySelectorAll('a[href="assets/cv/Saepurrohman_CV.pdf"]').forEach(link => {
    link.addEventListener('click', function (e) {
        // In a real deployment, this would download the actual PDF
        // For GitHub Pages demo, we'll show a message
        if (!document.body.classList.contains('cv-message-added')) {
            const message = document.createElement('div');
            message.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50';
            message.innerHTML = '<i class="fas fa-check-circle mr-2"></i> CV berhasil diunduh (demo)';
            document.body.appendChild(message);
            document.body.classList.add('cv-message-added');

            // Remove message after 3 seconds
            setTimeout(() => {
                message.remove();
                document.body.classList.remove('cv-message-added');
            }, 3000);
        }
    });
});

let currentImageIndex = 0;
const images = [
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.31 (1).jpeg', alt: 'Kegiatan Organisasi 1' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.31 (2).jpeg', alt: 'Kegiatan Organisasi 2' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.31.jpeg', alt: 'Kegiatan Organisasi 3' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.32 (1).jpeg', alt: 'Kegiatan Organisasi 4' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.32 (2).jpeg', alt: 'Kegiatan Organisasi 5' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.32.jpeg', alt: 'Kegiatan Organisasi 6' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.33.jpeg', alt: 'Kegiatan Organisasi 7' },
    { src: 'assets/img/WhatsApp Image 2026-02-05 at 10.11.34.jpeg', alt: 'Kegiatan Organisasi 8' }
];

function openLightbox(src, alt) {
    currentImageIndex = images.findIndex(img => img.src === src);
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImage.src = src;
    lightboxCaption.textContent = alt;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    lightbox.classList.remove('flex');
    lightbox.classList.add('hidden');

    // Restore scrolling
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightbox();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightbox();
}

function updateLightbox() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImage.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].alt;
}

// Close lightbox with Escape key
document.addEventListener('keydown', function (event) {
    const lightbox = document.getElementById('lightboxModal');
    if (!lightbox.classList.contains('hidden')) {
        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Close lightbox when clicking outside the image
document.getElementById('lightboxModal').addEventListener('click', function (event) {
    if (event.target === this) {
        closeLightbox();
    }
});
// PDF Viewer Functionality - Download Only Version
function setupPDFViewer() {
    const container = document.getElementById('pdfViewer');

    if (!container) {
        console.error('PDF viewer container not found');
        return;
    }

    // Tampilkan opsi download yang menarik
    container.innerHTML = `
        <div class="h-full flex items-center justify-center">
            <div class="text-center max-w-md">
                <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-file-pdf text-3xl text-purple-600"></i>
                </div>
                <h4 class="text-xl font-bold text-gray-800 mb-2">Script Film "LARUT"</h4>
                <p class="text-gray-600 mb-4">Download script film pendek untuk melihat konten lengkap</p>
                
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <div class="flex items-center justify-center mb-3">
                        <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                        <span class="text-sm text-gray-700">Format: PDF | Ukuran file: -</span>
                    </div>
                    <p class="text-sm text-gray-600">
                        Script ini berisi dialog, arahan sutradara, deskripsi adegan, dan karakterisasi tokoh secara lengkap.
                    </p>
                </div>
                
                <div class="space-y-3">
                    <a href="assets/img/larut.pdf" download
                       class="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                        <i class="fas fa-download text-xl mr-3"></i>
                        <div class="text-left">
                            <div class="font-bold">Download Script PDF</div>
                            <div class="text-sm opacity-90">Klik untuk mendownload file</div>
                        </div>
                    </a>
                    
                    <div class="flex space-x-3">
                        <button onclick="previewPDFInNewTab()"
                                class="flex-1 bg-white text-purple-600 border border-purple-600 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center">
                            <i class="fas fa-external-link-alt mr-2"></i> Preview
                        </button>
                        <button onclick="showFileInfo()"
                                class="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                            <i class="fas fa-info-circle mr-2"></i> Info
                        </button>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-gray-200">
                    <p class="text-xs text-gray-500">
                        <i class="fas fa-lightbulb mr-1"></i>
                        File akan didownload ke perangkat Anda. Buka dengan PDF reader seperti Adobe Acrobat.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Fungsi untuk preview di tab baru
function previewPDFInNewTab() {
    const pdfPath = 'assets/img/larut.pdf';
    window.open(pdfPath, '_blank', 'noopener,noreferrer');
}

// Fungsi untuk menampilkan info file
function showFileInfo() {
    const pdfPath = 'assets/img/larut.pdf';

    const fileInfo = `
📄 INFORMASI FILE:

• Nama file: larut.pdf
• Format: PDF Document
• Lokasi: ${pdfPath}
• Cara membuka:
  1. Download file terlebih dahulu
  2. Buka dengan Adobe Acrobat Reader
  3. Atau browser modern (Chrome, Firefox)
  
🔧 Jika ada masalah:
• Pastikan Anda memiliki PDF reader
• Coba download ulang file
• Periksa koneksi internet
    `;

    alert(fileInfo);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, setting up PDF download viewer...');

    // Setup PDF viewer dengan delay kecil
    setTimeout(() => {
        setupPDFViewer();
    }, 300);
});

// Make functions available globally
window.previewPDFInNewTab = previewPDFInNewTab;
window.showFileInfo = showFileInfo;