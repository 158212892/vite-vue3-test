import Home from '../../views/Home.vue';
import About from '../../views/About.vue';
import Contacts from '../../views/Contacts.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: { msg: 'Bootstrap Modal' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { layout: 'MainLayout' },
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    meta: { layout: 'MainLayout' },
  },
];
