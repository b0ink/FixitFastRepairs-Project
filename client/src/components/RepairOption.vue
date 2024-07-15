<script setup>
    import { ref } from 'vue'
    const props = defineProps(['repair'])
    const Icon = props.repair.icon

    const isHovered = ref(false)
</script>

<template>
    <div @mouseover="isHovered = true" @mouseleave="isHovered = false" class="repairOption" v-show="props.repair.price > 0">
        <Icon :filled="false" :size="42" />
        <span class="repairTitle">{{ props.repair.title }}</span>
    </div>
</template>

<style scoped>
    .repairOption:nth-child(odd) {
        /* background-color: rgb(233, 245, 255); */
    }
    .repairOption {
        width: 125px;
        height: 125px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        /* background-color: rgb(233, 245, 255); */
        color: #0083b5;

        border-radius: 10px;

        /* border: 2px solid #0082b5a7; */

        -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        /* -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3); */
        /* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3); */

        margin: 10px;
        padding: 15px;
        line-height: normal;
        user-select: none;
        cursor: pointer;
        transition: all 100ms ease-in-out;
    }

    .repairTitle {
        font-size: 1em;
        font-weight: bold;
    }

    .repairOption:hover {
        background-color: #d0ebff;
        background-color: #0082b5b4;
        color: #fff;
    }

    @media (max-width: 500px) {
        .repairOption {
            font-size: 0.6em;
            width: 80px;
            height: 80px;
        }
    }
</style>

<style>
    @media (max-width: 500px) {
        .repairOption svg {
            width: 25px;
            height: 25px;
        }
    }
</style>
