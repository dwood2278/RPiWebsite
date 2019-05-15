<template>
    <div class="row justify-content-center">
        <div v-for="(aUser, index) in userList" class="col-md-12 col-lg-6">
            <div class="card">
                <h5 class="card-header">
                    {{ aUser.firstName }} {{ aUser.lastName }}
                </h5>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            First Name: {{ aUser.firstName }}<br/>
                            Middle Name: {{ aUser.middleName }}<br/>
                            Last Name: {{ aUser.lastName }}<br/>
                            Email: <a :href="'mailto:' + aUser.email">{{ aUser.email }}</a>
                        </div>  
                    </div> 
                    <div class="row">
                        <div class="col-6 text-center">
                            <a href="#" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Edit User</a>
                        </div>
                        <div class="col-6 text-center">
                            <a href="#" class="btn btn-primary"><i class="fas fa-key"></i> Change Password</a>
                        </div>
                    </div>
                    <div v-if="aUser.userName == 'admin'" class="row">
                        <div class="col-12 text-center">
                            <a href="#" class="btn btn-primary"><i class="fas fa-trash"></i> Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'manageUsersApp',
        data () {
            return {
                userList: [],
                password: '',
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