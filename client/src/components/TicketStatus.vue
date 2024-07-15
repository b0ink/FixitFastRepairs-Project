<script setup>
    //

    import { TicketStatusOptions, GetStatusName, GetStatusClass } from '@/composables/tickets'

    const props = defineProps(['status'])
</script>

<template>
    <span :class="['ticket-status', GetStatusClass(props.status)]">{{ GetStatusName(props.status) }}</span>
</template>

<style></style>

<style>
    .ticket-status {
        /* max-width: 100px; */
        border-radius: 5px;
        background-color: grey;
        color: white;
        font-size: 0.85em;
        padding: 5px 0.9em;
        text-align: center;
        font-weight: 900;
    }

    .ticket-status.waitapproval {
        background-color: rgba(var(--waitapproval), var(--alpha));
        color: rgb(var(--waitapproval));
    }

    .ticket-status.submitted {
        background-color: rgba(var(--submitted), var(--alpha));
        color: rgb(var(--submitted));
    }

    .ticket-status.approved {
        background-color: rgba(var(--approved), var(--alpha));
        color: rgb(var(--approved));
    }

    .ticket-status.receiveddevice {
        background-color: rgba(var(--receiveddevice), var(--alpha));
        color: rgb(var(--receiveddevice));
    }

    .ticket-status.repairing {
        background-color: rgba(var(--repairing), var(--alpha));
        color: rgb(var(--repairing));
    }

    .ticket-status.pendingpayment {
        background-color: rgba(var(--pendingpayment), var(--alpha));
        color: rgb(var(--pendingpayment));
    }

    .ticket-status.postedtocustomer {
        background-color: rgba(var(--postedtocustomer), var(--alpha));
        color: rgb(var(--postedtocustomer));
    }

    .ticket-status.completed {
        background-color: rgba(var(--completed), var(--alpha));
        color: rgb(var(--completed));
    }
</style>
