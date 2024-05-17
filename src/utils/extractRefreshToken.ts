export function extractRefreshToken(cookies: string[]) {
  for (let cookie of cookies) {
    if (cookie.startsWith('refreshToken=')) {
      const parts = cookie.split(';')[0].split('=');
      return parts[1];
    }
  }
  return 'No token provided';
}
