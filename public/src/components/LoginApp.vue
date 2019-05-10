<template>
    <div id="loginApp" v-cloak class="card mx-auto" style="max-width:400px;">
        <h5 class="card-header">Login</h5>
        <div class="card-body">
            <div class="card-text">
                <div v-if="validationErrorList.length > 0" class="row">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> Errors in form:
                            <ul>
                                <li v-for="error in validationErrorList" :key="error">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtUserName" class="col-sm-4 col-form-label">
                        Username <span v-show="!fieldIsValid.userName" class="error-text">*</span>
                    </label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-bind:class="{ 'invalid-field': !fieldIsValid.userName }" name="txtUserName" v-model="userName">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="txtPassword" class="col-sm-4 col-form-label">
                        Password <span v-show="!fieldIsValid.password" class="error-text">*</span>
                    </label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" v-bind:class="{ 'invalid-field': !fieldIsValid.password }" name="txtPassword" v-model="password">
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
    export default {
        name: 'loginApp',
        data() {
            return {
                userName: '',
                password: '',
                fieldIsValid: {
                    userName: true,
                    password: true
                },
                validationErrorList: [],
            }
        },
        methods: {
            validateForm: function () {

            //Void out errors first
            this.validationErrorList = [];
            this.fieldIsValid.userName = true;
            this.fieldIsValid.password = true;

            //Verify the fields
            if (this.userName == '') {
                this.fieldIsValid.userName = false;
                this.validationErrorList.push('You must enter a username.');
            }
            if (this.password == '') {
                this.fieldIsValid.password = false;
                this.validationErrorList.push('You must enter a password.');
            }

            //Return the correct value
            if (this.validationErrorList.length == 0 ){
                return true;
            } else {
                return false;
            }

            },
            submitForm: function (event) {
                //Validate form
                if (!this.validateForm()) {
                    //Cancel submission
                    event.preventDefault();
                }
            }
        }
    }
</script>