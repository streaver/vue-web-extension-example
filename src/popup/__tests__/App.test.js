import { shallowMount } from '@vue/test-utils';
import App from './../App.vue';

describe('Popup', () => {
  describe('initial state', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallowMount(App);
    });

    it('shows welcome message', () => {
      const header = wrapper.find('h1');

      expect(header.exists()).toBe(true);
      expect(header.text()).toBe("Hi there! 👋 Hope you're doing great!");
    });

    it("displays 'Do the magic!' button", () => {
      const mainButton = wrapper.find('button');

      expect(mainButton.exists()).toBe(true);
      expect(mainButton.text()).toBe('Do the magic!');
    });

    it('displays all radio buttons for changing body color unchecked', () => {
      const radiosContainer = wrapper.find('.body-color-radios');
      let radios = radiosContainer.findAll('input');

      expect(radios).toHaveLength(3);

      radios = radios.filter(radio => radio.checked);
      expect(radios).toHaveLength(0);
    });

    it('displays all radio buttons for changing popup body color unchecked', () => {
      const radiosContainer = wrapper.find('.popup-body-color-radios');
      let radios = radiosContainer.findAll('input');

      expect(radios).toHaveLength(3);

      radios = radios.filter(radio => radio.checked);
      expect(radios).toHaveLength(0);
    });
  });
});
