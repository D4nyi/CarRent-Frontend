export const environment = {
  production: true,
  apiUrl: 'https://localhost:5001/api',
  authUrls: {
    LOGIN: '/auth/login',
    SIGNIN: '/auth/signin',
    REGISTER: '/auth/register'
  },
  carUrls: {
    CARS: '/car/',
    RENT: '/car/rent',
    DETAIL: '/car/detail',
    RENTED: '/car/rented',
    CANCEL: '/car/cancel'
  },
  premiseUrls: {
    GET: '/premise'
  },
  adminUrls: {
    UPDATE: '/admin/update',
    ADD: '/admin/add',
    DELTER: '/admin/delete'
  }
};
