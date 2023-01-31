export default function authHeader() {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': " "
  }
  const userStr = localStorage.getItem("userData");
  if (userStr) {
    let user = JSON.parse(userStr);
    headers.Authorization = 'Bearer ' + user.authenticationtoken
  }
  return headers;
}