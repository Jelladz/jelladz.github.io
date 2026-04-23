// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Course Detail Page Loaded');
    initializeEventListeners();
});

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });

    // Module expand/collapse
    const moduleHeaders = document.querySelectorAll('.module-header');
    moduleHeaders.forEach(header => {
        header.addEventListener('click', toggleModule);
    });

    // Buy course button
    const buyBtn = document.querySelector('.btn-buy');
    if (buyBtn) {
        buyBtn.addEventListener('click', handleBuyCourse);
    }

    // Expand more lessons
    const expandMore = document.querySelector('.expand-more');
    if (expandMore) {
        expandMore.addEventListener('click', handleExpandMore);
    }
}

// ==================== TAB HANDLER ====================
function handleTabClick(e) {
    const tabBtn = e.target;
    const tabId = tabBtn.getAttribute('data-tab');

    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked button and corresponding pane
    tabBtn.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    console.log('📑 Tab được chọn:', tabId);
}

// ==================== MODULE TOGGLE ====================
function toggleModule(e) {
    const moduleHeader = e.currentTarget;
    const module = moduleHeader.closest('.module');
    const moduleContent = module.querySelector('.module-content');
    const icon = moduleHeader.querySelector('i');

    // Toggle content visibility
    if (moduleContent.style.maxHeight === '0px' || moduleContent.style.maxHeight === '') {
        moduleContent.style.maxHeight = '500px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        moduleContent.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
    }
}

// ==================== BUY COURSE HANDLER ====================
function handleBuyCourse(e) {
    const courseName = document.querySelector('.banner-content h1').textContent;
    console.log('🛒 Mua khóa học:', courseName);
    
    alert(`Cảm ơn bạn! Bạn đang thực hiện thanh toán cho khóa học: "${courseName}"\n\nVui lòng hoàn tất thông tin thanh toán.`);
    
    // In thực tế, sẽ chuyển hướng tới trang thanh toán
    // window.location.href = '/checkout';
}

// ==================== EXPAND MORE LESSONS ====================
function handleExpandMore(e) {
    const expandBtn = e.currentTarget;
    const parentModule = expandBtn.previousElementSibling;
    const moduleContent = parentModule.querySelector('.module-content');

    // Increase max-height để hiển thị thêm bài
    moduleContent.style.maxHeight = 'none';
    expandBtn.style.display = 'none';

    console.log('📚 Đã mở rộng danh sách bài học');
}

// ==================== SMOOTH SCROLL ====================
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// ==================== UTILITY: Check if element is in viewport ====================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== PERFORMANCE LOGGING ====================
console.log('%c🎓 ISLearn - Course Detail Page v1.0', 'color: #E85B9C; font-size: 16px; font-weight: bold;');
console.log('%cHiển thị chi tiết khóa học', 'color: #0057FF; font-size: 12px;');

// ==================== FUNCTION TO NAVIGATE FROM COURSE CARD ====================
// Thêm function này vào script.js chính để xử lý click từ course card
function goToCourseDetail(courseId) {
    // Lấy thông tin khóa học dựa trên ID
    // Có thể lưu trong localStorage hoặc truyền qua URL
    window.location.href = `/nhap2/course-detail.html?id=${courseId}`;
}
