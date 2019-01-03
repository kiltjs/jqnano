module.exports = {
  "root": true,
  "env": {
    // "browser": true,
    // "es6": true,
  },
  "parserOptions": {
    "sourceType": "module",
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": 1,
    "no-unexpected-multiline": "error",
    "no-irregular-whitespace": "off",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": 0
  }
};
