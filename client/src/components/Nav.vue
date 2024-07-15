<script setup>
    import { onMounted, onUpdated, ref, watch } from 'vue'
    import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

    const dropdown = ref(false)

    const accountDropdownActive = ref(false)

    //TODO: put all links into an array so that i can dupe it twice

    const router = useRouter()
    const route = useRoute()

    watch(route, () => {
        // Close hamburger when route changes
        dropdown.value = false
    })

    // Custom Directives to clean up authentication checks
    const vIfAuthed = {
        updated: async (el, binding) => {
            await router.isReady()
            const userData = route.meta['userData']
            if (!!userData != binding.value) {
                el.style.display = 'none'
            } else {
                el.style.display = 'block'
            }
        }
    }

    const vIfAdmin = {
        updated: async (el, binding) => {
            await router.isReady()
            const userData = route.meta['userData']
            if (!userData || userData.authLevel < binding.value) {
                el.style.display = 'none'
            } else {
                el.style.display = 'block'
            }
        }
    }
</script>

<template>
    <div class="hamburger" @click="dropdown = !dropdown">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
        </svg>
    </div>
    <div :class="['nav', dropdown ? 'dropdown' : '']">
        <a id="full-logo" href="/">
            <img src="/img/logo.png" alt="" />
        </a>
        <a id="min-logo" href="/">
            <img src="/img/icononly.png" alt="" />
        </a>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/repairs">Pricing</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink> -->
        <RouterLink to="/contact">Support</RouterLink>

        <div id="dropdown-content">
            <hr />
            <RouterLink v-if-authed="false" to="/account/login">Login</RouterLink>
            <RouterLink v-if-authed="false" to="/account/register">Register</RouterLink>
            <RouterLink v-if-authed="true" to="/account/dashboard">My Account</RouterLink>
            <RouterLink v-if-admin="2" to="/admin/dashboard">Admin Panel</RouterLink>
            <RouterLink v-if-authed="true" to="/account/logout">Logout</RouterLink>
        </div>

        <div id="account">
            <RouterLink to="/account/dashboard"
                >Account
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
            </RouterLink>
            <div id="account-dropdown">
                <RouterLink v-if-authed="false" to="/account/login">Login</RouterLink>
                <RouterLink v-if-authed="false" to="/account/register">Register</RouterLink>
                <RouterLink v-if-authed="true" to="/account/dashboard">My Account</RouterLink>
                <RouterLink v-if-admin="2" to="/admin/dashboard">Admin Panel</RouterLink>
                <RouterLink v-if-authed="true" to="/account/logout">Logout</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .router-link-active {
        color: #0083b5 !important;
        text-decoration: underline;
        text-underline-offset: 8px;
        font-weight: bold !important;
    }

    #dropdown-content {
        display: none;
    }
    #accountmenu {
        justify-content: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #account {
        /* position: relative; */
        /* width: 150px; */
        /* background-color: #0083b5; */
        /* padding: 15px; */
    }
    #account svg {
        margin-left: 5px;
    }
    #account a {
        width: 100%;
        text-align: center;
        margin: 0;
        width: 150px;
        background-color: white;
        z-index: 4;
    }
    #account #account-dropdown {
        display: none;
        position: absolute;
        /* left: 50%; */
        /* transform: translateX(-50%); */
        /* background-color: #d9f4ff; */
        border-radius: 4px;
        /* border: 1px solid black; */
        z-index: 1;

        box-shadow: -1px 7px 21px -2px rgba(0, 0, 0, 0.44);
        -webkit-box-shadow: -1px 7px 21px -2px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: -1px 7px 21px -2px rgba(0, 0, 0, 0.44);
    }
    #account:hover #account-dropdown {
        display: block;
    }
    /* #account:hover {
        background-color: #0083b5;
    } */

    #account #account-dropdown a {
        /* width: 150px; */
        text-align: center;
        /* margin: 15px 0; */
        /* padding: 15px; */
        /* color: white; */
    }
    * {
        /* border: 1px solid lime; */
    }
    .nav {
        padding: 25px;
        transition: all 0.5s ease-in-out;
        user-select: none;
        display: flex;
        align-items: center;
        position: unset;
    }

    #min-logo {
        display: none;
    }
    #min-logo img {
        width: 75px;
    }
    .nav img {
        width: 150px;
        /* margin-right: 25px; */
    }
    .nav a {
        font-weight: 500;
        font-size: 16px;
        color: #0083b5;
        color: black;
        display: flex;
        align-items: center;
        /* padding: 10px 0; */
        padding: 15px 5px;
    }

    .nav a:hover {
        color: black;
        text-decoration: underline;
    }
    .nav a {
        margin-right: 35px;
    }
    .hamburger {
        display: none;
        justify-content: flex-start;
        padding: 15px;
        width: 100%;
    }
    .hamburger svg {
        cursor: pointer;
    }
    .hamburger svg:hover {
        color: #0083b5;
    }
    @media (max-width: 850px) {
        #full-logo {
            display: none;
        }
        #min-logo {
            display: block;
        }
    }
    @media (max-width: 700px) {
        #dropdown-content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
        }
        #account {
            display: none;
        }
        #min-logo {
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
        }
        #min-logo img {
            padding: 10px;
        }
        .hamburger {
            display: flex;
        }
        .nav {
            /* margin-top: 25px; */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            /* text-decoration: underline; */
            width: 100%;
            text-align: center;
            height: 0;
            overflow: hidden;
            padding: 0;
            /* display: none; */
        }
        .nav a {
            /* width: fit-content; */
            font-size: 28px;
            margin: 10px 0;
            padding: 0;
        }
        #min-logo {
            margin: 0;
        }
        .nav.dropdown {
            height: calc(100vh - 100px);
        }
    }
</style>
