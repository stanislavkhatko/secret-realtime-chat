<template>
    <ul class="navbar__nav navbar__nav--right">
        <li class="nav__item">
            <ToggleTheme />
        </li>
        <li class="nav__item">
            <router-link :to="{ name: 'RoomList' }" class="nav__link nav__link--rounded">Chat Rooms</router-link>
        </li>
        <li class="nav__item">
            <router-link
                v-if="Object.keys(this.user).length > 0"
                :to="{ name: 'UserProfile', params: { handle: this.user.handle } }"
                class="nav__link nav__link--rounded"
            >
                {{ this.user.handle }}
            </router-link>
        </li>
        <li class="nav__item">
            <a href="#" @click.prevent="logout" class="nav__link nav__link--btn nav__link--rounded">Logout</a>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import ToggleTheme from '@/elements/ToggleTheme.vue';

export default {
    name: 'SignedInLinks',
    components: { ToggleTheme },
    props: ['logout', 'user'],
    data: function () {
        return {};
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized']),
    },
    methods: {},
    created() {},
    mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/header';
</style>
