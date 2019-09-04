export function isPhoneNumber(phoneNumber) {
  // let reg = /^0?(13[0-9]|15[012356789]|16[0-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
  let reg = /^\d{6,}$/;
  return reg.test(phoneNumber);
}

export function isEmail(email) {
  let reg = /^([a-zA-Z0-9]+[-_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return reg.test(email);
}


export function isPassword(password) {
  let reg = /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]+$/;
  return reg.test(password);
}
