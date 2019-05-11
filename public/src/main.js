import Vue from 'vue';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);


import Login from './components/Login.vue';
import SenseHatData from './components/SenseHatData.vue'
import ChangePassword from './components/ChangePassword.vue'
//Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: {
        Login: Login,
        ChangePassword: ChangePassword,
        SenseHatData: SenseHatData
    }
});
