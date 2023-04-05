export const getRequestHeaders = () => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': " " };
  const authenticationToken = localStorage.getItem("authenticationToken");
  if (authenticationToken) {
    headers.Authorization = `Bearer ${authenticationToken}`;
  }
  return headers;
}

export const formatDateTime = (value: string): string => {
  if (value) {
    const date = new Date(value);
    if (date) {
      const formattedDateTime = new Intl.DateTimeFormat
        ('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
        .format(date);
      return formattedDateTime;
    }
  }
  return '';
}