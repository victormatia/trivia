export default async function saveOnLocalStorage(data) {
  const response = await data;
  localStorage.setItem('token', response.token);
}

export async function getTokenLocalStorage() {
  const data = localStorage.getItem('token');
  return data;
}

export async function removeTokenLocalStorage() {
  const data = localStorage.removeItem('token');
  return data;
}
