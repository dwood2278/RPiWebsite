<template>
    <div>
        <div class="row my-3">
            <div class="col-12 col-md-6">
                <b-button variant="primary" v-b-modal="'modal-create-user'"><i class="fas fa-user-plus"></i> Create User</b-button>
            </div>
            <label for="ddlSortOrder" class="col-form-label col-6 col-md-3 text-right">Sort Order:</label>
            <div class="col-6 col-md-3">
                <select class="form-control" id="ddlSortOrder">
                    <option>First Name</option>
                    <option>Last Name</option>
                    <option>Email</option>
                </select>
            </div>
        </div>
        <div class="row justify-content-center">
            <div v-for="aUser in userList" class="col-md-12 col-lg-6" :key=aUser.id>
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
                                <b-button variant="primary" v-b-modal="'modal-change-password-' + aUser.id" class="btn-block"><i class="fas fa-key"></i> Change Password</b-button>
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
                        :show-success-message = "false"
                        v-on:user-updated = "onUserUpdated"
                    ></edit-user>
                </b-modal>
                <b-modal :id="'modal-change-password-' + aUser.id" :title="'Change Password for ' + aUser.firstName + ' ' + aUser.lastName" hide-footer>
                    <change-password
                        :user = "aUser"
                        :show-success-message = "false"
                        :require-current-password = "loggedInUser.id == aUser.id"
                        v-on:password-changed = "onPasswordChanged"
                    ></change-password>
                </b-modal>
            </div>
        </div>
        <b-modal id="modal-create-user" title="Create New User" size="xl" hide-footer>
            <create-user
                @user-created="onUserCreated"
            ></create-user>
        </b-modal>
    </div>
</template>

<script>

    import { required, email } from 'vuelidate/lib/validators';
    import axios from 'axios';
    import _ from 'lodash';
    import EditUser from './EditUser.vue';
    import ChangePassword from './ChangePassword.vue'
    import CreateUser from './CreateUser.vue'

    export default {
        name: 'manageUsersApp',
        data () {
            return {
                userList: [],
                password: '',
                loggedInUser: $cookies.get('RPiWebsite_user')
            }
        },
        components: {
            CreateUser,
            EditUser,
            ChangePassword
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
            onUserCreated: function (newUser) {

                //Close the modal
                this.$bvModal.hide('modal-create-user');

                //Add the new user to the user list.
                this.userList.push(newUser);
            },
            onUserUpdated: function (updatedUser) {

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
            onPasswordChanged: function(updatedUser) {
                //Close the modal
                this.$bvModal.hide('modal-change-password-' + updatedUser.id);
            }
        }
    };
</script>