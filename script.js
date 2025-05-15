    // Завантаження хедера
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });
    // Завантаження футера
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
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