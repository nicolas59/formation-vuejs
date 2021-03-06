import Vue from 'vue'

const TeamService = {
  getTeam: getTeam,
  getPlayers: getPlayers,
  getFixtures: getFixtures
}

function getTeam (id) {
  return Vue.http
    .get(`http://api.football-data.org/v1/teams/${id}`)
    .then(data => data.body)
}

function getPlayers (team) {
  return Vue.http
    .get(team._links.players.href)
    .then(data => data.body)
}

function getFixtures (team) {
  return Vue.http
    .get(team._links.fixtures.href)
    .then(data => data.body)
}

export default TeamService
