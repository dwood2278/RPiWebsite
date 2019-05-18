<template>
    <div class="card mx-auto" style="max-width:500px;">
        <h5 class="card-header">Change Password</h5>
        <div class="card-body">
            <div class="card-text">
                <div v-show="successfullyChangedPassword" class="row">
                    <div class="col-12">
                        <b-alert show variant="success">
                            <i class="fas fa-check"></i> Successfully changed password.
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
                <div v-show="!successfullyChangedPassword">
                    <div class="form-group row">
                        <label for="txtCurrentPassword" class="col-md-6 col-form-label">
                            Current Password <span v-show="$v.currentPassword.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-6">
                            <input type="password" class="form-control" v-bind:class="{ 'invalid-field': $v.currentPassword.$error }" name="txtCurrentPassword" v-model="currentPassword">
                        </div>
                        <div class="offset-md-6 col-md-6 field-error-message">
                            <span v-show="$v.currentPassword.$error && !$v.currentPassword.required">Current password is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtNewPassword" class="col-md-6 col-form-label">
                            New Password <span v-show="$v.newPassword.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-6">
                            <input type="password" class="form-control" v-bind:class="{ 'invalid-field': $v.newPassword.$error }" name="txtNewPassword" v-model="newPassword">
                        </div>
                        <div class="offset-md-6 col-md-6 field-error-message">
                            <span v-show="$v.newPassword.$error && !$v.newPassword.required">New password is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtNewPasswordConf" class="col-md-6 col-form-label">
                            Confirm New Password  <span v-show="$v.newPasswordConf.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-6">
                            <input type="password" class="form-control" v-bind:class="{ 'invalid-field': $v.newPasswordConf.$error }" name="txtNewPasswordConf" v-model="newPasswordConf">
                        </div>
                        <div class="offset-md-6 col-md-6 field-error-message">
                            <span v-show="$v.newPasswordConf.$error && !$v.newPasswordConf.required">New password confirmation is required.</span>
                            <span v-show="$v.newPasswordConf.$error && $v.newPasswordConf.required && !$v.newPasswordConf.sameAsPassword">Confirmation password does not match new password.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 text-center">
                            <button type="button" @click="submitForm" class="btn btn-primary"><i class="fas fa-key"></i> Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
    import { required, sameAs } from 'vuelidate/lib/validators';
    import axios from "axios";

    export default {
        name: 'changePasswordApp',
        data () {
            return {
                currentPassword: '',
                newPassword: '',
                newPasswordConf: '',
                errorMessage: '',
                successfullyChangedPassword: false
            }
        },
        props: [
            'userId'
        ],
        validations: {
            currentPassword: {
                required
            },
            newPassword: {
                required
            },
            newPasswordConf: {
                required,
                sameAsPassword: sameAs('newPassword')
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

                    //Change password
                    axios
                    .patch('/userapi/changepassword/' + vueObj.userId, {
                        currentPassword: vueObj.currentPassword,
                        newPassword: vueObj.newPassword
                    })
                    .then(function(res) {
                        if (!res.data.errorMessage) {
                            vueObj.successfullyChangedPassword = true;
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