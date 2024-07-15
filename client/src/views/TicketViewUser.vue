<script setup>
    import { computed, inject, onMounted, ref } from 'vue'
    const axios = inject('axios')
    import { flashMessage } from '@smartweb/vue-flash-message'
    import { useRouter } from 'vue-router'
    import repairReference from '@/assets/repairReference.json'

    import TicketStatus from '@/components/TicketStatus.vue'

    const props = defineProps(['ticket'])
    import { convertTimeToLocal, timeSince } from '../composables/time'

    const notes = ref([])

    onMounted(() => {
        notes.value = props.ticket.notes
        console.log('status', props.ticket.status)
    })
</script>

<template>
    <main>
        <h1>Ticket information #{{ props.ticket.id }}</h1>

        <div class="container">
            <br />
            <h2>Your Details</h2>
            <hr />
            <br />

            <div class="ticket-details">
                <div id="device-info">
                    <p><b>Device: </b>{{ props.ticket.brand }} {{ props.ticket.displayName }}</p>
                    <p><b>Repair: </b>{{ repairReference[props.ticket.repair_name] }}</p>
                    <p><b>Quoted Price: </b>${{ props.ticket.price }}</p>
                    <p><b>Serial No: </b>{{ props.ticket.phone_serial }}</p>
                    <p><b>Phone Pin: </b>{{ props.ticket.phone_pin ? props.ticket.phone_pin : 'N/A' }}</p>
                </div>
                <div id="customer-info">
                    <p><b>Customer Name: </b>{{ props.ticket.cust_name }}</p>
                    <p><b>Customer Email: </b>{{ props.ticket.email }}</p>
                    <p><b>Contact No. </b>{{ props.ticket.user_mobile }}</p>
                    <p><b>Return Address: </b></p>
                    <p>
                        {{ props.ticket.address }} {{ props.ticket.address_apt }}
                        <br />
                        {{ props.ticket.address_city }}, {{ props.ticket.address_state }}, {{ props.ticket.address_post }}
                    </p>
                </div>
            </div>
            <!-- Don't forget to deal with approving tickets etc etc -->
            <h2>Ticket Details</h2>
            <hr />
            <p>
                <!-- TODO: update current status on ticket submit -->
                <b>Current Status:</b>
                <TicketStatus :status="props.ticket.status" />
            </p>
            <br />
            <h2>Comments</h2>
            <hr />
            <br />
            <!-- Use Transition Group to animate changes in the notes array -->
            <TransitionGroup name="tickets" class="ticket-notes" tag="div">
                <!-- static ticket -->
                <div class="ticket" key="autogen">
                    <div class="ticket-row">
                        <!-- 'Submitted' Status-->
                        <TicketStatus :status="0" />
                        <span class="note-time">{{ timeSince(props.ticket.created_at) }}</span>
                    </div>
                    <div class="comment"><i>Ticket submitted, waiting for approval.</i></div>
                    <span class="note-author"><i>(Auto Generated)</i></span>
                </div>

                <!-- <TransitionGroup name="list" class="ticket-container"> -->
                <div class="ticket" v-for="(note, index) in notes" :key="note">
                    <div class="ticket-row">
                        <TicketStatus :status="note.status_change" />
                        <span class="note-time">{{ timeSince(note.created_at) }}</span>
                    </div>
                    <div class="comment">"{{ note.comment }}"</div>
                    <span class="note-author">&#8212; Staff Team</span>
                </div>
            </TransitionGroup>
            <br />
        </div>
    </main>
</template>

<style scoped>
    select.ticket-status {
        border: none;
        /* color: rgb(0, 200, 0);
        font-weight: bold;
        border: 2px solid rgb(0, 200, 0); */
        outline: 0;
    }

    .tickets-move,
    .tickets-enter-active,
    .tickets-leave-active {
        /* transition: all 1s cubic-bezier(0.55, 0, 0.1, 1); */
        transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    }
    /* .list-enter-from, */
    .tickets-enter-from,
    .tickets-leave-to {
        opacity: 0;
        /* transform: translateX(250px); */
        transform: scaleY(1) translate(100%, 0%);
    }
    .tickets-leave-active {
        position: absolute;
    }

    .ticket-notes {
        position: relative;
    }
    .ticket-btn {
        outline: none;
        border: none;
        background: white;
        /* border: 2px solid black; */
        padding: 5px 10px;
        border-radius: 4px;
        margin: 5px;
        cursor: pointer;
        color: white;
        transition: all 250ms ease-in-out;
        font-weight: 700;
    }

    .ticket-btn.delete {
        background-color: rgba(230, 40, 40);
        color: white;
    }
    .ticket-btn.edit {
        background-color: rgb(255, 183, 0);
        color: white;
    }

    .ticket-btn.tgl-visible {
        background-color: rgba(82, 133, 228, 0.2);
        color: rgb(82, 133, 228);
    }

    .ticket-btn:hover {
        box-shadow: 0px 7px 18px -3px rgba(0, 0, 0, 0.1);
        filter: brightness(80%);
        /* background-color: rgb(168, 52, 52); */
    }

    .ticket-btn.tgl-visible:hover {
        background-color: rgb(25, 83, 191);
    }

    textarea {
        text-align: left;
        padding: 15px;
    }
    select {
        /* margin: 0 auto; */
        margin-top: 5px;
        margin-bottom: 25px;
        display: block;
        height: 50px;
        width: 100%;
        max-width: 350px;
        /* padding: 15px; */
        border-radius: 5px;
        display: flex;
        text-align: center;
        /* font-weight: bold; */
        font-size: 18px;
    }

    .ticket-row {
        display: flex;
        justify-content: space-between;
    }
    .ticket {
        /* border: 1px solid grey; */
        border-radius: 5px;
        /* border-bottom: 1px solid grey; */
        /* position: relative; */
        width: 100%;
        padding: 25px;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 15px 0;
        /* box-shadow: 0px 7px 18px -3px rgba(0, 0, 0, 0.4); */
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

        /* transition: all 500ms ease-in-out; */
    }
    .ticket .comment {
        padding: 25px 0;
    }
    .note-time {
        /* position: absolute; */
        font-size: 12px;
        color: rgb(198, 185, 185);
        text-align: right;
        display: block;
    }
    .note-author,
    .note-visibility {
        display: block;
        text-align: right;
        font-size: 14px;
    }

    h2 {
        text-align: left;
    }
    .ticket-details {
        display: flex;
        justify-content: space-between;
        /* max-width: 500px; */
        padding: 50px;
    }
    p {
        margin: 5px;
    }
    p b {
        font-weight: bold;
        /* font-size: 16px; */
        /* text-decoration: underline; */
    }
    .container {
        text-align: left;
        padding: 25px;
        max-width: 900px;
        margin: 0 auto;
    }
</style>
