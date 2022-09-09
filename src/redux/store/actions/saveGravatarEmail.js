export const SAVE_GRAVATAR_EMAIL = 'SAVE_GRAVATAR_EMAIL';

export const saveGravatarEmail = (email, userName) => ({
  type: SAVE_GRAVATAR_EMAIL,
  email,
  userName,
});
