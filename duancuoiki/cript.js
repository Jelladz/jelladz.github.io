// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ ISLearn Platform Loaded');
    loadUserInfo();
    initializeEventListeners();
    observeElements();
});

// ==================== LOAD USER INFO ====================
function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const headerAvatar   = document.getElementById('headerAvatar');
    const headerUsername = document.getElementById('headerUsername');
    const userMenu       = document.getElementById('userMenu');
    const btnRegister    = document.getElementById('btnRegister');
    const sidebarAvatar  = document.getElementById('sidebarAvatar');
    const sidebarName    = document.getElementById('sidebarName');

    if (isLoggedIn && user) {
        if (headerAvatar)   headerAvatar.src = user.avatar || 'user.png';
        if (headerUsername) headerUsername.innerHTML = `${user.displayName} <i class="fas fa-chevron-down"></i>`;
        if (userMenu)       userMenu.style.display = 'flex';
        if (btnRegister)    btnRegister.style.display = 'none';
        if (sidebarAvatar)  sidebarAvatar.src = user.avatar || 'user.png';
        if (sidebarName)    sidebarName.textContent = user.displayName;
    } else {
        if (userMenu)    userMenu.style.display = 'none';
        if (btnRegister) btnRegister.style.display = 'block';
    }
}

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Search
    document.querySelectorAll('.search-box button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = btn.closest('.search-box').querySelector('input');
            handleSearch(input);
        });
    });

    document.querySelectorAll('.search-hero button').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.search-hero').querySelector('input');
            handleSearch(input);
        });
    });

    // Navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Quiz buttons
    document.querySelectorAll('.btn-quiz').forEach(btn => {
        btn.addEventListener('click', handleQuizClick);
    });

    // Course cards
    document.querySelectorAll('.course-card').forEach((card, index) => {
        card.addEventListener('click', (e) => handleCourseClick(e, index + 1));
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // Notification bell
    const notification = document.querySelector('.notification');
    if (notification) notification.addEventListener('click', handleNotificationClick);

    // User menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) userMenu.addEventListener('click', handleUserMenuClick);
}

// ==================== SEARCH HANDLER ====================
function handleSearch(input) {
    const query = input.value.trim();
    if (!query) {
        alert('Vui lòng nhập từ khóa tìm kiếm');
        return;
    }
    alert(`Đang tìm kiếm: "${query}"`);
}

// ==================== QUIZ HANDLER ====================
function handleQuizClick(e) {
    const quizCard  = e.target.closest('.quiz-card');
    const quizTitle = quizCard.querySelector('h3').textContent;
    const quizCount = quizCard.querySelector('p').textContent;
    alert(`Bạn đang bắt đầu: ${quizTitle}\n${quizCount}`);
}

// ==================== COURSE HANDLER ====================
function handleCourseClick(e, courseId) {
    const card       = e.target.closest('.course-card');
    const courseData = {
        id:         courseId,
        name:       card.querySelector('.course-info h3').textContent,
        price:      card.querySelector('.price').textContent,
        instructor: card.querySelector('.instructor').textContent,
        image:      card.querySelector('.course-image img').src
    };
    localStorage.setItem('selectedCourse', JSON.stringify(courseData));
    window.location.href = `course-detail.html?id=${courseId}`;
}

// ==================== CATEGORY HANDLER ====================
function handleCategoryClick(e) {
    const name = e.target.closest('.category-card').querySelector('h3').textContent;
    alert(`Xem danh mục: ${name}`);
}

// ==================== NOTIFICATION HANDLER ====================
function handleNotificationClick() {
    const notifications = [
        'Bạn có bài tập mới cần làm (5 phút trước)',
        'Giảng viên đã phản hồi câu hỏi của bạn (1 giờ trước)',
        'Khóa học bạn theo dõi có nội dung mới (2 giờ trước)'
    ];
    alert(`Thông báo:\n\n${notifications.map(n => `- ${n}`).join('\n')}`);
}

// ==================== USER MENU HANDLER ====================
function handleUserMenuClick() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    window.location.href = isLoggedIn ? 'profile.html' : 'login.html';
}

// ==================== ANIMATION ON SCROLL ====================
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-card, .course-card, .quiz-card').forEach(el => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

console.log('%c🎓 ISLearn Platform v1.0', 'color: #0057FF; font-size: 16px; font-weight: bold;');