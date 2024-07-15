<script setup>
    import { computed, inject, onMounted, ref } from 'vue'
    const axios = inject('axios')
    import { flashMessage } from '@smartweb/vue-flash-message'
    import { useRouter } from 'vue-router'
    import repairReference from '@/assets/repairReference.json'

    import TicketStatus from '@/components/TicketStatus.vue'
    const router = useRouter()

    const props = defineProps(['ticket'])
    console.log(TicketStatus.statuses)

    import { convertTimeToLocal, timeSince } from '../composables/time'

    const notes = ref([])

    const comment = ref('')
    const statusChange = ref(0)
    const staffAssignChange = ref(0)

    const makeVisibleToCustomer = ref(0)

    onMounted(() => {
        notes.value = props.ticket.notes
        statusChange.value = parseInt(props.ticket.status)
        console.log('status', props.ticket.status)
    })

    import { GetStatusClass, TicketStatusOptions } from '@/composables/tickets'

    const getStatusSelectClass = computed(() => {
        return GetStatusClass(statusChange.value)
    })

    const toggleVisible = (noteIndex, id) => {
        const data = {
            noteid: id
        }
        axios
            .post('/api/toggle-note-visibility', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully updated ticket!'
                    })

                    // Locally toggle data
                    notes.value[noteIndex].staff_only = 1 - notes.value[noteIndex].staff_only
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

    const submitUpdate = () => {
        const data = {
            ticketid: props.ticket.id,
            comment: comment.value,
            status: statusChange.value,
            staffAssign: staffAssignChange.value,
            makeVisibleToCustomer: makeVisibleToCustomer.value
        }

        axios
            .post('/api/submit-ticket-comment', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully updated ticket!'
                    })

                    comment.value = ''
                    // statusChange.value = 0
                    staffAssignChange.value = 0

                    axios
                        .post('/api/get-ticket', { data: { ticketid: props.ticket.id } })
                        .then((data) => {
                            const newNote = data.data.notes.pop()
                            notes.value.push(newNote)
                        })
                        .catch((e) => {
                            console.log('error', e)
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

    const deleteTicketNote = (index, noteID, ticketID) => {
        if (!confirm(`Are you sure you want to delete ticket note #${noteID}`)) {
            return console.log('delete cancelled')
        }

        axios
            .delete(`/api/delete-ticket-note/${noteID}/${ticketID}`)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: `Successfully deleted note #${noteID}`
                    })
                    notes.value.splice(index, 1)
                    // axios
                    //     .post('/api/get-ticket', { data: { ticketid: props.ticket.id } })
                    //     .then((data) => {
                    //         const newNotes = data.data.notes
                    //         const indexToRemove = notes.value.findIndex((note) => newNotes.some((newNote) => newNote.id === note.id))
                    //         if (indexToRemove !== -1) {
                    //             notes.value.splice(indexToRemove, 1)
                    //         }
                    //     })
                    //     .catch((e) => {
                    //         console.log('error', e)
                    //     })

                    console.log('deleted noted')
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
</script>

<template>
    <main>
        <h1>Ticket information #{{ props.ticket.id }}</h1>

        <div class="container">
            <br />
            <h2>Customer Details</h2>
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
            <br />
            <p><b>Assigned To: </b>{{ props.ticket.staff_assigned }}</p>
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
                        <span class="note-time">{{ timeSince(props.ticket.created_at) }} Ago</span>
                    </div>
                    <div class="comment"><i>Ticket submitted, waiting for approval.</i></div>
                    <span class="note-author"><i>(Auto Generated)</i></span>
                </div>

                <!-- <TransitionGroup name="list" class="ticket-container"> -->
                <div class="ticket" v-for="(note, index) in notes" :key="note">
                    <div class="ticket-row">
                        <TicketStatus :status="note.status_change" />
                        <span class="note-time">{{ timeSince(note.created_at) }} Ago</span>
                    </div>
                    <div class="comment">"{{ note.comment }}"</div>
                    <span class="note-author">&#8212; {{ note.fullname }}</span>
                    <div class="ticket-row">
                        <div>
                            <button @click="deleteTicketNote(index, note.id, props.ticket.id)" class="ticket-btn delete">Delete</button>
                            <!-- <button class="ticket-btn edit">Edit</button> -->
                        </div>
                        <div>
                            <span class="note-visibility">{{ note.staff_only ? 'Staff Only' : 'Public' }}</span>

                            <button @click="toggleVisible(index, note.id)" class="tgl-visible" v-if="note.staff_only == 1">Toggle Visibility</button>
                            <button @click="toggleVisible(index, note.id)" class="tgl-visible" v-if="note.staff_only == 0">Make Staff Only</button>
                        </div>
                    </div>
                </div>
                <!-- </TransitionGroup> -->

                <!-- <template > -->

                <!-- </template> -->
            </TransitionGroup>
            <br />

            <h2>Leave note:</h2>
            <hr />
            <br />
            <form action="" @submit.prevent="submitUpdate">
                <label for="status">Change Status:</label>
                <select :class="[getStatusSelectClass, 'ticket-status']" name="status" id="status" v-model="statusChange">
                    <!-- <option value="-1">(No Change)</option> -->
                    <option v-for="(value, index) in TicketStatusOptions" :value="index">
                        {{ value }}
                    </option>
                    <!-- <option value="0">Submitted</option>
                    <option value="1">Approved</option>
                    <option value="2">Received Device</option>
                    <option value="3">Repairing</option>
                    <option value="4">Pending Payment</option>
                    <option value="5">Posted to customer</option>
                    <option value="6">Completed</option> -->
                </select>

                <label for="status">Assign to staff:</label>
                <select v-if="!!statusChange" name="status" id="status" v-model="staffAssignChange">
                    <option value="0">(No Change)</option>
                    <!-- for loopover staff, value = staff ID, show how many repairs staff currently assigned to -->
                    <option value="11">Bob repairman</option>
                </select>

                <label for="makePublic">Make visible to customer?</label>
                <input id="makePublic" type="checkbox" v-model="makeVisibleToCustomer" />

                <textarea name="" id="" cols="30" rows="10" v-model="comment" required></textarea>
                <input type="submit" name="submit" id="submit" value="Submit" />
            </form>
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

    .tgl-visible {
        outline: none;
        border: none;
        background: white;
        /* border: 2px solid black; */
        /* padding: 5px 10px; */
        border-radius: 4px;
        /* margin: 5px; */
        cursor: pointer;
        color: rgb(106, 106, 234);
        transition: all 250ms ease-in-out;
        font-weight: 500;
        text-decoration: underline;
        letter-spacing: normal;
        text-align: right;
        margin: 0;
        padding: 0;
    }

    .ticket-btn:hover {
        box-shadow: 0px 7px 18px -3px rgba(0, 0, 0, 0.1);
        filter: brightness(80%);
        /* background-color: rgb(168, 52, 52); */
    }

    .tgl-visible:hover {
        /* background-color: rgb(25, 83, 191); */
        /* font-weight: bold; */
        color: blue;
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
    @media only screen and (max-width: 1110px) {
        .ticket-details {
            padding: 0;
        }
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
