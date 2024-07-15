<script setup>
    import Breadcrumbs from '../components/Breadcrumbs.vue'
    import { ref, inject } from 'vue'
    import { flashMessage } from '@smartweb/vue-flash-message'
    import { useRouter } from 'vue-router'
    const axios = inject('axios')
    const props = defineProps(['phone', 'repairName'])
    const GetRepairName = (repairName) => {
        return repairName[0].toUpperCase() + repairName.slice(1)
    }

    //TODO: experiment whether i can create a validation that can be used both in the api and front-end before submitting
    const router = useRouter()

    const phone = ref(props.phone)
    const repair = ref(props.repairName)
    const serialNo = ref('')
    const pinCode = ref('')
    const mobile = ref('')

    const addressLine1 = ref('')
    const addressLineApt = ref('')
    const city = ref('')
    const state = ref('')
    const postcode = ref('')

    const submitForm = (e) => {
        // e.preventDefault()
        const data = {
            phone_id: phone.value.id,
            repair_name: repair.value,
            phone_serial: serialNo.value,
            phone_pin: pinCode.value,
            user_mobile: mobile.value,
            address: addressLine1.value,
            address_apt: addressLineApt.value,
            address_city: city.value,
            address_state: state.value,
            address_post: postcode.value
        }

        axios
            .post('/api/submitticket/', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)
                    data['ticket_id'] = response.data.ticket_id
                    // * flash message will carry across given the router view setup
                    //i could also pass a param of the object containing the information
                    //TODO: add a 'expiresIn' property in data
                    localStorage.setItem('bookingDetails', JSON.stringify(data))
                    router.push({ path: '/confirmation' })

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully created ticket!'
                    })
                    console.log('inserted into database')
                }
                console.log(response)
            })
            .catch((e) => {
                flashMessage.show({
                    type: 'error',
                    title: 'Error',
                    text: e.response.data.error
                })
                console.log(e.response.data.error)
            })
    }

    setTimeout(() => {}, 3000)
</script>

<template>
    <main>
        <Breadcrumbs :stage="3" />
        <div class="container">
            <h1>Enter your details</h1>
            <div id="howto">
                <h3>How our repair process works:</h3>
                <p>
                    <b>1. Submit The form: </b>
                    Begin by completing and submitting the provided form.
                </p>
                <p>
                    <b>2. Send Your Device: </b>
                    Package and send your device to our shop. Don't forget to include your return address on the packaging, ensuring it matches the
                    information you provided in the form.
                </p>
                <p>
                    <b>3. Track Progress: </b>
                    Keep an eye on the status of your repair through your personalised account page.
                </p>
                <p>
                    <b>4. Review and Confirm: </b>
                    Once the repair is finished, you'll have acess to documentation confirming the completion. We'll then send you an invoice for your
                    convenience.
                </p>
                <p>
                    <b>5. Track Progress: </b>
                    After settling the invoice, we'll promptly return your device to you, ensuring it reaches you as soon as the repair is completed
                    and the invoice is paid.
                </p>
            </div>
            <form action="" @submit.prevent="submitForm">
                <h4>Device information:</h4>
                <div class="form-row">
                    <input type="text" :value="props.phone.displayName" disabled required />
                    <input type="text" :value="GetRepairName($route.params.repairName) + ` Repair`" disabled required />
                </div>
                <div class="form-row">
                    <input v-model="serialNo" type="text" placeholder="Serial Number" required />
                    <input v-model="pinCode" type="text" placeholder="Pin Code (optional)" />
                </div>
                <h4>Your information:</h4>
                <div class="form-row">
                    <input v-model="mobile" type="mobile" placeholder="Mobile No." required />
                    <!-- TODO: retrieve user's email and use placeholder to 'confirm' -->
                    <!-- <input v-model="email" type="email" placeholder="Email" /> -->
                </div>
                <h4>Return address:</h4>
                <div class="form-row">
                    <input v-model="addressLine1" type="text" placeholder="Address" required />
                </div>
                <div class="form-row">
                    <input v-model="addressLineApt" type="text" placeholder="Apartment, Suit, etc." />
                </div>
                <div class="form-row">
                    <input v-model="city" type="text" placeholder="City/Suburb" required />
                    <input v-model="state" type="text" placeholder="State" required />
                </div>
                <div class="form-row small">
                    <input v-model="postcode" type="text" placeholder="Postcode" required />
                </div>
                <input type="submit" id="submit" />
            </form>
        </div>
    </main>
</template>

<style scoped>
    main {
        margin-bottom: 50px;
    }
    h1 {
        text-align: center;
    }
    h4 {
        font-size: 18px;
    }

    .container {
        max-width: 750px;
        margin: 0 auto;
        padding: 25px;
    }
    #howto {
        margin: 25px auto;
    }
    #howto p b {
        font-weight: bold;
    }
    #howto p {
        margin: 10px 0;
    }
</style>
