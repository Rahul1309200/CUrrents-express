let currentStep = 1;
const totalSteps = 3;

// Role selection
document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        const role = this.dataset.role;
        
        // Show/hide relevant fields
        const studentFields = document.querySelectorAll('.student-field');
        const adminFields = document.querySelectorAll('.admin-field');
        
        if (role === 'student') {
            studentFields.forEach(field => field.style.display = 'block');
            adminFields.forEach(field => field.style.display = 'none');
        } else {
            studentFields.forEach(field => field.style.display = 'none');
            adminFields.forEach(field => field.style.display = 'block');
        }
    });
});

// Password strength meter
document.getElementById('password').addEventListener('input', function(e) {
    const password = e.target.value;
    const strengthMeter = document.querySelector('.strength-meter');
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
        .filter(Boolean).length;

    strengthMeter.className = 'strength-meter';
    if (password.length > 0) {
        if (strength <= 2) strengthMeter.classList.add('strength-weak');
        else if (strength === 3) strengthMeter.classList.add('strength-medium');
        else strengthMeter.classList.add('strength-strong');
    }
});

function updateProgressBar() {
    const progressLine = document.querySelector('.progress-line-fill');
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressLine.style.width = `${progress}%`;

    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function showStep(step) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
    }
}

// document.getElementById('registrationForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Registration successful!');
//     window.location.href = 'login.html';
// });