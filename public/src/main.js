import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App.vue'
import LoginApp from './components/LoginApp.vue'

new Vue({
    el: 'app',
    template: '<App/>',
    components: {App},
    methods: {}
});

new Vue({
    el: 'loginApp',
    template: '<loginApp/>',
    components: {LoginApp},
    methods: {}
});
