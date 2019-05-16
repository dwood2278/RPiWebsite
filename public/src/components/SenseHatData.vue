<template>
    <div class="card mx-auto">
        <h5 class="card-header">Sense Hat Data</h5>
        <div class="card-body">
            <div class="card-text">
                <div class="row" v-if="isLoading">
                    <div class="col-12 large-wait-spinner">
                        <i class="fas fa-circle-notch fa-spin"></i>
                        Fetching Sense Hat Data
                    </div>
                </div>
                <div class="row" v-if="!isLoading && !serverRequestError">
                    <div class="col-12">
                        CPU Temp: {{ celsiusToFahrenheit(senseHatData.cpuTemp).toFixed(1) }} F<br/>
                        Temperature: {{ celsiusToFahrenheit(senseHatData.temperature).toFixed(1) }} F<br/>
                        Pressure: {{ mbarToInHg(senseHatData.pressure).toFixed(2) }} inHg <br/>
                        Temp from Pressure Sensor: {{ celsiusToFahrenheit(senseHatData.temperatureFromPressure).toFixed(1) }} F<br/>
                        Humidity: {{ senseHatData.humidity.toFixed(1) }}%<br/>
                        Pitch: {{ senseHatData.pitch.toFixed(1) }}<br/>
                        Roll: {{ senseHatData.roll.toFixed(1) }}<br/>
                        Yaw: {{ senseHatData.yaw.toFixed(1) }}
                    </div>
                </div>
                <div class="row" v-if="serverRequestError">
                    <div class="col-12">
                        <b-alert variant="danger" show>
                            <i class="fas fa-exclamation-triangle"></i> {{ serverRequestError }}
                        </b-alert>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'senseHatApp',
        data() {
            return {
                senseHatData: {
                    cpuTemp: 0,
                    temperature: 0,
                    pressure: 0,
                    temperatureFromPressure: 0,
                    humidity: 0,
                    pitch: 0,
                    roll: 0,
                    yaw: 0
                },
                isLoading: false,
                serverRequestError: ''
            }
        },
        created: function () {
            var vueObject = this;
            this.isLoading = true;
            axios.defaults.headers.common['x-access-token'] = $cookies.get('RPiWebsite_token');
            axios
            .get('/sensehatapi/getsensehatdata')
            .then(function(response) {
                vueObject.senseHatData = response.data;
                vueObject.isLoading = false;
            })
            .catch(function (error) {
                vueObject.serverRequestError = error;
                console.log(error);
                vueObject.isLoading = false;
            });
        },
        methods: {
            celsiusToFahrenheit: function (celsiusTemp) {
                return (celsiusTemp * 9/5) + 32;
            },
            mbarToInHg: function (mbarPressure) {
                return mbarPressure / 33.864;
            }
        }
    }
</script>