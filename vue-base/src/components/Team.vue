<template>
  <div class="container">
      <img v-bind:src="team.crestUrl"/>Team {{team.name}}
      <div v-if="players!=null && players.length >0">
        <bf-table :data="players" :columns="columns"></bf-table>
      </div>
      <div v-else>No player  information available </div>
  </div>
</template>
<script>
import TeamService from '../services/Team'

export default {
  name: 'Team',
  props: {
      id: Number
  },
  computed : {
      
  },
  mounted () {
    TeamService.getTeam(this.id).then((data=>
    {
        this.team=data
    }))
  },
  created: function() {
   
  },
  data () {
    return {
      team: {},
      players: [],
      columns : [
          {
            field: 'jerseyNumber',
            label: 'Number',
            width: '40',
            numeric: true,
            sortable: true
          },
          {
            field: 'name',
            label: 'First Name',
            sortable: true
          },
          {
              field: 'position',
              label: 'Position',
              sortable: true
          },
          {
            field: 'dateOfBirth',
            label: 'Birthday',
            sortable: true
          },
          {
            field: 'nationality',
            label: 'nationality',
            sortable: true
          } 
      ]
    }
  },
  watch: {
    team: function (val) {
        TeamService.getPlayers(this.team).then((data) => this.players = data.players)
    }
  },
  methods: {
   
  }
}
</script>
<style scoped>
.container div {
    margin-top:20px
}
img {
    width: 150px;
    height: 150px;
}
.card {
    border-spacing: 20px 5px
}
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
