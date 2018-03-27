import Vue from 'vue'

const LeagueService = {
  getAvailableLeagues: getAvailableLeagues,
  getLeague: getLeague,
  getLeagueById: getLeagueById
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

function getLeagueById (leagueId) {
  console.log(`http://api.football-data.org/v1/competitions/${leagueId}/teams`)
  return Vue.http.get(`http://api.football-data.org/v1/competitions/${leagueId}/teams`).then(data => data.body)
}

export default LeagueService
