<template>    
    <div id="headerNavApp">
        <b-navbar toggleable="sm" type="dark" variant="dark" class="border-bottom box-shadow mb-3">
            <div class="container">
                <b-navbar-brand href="/"><img src="/images/RPi-Logo-Reg-SCREEN-20X24.png" > Galileo</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Home</b-nav-item>            
                    </b-navbar-nav>   
                    <b-navbar-nav class="ml-auto">
                        <b-nav-form>
                            <a href="/login" class="btn btn-outline-light"><i class="fas fa-sign-in-alt"></i> Login</a>
                        </b-nav-form>
                    </b-navbar-nav>
                </b-collapse>  
            </div>              
        </b-navbar>
    </div>
</template>

<script>
 export default {
    name: 'headerNavApp',
    components: {},
  }
</script>
