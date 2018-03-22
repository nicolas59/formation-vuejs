<template>
  <div class="container-fluid">
    <h1 v-bind:title="msgHover">{{ msg }}</h1>

    <form>
     <b-form-group label="Saisier un nombre">
       <b-form-input v-model="nombre" placeholder="Valeur"/>
     </b-form-group>
    </form>
    <div v-if="nombre>0"> Nombre positif</div>
    <div v-else-if="nombre<0"> Nombre négatif</div>
    <div v-else>C'est zéro</div>
  </div>
</template>
<script>

export default {
  name: 'Nombre',
  components : {
    League
  },
  mounted () {
   
  },
  data () {
    return {
      nombre: 0
    }
  },
  watch: {
  
  },
  methods: {
   
  }
}
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
