<script setup>
    import { inject, onMounted, ref } from 'vue'
    import { flashMessage } from '@smartweb/vue-flash-message'
    const axios = inject('axios')

    import { useRouter } from 'vue-router'
    const router = useRouter()

    const props = defineProps(['authtoken'])

    const verified = ref(false)
    onMounted(() => {
        if (!props.authtoken) {
            router.push({ path: '/' })
            return
        }

        const data = {
            authtoken: props.authtoken
        }

        axios
            .post('/api/verifyemail/', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    // router.push({ path: '/account/login' })

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully verified account! You may login.'
                    })
                    verified.value = true
                }
            })
            .catch((e) => {
                console.log(e)

                if (!e.response.data.error) {
                    return
                }
                flashMessage.show({
                    type: 'error',
                    title: 'Error',
                    text: e.response.data.error
                })
                router.push({ path: '/' })
            })
    })
</script>

<template>
    <main>
        <div class="container">
            <h1>Account verified.</h1>
            <div v-if="verified">
                <p>Your email has been verified.</p>
                <p>You may now <a href="/account/login">login</a></p>
            </div>
            <div v-else>
                <p>Loading..</p>
            </div>
        </div>
    </main>
</template>

<style>
    h1 {
        text-align: center;
    }
    .container {
        text-align: center;
    }
</style>
