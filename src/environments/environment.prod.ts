export const environment = {
  oauthUrl: 'http://34.41.73.58/oauth2/authorization',
  oauthUrlMicrosoft: 'https://monolithcards.site/oauth2/authorization',

  // ! Production
  production: true,
  api: 'https://monolithcards.site',
  // ! Development
  // production: false,
  // api: 'http://localhost:8080',

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
