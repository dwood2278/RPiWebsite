<template>
    <div class="card">
        <h5 class="card-header">Edit My Profile</h5>
        <div class="card-body">
            <div class="card-text">
                <div v-show="successfullyUpdated" class="row">
                    <div class="col-12">
                        <b-alert show variant="success">
                            <i class="fas fa-check"></i> Successfully submitted user changes.
                        </b-alert>
                    </div>
                </div>
                <div v-show="errorMessage" class="row">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
                        </div>
                    </div>
                </div>
                <div v-show="!successfullyUpdated">
                    <div class="form-group row">
                        <label for="txtFirstName" class="col-md-4 col-lg-2 col-form-label">
                            First Name
                            <span v-show="$v.firstName.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtFirstName" v-bind:class="{ 'invalid-field': $v.firstName.$error }" v-model="firstName">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.firstName.$error && !$v.firstName.required">First name is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtMiddleName" class="col-md-4 col-lg-2 col-form-label">
                            Middle Name
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtMiddleName" v-model="middleName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtLastName" class="col-md-4 col-lg-2 col-form-label">
                            Last Name
                            <span v-show="$v.lastName.$error" class="error-asterisk">*</span>
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
                            Email
                            <span v-show="$v.email.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="email" class="form-control" name="txtEmail" v-bind:class="{ 'invalid-field': $v.email.$error }" v-model="email">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.email.$error && !$v.email.required">Email is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtUsername" class="col-md-4 col-lg-2 col-form-label">
                            Username
                            <span v-show="$v.userName.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtUserName" v-bind:class="{ 'invalid-field': $v.userName.$error }" :readonly="userName == 'admin'" v-model="userName">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.userName.$error && !$v.userName.required">Username is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 text-center">
                            <button type="button" @click="submitForm" class="btn btn-primary"><i class="fas fa-user-edit"></i> Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { required, email } from 'vuelidate/lib/validators';
    import axios from "axios";

    export default {
        name: 'editUserApp',
        data () {
            return {
                firstName: this.user.firstName,
                middleName: this.user.middleName,
                lastName: this.user.lastName,
                email: this.user.email,
                userName: this.user.userName,
                successfullyUpdated: false,
                errorMessage: ''
            }
        },
        props: [
            'user'
        ],
        validations: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            email: {
                required
            },
            userName: {
                required
            }
        },
        methods: {                    
            submitForm: function (event) {
                
                //Reset error message
                this.errorMessage = '';

                //Check validation
                this.$v.$touch();
                if (!this.$v.$anyError) {
                    
                    let vueObj = this;
                    axios.defaults.headers.common['x-access-token'] = $cookies.get('RPiWebsite_token');

                    //Update the user
                    axios
                    .patch('/userapi/users/' + vueObj.user.id, {
                        firstName: vueObj.firstName,
                        middleName: vueObj.middleName,
                        lastName: vueObj.lastName,
                        email: vueObj.email,
                        userName: vueObj.userName
                    })
                    .then(function(res) {
                        if (!res.data.errorMessage) {
                            vueObj.successfullyUpdated = true;
                        } else {
                            vueObj.errorMessage = res.data.errorMessage;
                        }
                    })
                    .catch(function (error) {

                        console.log(error);
                    });

                    
                }
            }
        }
    };
</script>