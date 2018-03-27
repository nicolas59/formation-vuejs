<template>
  <div class="container">
       <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                :interval="4000"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
        <b-carousel-slide v-for="(item, index) in teams" :text="item.name"
                             :key="index" >
            <img slot="img" class="img-fluid" width="25%" height="25%"
             :src="item.crestUrl" alt="image slot">
        </b-carousel-slide>
       </b-carousel>
       <bf-tabs type="is-boxed">
            <bf-tab-item label="Players">
                <div v-if="players!=null && players.length >0">
                    <bf-table :data="players" :columns="columns"></bf-table>
                </div>
                <div v-else>No player  information available </div>
            </bf-tab-item>
            <bf-tab-item label="Score">
                <div v-if="fixtures!=null && fixtures.length >0">
                    <bf-table :data="fixtures">
                    <template slot-scope="props">
                        <bf-table-column field="date" label="date" sortable>
                            {{ props.row.date }}
                        </bf-table-column>
                         <bf-table-column field="status" label="status" sortable>
                            {{ props.row.status }}
                        </bf-table-column>
                           <bf-table-column field="matchday" label="matchday" sortable>
                            {{ props.row.matchday }}
                        </bf-table-column>
                          <bf-table-column field="homeTeamName" label="homeTeamName" sortable>
                            {{ props.row.homeTeamName }}
                        </bf-table-column>
                          <bf-table-column field="awayTeamName" label="AwayTeamName" sortable>
                            {{ props.row.awayTeamName }}
                        </bf-table-column>
                        <bf-table-column field="Score" label="Score">
                            {{ props.row.result.goalsHomeTeam }} - {{ props.row.result.goalsAwayTeam }}
                        </bf-table-column>
                        <bf-table-column field="StatusScore" label="StatusScore">
                            {{ getScoreStatus(props.row) }}
                        </bf-table-column>
                    </template>
                    </bf-table>
                </div>
                <div v-else>No fixture  information available </div>
            </bf-tab-item>
        </bf-tabs>
  </div>
</template>
<script>
import TeamService from '../services/Team'
import LeagueService from '../services/League'

export default {
  name: 'Team',
  props: ["id", "leagueId"],
  computed : {
      
  },
  mounted () {
    TeamService.getTeam(this.id).then((data=>
    {
        this.team=data
        this.teams = [this.team]
    }))
    
    LeagueService.getLeagueById(this.leagueId)
        .then(payload => this.teams = payload.teams)
  },
  created: function() {
   
  },
  data () {
    return {
      slide : null,
      teams : [],
      team: {},
      players: [],
      fixtures: [],
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
      ],
      sliding : false
    }
  },
  watch: {
    team: function (val) {
        TeamService.getPlayers(this.team).then((data) => this.players = data.players)
        TeamService.getFixtures(this.team).then((data) => this.fixtures = data.fixtures)
    },
    '$route': function (to, from) {
        this.players = []
        this.fixtures = []
         TeamService.getTeam(this.id).then((data=>
    {
        this.team=data
        this.teams = [this.team]
    }))
    
    LeagueService.getLeagueById(this.leagueId)
        .then(payload => this.teams = payload.teams)
    },
    slide : function (val) {
        if(!this.sliding){
            const team = this.teams[val]
            const teamId = team._links.self.href.substr(team._links.self.href.lastIndexOf("/") +1);
            this.$router.push({ path: `/league/${this.leagueId}/team/${teamId}` })
        }       
    }
  },
  methods: {
   getScoreStatus : function (fixture) {
       const teamScore = fixture.homeTeamName === this.team.name ? fixture.result.goalsHomeTeam : fixture.result.goalsAwayTeam 
       const otherTeamScore = fixture.homeTeamName !== this.team.name ? fixture.result.goalsHomeTeam : fixture.result.goalsAwayTeam
       return teamScore === otherTeamScore ? "NUL" : (teamScore > otherTeamScore ? "WIN" : "LOST")
   }, 
   onSlideStart : function (slide) {
      this.sliding = true
    },
    onSlideEnd : function (slide) {
      this.sliding = false
    }
  }
}
</script>
<style scoped>
.container div {
    margin-top:20px
}


img.w-100{
    width: 25% !important;
    height: 25% !important;
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
