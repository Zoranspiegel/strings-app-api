import { faker } from '@faker-js/faker';
import { getClient } from '../db';
import bcrypt from 'bcrypt';

async function loadFakeAdmin (username: string, password: string): Promise<void> {
  if (!username || !password) {
    throw new Error('🧞 Missing fields');
  }
  console.log(`🧞 Loading fake admin with username: ${username} and password: ${password}...`);

  const client = getClient();
  await client.connect();

  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  const avatar = username === 'Zoranbow' ? 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1693004801/achord/profile_pictures/google-oauth2%7C113971150561954959309.jpg' : faker.image.avatarLegacy();

  await client.query(
    'insert into users (username, password, avatar, is_admin) values ($1, $2, $3, $4)',
    [username, hash, avatar, true]
  );

  await client.end();

  console.log('🧞 Admin successfully loaded');
};

const username = process.argv[2];
const password = process.argv[3];

loadFakeAdmin(username, password)
  .catch(error => { console.error(error); });
