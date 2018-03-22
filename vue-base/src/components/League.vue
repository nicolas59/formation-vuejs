<template>
  <div class="football">
      <b-form-group>
        <b-form-select :options="leagues" text-field="caption" v-model="selectedLeague" value-field="id">
        </b-form-select>
      </b-form-group>
<b-card-group column v-for="(item, index) in getSplittedTeams(teams, cols)" v-bind:key="index" >
    <b-card v-for="(team, id) in item" v-bind:key="id" v-bind:img-src="team.crestUrl" v-bind:title="team.name" 
        :style="{ maxWidth: maxWidth }" v-on:click="showTeam(team)"
        >
    </b-card>
</b-card-group>
  </div>
</template>
<script>
import LeagueService from '../services/League'

export default {
  name: 'League',
  props: {
      cols: Number
  },
  computed : {
    maxWidth: function ()  {
        return 100/this.cols;
    }
  },
  mounted () {
    // chargement des leagues
     LeagueService.getAvailableLeagues().then(payload => {
        this.leagues = payload
      })
  },
  data () {
    return {
      leagues: [],
      teams: [],
      selectedLeague: 0
    }
  },
  watch: {
    selectedLeague: function (val) {
      const league = this.leagues.filter(item => item.id === val)[0]
      LeagueService.getLeague(league)
        .then(payload => (this.teams = payload.teams))
    }
  },
  methods: {
      showTeam : function (item)  {
          const teamId = item._links.self.href.substr(item._links.self.href.lastIndexOf("/") +1);
          this.$router.push({ path: `/team/${teamId}` })
      },
    getSplittedTeams: (items, numberCols) => {
      if (items === undefined) {
        return []
      }
      var result = []
      var stack = []
      items.forEach((element, index) => {
        if (index !== 0 && index % numberCols === 0) {
          result.push(stack)
          stack = []
        }
        stack.push(element)
      })

      result.push(stack)
      return result
    }
  }
}
</script>
<style scoped>
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
