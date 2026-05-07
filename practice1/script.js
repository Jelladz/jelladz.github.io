// Get form elements
const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const profilePictureInput = document.getElementById('profilePicture');
const togglePasswordBtn = document.getElementById('togglePassword');
const successMessage = document.getElementById('successMessage');

// Get error message elements
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const imageError = document.getElementById('imageError');

// Get password strength elements
const strengthMeterFill = document.getElementById('strengthMeterFill');
const strengthText = document.getElementById('strengthText');

// Get image preview elements
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');

// ============= VALIDATION FUNCTIONS =============

/**
 * Validate username (5-15 characters)
 */
function validateUsername(username) {
    const trimmed = username.trim();
    if (trimmed.length < 5) {
        return { valid: false, message: 'Username must be at least 5 characters' };
    }
    if (trimmed.length > 15) {
        return { valid: false, message: 'Username must not exceed 15 characters' };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
        return { valid: false, message: 'Username can only contain letters, numbers, underscore, and hyphen' };
    }
    return { valid: true, message: '' };
}

/**
 * Validate password (must contain numbers and letters)
 */
function validatePassword(password) {
    if (password.length === 0) {
        return { valid: false, message: 'Password is required' };
    }
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters' };
    }
    
    const hasNumbers = /\d/.test(password);
    const hasLetters = /[a-zA-Z]/.test(password);
    
    if (!hasNumbers) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    if (!hasLetters) {
        return { valid: false, message: 'Password must contain at least one letter' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate profile picture (JPG or PNG only)
 */
function validateImage(file) {
    if (!file) {
        return { valid: false, message: 'Profile picture is required' };
    }
    
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        return { valid: false, message: 'Only JPG and PNG files are allowed' };
    }
    
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
        return { valid: false, message: `File size must be less than ${maxSizeMB}MB` };
    }
    
    return { valid: true, message: '' };
}

// ============= PASSWORD STRENGTH INDICATOR =============

/**
 * Calculate password strength
 */
function calculatePasswordStrength(password) {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    // Determine strength level
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

/**
 * Update password strength indicator in real-time
 */
function updatePasswordStrength(password) {
    if (!password) {
        strengthMeterFill.className = '';
        strengthText.className = '';
        strengthText.textContent = 'Password strength';
        return;
    }

    const strength = calculatePasswordStrength(password);
    
    // Remove all strength classes
    strengthMeterFill.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');
    
    // Add appropriate class
    strengthMeterFill.classList.add(strength);
    strengthText.classList.add(strength);
}

// ============= IMAGE PREVIEW =============

/**
 * Display image preview
 */
function displayImagePreview(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        imagePreview.classList.add('show');
    };
    
    reader.readAsDataURL(file);
}

/**
 * Clear image preview
 */
function clearImagePreview() {
    previewImg.src = '';
    imagePreview.classList.remove('show');
}

// ============= EVENT LISTENERS =============

/**
 * Username input - validate on blur and clear error on input
 */
usernameInput.addEventListener('blur', () => {
    const validation = validateUsername(usernameInput.value);
    
    if (!validation.valid) {
        usernameError.textContent = validation.message;
        usernameError.classList.add('show');
        usernameInput.classList.add('error');
    } else {
        usernameError.classList.remove('show');
        usernameInput.classList.remove('error');
    }
});

usernameInput.addEventListener('input', () => {
    usernameError.classList.remove('show');
    usernameInput.classList.remove('error');
});

/**
 * Password input - validate and update strength in real-time
 */
passwordInput.addEventListener('input', () => {
    updatePasswordStrength(passwordInput.value);
    
    const validation = validatePassword(passwordInput.value);
    if (!validation.valid && passwordInput.value.length > 0) {
        passwordError.textContent = validation.message;
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
    } else {
        passwordError.classList.remove('show');
        passwordInput.classList.remove('error');
    }
});

/**
 * Toggle password visibility
 */
togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    }
});

/**
 * Profile picture input - validate and show preview
 */
profilePictureInput.addEventListener('change', () => {
    const file = profilePictureInput.files[0];
    
    if (!file) {
        clearImagePreview();
        imageError.classList.remove('show');
        return;
    }
    
    const validation = validateImage(file);
    
    if (!validation.valid) {
        imageError.textContent = validation.message;
        imageError.classList.add('show');
        profilePictureInput.classList.add('error');
        clearImagePreview();
    } else {
        imageError.classList.remove('show');
        profilePictureInput.classList.remove('error');
        displayImagePreview(file);
    }
});

/**
 * Form submission
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const usernameValidation = validateUsername(usernameInput.value);
    const passwordValidation = validatePassword(passwordInput.value);
    const imageValidation = validateImage(profilePictureInput.files[0]);
    
    let hasErrors = false;
    
    // Username validation
    if (!usernameValidation.valid) {
        usernameError.textContent = usernameValidation.message;
        usernameError.classList.add('show');
        usernameInput.classList.add('error');
        hasErrors = true;
    } else {
        usernameError.classList.remove('show');
        usernameInput.classList.remove('error');
    }
    
    // Password validation
    if (!passwordValidation.valid) {
        passwordError.textContent = passwordValidation.message;
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        hasErrors = true;
    } else {
        passwordError.classList.remove('show');
        passwordInput.classList.remove('error');
    }
    
    // Image validation
    if (!imageValidation.valid) {
        imageError.textContent = imageValidation.message;
        imageError.classList.add('show');
        hasErrors = true;
    } else {
        imageError.classList.remove('show');
    }
    
    // If all validations pass, show success message
    if (!hasErrors) {
        // In a real application, you would send data to a server here
        console.log('Form Data:', {
            username: usernameInput.value,
            password: passwordInput.value,
            profilePicture: profilePictureInput.files[0].name
        });
        
        // Show success message
        successMessage.style.display = 'block';
        form.style.display = 'none';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            successMessage.style.display = 'none';
            clearImagePreview();
            strengthMeterFill.className = '';
            strengthText.className = '';
            strengthText.textContent = 'Password strength';
        }, 2000);
    }
});
