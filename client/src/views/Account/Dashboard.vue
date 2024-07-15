<script setup>
    import { onMounted, ref, inject } from 'vue'
    import TicketStatus from '@/components/TicketStatus.vue'
    import { useRoute, useRouter } from 'vue-router'
    import repairReference from '@/assets/repairReference.json'

    const axios = inject('axios')

    import { timeSince } from '../../composables/time'

    const router = useRouter()
    const route = useRoute()

    const userInfo = ref({
        fullname: '',
        email: ''
    })
    const tickets = ref([])

    const GetAccountData = () => {
        axios
            .get(`/api/user-data/${route.meta.userData.accountid}`)
            .then((data) => {
                // console.log(data)
                // tickets.value = JSON.parse(data.data)
                const { userData, ticketData } = data.data

                userInfo.value.fullname = userData.fullname
                userInfo.value.email = userData.email
                tickets.value = ticketData
                console.log(data.data)
            })
            .catch((e) => {
                console.log('error', e)
            })
    }

    const GetRecentBookings = () => {
        //
    }

    //TODO: figure out how to re-use the admin's Ticket.vue

    onMounted(async () => {
        await router.isReady()
        GetAccountData()
    })
</script>

<template>
    <main>
        <div class="container">
            <h1>Account information</h1>
            <!-- Account details, name, address -->
            <!-- Table of their currently active bookings -->

            <div class="information">
                <div class="info-box">
                    <h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            class="bi bi-person-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                                fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                        </svg>
                        Contact Information
                    </h3>
                    <div class="content">
                        <p>
                            <b>Name: </b><span>{{ userInfo.fullname }}</span>
                        </p>
                        <p>
                            <b>Email: </b><span>{{ userInfo.email }}</span>
                        </p>
                    </div>
                </div>

                <div class="info-box">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                            />
                        </svg>
                        Security
                    </h3>
                    <div class="content">
                        <p>
                            <a href="/account">Change Password</a>
                        </p>
                    </div>
                </div>
                <div class="info-box">
                    <h3>Recent Bookings</h3>
                    <div class="content" id="recent-tickets">
                        <table>
                            <thead>
                                <tr>
                                    <th class="small-col">ID</th>
                                    <th>Created At</th>
                                    <!-- <th>Last Updated</th> -->
                                    <th>Device</th>
                                    <th>Repair</th>
                                    <th>Status</th>
                                    <th class="small-col"></th>
                                </tr>
                            </thead>
                            <tr v-for="ticket in tickets">
                                <td class="small-col" data-label="Booking #">#{{ ticket.id }}</td>
                                <td data-label="Submitted">{{ timeSince(ticket.created_at) }} Ago</td>
                                <!-- <td data-label="Last Updated">{{ timeSince(ticket.lastu) }}</td> -->
                                <td data-label="Device">{{ ticket.displayName }}</td>
                                <td data-label="Repair">{{ repairReference[ticket.repair_name] }} Replacement</td>
                                <td data-label="Status"><TicketStatus :status="ticket.status" /></td>
                                <td class="small-col"><a :href="'/account/ticket/' + ticket.id">View</a></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    #recent-tickets {
        padding: 15px;
    }
    table thead th {
        background: none;
        color: #767676;
        border-bottom: 1px solid #ddd;
    }

    table {
        width: 100%;
        /* border: 1px solid lime; */
    }

    table tr {
        padding: 15px;
    }
    table td {
        padding: 8px;
    }

    * {
        /* border: 1px solid blue; */
    }

    h1 {
        margin-bottom: 50px;
    }
    .content a {
        color: #0083b5;
        /* text-decoration: underline; */
        text-underline-offset: 5px;
    }
    .information {
        display: flex;
        flex-basis: 50%;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px;
        /* row-gap: 25px; */
        /* column-gap: 25px; */
    }
    .container {
        min-height: 900px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 25px;
        /* padding-top: 100px; */
    }
    .info-box {
        box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.4);
        /* max-width: 50%; */
        text-align: left;
        padding: 25px;
        border-radius: 10px;
        flex: calc(50% - 15px);
        min-width: 275px;
        font-size: 1em;
    }
    .info-box .content p b {
        font-weight: bold;
        margin-right: 4px;
    }
    h3 {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        padding: 2px 0;
    }
    .info-box svg {
        margin-right: 5px;
        padding: 1px;
    }
    .info-box h3 {
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }
</style>
