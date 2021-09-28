const generateRandomString = (n) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = upper.toLowerCase();
  const digits = '0123456789';
  let generated = '';
  for(let i=0;i<n;i++) {
    const selector = Math.floor((Math.random() * 3));
    let character;
    if(selector === 0) {
      character = Math.floor(Math.random() * 26);
      generated += upper[character];
    }
    else if(selector === 1) {
      character = Math.floor(Math.random() * 26);
      generated += lower[character];
    }
    else {
      character = Math.floor(Math.random() * 10);
      generated += digits[character];
    }
  }
  return generated;
}

module.exports = { generateRandomString };