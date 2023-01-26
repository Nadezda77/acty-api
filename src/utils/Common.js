// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('client_id');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('access_token') || null;
  }
   
  // remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('client_id');
  }

  // set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('access_token', token);
  sessionStorage.setItem('client_id', JSON.stringify(user));
  }