<script setup>
    import { ref, inject } from 'vue'
    const axios = inject('axios')

    import { useRouter } from 'vue-router'
    const router = useRouter()

    import { flashMessage } from '@smartweb/vue-flash-message'

    const fullname = ref('')
    const email = ref('')
    const password = ref('')
    const confirmpassword = ref('')

    const submitForm = (e) => {
        const data = {
            fullname: fullname.value,
            email: email.value,
            password: password.value,
            confirmpassword: confirmpassword.value
        }
        console.log(data)
        axios
            .post('/api/createaccount/', { data })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)

                    router.push({ path: '/account/verifyemail' })

                    flashMessage.show({
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully created account!'
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
            <h1>Create an account</h1>
            <form action="" @submit.prevent="submitForm">
                <div class="form-row">
                    <input type="text" v-model="fullname" placeholder="Full name" />
                </div>
                <div class="form-row">
                    <input type="text" v-model="email" placeholder="Email" />
                </div>
                <div class="form-row">
                    <input type="password" v-model="password" placeholder="Password" />
                </div>
                <div class="form-row">
                    <input type="password" v-model="confirmpassword" placeholder="Confirm password" />
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
