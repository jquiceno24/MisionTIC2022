import { mount } from "@vue/test-utils";
import App from "./../src/App.vue";

describe("App", () => {
  // Inspect the raw component options
  it("tiene datos", () => {
    expect(typeof App.data).toBe("function");
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  test("es una instancia de vue", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  it("presenta el marcado correcto", () => {
    expect(wrapper.html()).toContain("¿Cuál es la suma de los dos números?");
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  it("tiene un boton", () => {
    expect(wrapper.contains("button")).toBe(true);
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);
  it("se renderiza correctamente con diferentes datos", async () => {
    wrapper.setData({ x1: 5, x2: 10 });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("10");
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);
  it("haga clic en el boton si la suma es correcta", () => {
    expect(wrapper.vm.message).toBe("");
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.message).toBe("INTENTELO NUEVAMENTE");
  });
});
