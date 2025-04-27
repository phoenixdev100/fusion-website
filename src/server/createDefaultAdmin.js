const User = require('../models/User');

async function createDefaultAdmin() {
  const admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    await User.create({
      username: 'fusion',
      email: 'admin@fusion.com',
      password: 'Admin@123',
      role: 'admin'
    });
    console.log('Default admin created: admin@fusion.com / Admin@123');
  }
}

module.exports = createDefaultAdmin; 