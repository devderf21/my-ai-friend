import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import SignupComponent from './components/SignupComponent.vue';
import EventListComponent from './components/EventListComponent.vue';
import EventUploadComponent from './components/EventUploadComponent.vue';

const routes = [
  { path: '/login', component: LoginComponent, meta: { requiresGuest: true } },
  { path: '/signup', component: SignupComponent, meta: { requiresGuest: true } },
  { path: '/', component: EventListComponent, meta: { requiresAuth: true } },
  { path: '/upload', component: EventUploadComponent, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('sessionToken');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isLoggedIn) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
