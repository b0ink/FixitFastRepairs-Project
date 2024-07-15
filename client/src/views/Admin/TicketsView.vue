<!-- See all availabe tickets, make table organise priority  -->

<!-- See all current devices -->

<script setup>
    // Fetch all tickets onMount, display table

    /*
    <!-- View individual ticket, with all status updates, so it will have a form at the bottom to submit new updates -->

        Once a ticket is select, hide table, and then view the single ticket
        <!-- Design will be like a chat messaging system, top part will show all details of the device -->
        <!-- quoted price, device model, serial number -->
        <!-- textarea at the bottom for staff comments to be made -->


    */

    import { inject, onMounted, ref } from 'vue'
    const axios = inject('axios')
    import TicketStatus from '@/components/TicketStatus.vue'
    import { flashMessage } from '@smartweb/vue-flash-message'
    import repairReference from '@/assets/repairReference.json'

    const tickets = ref([])
    import { timeSince } from '@/composables/time'
    // if selectDevice not null, hide table, show device actions

    const filter = ref('')

    const RetrieveTickets = () => {
        axios
            .post('/api/get-ticket', { data: { ticketid: -1 } })
            .then((data) => {
                // console.log(data)
                // tickets.value = JSON.parse(data.data)
                console.log('good', data)
                tickets.value = data.data
                console.log(tickets.value)
            })
            .catch((e) => {
                console.log('error', e)
            })
    }
    onMounted(() => {
        RetrieveTickets()
    })

    const containsKeyword = (ticket) => {
        for (const value of Object.values(ticket)) {
            if (ticket.notes) {
                for (const note of ticket.notes) {
                    if (containsKeyword(note)) {
                        return true
                    }
                }
            }

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
        <h1>Repair Tickets</h1>

        <div class="content">
            <input id="filter" type="text" v-model="filter" placeholder="Filter..." />

            <table>
                <thead>
                    <tr>
                        <th scope="col">Ticket ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Type</th>
                        <th scope="col">Cust. Name</th>
                        <th scope="col">Cust. Mobile</th>
                        <th scope="col">Assigned to</th>
                        <th scope="col">Last Updated</th>
                        <th scope="col">Created</th>
                        <!-- <th></th> -->
                    </tr>
                </thead>

                <template v-for="ticket of tickets">
                    <tr v-if="filter ? (containsKeyword(ticket) ? true : false) : true">
                        <td data-label="Ticket ID">
                            <a :href="'/admin/tickets/' + ticket.id">{{ ticket.id }}</a>
                        </td>

                        <td data-label="Status">
                            <TicketStatus :status="ticket.status" />
                        </td>
                        <td data-label="Notes">
                            [x{{ ticket.notes.length }}] Most Recent:
                            {{ ticket.notes.length > 0 ? ticket.notes[ticket.notes.length - 1].comment : '-Submitted-' }}
                        </td>
                        <td data-label="Repair">{{ repairReference[ticket.repair_name] }}</td>
                        <td data-label="Cust. Name">{{ ticket.cust_name }}</td>
                        <td data-label="Cust. Mobile">{{ ticket.user_mobile }}</td>
                        <td data-label="Staff Assigned">{{ ticket.staff_assigned }}</td>
                        <td data-label="Last Update">
                            {{ ticket.notes.length > 0 ? timeSince(ticket.notes[ticket.notes.length - 1].created_at) : timeSince(ticket.created_at) }}
                        </td>
                        <td data-label="Created">{{ timeSince(ticket.created_at) }}</td>

                        <!-- <td><button class="edit-btn">Edit</button></td> -->
                    </tr>
                </template>
            </table>
        </div>
    </main>
</template>

<style scoped>
    td a {
        color: black;
    }
    td a:hover {
        text-decoration: underline;
        text-underline-offset: 5px;
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

    table tr {
        max-width: 250px;
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

    @media (max-width: 900px) {
        .price {
            display: none;
        }
    }
</style>
