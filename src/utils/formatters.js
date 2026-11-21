/**
 * Narxlarni o'zbekcha formatlash (masalan: 45 000 so'm)
 */
export function formatPrice(num) {
  if (typeof num !== 'number') {
    num = Number(num) || 0;
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";
}

/**
 * Telefon raqamini O'zbekiston formatiga keltirish: +998 (90) 123-45-67
 */
export function formatPhoneNumber(input) {
  // Faqat raqamlarni ajratib olish
  const numbers = input.replace(/\D/g, '');
  
  // Agar 998 bilan boshlansa, uni hisobga olish
  let clean = numbers;
  if (clean.startsWith('998')) {
    clean = clean.slice(3);
  }
  
  // Maksimal 9 ta raqam (kod + raqam)
  clean = clean.slice(0, 9);
  
  let formatted = '+998';
  if (clean.length > 0) {
    formatted += ` (${clean.slice(0, 2)}`;
  }
  if (clean.length >= 3) {
    formatted += `) ${clean.slice(2, 5)}`;
  }
  if (clean.length >= 6) {
    formatted += `-${clean.slice(5, 7)}`;
  }
  if (clean.length >= 8) {
    formatted += `-${clean.slice(7, 9)}`;
  }
  
  return formatted;
}
