<template>
    <div>
        <div class="form-group row">
            <label for="txtFirstName" class="col-md-4 col-lg-2 col-form-label">
                First Name <span v-show="$v.firstName.$error" class="error-asterisk">*</span>
            </label>
            <div class="col-md-8 col-lg-10">
                <input type="text" class="form-control" name="txtFirstName" v-bind:class="{ 'invalid-field': $v.firstName.$error }" v-model="firstName">
            </div>
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                <span v-show="$v.firstName.$error && !$v.firstName.required">First name is required.</span>
            </div>
        </div>
        <div class="form-group row">
            <label for="txtMiddleName" class="col-md-4 col-lg-2 col-form-label">Middle Name</label>
            <div class="col-md-8 col-lg-10">
                <input type="text" class="form-control" name="txtMiddleName" v-model="middleName">
            </div>
        </div>  
        <div class="form-group row">
            <label for="txtLastName" class="col-md-4 col-lg-2 col-form-label">
                Last Name <span v-show="$v.lastName.$error" class="error-asterisk">*</span>
            </label>
            <div class="col-md-8 col-lg-10">
                <input type="text" class="form-control" name="txtLastName" v-bind:class="{ 'invalid-field': $v.lastName.$error }" v-model="lastName">
            </div>
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                <span v-show="$v.lastName.$error && !$v.lastName.required">Last name is required.</span>
            </div>
        </div>  
        <div class="form-group row">
            <label for="txtEmail" class="col-md-4 col-lg-2 col-form-label">
                Email <span v-show="$v.email.$error" class="error-asterisk">*</span>
            </label>
            <div class="col-md-8 col-lg-10">
                <input type="email" class="form-control" name="txtEmail" v-bind:class="{ 'invalid-field': $v.email.$error }" v-model="email">
            </div>
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                <span v-show="$v.email.$error && !$v.email.required">Email is required.</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="offset-md-4 offset-lg-2  col-md-8 col-lg-10">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" name="chkUseEmailAsUsername" v-model="useEmailAsUsername">
                    <label for="chkUseEmailAsUsername" class="form-check-label">
                        Use email address as username.
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="txtUsername" class="col-md-4 col-lg-2 col-form-label">
                Username <span v-show="$v.userName.$error" class="error-asterisk">*</span>
            </label>
            <div class="col-md-8 col-lg-10">
                <div class="input-group">
                    <input type="text" class="form-control" name="txtUserName" v-bind:class="{ 'invalid-field': $v.userName.$error }" :readonly="useEmailAsUsername" v-model="userName">
                    <div class="input-group-append">
                        <span class="input-group-text">
                            <span v-if="!$v.userName.required"><i class="fas fa-cog"></i></span>
                            <span v-else-if="$v.$pending"><i class="fas fa-cog fa-spin"></i></span>
                            <span style="color: red;" v-else-if="!$v.userName.isUserNameAvailable"><i class="fas fa-times-circle"></i></span>
                            <span style="color: green;" v-else><i class="fas fa-check-circle"></i></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10">
                <span class="field-error-message" v-if="$v.userName.$error && !$v.userName.required">Username is required.</span>
                <span class="field-error-message" v-else-if="!$v.$pending && !$v.userName.isUserNameAvailable">Username is unavailable.</span>
                <span class="field-valid-message" v-else-if="!$v.$pending && $v.userName.required && $v.userName.isUserNameAvailable">Username is available.</span>
            </div>
        </div>
        <div class="form-group row">
            <label for="txtPassword" class="col-md-4 col-lg-2 col-form-label">
                Password <span v-show="$v.password.$error" class="error-asterisk">*</span>
            </label>
            <div class="col-md-8 col-lg-10">
                <input type="password" class="form-control" name="txtPassword" v-bind:class="{ 'invalid-field': $v.password.$error }" v-model="password">
            </div>
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                <span v-show="$v.password.$error && !$v.password.required">Password is required.</span>
            </div>
        </div>
        <div class="form-group row">
            <label for="txtPasswordConf" class="col-md-4 col-lg-2 col-form-label">
                Confirm Password  <span v-show="$v.passwordConf.$error" class="error-asterisk">*</span>
            </label>
            <div class="col-md-8 col-lg-10">
                <input type="password" class="form-control" v-bind:class="{ 'invalid-field': $v.passwordConf.$error }" name="txtPasswordConf" v-model="passwordConf">
            </div>
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                <span v-show="$v.passwordConf.$error && !$v.passwordConf.required">Password confirmation is required.</span>
                <span v-show="$v.passwordConf.$error && $v.passwordConf.required && !$v.passwordConf.sameAsPassword">Confirmation password does not match new password.</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" name="chkIsAdmin" v-model="isAdmin">
                    <label for="chkIsAdmin" class="form-check-label">
                        This user is an admin.
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-12 text-center">
                <button type="button" @click="submitForm" class="btn btn-primary"><i class="fas fa-user-plus"></i> Create User</button>
            </div>
        </div>
    </div>
</template>

<script>

    import { required, email, sameAs } from 'vuelidate/lib/validators';
    import axios from "axios";

    export default {
        name: 'createUserApp',
        data () {
            return {
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                isAdmin: false,
                useEmailAsUsername: true,
                userName: '',
                password: '',
                passwordConf: ''
            }
        },
        props: [
            'user',
            'errorMessage'
        ],
        validations: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            email: {
                required,
                email
            },
            userName: {
                required,
                async isUserNameAvailable(userName) {

                    //If this is blank, return true since required field will take care of it.
                    if (userName == '') {
                        return true;
                    }

                    try {
                        axios.defaults.headers.common['x-access-token'] = $cookies.get('RPiWebsite_token');

                        //See if the username is available
                        let res = await axios
                        .post('/userapi/isusernameavaliable', {
                            userName: this.userName
                        });

                        return res.data.isUserNameAvaliable;

                    }
                    catch(err) {
                        console.log(err);
                    }
                }
            },
            password: {
                required
            },
            passwordConf: {
                required,
                sameAsPassword: sameAs('password')
            }
        },
        watch: {
            email: function (val) {
                if (this.useEmailAsUsername) {
                    this.userName = this.email;
                }
            },
            useEmailAsUsername: function (val) {
                if (this.useEmailAsUsername) {
                    this.userName = this.email;
                }
            }
        },
        methods: {                    
            submitForm: async function (event) {
                //Check validation
                this.$v.$touch();
                if (!this.$v.$anyError) {
                    try {
                        axios.defaults.headers.common['x-access-token'] = $cookies.get('RPiWebsite_token');

                        //Change password
                        let res = await axios
                        .post('/userapi/users', {
                            firstName: this.firstName,
                            middleName: this.middleName,
                            lastName: this.lastName,
                            email: this.email,
                            userName: this.userName,
                            password: this.password,
                            isAdmin: this.isAdmin
                        });

                        //Fire an event containing the new user
                        this.$emit('user-created', res.data);

                    }
                    catch(err) {
                        console.log(err);
                    }
                }
            }
        }
    };

</script>