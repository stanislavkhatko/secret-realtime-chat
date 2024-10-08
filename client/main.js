import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import io from 'socket.io-client';
import setAuthToken from './utils/authToken';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icons', /^ion-/];
Vue.prototype.moment = moment;
let socket = null;

/** Socket IO Client - Store in Vuex State for use in components */
// socket = io('/');
socket = io(import.meta.env.VITE_API_URL);

store.dispatch('assignSocket', socket);

/** Check for auth token on refresh and set authorization header for incoming requests */
if (localStorage.authToken) {
    setAuthToken(localStorage.authToken);
} else {
    setAuthToken(null);
}

/** Axios baseUrl */
// axios.defaults.baseURL = `/`;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

/** Axios Request Intercept */
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

/** Axios Response Intercept */
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (err) {
        console.log(err, err.response);
        if (err.response && err.response.status === 401) {
            localStorage.removeItem('authToken');
            store.dispatch('toggleAuthState', false);
            router.push({
                name: 'Login',
                params: {message: 'Session has expired, please login again'},
            });
        }
        return Promise.reject(err);
    }
);

new Vue({
    router,
    store,
    render: (h) => h(App),
    beforeMount() {

        if (localStorage.getItem('authToken')) {
            this.$store.dispatch('toggleAuthState', true);
        } else {
            localStorage.clear();
            this.$store.dispatch('toggleAuthState', false);
        }

        document.documentElement.setAttribute('data-theme', this.$store.state.theme);
    },
}).$mount('#app');
