    document.addEventListener("DOMContentLoaded", function () {
      // Підключення footer
      fetch('footer.html')
        .then(response => {
          if (!response.ok) throw new Error('Не вдалося завантажити footer.html');
          return response.text();
        })
        .then(data => {
          document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Помилка з футером:', error));
    });
    function toggleTheme() {
      document.body.classList.toggle('light-theme');
    }
    function toggleMobileMenu() {
      const mobileNav = document.getElementById('mobileNav');
      mobileNav.classList.toggle('active');
    }
    function toggleSubmenu(id) {
      const submenu = document.getElementById(id);
      submenu.classList.toggle('active');
    }
    function openModal(id) {
      document.getElementById(id).style.display = 'flex';
    }
    function closeModal(id) {
      document.getElementById(id).style.display = 'none';
    }
    // Закривання по кліку поза вікном
    window.onclick = function(event) {
      const login = document.getElementById('loginModal');
      const register = document.getElementById('registerModal');
      if (event.target === login) login.style.display = 'none';
      if (event.target === register) register.style.display = 'none';
    };
    
    // Обробка відправки форми відгуків
    document.querySelectorAll('.review-form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const textarea = form.querySelector('textarea');
        const comment = textarea.value.trim();
        if (!comment) return;
        const feedbackBlock = form.parentElement.querySelector('.feedback');
        const newComment = document.createElement('div');
        newComment.classList.add('comment-with-icon');
        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon icon-comment';
        iconSpan.innerHTML = `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="18px" height="18px" viewBox="0 0 256.000000 256.000000"
            preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
                    fill="currentColor" stroke="none">
                    <path d="M160 2511 c-78 -24 -129 -73 -150 -146 -8 -29 -10 -292 -8 -966 l3
                    -926 30 -48 c21 -35 45 -56 80 -74 l49 -26 389 -5 389 -5 66 -75 c121 -137
                    164 -175 215 -189 102 -29 161 0 288 144 54 62 106 116 115 119 9 3 176 6 372
                    6 224 0 372 4 397 11 63 17 112 56 140 112 l25 51 0 921 c0 663 -3 932 -11
                    956 -19 56 -59 100 -113 125 l-51 24 -1100 -1 c-605 0 -1111 -4 -1125 -8z
                    m2244 -142 l26 -20 0 -924 c0 -893 -1 -924 -19 -946 l-19 -24 -394 -5 -393 -5
                    -47 -28 c-26 -15 -54 -37 -62 -48 -8 -12 -51 -61 -96 -110 -76 -83 -84 -89
                    -120 -89 -38 0 -44 6 -146 119 -58 65 -123 127 -143 137 -33 17 -70 19 -429
                    24 l-394 5 -19 24 c-18 22 -19 53 -19 946 l0 924 26 20 c27 21 29 21 1124 21
                    1095 0 1097 0 1124 -21z"/>
                    <path d="M595 1975 c-31 -30 -32 -55 -2 -83 l23 -22 665 0 666 0 21 23 c28 30
                    28 52 -3 82 l-24 25 -661 0 -661 0 -24 -25z"/>
                    <path d="M590 1470 c-25 -25 -25 -51 -1 -81 l19 -24 672 0 672 0 19 24 c24 30
                    24 56 -1 81 -20 20 -33 20 -690 20 -657 0 -670 0 -690 -20z"/>
                    <path d="M586 958 c-21 -30 -20 -54 4 -78 20 -20 33 -20 690 -20 657 0 670 0
                    690 20 24 24 25 48 4 78 l-15 22 -679 0 -679 0 -15 -22z"/>
                </g>
        </svg>
        `;
        const textNode = document.createElement('span');
        textNode.textContent = ` "${comment}"`;
        newComment.appendChild(iconSpan);
        newComment.appendChild(textNode);
        feedbackBlock.appendChild(document.createElement('br'));
        feedbackBlock.appendChild(newComment);
        textarea.value = '';
      });
    });

    // Функція для малювання зірок (середній рейтинг)
    function renderStars(container, rating) {
      container.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
          container.innerHTML += '<span>★</span>';
        } else if (rating > i - 1 && rating < i) {
          container.innerHTML += '<span>★</span>'; // Можна додати напівзірку SVG
        } else {
          container.innerHTML += '<span style="color:#ccc;">☆</span>';
        }
      }
    }
    // Для всіх рейтингів на сторінці
    document.querySelectorAll('.teacher-rating').forEach(el => {
      const rating = parseFloat(el.getAttribute('data-rating'));
      renderStars(el, rating);
    });
    // Інтерактивне виставлення зірок
    document.querySelectorAll('.star-input').forEach(input => {
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.dataset.value = i;
        star.addEventListener('mouseenter', () => {
          input.querySelectorAll('span').forEach((s, idx) => {
            s.style.color = idx < i ? '#FFD700' : '#ccc';
          });
        });
        star.addEventListener('mouseleave', () => {
          const value = parseInt(input.dataset.value) || 0;
          input.querySelectorAll('span').forEach((s, idx) => {
            s.style.color = idx < value ? '#FFD700' : '#ccc';
          });
        });
        star.addEventListener('click', () => {
          input.dataset.value = i;
          input.querySelectorAll('span').forEach((s, idx) => {
            s.style.color = idx < i ? '#FFD700' : '#ccc';
            s.classList.toggle('active', idx < i);
          });
        });
        input.appendChild(star);
      }
      // Початкове відображення
      input.dispatchEvent(new Event('mouseleave'));
    });
