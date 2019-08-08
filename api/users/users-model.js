const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    add,
    login,
    remove,
    update,
    getUserDreams,
    getUserInfo
}

function get(id) {
    let users = db('users');
  
    if (id) {
      users.where({ id }).first();
  
      const promises = [users, this.getUserDreams(id), this.getUserInfo(id)]; 
  
      return Promise.all(promises).then(results => {
        let [user, dreams, userInfo] = results;
  
        if (user) {
            user.dreams = dreams;
            user.userInfo = userInfo;
        
            return user
          } else {
            return null;
          }
        });
    }
  
    return users
}

function getUserDreams(id) {
    let query = db('dreams')
        .where('user_id', id)

    return query
}

function getUserInfo(id) {
    let query = db('userInfo')
        .where('user_id', id)
        .first()

    return query
}

function login(username) {
    let query = db('users').select('username', 'id', 'password', 'email');

    return query
        .where('username', username)
        .first()
}

function add(newUser) {
    return db('users')
        .insert(newUser, 'id')
}

function update(id, changes) {
    return db('users')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('users')
    .where({ id })
    .del();
}