const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node')

const adapter = new JSONFile('../data/users.json')

const defaultData = { users: [] }

const db = new Low(adapter, defaultData)

async function initDB() {
  await db.read()
}

module.exports = { db, initDB }