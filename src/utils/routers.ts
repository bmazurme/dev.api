export const UrlsApi = {
  SIGN: {
    UP: '/signup',
    IN: '/signin',
    OUT: '/logout',
    CONFIRM: '/confirm/:code',
  },
  USER: {
    ME: '/users/me',
    UPDATE: {
      INFO: '/users/update',
    },
  },
  PASS: {
    UPDATE: '/password/update',
    RESET: '/password/reset',
    NEW: '/password/new',
  },
  PROJECT: {
    INDEX: '/projects',
  },
  BOOK: {
    INDEX: '/books',
    DELETE: '/books/:id',
  },
  BLOCK: {
    INDEX: '/block',
    DELETE: '/block/:id',
  },
};
