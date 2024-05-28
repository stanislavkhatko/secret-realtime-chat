<template functional>
    <footer class="c-footer">
        <div class="c-footer__content">
            <div class="c-footer__center">
                Made with <ion-icon name="heart" class="c-footer__icon-heart"></ion-icon> by &nbsp;
                <a href="https://stanislavkhatko.github.io" class="c-footer__link" target="_blank"
                    >Stanislav Khatko</a
                >, &copy;
                {{ new Date().getFullYear() }}
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/footer.scss';
</style>
