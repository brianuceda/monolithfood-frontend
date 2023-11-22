export const environment = {
  // ! Production
  production: true,
  api: 'https://monolithcards.site',
  oauthUrl: 'http://34.41.73.58/oauth2/authorization',
  oauthUrlMicrosoft: 'https://monolithcards.site/oauth2/authorization',
  // ! Development
  // production: false,
  // api: 'http://localhost:8080',
  // oauthUrl: 'http://localhost:8080/oauth2/authorization',
  // oauthUrlMicrosoft: 'http://localhost:8080/oauth2/authorization',

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
