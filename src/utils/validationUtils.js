// src/utils/validationUtils.js
export const validateComment = (name, text) => {
  return name.trim() !== '' && text.trim() !== '';
};