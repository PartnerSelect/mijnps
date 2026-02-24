import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

Vue.use(Router);

async function guard(to, from, next) {
    if (store.getters.isLoggedIn === true) {
        next();
    } else {
        const refreshed = await store.dispatch('refresh');
        if (refreshed) {
            next();
        } else {
            next('/login');
        }
    }
}

async function alreadyLoggedInGuard(to, from, next) {
    if (store.getters.isLoggedIn === true) {
        next('/home');
    } else {
        next();
    }
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // Non guarded routes
        { path: '/login', beforeEnter: alreadyLoggedInGuard, component: () => import('./views/Login.vue') },
        { path: '/logout', component: () => import('./views/Logout.vue') },
        {
            path: '/reset-wachtwoord',
            // beforeEnter: alreadyLoggedInGuard,
            component: () => import('./views/WachtwoordReset.vue'),
        },
        { path: '/404', component: () => import('./views/Error404.vue') },
        { path: '/bedankt', component: () => import('./views/Bedankt.vue') },

        // Guarded routes
        { path: '/', beforeEnter: guard, component: () => import('./views/Home.vue') },
        { path: '/home', beforeEnter: guard, component: () => import('./views/Home.vue') },
        // { path: '/test', /* beforeEnter: guard, */ component: () => import('./views/Test.vue') },
        { path: '/mijn-beschrijving', beforeEnter: guard, component: () => import('./views/MijnPB.vue') },
        { path: '/mijn-beschrijving/edit', beforeEnter: guard, component: () => import('./views/EditPB.vue') },
        { path: '/mijn-beschrijving/foto', beforeEnter: guard, component: () => import('./views/EditFoto.vue') },
        { path: '/berichten', beforeEnter: guard, component: () => import('./views/Berichten.vue') },
        { path: '/berichten/:id', beforeEnter: guard, component: () => import('./views/bekijkBericht.vue') },
        { path: '/nieuw-bericht', beforeEnter: guard, component: () => import('./views/NieuwBericht.vue') },
        { path: '/voorstellen', beforeEnter: guard, component: () => import('./views/Voorstellen.vue') },
        { path: '/voorstellen/:id', beforeEnter: guard, component: () => import('./views/bekijkVoorstel.vue') },
        { path: '/slagingskanstips', beforeEnter: guard, component: () => import('./views/Slagingskanstips.vue') },
        {
            path: '/belangrijke-informatie',
            beforeEnter: guard,
            component: () => import('./views/BelangrijkeInformatie.vue'),
        },
        { path: '/belafspraak', beforeEnter: guard, component: () => import('./views/Test.vue') },
        { path: '/reactietips', beforeEnter: guard, component: () => import('./views/Reactietips.vue') },
        // LEAVE LAST
        { path: '*', component: () => import('./views/Error404.vue') },
    ],
});
