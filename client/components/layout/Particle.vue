<template>
<!--    <div v-bind:id="this.name" class="particle"></div>-->
<!--  <Particles id="test" :options="{}"></Particles>-->
</template>

<script>
// import Particles from "@tsparticles/vue2";

import particleConfig from '@/assets/config/particlesjs-config.json';

export default {
    name: 'Particle',
    props: ['name'],
    // components: {Particles},
    data: function () {
        return {
            id: this.name,
        };
    },
    methods: {
        initParticleJS() {
            // window.particlesJS(this.id, particleConfig);
        },
    },
    mounted() {
        // this.initParticleJS();
    },
};
</script>
