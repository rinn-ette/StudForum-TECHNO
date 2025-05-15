// Завантаження футера
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

    function toggleDropdown() {
      const dropdown = document.getElementById('courseDropdown');
      dropdown.classList.toggle('open');
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

    // Функція для відкриття форми повідомлення КНОПКА НАПИСАТИ
    function openMessageForm(userId, userName) {
        const existingModal = document.getElementById('messageModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'messageModal';
        modal.innerHTML = `
            <div class="modal-content">
            <span class="close" onclick="closeModal('messageModal')">&times;</span>
            <h2 style="text-align:center;">Повідомлення для ${userName}</h2>
            <form id="messageForm">
                <textarea placeholder="Введіть ваше повідомлення..." required></textarea>
                <button type="submit" style="margin-top: 1rem; display: block; margin-inline: auto;">Надіслати</button>
            </form>
            </div>
        `;
        document.body.appendChild(modal);
        openModal('messageModal');
        // Обробник відправлення форми
        document.getElementById('messageForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Логіка відправки повідомлення
            closeModal('messageModal');
            showNotification(`Повідомлення для ${userName} відправлено!`);
        });
    }
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = '#4caf50';
        notification.style.color = '#fff';
        notification.style.padding = '1rem';
        notification.style.borderRadius = '8px';
        notification.style.zIndex = 9999;
        notification.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    //КНОПКА ДОДАТИ В ДРУЗІ
    function sendFriendRequest(button, userId) {
        // Зміна стану кнопки
        button.textContent = "Запит надіслано";
        button.classList.add("request-sent");
        button.disabled = true;
        // Анімація для покращеного UX
        button.style.transition = "background 0.3s";
        // Симуляція надсилання запиту на сервер
        setTimeout(() => {
            showNotification("Запит на додавання в друзі надіслано!");
        }, 500);
    }

    //КАРТКИ УЧАСНИКІВ
    let currentParticipantsCount = 4;
    const totalParticipants = 12;
    let expanded = false;

    const allParticipants = [
        { id: 5, name: 'Сергій Савич', desc: '1 курс, електроніка', photo: 'https://novostipmr.com/sites/default/files/filefield_paths/haker.jpg' },
        { id: 6, name: 'Максим Онищук', desc: '2 курс, інформатика', photo: 'https://i.pinimg.com/236x/55/88/7a/55887a9db98afb221d8390b3f583b9b5.jpg' },
        { id: 7, name: 'Анна Яблуко', desc: '3 курс, моделювання', photo: 'https://i.pinimg.com/736x/bd/9f/76/bd9f766051eeb290396047d9153b0a37.jpg' },
        { id: 8, name: 'Роман Діалог', desc: '4 курс, фізика', photo: 'https://sotni.ru/wp-content/uploads/2023/08/avatarki-dlia-parnei-34.webp' },
        { id: 9, name: 'Амалія Дмитренко', desc: 'Аспірантка, кібернетика', photo: 'https://i.pinimg.com/originals/21/46/fc/2146fc816d04663ebaafad7ccb185c1c.jpg' },
        { id: 10, name: 'Амур Колеснік', desc: 'Дизайнер UI/UX', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_-0uDGGqwttY3oELKfbLLg-veZD2kwO6a-g&s' },
        { id: 11, name: 'Євгеній Геній', desc: 'Магістр, ІТ', photo: 'https://pm1.aminoapps.com/6660/fa3498b97af748a70f70872ad7df706a025b25f5_hq.jpg' },
        { id: 12, name: 'Марго Титан', desc: '4 курс, вишмат', photo: 'https://i.pinimg.com/736x/57/7d/05/577d05e9915b78c55809f2135d9619f9.jpg' },
    ];

    function getMoreParticipantsData(start, count) {
        return allParticipants.slice(start - 4, start - 4 + count);
    }
    function createParticipantCard(participant) {
        const card = document.createElement('div');
        card.className = 'participant-card';
        card.innerHTML = `
            <img class="participant-photo" src="${participant.photo}" alt="${participant.name}">
            <div class="participant-name">${participant.name}</div>
            <div class="participant-desc">${participant.desc}</div>
            <div class="participant-actions">
        <button class="btn" onclick="openMessageForm(${participant.id}, '${participant.name}')">Написати</button>
        <button class="btn friend" onclick="sendFriendRequest(this, ${participant.id})">Додати в друзі</button>
        </div>
        `;
        return card;
    }
    function showMoreParticipants() {
        const button = document.getElementById('loadMoreBtn');
        const grid = document.querySelector('.participants-grid');

        if (!expanded) {
            button.textContent = "Завантаження...";
            setTimeout(() => {
            const newParticipants = getMoreParticipantsData(currentParticipantsCount, 8);
            newParticipants.forEach(p => grid.appendChild(createParticipantCard(p)));
            button.textContent = "Показати менше";
            expanded = true;
            }, 600);
        } else {
            // Видалити всі додані картки (залишити перші 4)
            const cards = grid.querySelectorAll('.participant-card');
            for (let i = cards.length - 1; i >= 4; i--) {
            cards[i].remove();
            }
            button.textContent = "Показати більше";
            expanded = false;
        }
    }    

    //КНОПКА ЛАЙКУ
    function handleLike(button, postId) {
        const likeCount = parseInt(button.textContent.match(/\d+/)[0]);
        const isLiked = button.classList.contains('liked');
        if (isLiked) {
            // Відміна лайку
            button.innerHTML = `<img src="like.svg" class="icon" alt="Лайк">${likeCount - 1}`;
            button.classList.remove('liked');
        } else {
            // Додавання лайку
            button.innerHTML = `<img src="like.svg" class="icon" alt="Лайк">${likeCount + 1}`;
            button.classList.add('liked');
            // Анімація для візуального відгуку
            button.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
            ], {
            duration: 300,
            easing: 'ease-in-out'
            });
        }
    }

    //КНОПКА КОМЕНТАРІВ
    function toggleComments(button, postId) {
        const post = button.closest('.activity-post');
        let commentsSection = post.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.remove();
            return;
        }
        // Створення нової секції коментарів
        commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';
        // Завантаження коментарів (приклад)
        const comments = getCommentsForPost(postId);
        // Заповнення секції коментарів
        commentsSection.innerHTML = `
            <div class="comments-list">
            ${comments.map(comment => `
                <div class="comment">
                <img class="comment-avatar" src="${comment.authorAvatar}" alt="${comment.authorName}">
                <div class="comment-content">
                    <div class="comment-author">${comment.authorName}</div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-time">${comment.time}</div>
                </div>
                </div>
            `).join('')}
            </div>
            <div class="add-comment">
            <textarea placeholder="Додати коментар..."></textarea>
            <button onclick="addComment(this, ${postId})">Відправити</button>
            </div>
        `;
        post.appendChild(commentsSection);
    }
    const commentsByPostId = {
        1: [
            {
                authorName: "Іван Блискавка",
                authorAvatar: "https://zefirka.club/uploads/posts/2023-01/1673691440_1-zefirka-club-p-molniya-makvin-na-avu-2.jpg",
                text: "Прорекламував тебе на своєму сайті😂",
                time: "1 година тому"
            },
            {
                authorName: "Катерина Змієнко",
                authorAvatar: "https://i.pinimg.com/736x/db/35/6d/db356da5030dcba5a7e07c4818be72e6.jpg",
                text: "Підписалася :)",
                time: "45 хв тому"
            }
        ],
        2: [
            {
                authorName: "0.25",
                authorAvatar: "https://my-study-st.readthedocs.io/_images/cake.png",
                text: "Мінімалістично, лаконічно, ідеально!",
                time: "2 години тому"
            }
        ],
        3: [
            {
                authorName: "Амур Колеснік",
                authorAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_-0uDGGqwttY3oELKfbLLg-veZD2kwO6a-g&s",
                text: "Мяу",
                time: "3 години тому"
            }
        ]
    };
    function getCommentsForPost(postId) {
        return commentsByPostId[postId] || [];
    }

    function addComment(button, postId) {
        const textarea = button.previousElementSibling;
        const text = textarea.value.trim();
        if (!text) return;

        const newComment = {
            authorName: "Незареєстрований користувач",
            authorAvatar: "https://i.pinimg.com/736x/f4/6c/c1/f46cc1889a5591b5a1268adbfe80a29f.jpg",
            text: text,
            time: "Щойно"
        };

        if (!commentsByPostId[postId]) {
            commentsByPostId[postId] = [];
        }
        commentsByPostId[postId].push(newComment);

        const commentsList = button.closest('.comments-section').querySelector('.comments-list');
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.innerHTML = `
            <img class="comment-avatar" src="${newComment.authorAvatar}" alt="${newComment.authorName}">
            <div class="comment-content">
                <div class="comment-author">${newComment.authorName}</div>
                <div class="comment-text">${newComment.text}</div>
                <div class="comment-time">${newComment.time}</div>
            </div>
        `;
        commentsList.appendChild(commentEl);
        textarea.value = '';
        showNotification("Коментар додано");
        // 🔢 ОНОВЛЕННЯ ЛІЧИЛЬНИКА
        const post = button.closest('.activity-post');
        const countSpan = post.querySelector('.comment-count');
        if (countSpan) {
            countSpan.textContent = commentsByPostId[postId].length;
        }
    }

    //ВІКНО СТВОРЕННЯ ПОСТА
    function openCreatePostModal() {
    openModal('createPostModal');
    // Обробник файлів
    document.getElementById('mediaUpload').addEventListener('change', function(e) {
        const files = e.target.files;
        const previewContainer = document.getElementById('uploadPreview');
        previewContainer.innerHTML = ''; // Очищення попередніх попередніх переглядів
        for (const file of files) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.textContent = file.name;

        // Кнопка видалення
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-media';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = function() {
            previewItem.remove();
        }; 
        previewItem.appendChild(removeBtn);
        previewContainer.appendChild(previewItem);
        }
    });
    // Обробник відправлення форми
    document.getElementById('postForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Логіка відправлення форми...

        const postText = document.getElementById('postText').value;
        // Створення нового поста
        const newPost = document.createElement('div');
        newPost.className = 'activity-post';
        newPost.innerHTML = `
        <div class="activity-post-header">
            <img class="activity-post-avatar" src="https://i.pinimg.com/736x/f4/6c/c1/f46cc1889a5591b5a1268adbfe80a29f.jpg" alt="Користувач">
            <span class="activity-post-user">Ви</span>
            <span class="activity-post-time">Щойно</span>
        </div>
        <div class="activity-post-content">
            ${postText}
        </div>
        <div class="activity-post-actions">
            <button class="btn" onclick="handleLike(this)">
            <span class="icon icon-like">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="18px" height="18px" viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="currentColor" stroke="none">
                  <path d="M386 4984 c-130 -31 -261 -133 -324 -251 -66 -124 -63 -48 -60 -1580
                  l3 -1388 23 -59 c59 -156 184 -273 347 -327 31 -10 196 -14 710 -19 l669 -5
                  338 -585 c186 -323 351 -597 367 -612 55 -49 147 -49 202 0 16 15 180 287 367
                  612 l338 585 669 5 c514 5 679 9 710 19 164 54 288 170 347 327 l23 59 3 1380
                  c2 993 0 1397 -8 1440 -36 193 -191 355 -381 400 -94 22 -4251 21 -4343 -1z
                  m4291 -315 c40 -15 82 -57 104 -104 18 -38 19 -97 19 -1385 0 -1284 -1 -1347
                  -19 -1385 -22 -50 -69 -91 -119 -105 -24 -6 -285 -10 -732 -10 -691 0 -695 0
                  -730 -21 -19 -12 -40 -29 -47 -38 -7 -9 -141 -240 -299 -513 -158 -274 -291
                  -498 -294 -498 -3 0 -134 222 -290 493 -156 270 -292 503 -303 517 -46 62 -15
                  59 -777 60 -446 0 -708 4 -732 10 -50 14 -97 55 -119 105 -18 38 -19 102 -19
                  1383 0 1471 -4 1380 58 1446 56 59 -92 55 2179 56 1454 0 2100 -3 2120 -11z"/>
                  <path d="M1990 4099 c-155 -16 -316 -97 -431 -216 -79 -83 -129 -162 -165
                  -268 -24 -69 -28 -96 -29 -195 0 -100 4 -125 28 -196 69 -203 242 -430 515
                  -677 167 -151 560 -477 590 -488 35 -13 103 -11 133 5 28 15 304 239 479 390
                  328 284 542 550 617 770 24 71 28 96 28 196 -1 99 -5 126 -29 195 -15 44 -47
                  112 -71 151 -52 83 -168 197 -246 241 -169 96 -380 121 -567 68 -67 -19 -186
                  -81 -242 -126 l-39 -32 -53 41 c-140 108 -331 160 -518 141z m219 -340 c72
                  -25 148 -84 196 -154 57 -83 84 -100 155 -100 70 0 98 17 152 96 69 101 160
                  159 274 177 172 28 349 -67 421 -224 82 -180 9 -347 -286 -647 -144 -147 -536
                  -487 -561 -487 -28 0 -438 359 -592 518 -206 213 -297 374 -285 503 18 201
                  220 363 427 341 25 -2 69 -13 99 -23z"/>
                  </g>
                </svg>
            </span>
            0
            </button>
            <button class="btn" onclick="toggleComments(this)">
            <span class="icon icon-comment">
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
            </span>
            <span class="comment-count">0</span>
            </button>
        </div>
        `;

        // Додаємо пост у стрічку
        const feed = document.querySelector('.activity-feed');
        feed.prepend(newPost);
        // Очищаємо форму
        document.getElementById('postForm').reset();
        document.getElementById('uploadPreview').innerHTML = '';

        closeModal('createPostModal');
        showNotification('Пост успішно опублікований!');
    });
    }
    function triggerFileUpload(type) {
    const fileInput = document.getElementById('mediaUpload');
    if (type === 'image') {
        fileInput.accept = 'image/*';
    } else if (type === 'video') {
        fileInput.accept = 'video/*';
    }
    fileInput.click();
    }

    // Лінивий завантажувач для зображень
    document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('.participant-photo[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
            }
        });
        });
        lazyImages.forEach(img => {
        imageObserver.observe(img);
        });
    } else {
        // Запасний варіант для браузерів без підтримки IntersectionObserver
        lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        });
    }
    });
