<script setup>
    import { inject, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    const axios = inject('axios')

    const router = useRouter()

    onMounted(async () => {
        await router.isReady()
        console.log('loggin u out')
        await axios.get('/api/logout')
        // to.meta.userData = null
        // to.meta.authLevel = 0
        router.push({ path: 'login' })
        console.log('redirect')
        // next('/account/login')
    })
</script>

<template>
    <h1>logging u out</h1>
</template>
