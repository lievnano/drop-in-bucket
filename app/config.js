var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'bucketdb',
    charset: 'utf8',
  }
});

db.knex.schema.hasTable('users').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('users', function(user){
      user.increments('id').primary();
      user.string('username', 30).notNullable().unique();
      user.string('password', 255).notNullable();
      user.string('email', 255).notNullable().unique();
      user.string('clearance', 40);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('buckets').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('buckets', function(bucket){
      bucket.increments('id').primary();
      bucket.string('title', 140).notNullable();
      bucket.integer('user_id').index().references('users.id');
      bucket.string('route', 40).unique().index();
      bucket.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('pledges').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('pledges', function(pledge){
      pledge.increments('id').primary();
      pledge.string('pledge', 400).notNullable();
      pledge.integer('bucket_id').index().references('buckets.id');
      pledge.integer('user_id').index().references('users.id');
      pledge.integer('value');
      pledge.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


//represents pledges a user takes ( a drop in a pledge bucket...)
db.knex.schema.hasTable('drops').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('drops', function(drop){
      drop.increments('id').primary();
      drop.integer('pledge_id').index().references('pledges.id');
      drop.integer('user_id').index().references('users.id');
      drop.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;


// db.knex.schema.hasTable('quizzes').then(function(exists){
//   if(!exists){
//     db.knex.schema.createTable('quizzes', function(quiz){
//       quiz.increments('id').primary();
//       quiz.string('title', 255).notNullable();
//       quiz.integer('user_id').index().references('users.id');
//       quiz.boolean('ordered');
//       quiz.boolean('hasGlobalScore');
//       quiz.boolean('multipleAttemptsAllowed');
//       quiz.integer('timeLimit');
//       quiz.string('type', 40);
//       quiz.timestamps();
//     });
//   }
// });

// db.knex.schema.hasTable('questions').then(function(exists){
//   if(!exists){
//     db.knex.schema.createTable('questions', function(question){
//       question.increments('id').primary();
//       question.string('question', 400).notNullable();
//       question.integer('quiz_id').notNullable().index().references('quizzes.id');
//       question.timestamps();
//     });
//   }
// })

// db.knex.schema.hasTable('answers').then(function(exists){
//   if(!exists){
//     db.knex.schema.createTable('answers', function(answer){
//       answer.increments('id').primary();
//       answer.string('answer', 400).notNullable();
//       answer.integer('question_id').notNullable().index().references('answers.id');
//       answer.integer('score');
//       answer.boolean('correct');
//       answer.timestamps();
//     });
//   }
// });

// db.knex.schema.hasTable('endMessages').then(function(exists){
//   if(!exists){
//     db.knex.schema.createTable('endMessages', function(endMessage){
//       endMessage.increments('id').primary();
//       endMessage.string('message',400).notNullable();
//       endMessage.string('type',30).notNullable();
//       endMessage.integer('quiz_id').notNullable().index().references('quizzes.id');
//       endMessage.timestamps();
//     });
//   }
// });






