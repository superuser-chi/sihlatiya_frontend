// https://vuex.vuejs.org/en/actions.html

import axios from 'axios'
import {
  VueRouter as router
} from '../../../router/index';
let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export default {
  login({
    commit
  }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/login', user, {
          headers: headers
        })
        .then(
          response => {
            resolve(response)
            commit('UPDATE_USER', response.data)
            router.push('/dashboard')
          },
          error => {
            reject(error)
          }
        )
    })
  },
  register({
    commit
  }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/admin', user, {
          headers: headers
        })
        .then(
          response => {
            resolve(response)
            router.push('/dashboard')
          },
          error => {
            reject(error)
          }
        )
    })
  },
  register({
    commit
  }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/user', user, {
          headers: headers
        })
        .then(
          response => {
            resolve(response)
            router.push('/users')
          },
          error => {
            reject(error)
          }
        )
    })
  },
  update_admin({
    commit
  }, admin) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/admin/' + admin.username, admin, {
          headers: headers
        })
        .then(
          response => {
            resolve(response)
          },
          error => {
            reject(error)
          }
        )
    })
  },
  delete_user({
    commit
  }, phone) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/api/user/' + phone, {
          headers: headers
        })
        .then(
          response => {
            resolve(response)
          },
          error => {
            reject(error)
          }
        )
    })
  },
  send_messages({
    commit
  }, message) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/send-messages', message, {
          headers: headers
        })
        .then(
          response => {
            resolve(response)
            commit('UPDATE_USER', response.data)
          },
          error => {
            reject(error)
          }
        )
    })
  },
  get_users({
    commit
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/user', {
          headers: headers
        })
        .then(
          response => {
            commit('UPDATE_USERS', response.data)
            resolve(response)
          },
          error => {
            reject(error)
          }
        )
    })
  },
  removeUser({
    commit
  }) {
    let newUser = {
      authorization: undefined,
      public_id: undefined,
      physical_address: undefined,
      postal_address: undefined,
      firstname: undefined,
      username: undefined,
      lastname: undefined,
      about: undefined,
      email: undefined
    }
    commit('UPDATE_POSTS', newUser)
  }
}
