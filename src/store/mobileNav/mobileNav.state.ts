import { ref } from "vue";

export const mobileNavState = ref(false);

export const mobileNavActions = {
  openMobileNav: () => {
    mobileNavState.value = !mobileNavState.value;
  },
  closeMobileNav: () => {
    mobileNavState.value = false;
  },
};
