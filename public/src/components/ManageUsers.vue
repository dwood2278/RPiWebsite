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
                            Email: <a :href="'mailto:' + aUser.email">{{ aUser.email }}</a><br/>
                            Admin User: {{ aUser.isAdmin ? 'Yes' : 'No' }}
                        </div>  
                    </div> 
                    <div class="row">
                        <div class="col-12 text-center my-2">
                            <b-button variant="primary" v-b-modal="'modal-edit-user-' + aUser.id" class="btn-block"><i class="fas fa-pencil-alt"></i> Edit User</b-button>
                        </div>
                        <div class="col-12 text-center my-2">
                            <b-button variant="primary" class="btn-block"><i class="fas fa-key"></i> Change Password</b-button>
                        </div>
                        <div v-if="aUser.userName == 'admin'" class="col-12 text-center my-2">
                            <b-button variant="danger" class="btn-block"><i class="fas fa-trash"></i> Delete</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal :id="'modal-edit-user-' + aUser.id" :title="'Edit ' + aUser.firstName + ' ' + aUser.lastName" size="xl" hide-footer>
                <edit-user
                    :user = "aUser"
                    v-on:user-updated = "onUserUpdated"
                ></edit-user>
            </b-modal>
        </div>
    </div>
</template>

<script>

    import { required, email } from 'vuelidate/lib/validators';
    import axios from 'axios';
    import _ from 'lodash';
    import EditUser from './EditUser.vue';

    export default {
        name: 'manageUsersApp',
        data () {
            return {
                userList: [],
                password: '',
            }
        },
        components: {
            EditUser
        },
        created () {
            
            //Fetch the user list.            
            let vueObj = this;
            axios.defaults.headers.common['x-access-token'] = $cookies.get('RPiWebsite_token');
            axios
            .get('/userapi/users')
            .then(function(res) {
                vueObj.userList = res.data.userList;
            })
            .catch(function (error) {
                console.log(error);
            });

        },
        methods: {
            onUserUpdated: function(updatedUser) {

                //Close the modal
                this.$bvModal.hide('modal-edit-user-' + updatedUser.id);

                //Find and update the record.
                var aUser = _.find(this.userList, {id: updatedUser.id});
                aUser.firstName = updatedUser.firstName;
                aUser.middleName = updatedUser.middleName;
                aUser.lastName = updatedUser.lastName;
                aUser.email = updatedUser.email;
                aUser.userName = updatedUser.userName;

            },
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