export default async function saveOnLocalStorage(data) {
  const response = await data;
  localStorage.setItem('token', response.token);
}
