// ==================== MOBILE MENU ==================== 
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarMenu.classList.remove('active');
      });
    });
  }

  // Set active link based on current page
  const currentLocation = location.pathname;
  const menuItems = document.querySelectorAll('.navbar-menu a');
  menuItems.forEach(link => {
    if (link.pathname === currentLocation) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// ==================== RESOURCE FILTER ==================== 
function setupResourceFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resourceCards = document.querySelectorAll('.resource-card');

  if (filterButtons.length > 0 && resourceCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // Show/hide cards based on filter
        resourceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.classList.add('active');
            }, 10);
          } else {
            card.classList.remove('active');
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

// ==================== CONTACT FORM ==================== 
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('contactName');
    const email = formData.get('contactEmail');
    const subject = formData.get('contactSubject');
    const message = formData.get('contactMessage');

    // Validation
    if (!name || !email || !subject || !message) {
      showError('contactError', 'Por favor completa todos los campos requeridos.');
      return;
    }

    // Simulate form submission
    // In a real application, this would send data to a backend
    console.log('Form submitted:', { name, email, subject, message });

    // Show success message
    const successMsg = document.getElementById('contactSuccess');
    const errorMsg = document.getElementById('contactError');
    if (successMsg) successMsg.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');

    // Reset form
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (successMsg) successMsg.classList.add('hidden');
    }, 5000);
  });
}

function showError(elementId, message) {
  const errorMsg = document.getElementById(elementId);
  if (errorMsg) {
    const errorText = errorMsg.querySelector('p');
    if (errorText) {
      errorText.textContent = message;
    }
    errorMsg.classList.remove('hidden');
  }
}

// ==================== PARTICIPATION FORM ==================== 
function setupParticipationForm() {
  const participationForm = document.getElementById('participationForm');
  if (!participationForm) return;

  participationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('partName');
    const email = formData.get('partEmail');
    const challenge = formData.get('partChallenge');

    // Validation
    if (!name || !email || !challenge) {
      showError('formError', 'Por favor completa todos los campos requeridos.');
      return;
    }

    // Simulate form submission to Google Forms
    console.log('Participation registered:', { name, email, challenge });

    // Show success message
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');
    if (successMsg) successMsg.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');

    // Reset form
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (successMsg) successMsg.classList.add('hidden');
    }, 5000);
  });
}

// ==================== UPLOAD FORM ==================== 
function setupUploadForm() {
  const uploadForm = document.getElementById('uploadForm');
  if (!uploadForm) return;

  // Setup file upload drag and drop
  const fileUploadArea = document.querySelector('.file-upload-area');
  const fileInput = document.getElementById('uploadFiles');

  if (fileUploadArea && fileInput) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileUploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      fileUploadArea.addEventListener(eventName, () => {
        fileUploadArea.style.borderColor = '#2ecc71';
        fileUploadArea.style.background = 'rgba(46, 204, 113, 0.1)';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileUploadArea.addEventListener(eventName, () => {
        fileUploadArea.style.borderColor = '#ecf0f1';
        fileUploadArea.style.background = '#f8f9fa';
      });
    });

    fileUploadArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      fileInput.files = files;
      updateFileList();
    });

    fileUploadArea.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', updateFileList);
  }

  uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('uploadName');
    const email = formData.get('uploadEmail');
    const challenge = formData.get('uploadChallenge');
    const description = formData.get('uploadDescription');
    const files = fileInput.files;

    // Validation
    if (!name || !email || !challenge || !description || files.length === 0) {
      showError('uploadError', 'Por favor completa todos los campos y carga al menos un archivo.');
      return;
    }

    // Validate file sizes
    let totalSize = 0;
    for (let file of files) {
      totalSize += file.size;
      if (file.size > 50 * 1024 * 1024) { // 50MB
        showError('uploadError', 'Algunos archivos superan el límite de 50MB.');
        return;
      }
    }

    // Simulate upload to Google Drive
    console.log('Upload submitted:', {
      name,
      email,
      challenge,
      description,
      files: Array.from(files).map(f => f.name)
    });

    // Show success message
    const successMsg = document.getElementById('uploadSuccess');
    const errorMsg = document.getElementById('uploadError');
    if (successMsg) successMsg.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');

    // Reset form
    this.reset();
    document.getElementById('fileList').innerHTML = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (successMsg) successMsg.classList.add('hidden');
    }, 5000);
  });
}

function updateFileList() {
  const fileInput = document.getElementById('uploadFiles');
  const fileList = document.getElementById('fileList');
  if (!fileList) return;

  fileList.innerHTML = '';
  const files = fileInput.files;

  if (files.length > 0) {
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';

    for (let file of files) {
      const li = document.createElement('li');
      li.className = 'file-item';
      const size = (file.size / 1024 / 1024).toFixed(2);
      li.innerHTML = `
        <span>📄 ${file.name} (${size}MB)</span>
        <button type="button" onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: #e74c3c; font-weight: bold;">✕</button>
      `;
      ul.appendChild(li);
    }
    fileList.appendChild(ul);
  }
}

// ==================== ANIMATE STATS ==================== 
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const current = parseInt(stat.textContent) || 0;
    const increment = target / 30; // Animate over 30 frames
    let count = current;

    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(count);
      }
    }, 30);
  });
}

// ==================== INITIALIZE ON LOAD ==================== 
document.addEventListener('DOMContentLoaded', function() {
  setupResourceFilter();
  setupContactForm();
  setupParticipationForm();
  setupUploadForm();
  animateStats();

  // Scroll to section
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});


// DIARIO
fetch("https://script.google.com/macros/s/AKfycbwrDJc0ttRu3kYIcyjSlNSSClBpboe13RV7-UMINXHZTAt83nrf-m1gyRL5yQw50ReD/exec")

.then(r=>r.json())

.then(data=>{

    if(data.dia){

        document.getElementById("dia").innerHTML=
        "📅 "+data.dia;

    }else{

        document.getElementById("dia").innerHTML=
        "🌱 EcoDato del día";

    }

    document.getElementById("dato").innerHTML=
    "💡 "+data.dato;

    document.getElementById("consejo").innerHTML=
    "♻ "+data.consejo;

});
