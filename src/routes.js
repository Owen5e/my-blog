// Centralized route definitions
export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categories',
  SAVED: '/saved',
  POST: '/post/:id',
  ABOUT: '/about',
};

// Helper to generate dynamic post route
export const getPostRoute = (id) => `/post/${id}`;
