// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  root: '/',
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    users: {
      root: `${ROOTS.DASHBOARD}/users`,
      detail: (id: string) => `${ROOTS.DASHBOARD}/${id}`,
    },
    news: {
      root: `${ROOTS.DASHBOARD}/news`,
      detail: (id: string) => `${ROOTS.DASHBOARD}/${id}`,
    },
  },
};
