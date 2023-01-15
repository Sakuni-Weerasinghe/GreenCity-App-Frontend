export default function authHeader() {
  const userStr = localStorage.getItem("userData");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.authenticationtoken) {
    return { Authorization: 'Bearer ' + user.authenticationtoken };
  } else {
    return { Authorization: '' };
  }
}