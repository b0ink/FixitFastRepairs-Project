<script setup></script>

<template>
    <div class="intro">
        <div class="text">
            <h1>Fixit Fast Repairs</h1>
            <h2>We do phone repairs.<br />Quickly.</h2>
            <div class="buttons">
                <a id="pricing" href="/repairs">Pricing</a>
                <a id="contact" href="/contact">Contact Us</a>
            </div>
        </div>
        <img src="/img/iPhone/iPhone14Plus.jpg" alt="" />
    </div>
</template>

<style>
    * {
        /* border: 1px solid lime; */
    }
    .buttons {
        display: flex;
        justify-content: flex-start;
        margin-top: 15px;
        gap: 15px;
    }

    #pricing {
        border-color: #04d300;
        /* margin-right: 10px; */
    }

    #contact {
        border-color: #0083b5;
        /* margin-left: 10px; */
    }

    .buttons a {
        border-radius: 5px;
        border: 3px solid;
        height: 50px;
        width: 100%;
        max-width: 250px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 18px;
        font-weight: 700;

        color: black;
    }

    .intro {
        max-width: 1200px;
        margin: 0 auto;
        height: calc(100vh - 100px);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        padding: 25px;
    }
    .intro h1 {
        font-size: 50px;
        font-weight: 900;
        line-height: normal;
    }
    .intro h2 {
        font-size: 35px;
        font-weight: 500;
    }
    .intro img {
        width: 50%;
        height: auto;
        max-width: 300px;
        margin-left: 50px;
    }

    .text {
        /* min-width: 400px; */
        text-align: left;
    }
    @media only screen and (max-width: 850px) {
        .intro {
            flex-direction: column-reverse;
        }
        .intro img {
            max-width: 150px;
            margin: 50px 0;
        }
    }

    @media only screen and (max-width: 700px) {
        .text {
            text-align: center;
        }
        .buttons {
            flex-direction: column;
            width: 100%;
            align-items: center;
        }
        .buttons a {
            width: 100%;
        }
    }
    @media only screen and (max-width: 550px) {
        .intro img {
            display: none;
        }
        .intro h2 {
            font-size: 25px;
        }
    }
    @media only screen and (max-width: 300px) {
        .intro h1 {
            font-size: 38px;
        }
        .intro h2 {
            font-size: 20px;
        }
    }
</style>
