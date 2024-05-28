// import { shallowMount } from "@vue/test-utils";
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

describe('Home.vue', () => {
    it('Should have a mounted lifecycle hook', () => {
        expect(typeof Home.mounted).toBe('function');
    });
});

describe('About.vue', () => {
    it('Should have a mounted lifecycle hook', () => {
        expect(typeof About.mounted).toBe('function');
    });
});
