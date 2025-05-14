// No need to import pool if it's already in your index.js.
const pool = require("../db"); // Make sure 'index.js' exports the pool object

/**
 * Validates user credentials.
 * @param {string} email - User's email.
 * @param {string} password - User's password (plain text).
 * @returns {Promise<object|null>} Returns user object if valid, null otherwise.
 */
async function validateUser(email, password) {
	try {
		const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
		const values = [email, password];

		const res = await pool.query(query, values);

		if (res.rows.length > 0) {
			return res.rows[0]; // User found
		} else {
			return null; // Invalid credentials
		}
	} catch (err) {
		console.error("Error validating user:", err);
		throw err;
	}
}

module.exports = { validateUser };
