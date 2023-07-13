import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/Signup.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

  {
    path: '/signup',
    component: () => import('pages/Signup.vue'),
  },
  {
    path: '/signin',
    component: () => import('pages/Signin.vue'),
  },
  {
    path: '/userprofile',
    component: () => import('pages/UserProfile.vue'),
  },
];

export default routes;
