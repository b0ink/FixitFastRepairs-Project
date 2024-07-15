<script setup>
    const props = defineProps(['filled', 'size'])
</script>

<template>
    <svg
        v-if="!props.filled"
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        fill="currentColor"
        class="bi bi-phone"
        viewBox="0 0 16 16"
    >
        <path
            d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"
        />
        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>

    <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        fill="currentColor"
        class="bi bi-phone-fill filled"
        viewBox="0 0 16 16"
    >
        <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
    </svg>
</template>
