const knex = require('../knexfile');

const createUser = async ({ email, password }) => {
  return await knex('users').insert({ email, password });
};

const getUsers = async ({ page, limit }) => {
  const offset = (page - 1) * limit;

  try {
    const [users, totalCount] = await Promise.all([knex('users').select('*').offset(offset).limit(limit), knex('users').count('* as total').first()]);

    return {
      pagination: {
        page: page,
        count: totalCount.total,
      },
      data: users,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUsers,
};
