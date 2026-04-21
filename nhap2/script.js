// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ ISLearn Platform Loaded');
    initializeEventListeners();
});

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Search functionality
    const searchButtons = document.querySelectorAll('.search-box button, .search-hero button');
    searchButtons.forEach(btn => {
        btn.addEventListener('click', handleSearch);
    });

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Quiz buttons
    const quizButtons = document.querySelectorAll('.btn-quiz');
    quizButtons.forEach(btn => {
        btn.addEventListener('click', handleQuizClick);
    });

    // Course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', handleCourseClick);
    });

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // Notification bell
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.addEventListener('click', handleNotificationClick);
    }

    // User menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', handleUserMenuClick);
    }
}

// ==================== SEARCH HANDLER ====================
function handleSearch(e) {
    const input = e.target.previousElementSibling;
    const searchQuery = input.value.trim();
    
    if (searchQuery === '') {
        alert('Vui lòng nhập từ khóa tìm kiếm');
        return;
    }
    
    console.log('🔍 Tìm kiếm:', searchQuery);
    alert(`Đang tìm kiếm: "${searchQuery}"`);
    
    // In thực tế, bạn sẽ gửi request tới server
    // fetchSearchResults(searchQuery);
}

// ==================== QUIZ HANDLER ====================
function handleQuizClick(e) {
    const quizCard = e.target.closest('.quiz-card');
    const quizTitle = quizCard.querySelector('h3').textContent;
    const quizQuestions = quizCard.querySelector('p').textContent;
    
    console.log('📝 Quiz được chọn:', quizTitle, quizQuestions);
    alert(`Bạn đang bắt đầu: ${quizTitle}\n${quizQuestions}`);
    
    // Mở modal hoặc chuyển trang
    // openQuizModal(quizTitle);
}

// ==================== COURSE HANDLER ====================
function handleCourseClick(e) {
    const courseCard = e.target.closest('.course-card');
    const courseName = courseCard.querySelector('.course-info h3').textContent;
    const coursePrice = courseCard.querySelector('.price').textContent;
    
    console.log('📚 Khóa học được chọn:', courseName, coursePrice);
    alert(`Khóa học: ${courseName}\nGiá: ${coursePrice}`);
    
    // Chuyển hướng tới trang chi tiết khóa học
    // window.location.href = `/course/${courseId}`;
}

// ==================== CATEGORY HANDLER ====================
function handleCategoryClick(e) {
    const categoryCard = e.target.closest('.category-card');
    const categoryName = categoryCard.querySelector('h3').textContent;
    
    console.log('📂 Danh mục được chọn:', categoryName);
    alert(`Xem danh mục: ${categoryName}`);
    
    // Chuyển hướng tới danh mục
    // window.location.href = `/category/${categoryName}`;
}

// ==================== NOTIFICATION HANDLER ====================
function handleNotificationClick() {
    console.log('🔔 Đã click vào thông báo');
    
    // Hiển thị dropdown thông báo
    const notifications = [
        { id: 1, message: 'Bạn có bài tập mới cần làm', time: '5 phút trước' },
        { id: 2, message: 'Giảng viên đã phản hồi câu hỏi của bạn', time: '1 giờ trước' },
        { id: 3, message: 'Khóa học bạn theo dõi có nội dung mới', time: '2 giờ trước' }
    ];
    
    const notificationList = notifications.map(n => `- ${n.message} (${n.time})`).join('\n');
    alert(`Thông báo:\n\n${notificationList}`);
}

// ==================== USER MENU HANDLER ====================
function handleUserMenuClick() {
    console.log('👤 Đã click vào menu người dùng');
    alert('Chức năng menu người dùng (Hồ sơ, Cài đặt, Đăng xuất)');
}

// ==================== SMOOTH SCROLL ====================
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// ==================== ANIMATION ON SCROLL ====================
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.category-card, .course-card, .quiz-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Gọi animation khi DOM đã sẵn sàng
setTimeout(observeElements, 100);

// ==================== UTILITY FUNCTIONS ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// ==================== PERFORMANCE LOGGING ====================
console.log('%c🎓 EduLearn Platform v1.0', 'color: #0057FF; font-size: 16px; font-weight: bold;');
console.log('%cNền tảng học trực tuyến chất lượng cao', 'color: #6C5CE7; font-size: 12px;');