/**
 * Checks if the povided value is a string and it has at least 1 non-withespace chars
 * @param {any} str value that should be tested
 * @returns {boolean} false if the provided value is a string and has at least 1 non-withespace chars, otherwise true
 */
export function isNullOrWhiteSpace(str: any): boolean {
  if (!str || typeof str !== 'string') return true;
  return str.trim().length < 1;
}

/**
 * Test if the password is not null or whitespace and has at least 10 chars, with upper and lowwer case letters, a numeric and a special 
 * @param {string} pwd Password that should be tested
 * @returns {boolean} true if the password matches the criteria, otherwise false
 */
export function validatePassword(pwd: string): boolean {
  if (isNullOrWhiteSpace(pwd)) return false;
  const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})');
  return regex.test(pwd);
}

/**
 * Tests if the given birthDate was 18 years ago
 * @param {string | Date} birthDate Birthdate
 * @returns {boolean} true if the birthDate was 18 years ago, otherwise false
 */
export function adultAge(birthDate: string | Date): boolean {
  if (typeof birthDate === 'string') {
    if (isNullOrWhiteSpace(birthDate)) {
      return false;
    }
    birthDate = new Date(birthDate);
  }

  const today = new Date();
  const month = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

export function tomorrow(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}