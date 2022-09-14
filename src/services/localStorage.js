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

export async function savePlayerLocalStorage(data) {
  const response = JSON.stringify(data);
  localStorage.setItem('ranking', response);
}

export async function getPlayersLocalStorage() {
  const data = localStorage.getItem('ranking');
  if (data === null) {
    return [];
  }
  const retorno = await JSON.parse(data);
  return retorno;
}
