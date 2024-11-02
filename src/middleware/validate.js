export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return typeof password === 'string' && password.length >= 6;
  };
  
  export const validateFullName = (fullName) => {
    return typeof fullName === 'string' && fullName.trim().length > 0;
  };
  
  export const validateRegistration = (req, res, next) => {
    const { email, password, fullName } = req.body;
  
    const errors = [];
  
    if (!email || !validateEmail(email)) {
      errors.push('Valid email is required');
    }
  
    if (!validatePassword(password)) {
      errors.push('Password must be at least 6 characters long');
    }
  
    if (!validateFullName(fullName)) {
      errors.push('Full name is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    // Normalize email
    req.body.email = email.toLowerCase().trim();
    req.body.fullName = fullName.trim();
  
    next();
  };
  
  export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
  
    const errors = [];
  
    if (!email || !validateEmail(email)) {
      errors.push('Valid email is required');
    }
  
    if (!password) {
      errors.push('Password is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    // Normalize email
    req.body.email = email.toLowerCase().trim();
  
    next();
  };
  
  export const validateProfileUpdate = (req, res, next) => {
    const { fullName, bio, location } = req.body;
    const errors = [];
  
    if (fullName !== undefined && !validateFullName(fullName)) {
      errors.push('Full name cannot be empty');
    }
  
    if (bio !== undefined && typeof bio !== 'string') {
      errors.push('Bio must be a string');
    }
  
    if (location !== undefined && typeof location !== 'string') {
      errors.push('Location must be a string');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    if (fullName) {
      req.body.fullName = fullName.trim();
    }
  
    next();
  };