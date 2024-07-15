<!-- See all current devices -->

<script setup>
    //
    // once a device is selected, stay on this screen, hide the table, display the single device with editable actions
    // DO NOT USE "DeviceView"

    import { inject, onMounted, ref } from 'vue'
    const devices = ref([])
    const axios = inject('axios')
    import { flashMessage } from '@smartweb/vue-flash-message'

    // if selectDevice not null, hide table, show device actions
    const defaultData = {
        id: -1,
        phoneid: '',
        brand: '',
        model: '',
        displayName: '',
        screen: 0,
        battery: 0,
        frontcamera: 0,
        backcamera: 0,
        chargingport: 0,
        speaker: 0,
        housing: 0,
        homebutton: 0,
        imgSrc: ''
    }
    const filter = ref('')

    const selectedDevice = ref(JSON.parse(JSON.stringify(defaultData)))

    const submitForm = (e) => {
        const data = {
            screen: selectedDevice.value.screen,
            battery: selectedDevice.value.battery,
            frontcamera: selectedDevice.value.frontcamera,
            backcamera: selectedDevice.value.backcamera,
            chargingport: selectedDevice.value.chargingport,
            speaker: selectedDevice.value.speaker,
            housing: selectedDevice.value.housing,
            homebutton: selectedDevice.value.homebutton,
            id: selectedDevice.value.id,
            phoneid: selectedDevice.value.phoneid
        }

        if (!confirm('Are you sure you want to update the device with these prices?')) {
            return console.log('cancelled')
        }
        console.log('confirmed')

        axios
            .put('/api/update-device/', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully updated "' + selectedDevice.value.displayName + '"!'
                    })
                }
            })
            .catch((e) => {
                console.log(e)

                if (!e.response.data.error) {
                    return
                }
                flashMessage.show({
                    type: 'error',
                    title: 'Error',
                    text: e.response.data.error
                })
                console.log(e.response.data.error)
            })
    }

    const RetrievePhones = () => {
        axios
            .get('/api/getphones')
            .then((data) => {
                console.log(data)
                devices.value = JSON.parse(data.data)
            })
            .catch((e) => {
                console.log('error', e)
            })
    }
    onMounted(() => {
        RetrievePhones()
    })

    const containsKeyword = (device) => {
        for (const value of Object.values(device)) {
            if (typeof value === 'string' && value.includes(filter.value)) {
                return true
            }
        }
        return false
    }
</script>

