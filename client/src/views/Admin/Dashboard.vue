<!-- Dashboard can just be a nvaigation to see devices, tickets, statistics on sales -->

<script setup>
    import Graph from '@/components/Graph.vue'
</script>

<template>
    <main>
        <div class="container">
            <h1>Admin dashboard</h1>
            <!-- possible a visualisation graph (pie chart) to show all active repairs, comeplted repairs, mid repair -->
            <!-- container with buttons:  -->
            <!-- -> devices -->
            <!-- -> tickets -->
            <h2>Overview</h2>
            <hr />
            <div class="content">
                <Graph />
            </div>
            <h2>Actions</h2>
            <hr />
            <div id="actions" class="content">
                <a class="admin-action" href="/admin/devices">
                    <svg width="32" height="32" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
                        <path
                            d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"
                        />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>

                    Manage Devices</a
                >
                <a class="admin-action" href="/admin/tickets"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        class="bi bi-ticket-detailed"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z"
                        />
                        <path
                            d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5ZM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5h-13Z"
                        />
                    </svg>
                    View Tickets</a
                >
            </div>
        </div>
    </main>
</template>

<style scoped>
    h2 {
        text-align: left;
    }

    #actions {
        display: flex;
        justify-content: center;
        padding: 25px;
        gap: 25px;
    }
    .admin-action {
        width: 100%;
        /* border: 1px solid black; */
        display: flex;
        flex-direction: column;
        max-width: 250px;
        /* height: 200px; */
        height: 10em;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: black;
        color: rgba(255, 255, 255, 0.8);

        font-weight: 900;
        font-size: 1.1em;
        transition: all 250ms ease-in-out;
        background-color: rgb(233, 245, 255);
        padding: 10px;
        box-shadow: -1px 7px 21px -2px rgba(0, 0, 0, 0.2);
    }

    .admin-action:nth-child(1) {
        background-color: #0083b5;
        /* color: rgb(255, 255, 255, 0.8); */
    }

    .admin-action:nth-child(2) {
        background-color: #08b98a;
        /* color: rgb(255, 255, 255, 0.8); */
    }
    .admin-action:hover {
        /* background-color: #737cff; */
        background-color: #d0ebff;
    }
    .container {
        padding: 10px 35px;
    }

    .content {
        margin-bottom: 50px;
    }
    @media (max-width: 500px) {
        #actions {
            flex-direction: column;
            align-items: center;
        }
        .admin-action {
            max-width: 300px;
            max-height: 100px;
        }
    }
</style>
