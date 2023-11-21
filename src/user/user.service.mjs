import knex from '../knexfile.mjs';
import { sendEmail } from '../email/email.service.mjs';

const createUser = async ({ email, password }) => {
  const ids = await knex('users').insert({ email, password });
  await sendEmail({
    to: email,
    subject: 'Archangel-12 :: User created',
    template: 'user-created',
    emailData: {
      preview: 'This is a preview text...',
      message: 'User successfully created!',
    },
  });

  return { id: ids[0] };
};

const getUsers = async ({ page, limit }) => {
  const offset = (page - 1) * limit;

  try {
    const [users, totalCount] = await Promise.all([knex('users').select('*').offset(offset).limit(limit), knex('users').count('* as total').first()]);

    return {
      pagination: {
        page,
        count: totalCount.total,
      },
      data: users,
    };
  } catch (error) {
    console.error('Error fetching users: ', error);
    throw error;
  }
};

export { createUser, getUsers };
