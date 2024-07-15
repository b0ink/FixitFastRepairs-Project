<script setup>
    import Maps from '../components/Maps.vue'
    import FAQitem from '../components/FAQitem.vue'

    import { ref } from 'vue'
    const name = ref('')
    const email = ref('')
    const message = ref('')

    import FAQdata from '@/assets/FAQ.json'

    const FAQ = ref(FAQdata)
</script>

<template>
    <main>
        <div class="container">
            <!-- TODO: Add FAQ tab here -->
            <h1>Frequently Asked Questions</h1>

            <div id="faq">
                <!-- TODO: FAQ into JSON file -->
                <!-- v-for json file using FAQitem -->
                <FAQitem v-for="(answer, question) in FAQ" :key="question" :question="question" :answer="answer" />
            </div>
            <h2>Have More Questions?</h2>
            <form action="">
                <div class="form-row">
                    <input type="text" v-model="name" placeholder="Full Name" required />
                </div>
                <div class="form-row">
                    <input v-model="email" type="email" placeholder="Email" required />
                </div>
                <div class="form-row">
                    <textarea v-model="message" name="" id="" cols="30" rows="10" placeholder="Leave a message"></textarea>
                </div>
                <input type="submit" id="submit" @submit="submitForm" />
            </form>
        </div>

        <hr />

        <h2>Come Visit Us!</h2>
        <div id="details">
            <div id="hours">
                <h3>Business Hours</h3>
                <p>
                    Mon &#8212; Fri 10:00 AM - 8:00 PM
                    <br />
                    Sat &#8212; Sun 12:00 PM - 5:00 PM
                </p>
            </div>

            <div id="location">
                <h3>Location</h3>
                123 Melbourne Highway,<br />Melbourne, Victoria 3000
            </div>
            <Maps />
        </div>
    </main>
</template>

<style scoped>
    * {
        /* border: 1px solid lime; */
    }

    #faq {
        width: 100%;
        max-width: 1200px;
        margin: 50px auto;
        padding: 0 50px;
    }
    @media only screen and (max-width: 1110px) {
        #faq {
            padding: 0 0px;
        }
    }
    hr {
        width: 90%;
        max-width: 900px;
        margin: 50px auto;
    }
    #details {
        text-align: center;
    }
    #details div {
        margin: 25px 0;
    }
    h3 {
        font-weight: bold;
        font-size: 18px;
    }
    #details {
        max-width: 900px;
        margin: 0 auto;
        margin-bottom: 100px;
    }
    #details ul {
        list-style: none;
    }
    .row {
        display: flex;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 25px;
    }
    .container form {
        max-width: 900px;
        margin: 0 auto;
    }
    h1 {
        font-size: 35px;
        text-align: center;
        /* margin: 50px; */
        font-weight: bold;
    }
    h2 {
        font-size: 28px;
        text-align: center;
        width: 100%;
        font-weight: bold;
        /* margin: 25px; */
        padding: 25px;
    }
    main {
        display: block;
        /* flex-direction: column;
        justify-content: flex-end;
        align-items: center; */
        /* min-height: 750px; */
        /* min-height: calc(100vh - 100px); */
    }
</style>
