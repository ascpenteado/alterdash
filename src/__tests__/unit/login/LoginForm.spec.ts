import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("LoginForm.vue", () => {
  const localVue = createLocalVue();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      localVue,
      vuetify: new Vuetify(),
    });
  });

  it("should render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have an input with email type", () => {
    const emailInput = wrapper.find("input[type='email']");
    expect(emailInput.exists()).toBe(true);
  });

  it("should have an input with password type", () => {
    const passwordInput = wrapper.find("input[type='password']");
    expect(passwordInput.exists()).toBe(true);
  });

  it("should have a Login button with type submit", () => {
    const loginButton = wrapper.find("button[type='submit']");
    expect(loginButton.exists()).toBe(true);
  });

  it("should call login method when form is submitted", async () => {
    const loginSpy = jest.spyOn(wrapper.vm, "login");
    await wrapper.find("form").trigger("submit");
    expect(loginSpy).toHaveBeenCalled();
  });
});