<template>
    <main>
        <!-- TODO: back button to go back to admin dashboard -->
        <!--  -->
        <!-- table of all devices -->
        <h1>Manage Devices</h1>
        <div class="container" v-show="selectedDevice.id > 0">
            <button @click="selectedDevice = JSON.parse(JSON.stringify(defaultData))" id="goback">Select another device &rarr;</button>
            <br />
            <br />
            <h2>Device information</h2>
            <hr />
            <br />
            <p><b>Phone Identifier: </b>{{ selectedDevice.phoneid }}</p>
            <p><b>Brand: </b>{{ selectedDevice.brand }}</p>
            <p><b>Model: </b>{{ selectedDevice.model }}</p>
            <p><b>Display Name: </b>{{ selectedDevice.displayName }}</p>

            <br />

            <h2>Adjust price</h2>
            <hr />
            <span>To make the repair unvailable for this device, set the price to $0</span>
            <form action="" @submit.prevent="submitForm">
                <div class="form-row">
                    <label for="screen">Screen Price</label>
                    <input id="screen" v-model="selectedDevice['screen']" />
                </div>
                <div class="form-row">
                    <label for="battery">Battery Price</label>
                    <input id="battery" v-model="selectedDevice['battery']" />
                </div>
                <div class="form-row">
                    <label for="frontcamera">Front Camera Price</label>
                    <input id="frontcamera" v-model="selectedDevice['frontcamera']" />
                </div>
                <div class="form-row">
                    <label for="backcamera">Back Camera Price</label>
                    <input id="backcamera" v-model="selectedDevice['backcamera']" />
                </div>
                <div class="form-row">
                    <label for="chargingport">Charging Port Price</label>
                    <input id="chargingport" v-model="selectedDevice['chargingport']" />
                </div>
                <div class="form-row">
                    <label for="speaker">Speaker Price</label>
                    <input id="speaker" v-model="selectedDevice['speaker']" />
                </div>
                <div class="form-row">
                    <label for="housing">Housing Price</label>
                    <input id="housing" v-model="selectedDevice['housing']" />
                </div>
                <div class="form-row">
                    <label for="homebutton">Home Button Price</label>
                    <input id="homebutton" v-model="selectedDevice['homebutton']" />
                </div>
                <input type="submit" id="submit" value="Save" />
            </form>
        </div>

        <div class="content" v-show="selectedDevice.id == -1">
            <input id="filter" type="text" v-model="filter" placeholder="Filter..." />

            <table>
                <thead>
                    <tr>
                        <th class="collapsed-visible" scope="col"></th>
                        <th class="collapsed-hidden small-col" scope="col">id</th>
                        <th class="collapsed-hidden" scope="col">Brand</th>
                        <th class="collapsed-hidden" scope="col">Name</th>
                        <th scope="col" class="price">Screen</th>
                        <th scope="col" class="price">Battery</th>
                        <th scope="col" class="price">FrontCam</th>
                        <th scope="col" class="price">BackCam</th>
                        <th scope="col" class="price">Charge Port</th>
                        <th scope="col" class="price">Speaker</th>
                        <th scope="col" class="price">Housing</th>
                        <th scope="col" class="price">Home Button</th>
                        <th class="collapsed-hidden" scope="col"></th>
                    </tr>
                </thead>

                <template v-for="device of devices">
                    <tr v-if="filter ? (containsKeyword(device) ? true : false) : true">
                        <td class="collapsed-visible" :data-label="device.displayName">#{{ device.id }}</td>

                        <td class="collapsed-hidden small-col" data-label="ID">{{ device.id }}</td>
                        <td class="collapsed-hidden" data-label="Brand">{{ device.brand }}</td>
                        <td class="collapsed-hidden" data-label="Display Name">{{ device.displayName }}</td>
                        <td class="collapsed-visible" data-label="">
                            <select name="" id="">
                                <option value="">View Repair Price</option>
                                <option value="">Screen: ${{ device.screen }}</option>
                                <option value="">Battery: ${{ device.battery }}</option>
                                <option value="">Front Camera: ${{ device.frontcamera }}</option>
                                <option value="">Back Camera: ${{ device.backcamera }}</option>
                                <option value="">Charging Port: ${{ device.chargingport }}</option>
                                <option value="">Speaker: ${{ device.speaker }}</option>
                                <option value="">Housing: ${{ device.housing }}</option>
                                <option value="">Home Button: ${{ device.homebutton }}</option>
                            </select>
                        </td>
                        <td data-label="Screen" class="price">${{ device.screen }}</td>
                        <td data-label="Battery" class="price">${{ device.battery }}</td>
                        <td data-label="Front Camera" class="price">${{ device.frontcamera }}</td>
                        <td data-label="Back Camera" class="price">${{ device.backcamera }}</td>
                        <td data-label="Charging Port" class="price">${{ device.chargingport }}</td>
                        <td data-label="Speaker" class="price">${{ device.speaker }}</td>
                        <td data-label="Housing" class="price">${{ device.housing }}</td>
                        <td data-label="Home Button" class="price">${{ device.homebutton }}</td>
                        <td data-label="Actions"><button @click="selectedDevice = device" class="edit-btn">Edit</button></td>
                    </tr>
                </template>
            </table>
        </div>
    </main>
</template>

<style scoped>
    select {
        /* margin: 0 auto; */
        display: block;
        height: 25px;
        width: 100%;
        max-width: 350px;
        /* padding: 15px; */
        border-radius: 5px;
        display: flex;
        text-align: center;
        /* font-weight: bold; */
        font-size: 14px;
    }
    #filter {
        outline: none;
        width: 100%;
        max-width: 250px;
        height: 35px;
        margin: 25px;
        border-radius: 5px;
        border: 1px solid black;
        padding: 5px;
    }
    #goback {
        background: none;
        outline: none;
        font-size: 18px;
        text-decoration: underline;
        text-decoration-color: grey;
        border: none;
        padding: 0;
        cursor: pointer;
    }
    #goback:hover {
        font-weight: bold;
    }
    .container {
        text-align: left;
        padding: 25px;
        max-width: 900px;
        margin: 0 auto;
    }
    .container p b {
        font-weight: bold;
    }
    * {
        /* border: 1px solid lime; */
    }
    h2 {
        text-align: left;
    }
    form {
        max-width: 300px;
        margin: 0 auto;
    }

    form input {
        max-width: 50px;
    }

    .form-row {
        display: flex;
        align-items: center;
    }

    /* .form-row {
        position: relative;
        margin-bottom: 25px;
    }

    .form-row label {
        position: absolute;
        left: 0;
        top: -25px;
    } */
    .edit-btn {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .edit-btn:hover {
        font-weight: bold;
        text-decoration: underline;
    }

    .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    table tr .collapsed-visible {
        display: none;
    }
    table tr .collapsed-hidden {
        /* display: inline; */
    }
    @media (max-width: 900px) {
        .price {
            display: none;
        }

        table tr .collapsed-hidden {
            display: none;
        }
        table tr .collapsed-visible {
            display: block;
        }
    }
</style>
