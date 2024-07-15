<script setup>
    import { markRaw, onMounted, ref, shallowRef, triggerRef, inject } from 'vue'

    import Breadcrumbs from '../../components/Breadcrumbs.vue'

    import RepairOption from '../../components/RepairOption.vue'

    import Screen from '../../components/icons/Screen.vue'
    import Battery from '../../components/icons/Battery.vue'
    import FrontCamera from '../../components/icons/FrontCamera.vue'
    import BackCamera from '../../components/icons/BackCamera.vue'
    import ChargingPort from '../../components/icons/ChargingPort.vue'
    import Speaker from '../../components/icons/Speaker.vue'
    import Housing from '../../components/icons/Housing.vue'
    import HomeButton from '../../components/icons/HomeButton.vue'

    // import Vibration from '../../components/icons/Vibration.vue'

    const props = defineProps(['phone'])

    // must follow SQL schema
    const repairs = shallowRef({
        screen: { title: 'Screen', price: 0, icon: Screen },
        battery: { title: 'Battery', price: 0, icon: Battery },
        frontcamera: { title: 'Front Camera', price: 0, icon: FrontCamera },
        backcamera: { title: 'Back Camera', price: 0, icon: BackCamera },
        chargingport: { title: 'Charging Port', price: 0, icon: ChargingPort },
        speaker: { title: 'Speaker', price: 0, icon: Speaker },
        housing: { title: 'Housing', price: 0, icon: Housing },
        homebutton: { title: 'Home Button', price: 0, icon: HomeButton }
    })

    const selectedRepair = ref(null)
    const onRepairOptionClick = (repair, key) => {
        console.log(repair, key)
        selectedRepair.value = {
            ...repair,
            key
        }
        // price.value.innerHTML = `$${e.price}`
    }

    onMounted(() => {
        // console.log(props.phone);

        // Parse repair options price from SQL row
        for (const [key, value] of Object.entries(props.phone)) {
            if (repairs.value[key]) {
                repairs.value[key].price = parseInt(value)
            }
        }

        // manually trigger the ref update as it doesnt like having the icons components in a ref
        triggerRef(repairs)
    })
</script>

<template>
    <main>
        <Breadcrumbs :stage="2" />
        <h1>Select your {{ props.phone.displayName || 'Phone' }} Repair</h1>
        <div class="container">
            <!-- phone picture -->
            <div class="col" id="phonebox">
                <img :src="'/img/' + props.phone.imgSrc" alt="" />
            </div>

            <!-- repair options -->
            <div class="col" id="repairbox">
                <!-- <div class="spacer" style="height: 50px"></div> -->
                <div id="repairoptions">
                    <RepairOption v-for="(value, key) in repairs" :repair="value" :key="key" @click="onRepairOptionClick(value, key)" />
                </div>
            </div>

            <!-- price/details -->
            <div class="col" id="priceContainer">
                <div id="pricebox">
                    <!-- <h3>{{ props.phone.displayName }} {{ selectedRepair ? selectedRepair.title + ' Repair' : '' }}</h3> -->
                    <h3>{{ selectedRepair ? selectedRepair.title + ' Repair' : 'Select a repair' }}</h3>
                    <div id="price" ref="price">{{ selectedRepair ? `$${selectedRepair.price}` : '$-' }}</div>
                </div>
            </div>
        </div>
        <a
            id="bookingBtn"
            :class="[!selectedRepair || !selectedRepair.key ? 'disabled' : '']"
            :href="`/booking/${props.phone.phoneid}/${selectedRepair ? selectedRepair.key : ''}`"
            >Create booking</a
        >
    </main>
</template>

<style scoped>
    main {
        margin-bottom: 50px;
    }
    * {
        /* border: 1px solid lime; */
    }
    h1 {
        text-align: center;
    }

    #bookingBtn {
        text-align: center;
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
        height: 50px;
        border: 2px solid #0083b5;
        background-color: white;
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 250ms ease-in-out;
        /* color: black; */
        color: #0083b5;
        font-weight: bold;
    }

    #bookingBtn.disabled {
        pointer-events: none;
        cursor: default;
        border: 1px solid grey;
        color: grey;
        font-weight: normal;
    }

    #bookingBtn:hover {
        background-color: #0083b5;
        color: white;
    }

    #repairoptions {
        width: 100%;
        /* background-color: #f8f8f8; */
        min-height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        border: 1px solid #ddd;
        /* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); */
        border-radius: 10px;
    }

    #pricebox {
        width: 75%;
        max-width: 300px;
        min-height: 200px;
        background-color: #f8f8f8;
        box-shadow: 0px 7px 18px -3px rgba(0, 0, 0, 0.47);
        -webkit-box-shadow: 0px 7px 18px -3px rgba(0, 0, 0, 0.47);
        -moz-box-shadow: 0px 7px 18px -3px rgba(0, 0, 0, 0.47);
        border-radius: 10px;
        padding: 25px;
        margin: 0 auto;
        /* margin: 50px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #pricebox h3 {
        text-align: center;
        font-weight: bold;
        font-size: 24px;
    }

    #price {
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        color: rgb(0, 188, 0);
    }

    img {
        width: 100%;
        /* max-height: 400px; */
        max-width: 300px;
        margin: 10px auto;
    }
    .container {
        display: flex;
        flex-direction: row;
        /* flex-wrap: wrap; */
        width: 100%;
        max-width: 1300px;
        margin: 50px auto;
        /* min-height: calc(100vh - 250px); */
    }
    .col {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #phonebox {
        flex: 1;
        width: 25%;
    }

    #repairbox {
        flex: 2;
        width: 50%;
        padding: 25px;
        height: fit-content;
        align-self: center;
        max-width: 500px;
    }

    #priceContainer {
        flex: 1;
        width: 25%;
        /* padding: 50px; */
    }

    @media (max-width: 900px) {
        .container {
            flex-direction: column;
        }
        #repairbox {
            max-width: 750px;
        }
        #phonebox {
            width: 100%; /* Take up the full width */
            order: -1; /* Move .left to the top */
            /* flex-grow: 1; */
        }
        #phonebox img {
            width: 50%;
            max-width: 250px;
        }

        #repairbox,
        #priceContainer {
            width: 100%; /* Take up the full width */
            margin-top: 15px;
        }
    }
</style>
