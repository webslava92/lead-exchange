/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('uploads')
    .insert({ id: 0, number_of_entries: 3 })
    .then(() =>
      knex('users')
        .del()
        .then(() =>
          knex('users').insert([
            {
              id: 0,
              first_name: 'Test_name_1',
              last_name: 'Test_last_name_1',
              phone: '+79780000001',
              email: 'test_email_1@gmail.com',
              upload_id: 0,
            },
            {
              id: 1,
              first_name: 'Test_name_2',
              last_name: 'Test_last_name_2',
              phone: '+79780000002',
              email: 'test_email_2@gmail.com',
              upload_id: 0,
            },
            {
              id: 2,
              first_name: 'Test_name_3',
              last_name: 'Test_last_name_3',
              phone: '+79780000003',
              email: 'test_email_3@gmail.com',
              upload_id: 0,
            },
          ])
        ));
};
