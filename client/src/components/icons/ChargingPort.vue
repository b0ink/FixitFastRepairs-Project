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
        class="bi bi-usb-c"
        viewBox="0 0 16 16"
    >
        <path d="M3.5 7.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9Z" />
        <path d="M0 8a3 3 0 0 1 3-3h10a3 3 0 1 1 0 6H3a3 3 0 0 1-3-3Zm3-2a2 2 0 1 0 0 4h10a2 2 0 1 0 0-4H3Z" />
    </svg>
    <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        fill="currentColor"
        class="bi bi-usb-c-fill filled"
        viewBox="0 0 16 16"
    >
        <path d="M3 5a3 3 0 0 0 0 6h10a3 3 0 1 0 0-6H3Zm.5 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1Z" />
    </svg>
</template>
