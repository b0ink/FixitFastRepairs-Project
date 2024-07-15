<script setup>
    import { ref, inject } from 'vue'
    const axios = inject('axios')

    import { useRouter } from 'vue-router'
    const router = useRouter()

    import { flashMessage } from '@smartweb/vue-flash-message'

    const email = ref('')
    const password = ref('')

    const submitForm = (e) => {
        const data = {
            email: email.value,
            password: password.value
        }
        axios
            .post('/api/loginuser/', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    // router.push({ path: 'home' })
                    // router.push({ path: 'accountdashboard' })

                    window.location.href = '/account/dashboard'

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully logged in!'
                    })
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
                console.log(e.response.data.error)
            })
    }
</script>

<template>
    <main>
        <div class="container">
            <h1>Log in</h1>
            <form action="" @submit.prevent="submitForm">
                <div class="form-row">
                    <input type="text" v-model="email" placeholder="Email" />
                </div>
                <div class="form-row">
                    <input type="password" v-model="password" placeholder="Password" />
                </div>
                <input type="submit" id="submit" value="Submit" />
            </form>
        </div>
    </main>
</template>

<style scoped>
    h1 {
        text-align: center;
    }
    .container {
        max-width: 750px;
        margin: 0 auto;
        padding: 25px;
    }
</style>
