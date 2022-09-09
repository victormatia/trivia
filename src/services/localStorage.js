export default async function saveOnLocalStorage(data) {
  const response = await data;
  localStorage.setItem('token', response.token);
}

export async function getTokenLocalStorage() {
  const data = await localStorage.getItem('token');
  const response = data.JSON;
  return response;
}
