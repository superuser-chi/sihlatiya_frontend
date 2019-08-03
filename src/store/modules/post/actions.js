// https://vuex.vuejs.org/en/actions.html

import axios from 'axios'
let headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export default {

  getPostsFromApi({
    commit
  }) {
    axios.get('/api/post/', {
        headers: headers
      })
      .then((response) => {
        commit('UPDATE_POSTS', response.data.data)
      })
  },
  getPostsBycategoryFromApi({
    commit
  }, filter) {
    axios.get('/api/post/' + filter, {
        headers: headers
      })
      .then((response) => {
        let post_list = []
        response.data.data.forEach(post => {
          post_list.push({
            title: post.title,
            category: post.category,
            contents: post.contents,
            public_id: post.public_id,
            ticked: false,
            edit: false,
            inputErrors: {
              title: undefined,
              contents: undefined
            }
          })
        })
        commit('UPDATE_POSTS', post_list)
      })
  },
  savePostToApi({
    commit
  }, post) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/post/', post, {
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
  updatePostFromApi({
    commit
  }, post) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/post/' + post.public_id, post, {
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
  deletePostFromApi({
    commit
  }, post) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/api/post/' + post, {
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
  removePosts({
    commit
  }) {
    let newPosts = []
    commit('UPDATE_POSTS', newPosts)

  }
}
