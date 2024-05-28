<template>
    <transition name="slideLeft" mode="out-in">
        <div v-if="visible" class="c-sidebar">
            <div class="c-sidebar__header">
                <slot name="header">
                    <h4>Default Header</h4>
                </slot>
            </div>
            <div class="c-sidebar__body">
                <slot name="body"></slot>
            </div>
            <div class="c-sidebar__footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Sidebar',
    data: function () {
        return {
            visible: window.innerWidth >= 768,
        };
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.c-sidebar {
    height: 100%;
    position: fixed;
    left: 0;
    background: var(--background-color);
    width: 300px;
    overflow: auto;
    display: flex;
    flex-flow: column;
    transition: all 0.5s ease;
    z-index: 10;

    &__header {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        margin: 0 1rem;
        border-bottom: 1px solid var(--text-color);
    }

    &__body {
        height: auto;
        overflow-y: auto;
        overflow-x: hidden;
        margin-bottom: 20px;
    }

    &__footer {
        height: auto;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-bottom: 85px;
        z-index: 3;
        padding-bottom: 20px;
    }
}
</style>
