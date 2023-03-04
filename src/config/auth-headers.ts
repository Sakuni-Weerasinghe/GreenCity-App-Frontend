export default function authHeader() {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': " "
  }
  const authenticationToken = localStorage.getItem("authenticationToken");
  if (authenticationToken) {
    headers.Authorization = `Bearer ${authenticationToken}`;
  }
  return headers;
}