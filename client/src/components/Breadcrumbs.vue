<script setup>
    const props = defineProps(['stage'])
</script>

<template>
    <div class="steps-progress-bar">
        <a href="/repairs" id="first-step" :class="{ active: props.stage >= 1 }"><p>Device</p></a>
        <a id="second-step" :class="{ active: props.stage >= 2 }"><p>Repair</p></a>
        <a id="third-step" :class="{ active: props.stage >= 3 }"><p>Booking</p></a>
        <a id="fourth-step" :class="{ active: props.stage >= 4 }"><p>Confirmation</p></a>
    </div>
</template>

<style scoped>
    /* https://jsfiddle.net/8u2Bp/9/ */
    /* :D */

    .steps-progress-bar {
        margin: 25px auto;
        overflow: hidden;
        /*CSS counters to number the steps*/
        counter-reset: step;
        width: 100%;
        padding: 0px;
        max-width: 750px;
        display: block;
    }
    .steps-progress-bar a {
        list-style-type: none;
        /* color: white; */
        color: #b9b9b9;
        /* text-transform: uppercase; */
        font-size: 14px;
        width: 25%;
        float: left;
        position: relative;
        text-align: center;
    }
    .steps-progress-bar li p {
        color: #b9b9b9;
    }
    .steps-progress-bar a:before {
        content: counter(step);
        counter-increment: step;
        width: 40px;
        line-height: 40px;
        display: block;
        font-size: 18px;
        color: #333;
        background: #eeeeee;
        border-radius: 3px;
        margin: 0 auto 5px auto;
        border-radius: 20px;
        color: #b9b9b9;
        font-weight: bold;
    }
    /*progressbar connectors*/
    .steps-progress-bar a:after {
        content: '';
        width: 100%;
        height: 3px;
        background: #eeeeee;
        position: absolute;
        left: -50%;
        top: 20px;
        z-index: -1;
    }
    .steps-progress-bar a:first-child:after {
        /*connector not needed before the first step*/
        content: none;
    }
    /*marking active/completed steps green*/
    /*The number of the step and the connector before it = green*/
    .steps-progress-bar a.active:before,
    .steps-progress-bar a.active:after {
        background: #948bf6;
        /* color: #0083b5; */
        background: #0083b5;
        color: white;
    }
    .steps-progress-bar a.active p {
        color: #948bf6;
        color: #0083b5;
        font-weight: 800;
    }
</style>
