import Vue from 'vue';
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue';
import Login from './components/Login.vue';
import ChangePassword from './components/ChangePassword.vue';
import EditUser from './components/EditUser.vue';
import CreateUser from './components/CreateUser.vue'
import SenseHatData from './components/SenseHatData.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuelidate);
Vue.use(BootstrapVue);

//Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: {
        Login: Login,
        ChangePassword: ChangePassword,
        EditUser: EditUser,
        CreateUser: CreateUser,
        SenseHatData: SenseHatData
    }
});
