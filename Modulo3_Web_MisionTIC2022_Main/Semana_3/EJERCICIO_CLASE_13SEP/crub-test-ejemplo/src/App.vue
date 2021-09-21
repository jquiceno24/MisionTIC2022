<template>
  <div id="app">
    <div>
      <h3>Probemos tu aritmetica</h3>
      <p>¿Cuál es la suma de los dos números?</p>
      <div class="inline">
        <p>{{ x1 }} + {{ x2 }} =</p>
        <input v-model="guess" />
        <button v-on:click="check">Checkar Respuesta</button>
      </div>
      <button v-on:click="refresh">Actualizar</button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      x1: Math.ceil(Math.random() * 100),
      x2: Math.ceil(Math.random() * 100),
      guess: "",
      message: "",
    };
  },
  methods: {
    check() {
      if (this.x1 + this.x2 === parseInt(this.guess)) {
        this.message = "CORRECTO!";
      } else {
        this.message = "INTENTELO NUEVAMENTE";
      }
    },
    refresh() {
      this.x1 = Math.ceil(Math.random() * 100);
      this.x2 = Math.ceil(Math.random() * 100);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.inline * {
  display: inline-block;
}
img {
  height: 350px;
}
</style>
