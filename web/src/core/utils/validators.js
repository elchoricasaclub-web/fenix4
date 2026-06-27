export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

export const validateForm = (formData, requiredFields = []) => {
  const errors = {};
  let isValid = true;

  requiredFields.forEach(field => {
    if (!isRequired(formData[field])) {
      errors[field] = 'Este campo es obligatorio';
      isValid = false;
    }
  });

  return { isValid, errors };
};
