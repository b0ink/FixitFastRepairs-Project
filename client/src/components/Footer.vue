<script setup>
    import { onMounted, ref, inject } from 'vue'
    const axios = inject('axios')

    const phones = ref({})

    onMounted(() => {
        axios
            .get('/api/getphones')
            .then((data) => {
                console.log(data)
                const phoneData = JSON.parse(data.data)
                for (let item of phoneData) {
                    if (!phones.value[item.brand]) {
                        phones.value[item.brand] = []
                    }
                    phones.value[item.brand].push({
                        title: item.displayName,
                        href: `/repairs/${item.phoneid}`
                    })
                }
            })
            .catch((e) => {
                console.log('error', e)
            })
    })
</script>

<template>
    <!-- TODO: Footer will hold various rows, current one being a row to display links to all phone repaids, future second row to show google maps/deals & offers  -->
    <footer>
        <hr />
        <div class="row">
            <div class="column center footer-social">
                <!-- social -->
                <img src="/img/logo.png" alt="" />
                <!-- <h4>Phone repairs done quickly.</h4> -->
                <div id="footer-social-links">
                    <!-- <span id="followon">Follow us on:</span> -->
                    <div class="social-links">
                        <div class="social">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                                <path
                                    d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"
                                ></path>
                            </svg>
                        </div>
                        <div class="social">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-twitter"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                                />
                            </svg>
                        </div>
                        <div class="social">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-facebook"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                                />
                            </svg>
                        </div>
                        <div class="social">
                            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.005 22l1.352-4.968A9.953 9.953 0 0 1 2.001 12c0-5.523 4.477-10 10-10ZM8.593 7.3l-.2.008a.961.961 0 0 0-.372.1a1.293 1.293 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.73 2.73 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.97 2.742c.214.213.424.427.65.626a9.448 9.448 0 0 0 3.84 2.046l.568.087c.185.01.37-.004.556-.013a1.99 1.99 0 0 0 .833-.231a4.83 4.83 0 0 0 .383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288c.083-.086.155-.187.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.497.497 0 0 0-.176-.041a.482.482 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13a1.43 1.43 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6.025 6.025 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.297 6.297 0 0 1-1.02-1.268l-.059-.095a.923.923 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41c.11-.14.203-.276.263-.373c.118-.19.155-.385.093-.536c-.28-.684-.57-1.365-.868-2.041c-.059-.134-.234-.23-.393-.249c-.054-.006-.108-.012-.162-.016a3.385 3.385 0 0 0-.403.004l.201-.008Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="column row"></div> -->
            <!-- <div class="column repairs" style="border: 2px solid blue"> -->
            <div class="column links">
                <!-- <div class="phoneGroup" v-for="(brand, key) in phones" :key="brand">
                    <h3>{{ key }} Repairs</h3>
                    <div class="phones">
                        <a class="phoneItem" v-for="phone in brand" :key="phone" :href="phone.href">{{ phone.title }}</a>
                    </div>
                </div> -->
                <div class="link-group">
                    <h3>Useful Links</h3>
                    <ul>
                        <li><a href="">Pricing</a></li>
                        <li><a href="">Identify Your Phone</a></li>
                        <li><a href="">Support and FAQ</a></li>
                        <li><a href="">Contact Us</a></li>
                    </ul>
                </div>
                <div class="link-group">
                    <h3>Our Services</h3>
                    <ul>
                        <li><a href="">iPhone Repair</a></li>
                        <li><a href="">Samsung Galaxy Repair</a></li>
                        <li><a href="">Google Pixel Repair</a></li>
                        <li><a href="">One Plus Repair</a></li>
                        <li><a href="">Screen Protectors</a></li>
                        <li><a href="">Protective Cases</a></li>
                    </ul>
                </div>
                <div class="link-group">
                    <h3>Fixit Fast</h3>
                    <ul>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Locations</a></li>
                        <li><a href="">Warranty</a></li>
                        <li><a href="">Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
            <div class="column location center">
                <!-- <h3>Where to find us</h3> -->
                <!-- <h3>Location</h3> -->
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <br />
                    123 Melbourne Highway,<br />Melbourne, Victoria 3000
                </p>
                <br />
                <br />
                <!-- <h3>Call Us</h3> -->
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                        />
                    </svg>
                    <br />
                    03 1234 5678
                </p>
            </div>
        </div>

        <hr />

        <div class="row thin">
            <div id="copyright">
                <div>Copyright © 2023 Fixit Fast Repairs</div>
                <!-- <img src="/img/logo.PNG" alt="" /> -->
                <div id="copyright-links">
                    <a href="">Terms Of Use</a>
                    <a href="">Privacy Policy</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    * {
        /* border: 1px solid lime; */
    }

    .link-group {
    }

    .column.location {
        text-align: center;
        max-width: 350px;
    }

    .column.location p {
        /* display: flex; */
        /* align-items: center; */
        /* padding: 5px; */
    }
    .column.location svg {
        margin: 0 10px;
        color: black;
    }
    .column.location p {
        font-size: 16px;
        color: grey;
    }

    h3 {
        font-weight: bold;
        font-size: 18px;
        color: #1696d7;
        color: #0083b5;
        color: black;
    }
    .link-group ul {
        list-style: none;
        padding-inline-start: 0;
        font-size: 14px;
    }
    .link-group ul li {
        padding: 0;
    }
    .link-group a {
        color: grey;
    }
    footer .row {
        display: flex;
        /* max-width: 1200px; */
        justify-content: center;
        padding: 100px 15px;
        flex-wrap: wrap;
    }
    footer .row.thin {
        padding: 25px;
    }
    #followon {
        width: 100%;
        text-align: center;
    }
    .column {
        flex-shrink: 0;
        flex-grow: 1;
    }
    .column.links {
        /* max-width: 250px; */
        /* flex: 1; */
        display: flex;
        justify-content: space-evenly;
        max-width: 900px;
        min-width: 500px;
        /* margin: 0 25px; */
    }
    .column.center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .footer-social {
        text-align: center;
        max-width: 350px;
    }
    .footer-social img {
        margin: 5px;
    }
    #footer-social-links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5px;
        /* margin-bottom: 25px; */
    }
    .social-links {
        display: flex;
        justify-content: center;
        /* padding: 25px; */
        gap: 5px;
    }

    .social {
        border-radius: 50%;
        background-color: #1696d7;
        background-color: #fff;
        width: 55px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;

        color: #24363d;
        border: 3px solid #0083b5;
        padding: 12px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    .social:hover {
        background-color: #0083b5;
        /* color: #0083b5; */
    }
    .social:hover svg {
        color: white;
    }
    #copyright {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
        color: grey;
    }
    #copyright-links {
        width: 225px;
        display: flex;
        justify-content: space-evenly;
    }
    #copyright a {
        text-decoration: underline;
        text-underline-offset: 5px;
        color: grey;
    }
    footer a:hover,
    #copyright a:hover {
        color: #0083b5;
        /* color: black; */
    }
    img {
        width: 150px;
    }
    hr {
        /* margin: 50px 0; */
    }
    * {
        /* border: 1px solid fuchsia; */
    }
    h3 {
        /* text-align: center;
        padding: 10px;
        font-weight: 900;
        font-size: 28px;
        color: black;
        width: 50%; */
        text-align: left;
        padding: 5px 0;
    }
    footer {
        font-size: 12px;

        padding: 25px;
        padding-bottom: 0;
        width: 100%;
        min-height: 350px;
        /* max-width: 90vw; */
        margin: 0 auto;
        /* margin-top: 50px; */
        background-color: #0083b5;
        background-color: #001861;
        background-color: #fff;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-between;
        flex-wrap: wrap; */
    }

    .repairs {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        gap: 50px;
    }
    .phoneGroup {
        width: 100%;
        max-width: 450px;
        /* margin: 0 auto; */
    }
    .phones {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        /* margin: 0 50px; */
        max-height: 400px;

        width: 50%;
    }
    .phoneItem {
        color: white;
        color: grey;
        /* margin: 0 10px; */
        text-align: left;
        transition: all 250ms ease-in-out;
    }
    .phoneItem:hover {
        color: black;
        font-weight: bold;
    }
    @media only screen and (max-width: 350px) {
        .phones {
            max-height: none;
        }
    }

    .column {
        margin: 25px 0;
    }

    @media only screen and (max-width: 1110px) {
        .column.footer-social {
            max-width: none;
            flex-grow: 1;
            width: 100%;
            /* margin-bottom: 50px; */
        }
    }
    @media only screen and (max-width: 650px) {
        .column.links {
            flex-direction: column;
            min-width: 0;
            width: 100%;
        }
        .link-group,
        h3 {
            max-width: none;
            text-align: center;
        }
        footer .row {
            padding: 25px 0;
        }
        .link-group {
            margin: 10px 0;
        }
        #copyright {
            flex-direction: column;
            justify-content: space-evenly;
            gap: 10px;
        }
    }
</style>
