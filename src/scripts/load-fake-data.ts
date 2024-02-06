import { faker } from '@faker-js/faker';
import { getClient } from '../db';
import bcrypt from 'bcrypt';

async function loadFakeData (numUsers: number): Promise<void> {
  console.log(`🧞 Loading fake data for ${numUsers} users...`);

  const client = getClient();
  await client.connect();
  try {
    await client.query('begin');

    // FAKE USERS
    for (let i = 0; i < numUsers; i++) {
      const defaultPassword = 'password12345';
      const saltOrRounds = 10;
      const hash = bcrypt.hashSync(defaultPassword, saltOrRounds);

      await client.query(
        'insert into users (username, password, avatar) values ($1, $2, $3)',
        [faker.internet.userName(), hash, faker.image.avatarLegacy()]
      );
    }

    // SELECT NEW FAKE USERS
    const newFakeUsers = await client.query(
      'select id from users order by created_at desc limit $1',
      [numUsers]
    );

    // FAKE POSTS
    for (const row of newFakeUsers.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 40) + 10; i++) {
        const content = Math.random() < 0.5 ? faker.lorem.sentence() : faker.lorem.paragraph();
        await client.query(
          'insert into posts (user_id, content) values ($1, $2)',
          [row.id, content]
        );
      }
    }

    // FAKE FOLLOWINGS
    for (const row1 of newFakeUsers.rows) {
      for (const row2 of newFakeUsers.rows) {
        if (row1.id !== row2.id) {
          if (Math.random() < 0.5) {
            await client.query(
              'insert into follows (user_id, follower_id) values ($1, $2)',
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }

  console.log('🧞 Fake data successfully loaded');
}

const numUsers = Number(process.argv[2]) ?? 10;

loadFakeData(numUsers)
  .catch(error => { console.error(error); });
