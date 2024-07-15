<script setup>
    //
    import { TicketStatusOptions, GetStatusName, GetStatusClass } from '@/composables/tickets'
</script>

<template>
    <div class="pie-chart-container">
        <div class="pie-chart"></div>
        <div class="legend">
            <div class="legend-item" v-for="(status, index) in TicketStatusOptions">
                <div :class="['legend-color', 'ticket-status', GetStatusClass(index)]"></div>
                {{ status }}
            </div>
        </div>
    </div>
</template>

<style>
    .pie-chart-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 50px;
    }

    .pie-chart {
        border: 3px solid black;
        width: 350px;
        height: 350px;
        border-radius: 50%;
        background: conic-gradient(
            rgba(var(--submitted), 0.5) 0% 15%,
            rgba(var(--approved), 0.5) 15% 45%,
            rgba(var(--repairing), 0.5) 45% 65%,
            rgba(var(--completed), 0.5) 65% 85%,
            rgba(var(--pendingpayment), 0.5) 85% 100%
        );
    }

    @media only screen and (max-width: 1110px) {
        .pie-chart {
            width: 175px;
            height: 175px;
        }
    }
    .legend {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        flex-wrap: wrap;
    }

    .legend-item {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 5px;
    }
</style>
