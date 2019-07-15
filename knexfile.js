// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'mympy',
  user: 'postgres',
  password: 'Strickdev3.pg'
};

const dbConnnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'pg',
    connection: "postgresql://localhost:5432/mympy",
    database: 'mympy',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
  },
  ////this is commit
  ////this is second commit
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },


  production: {
    client: 'pg',
    connection: dbConnnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
