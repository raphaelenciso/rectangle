const {
  plaintextAsciiToDecimal,
  ciphertextAsciiToDecimal,
} = require("../../modules/data_preprocessing");

//28
const dataset1 = [
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },

  {
    plaintext: plaintextAsciiToDecimal("(i there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("xi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("`i there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("li there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("ji there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("ii there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },

  {
    plaintext: plaintextAsciiToDecimal("hi t(ere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tHere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi txere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi t`ere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tlere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tjere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tiere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },

  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cip(er"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipHer"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipxer"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cip`er"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipler"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipjer"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipier"),
  },

  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("2ectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("Rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("bectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("zectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("vectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("pectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("sectangle cipher"),
  },
];

//12
const dataset2 = [
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },

  {
    plaintext: plaintextAsciiToDecimal("passwnrd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
  {
    plaintext: plaintextAsciiToDecimal("passwmrd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
  {
    plaintext: plaintextAsciiToDecimal("passwkrd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
  {
    plaintext: plaintextAsciiToDecimal("passwgrd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
  {
    plaintext: plaintextAsciiToDecimal("passwOrd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
  {
    plaintext: plaintextAsciiToDecimal("passw/rd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },

  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 12344"),
  },
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 12347"),
  },
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 12341"),
  },
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 1234="),
  },
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 1234%"),
  },
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 1234u"),
  },
];

const data1 = [
  {
    plaintext: plaintextAsciiToDecimal("password"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
  {
    plaintext: plaintextAsciiToDecimal("passwOrd"),
    key: ciphertextAsciiToDecimal("secret key 12345"),
  },
];

const data2 = [
  {
    plaintext: plaintextAsciiToDecimal("research"),
    key: ciphertextAsciiToDecimal("Abcdefghijklmnop"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Research"),
    key: ciphertextAsciiToDecimal("Abcdefghijklmnop"),
  },
];

const data3 = [
  {
    plaintext: plaintextAsciiToDecimal("aaaaaaaa"),
    key: ciphertextAsciiToDecimal("aaaaaaaaaaaaaaaa"),
  },
  {
    plaintext: plaintextAsciiToDecimal("aaaaaaaa"),
    key: ciphertextAsciiToDecimal("aaaaaaaaaaaaaaaa"),
  },
];

const test = [
  {
    plaintext: plaintextAsciiToDecimal("emailadd"),
    plaintextFlipped: plaintextAsciiToDecimal("emailAdd"),
    key: ciphertextAsciiToDecimal("Str0ng.PassW0rd&"),
    keyFlipped: ciphertextAsciiToDecimal("Str0ng.PassW4rd&"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Security"),
    plaintextFlipped: plaintextAsciiToDecimal("Secuzity"),
    key: ciphertextAsciiToDecimal("1234567890qwerty"),
    keyFlipped: ciphertextAsciiToDecimal("123456t890qwerty"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Research"),
    plaintextFlipped: plaintextAsciiToDecimal("Researcj"),
    key: ciphertextAsciiToDecimal("HelloWorld1234567"),
    keyFlipped: ciphertextAsciiToDecimal("Hello_orld1234567"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Internet"),
    plaintextFlipped: plaintextAsciiToDecimal("Knternet"),
    key: ciphertextAsciiToDecimal("Abcdefghijklmnop"),
    keyFlipped: ciphertextAsciiToDecimal("Abcdefghikklmnop"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Evaluate"),
    plaintextFlipped: plaintextAsciiToDecimal("Evamuate"),
    key: ciphertextAsciiToDecimal("Abcde12345Abcde1"),
    keyFlipped: ciphertextAsciiToDecimal("Abcde12345Abcde5"),
  },

  {
    plaintext: plaintextAsciiToDecimal("Pressure"),
    plaintextFlipped: plaintextAsciiToDecimal("Pressere"),
    key: ciphertextAsciiToDecimal("Abcdefg123456789"),
    keyFlipped: ciphertextAsciiToDecimal("Abcdefe123456789"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Tomorrow"),
    plaintextFlipped: plaintextAsciiToDecimal("Tomorros"),
    key: ciphertextAsciiToDecimal("SecretPassword123"),
    keyFlipped: ciphertextAsciiToDecimal("[ecretPassword123"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Epidemic"),
    plaintextFlipped: plaintextAsciiToDecimal("Epieemic"),
    key: ciphertextAsciiToDecimal("TestingTesting1234"),
    keyFlipped: ciphertextAsciiToDecimal("TestingTesting1634"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Language"),
    plaintextFlipped: plaintextAsciiToDecimal("Languawe"),
    key: ciphertextAsciiToDecimal("Insecure12345678"),
    keyFlipped: ciphertextAsciiToDecimal("Insekure12345678"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Campaign"),
    plaintextFlipped: plaintextAsciiToDecimal("CampaIgn"),
    key: ciphertextAsciiToDecimal("LetMeIn123LetMeIn"),
    keyFlipped: ciphertextAsciiToDecimal("LetMeIn12;LetMeIn"),
  },
];

module.exports = dataset1;
