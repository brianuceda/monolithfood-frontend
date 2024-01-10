export const environment = {
  PRODUCTION: true,
  ENV_NAME: 'production',
  API: 'https://monolithfood.monalek.xyz',

  rscAuth: '/auth',
  rscOAuth2: '/oauth2/authorization',
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
