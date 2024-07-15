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
        class="bi bi-stop-circle"
        viewBox="0 0 16 16"
    >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" />
    </svg>

    <svg
        v-else
        :width="props.size"
        :height="props.size"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-stop-circle-fill filled"
        viewBox="0 0 16 16"
    >
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"
        />
    </svg>
</template>
