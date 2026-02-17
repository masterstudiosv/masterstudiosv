const toggleBtn = document.getElementById('navbarToggle');
  const navbarLinks = document.getElementById('navbarLinks');
  const dropdown = document.querySelector('.navbar-links .dropdown');

  toggleBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });

  toggleBtn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navbarLinks.classList.toggle('active');
    }
  });

  // Toggle dropdown en móvil
  dropdown.addEventListener('click', e => {
    if(window.innerWidth <= 768){
      e.preventDefault();
      dropdown.classList.toggle('active');
    }
  });
