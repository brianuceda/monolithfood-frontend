export const environment = {
  PRODUCTION: false,
  ENV_NAME: 'development',
  API: 'http://localhost:8080/api/v1',
  OAUTH2_URL: 'http://localhost:8080/oauth2/authorization',
  OAUTH2_URL_MICROSOFT: 'http://localhost:8080/api/v1/oauth2/authorization',

  rscAuth: '/auth',
  rscUsers: '/user',
  rscConfig: '/user/config',
  rscInfo: '/user/info',
  rscFoods: '/user/foods',
  rscIntakes: '/user/intakes',
  rscSubscriptions: '/user/subscriptions',
  rscFavorites: '/user/favorites',
  rscFitness: '/user/fitness',
};

export const roles = {
  rolesToSeeFavorites: ['ROLE_ADMIN', 'ROLE_VIP'],
};
