import Vue from 'vue'

const LeagueService = {
  getAvailableLeagues: getAvailableLeagues,
  getLeague: getLeague
}

function getAvailableLeagues () {
  return Vue.http
    .get('https://api.football-data.org/v1/competitions')
    .then(data => data.body)
}

/**
 * return information on the league.
 * @param {Promise} league 
 */
function getLeague (league) {
  return Vue.http.get(league._links.teams.href).then(data => data.body)
}

export default LeagueService
