export default function authHeader() {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': " "
  }
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    headers.Authorization = `Bearer ${userData.authenticationtoken}`;
  }
  return headers;
}