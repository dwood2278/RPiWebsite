<template>
    <div v-cloak class="card mx-auto" style="max-width:400px;">
        <h5 class="card-header">Login</h5>
        <div class="card-body">
            <div class="card-text">
                <div v-if="errorMessage" class="row">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtUserName" class="col-sm-4 col-form-label">
                        Username <span v-show="$v.userName.$error" class="error-asterisk">*</span>
                    </label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-bind:class="{ 'invalid-field': $v.userName.$error }" name="txtUserName" v-model.lazy="$v.userName.$model">
                    </div>
                    <div class="offset-sm-4 col-sm-8 field-error-text">
                        <span v-show="$v.userName.$error">Username is required.</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtPassword" class="col-sm-4 col-form-label">
                        Password <span v-show="$v.password.$error" class="error-asterisk">*</span>&nbsp;
                    </label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" v-bind:class="{ 'invalid-field': $v.password.$error }" name="txtPassword" v-model.lazy="$v.password.$model">
                    </div>
                    <div class="offset-sm-4 col-sm-8 field-error-text">
                        <span v-show="$v.password.$error">Password is required.</span>&nbsp;
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12 text-center">
                        <button type="submit" @click="submitForm" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i> Login</button>
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
        name: 'loginApp',
        data() {
            return {
                userName: '',
                password: '',
            }
        },
        props: [
            'errorMessage'
        ],
        validations: {
            userName: {
                required
            },
            password: {
                required
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
    }
</script>