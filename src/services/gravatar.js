import { MD5 } from 'crypto-js';

const createGravatarEmail = (email) => {
  const hash = MD5(email).toString();
  const URL = `https://www.gravatar.com/avatar/${hash}`;

  return URL;
};

export default createGravatarEmail;
