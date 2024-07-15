<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Nav from './components/Nav.vue'
    import Footer from './components/Footer.vue'
</script>

<template>
    <FlashMessage :position="'left top'" :time="10000" :strategy="'multiple'"></FlashMessage>

    <Nav />
    <RouterView />
    <Footer />
</template>

<style scoped></style>
