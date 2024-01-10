const {query} = require('./client');

const findOne = async (username) => {
  try {
    // Assuming criteria is an object with key-value pairs for the search condition
    const result = await query(`SELECT * FROM users WHERE username = ${username}`);

    // If a user is found, return the first result
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error in findOne:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

module.exports = {
  findOne,
};
