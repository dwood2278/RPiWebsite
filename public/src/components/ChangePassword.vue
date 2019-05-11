<template>
    <div class="card mx-auto" style="max-width:500px;">
        <h5 class="card-header">Change Password</h5>
        <div class="card-body">
            <div class="card-text">
                <div class="row">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> <%= errorMessage %>
                        </div>
                    </div>
                </div>
                <div v-if="validationErrorList.length > 0" class="row">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> Errors in form:
                                <ul>
                                    <li v-for="error in validationErrorList">
                                        {{ error }}
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtCurrentPassword" class="col-md-6 col-form-label">
                        Current Password <span v-show="!fieldIsValid.currentPassword" class="error-text">*</span>
                    </label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" v-bind:class="{ 'invalid-field': !fieldIsValid.currentPassword }" name="txtCurrentPassword" v-model="currentPassword">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtNewPassword" class="col-md-6 col-form-label">
                        New Password <span v-show="!fieldIsValid.newPassword" class="error-text">*</span>
                    </label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" v-bind:class="{ 'invalid-field': !fieldIsValid.newPassword }" name="txtNewPassword" v-model="newPassword">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtNewPasswordConf" class="col-md-6 col-form-label">
                        Confirm New Password  <span v-show="!fieldIsValid.newPassword" class="error-text">*</span>
                    </label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" v-bind:class="{ 'invalid-field': !fieldIsValid.newPasswordConf }" name="txtNewPasswordConf" v-model="newPasswordConf">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12 text-center">
                        <button type="submit" @click="submitForm" class="btn btn-primary"><i class="fas fa-key"></i> Change Password</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="alert alert-success" role="alert">
                            <i class="fas fa-check"></i> Successfully changed password.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <a href="/users/changePassword">Change the password again.</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    
    import { required } from 'vuelidate/lib/validators';
    import { constants } from 'crypto';

    export default {
        name: 'changePasswordApp',
        data () {
            return {
                currentPassword: '',
                newPassword: '',
                newPasswordConf: ''
            }
        },
        props: [
            'errorMessage'
        ],
        methods: {
            submitForm: function (event) {
                //Validate form
                if (!this.validateForm()) {
                    //Cancel submission
                    event.preventDefault();
                }
            }
        }
    };
</script>