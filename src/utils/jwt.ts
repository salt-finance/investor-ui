export const parseJwt = (token: string) => {
  let baseSixtyFourUrl = token.split('.')[1];
  let baseSixtyFour = baseSixtyFourUrl.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    window
      .atob(baseSixtyFour)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
