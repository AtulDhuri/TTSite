/**
 * Validate email format
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate form data
 */
const validateFormData = (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length === 0) {
        errors.push('Name is required');
    }
    
    if (!data.email || data.email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (!data.teamSize) {
        errors.push('Team size is required');
    }
    
    // Sanitize inputs
    const sanitized = {
        name: data.name?.trim().substring(0, 100),
        email: data.email?.trim().toLowerCase().substring(0, 100),
        company: data.company?.trim().substring(0, 100) || '',
        teamSize: data.teamSize,
        message: data.message?.trim().substring(0, 500) || ''
    };
    
    return {
        isValid: errors.length === 0,
        errors,
        data: sanitized
    };
};

module.exports = {
    isValidEmail,
    validateFormData
};
