const upperCase = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].toUpperCase();
    }
  }
  return obj
}

const trimWhiteSpaces = (obj) => {
  for (let key in obj) {
    try {
      obj[key] = obj[key].trim();
    } catch (error) {
      obj[key] = obj[key];
    }
  }
  return obj
}

module.exports = { upperCase, trimWhiteSpaces }