document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorContainer = document.getElementById('errorMessages');
    errorContainer.classList.add('hidden');
    errorContainer.innerHTML = '';

    // Get form values
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validation checks
    const errors = [];

    if (!data.fullname.trim()) {
        errors.push('Full name is required');
    }

    if (!data.email.trim()) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.password) {
        errors.push('Password is required');
    } else if (data.password.length < 8) {
        errors.push('Password must be at least 8 characters');
    } else if (!/[!@#$%^&*]/.test(data.password)) {
        errors.push('Password must contain at least one special character');
    }

    if (data.password !== data.confirmPassword) {
        errors.push('Passwords do not match');
    }

    if (!data.terms) {
        errors.push('You must accept the terms and conditions');
    }

    // Display errors or submit form
    if (errors.length > 0) {
        errorContainer.classList.remove('hidden');
        errors.forEach(error => {
            const p = document.createElement('p');
            p.textContent = error;
            p.className = 'text-sm';
            errorContainer.appendChild(p);
        });
    } else {
        // Temporary success message - replace with actual form submission
        alert('Form submitted successfully! (Demo)');
        console.log('Form data:', data);
    }
});

// Add real-time password strength indicator
document.querySelector('input[name="password"]').addEventListener('input', function(e) {
    const strengthIndicator = document.getElementById('passwordStrength') || 
        document.createElement('div');
    strengthIndicator.id = 'passwordStrength';
    strengthIndicator.className = 'text-xs mt-1';
    
    if (!e.target.value) {
        strengthIndicator.textContent = '';
        return;
    }

    let strength = 0;
    if (e.target.value.length >= 8) strength++;
    if (/[A-Z]/.test(e.target.value)) strength++;
    if (/[0-9]/.test(e.target.value)) strength++;
    if (/[!@#$%^&*]/.test(e.target.value)) strength++;

    const messages = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    strengthIndicator.textContent = `Strength: ${messages[strength]}`;
    strengthIndicator.className = `text-xs mt-1 ${
        strength < 2 ? 'text-red-500' : 
        strength < 4 ? 'text-yellow-500' : 'text-green-500'
    }`;

    if (!e.target.nextElementSibling || e.target.nextElementSibling.id !== 'passwordStrength') {
        e.target.parentNode.appendChild(strengthIndicator);
    }
});