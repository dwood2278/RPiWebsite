<template>
    <div id="editUserApp" class="card" v-cloak>
        <h5 class="card-header">Edit My Profile</h5>
        <div class="card-body">
            <div class="card-text">
                <div v-if="errorMessage" class="row">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
                        </div>
                    </div>
                </div>
                <form action="/users/editUser" method="POST">
                    <div class="form-group row">
                        <label for="txtFirstName" class="col-md-4 col-lg-2 col-form-label">
                            First Name
                            <span v-show="$v.user.firstName.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtFirstName" v-bind:class="{ 'invalid-field': $v.user.firstName.$error }" v-model="user.firstName">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.user.firstName.$error && !$v.user.firstName.required">First name is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtMiddleName" class="col-md-4 col-lg-2 col-form-label">
                            Middle Name
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtMiddleName" v-model="user.middleName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtLastName" class="col-md-4 col-lg-2 col-form-label">
                            Last Name
                            <span v-show="$v.user.lastName.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtLastName" v-bind:class="{ 'invalid-field': $v.user.lastName.$error }" v-model="user.lastName">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.user.lastName.$error && !$v.user.lastName.required">Last name is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtEmail" class="col-md-4 col-lg-2 col-form-label">
                            Email
                            <span v-show="$v.user.email.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="email" class="form-control" name="txtEmail" v-bind:class="{ 'invalid-field': $v.user.email.$error }" v-model="user.email">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.user.email.$error && !$v.user.email.required">Email is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtUsername" class="col-md-4 col-lg-2 col-form-label">
                            Username
                            <span v-show="$v.user.userName.$error" class="error-asterisk">*</span>
                        </label>
                        <div class="col-md-8 col-lg-10">
                            <input type="text" class="form-control" name="txtUserName" v-bind:class="{ 'invalid-field': $v.user.userName.$error }" :readonly="user.userName == 'admin'" v-model="user.userName">
                        </div>
                        <div class="offset-md-4 offset-lg-2 col-md-8 col-lg-10 field-error-message">
                            <span v-show="$v.user.userName.$error && !$v.user.userName.required">Username password is required.</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 text-center">
                            <button type="submit" @click="submitForm" class="btn btn-primary"><i class="fas fa-user-edit"></i> Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import { required, email } from 'vuelidate/lib/validators';

    export default {
        name: 'editUserApp',
        data () {
            return {
            }
        },
        props: [
            'user',
            'errorMessage'
        ],
        validations: {
            user: {
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
            }
        },
        methods: {                    
            submitForm: function (event) {
                //Check validation
                this.$v.$touch();
                if (this.$v.$anyError) {
                    //Cancel submission
                    event.preventDefault();
                }
            }
        }
    };
</script>