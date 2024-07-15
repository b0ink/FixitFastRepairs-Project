<script setup>
    import { onMounted, ref } from 'vue'
    import Breadcrumbs from '../components/Breadcrumbs.vue'

    const bookingData = ref(null)

    //TODO: there will probably be a myAccount page with access to this information, the details could probably be a component
    onMounted(() => {
        bookingData.value = JSON.parse(localStorage.getItem('bookingDetails'))
        //TODO: if data is expired (5+ mins), remove item
        // localStorage.removeItem('bookingDetails')
    })

    import repairReference from '@/assets/repairReference.json'
</script>

<template>
    <main>
        <Breadcrumbs :stage="4" />
        <h1>Your repair ticket has been created!</h1>
        <br />
        <div class="content">
            <p><b>Ticket ID: </b>#{{ bookingData ? bookingData.ticket_id : '0' }}</p>
            <p><b>Repair: </b>{{ bookingData ? repairReference[bookingData.repair_name] : 'loading' }}</p>
            <br />
            <p><b>We will return your device to:</b></p>
            <p>{{ bookingData ? `${bookingData.address}` : 'loading' }}</p>
            <p>{{ bookingData ? `${bookingData.address_apt}` : 'loading' }}</p>
            <p>{{ bookingData ? `${bookingData.address_city}, ${bookingData.address_state}, ${bookingData.address_post}` : 'loading' }}</p>
            <p>{{ bookingData ? `` : 'loading' }}</p>
            <br />
            <p><b>We will contact you with this mobile with any updates:</b></p>
            <p>{{ bookingData ? `${bookingData.user_mobile}` : 'loading' }}</p>
            <a id="goticket" href="/account/dashboard">View Account</a>
        </div>
    </main>
</template>

<style scoped>
    #goticket {
        text-align: center;
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
        height: 50px;
        border: 2px solid #0083b5;
        background-color: white;
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 250ms ease-in-out;
        /* color: black; */
        color: #0083b5;
        font-weight: bold;
    }
    main {
        min-height: calc(100vh - 100px);
    }
    .content {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        margin-top: 50px;
    }
    h1 {
        text-align: center;
    }
    p b {
        font-weight: 900;
    }
</style>
