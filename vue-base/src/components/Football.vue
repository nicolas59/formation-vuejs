<template>
  <div class="container container-fluid">
    <League cols="3"></League>
  </div>
</template>
<script>
import League from './League'

export default {
  name: 'Football',
  components : {
    League
  },
  mounted () {
   
  },
  data () {
    return {
     
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
