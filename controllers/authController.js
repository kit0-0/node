const jwt = require('../utils/jwtUtils');
const db = require('../config/db');

exports.login = (req, res, next) => {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }

    db.query('SELECT * FROM employee WHERE email_id = ?', [email_id], (err, results) => {
        if (err) return next(err);

        if (results.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = results[0];

        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.createToken({ id: user.id });
        res.json({ token });
    });
};
