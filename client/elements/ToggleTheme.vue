<script>
export default {
  name: 'ToggleTheme',
  methods: {
    toggleTheme() {
      const theme = this.$store.state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      this.$store.dispatch('actionSetTheme', theme)
    },
  },
};
</script>

<template>
  <a href="#" title="Toggle a theme" class="c-toggle-theme" @click.prevent="toggleTheme">
    {{ }}
    <ion-icon
        style="font-size: 27px"
        class="icon--moon"
        :name="$store.state.theme === 'dark' ? 'moon' : 'moon-outline'"
    ></ion-icon>
  </a>
</template>

<style scoped lang="scss">
.c-toggle-theme {
  align-items: center;
  display: inline-flex;
}
</style>
