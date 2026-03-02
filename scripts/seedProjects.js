// Simple helper to create dummy projects via the API.
// Usage:
//   VITE_API_URL=https://.../api TEST_USER_EMAIL=foo@example.com TEST_USER_PASS=pass node scripts/seedProjects.js
// The script will register/login a test user, obtain a token, and post a few projects.

const axios = require('axios');
const faker = require('faker');

const apiUrl = process.env.VITE_API_URL || 'http://localhost:3000/api';
if (!apiUrl) {
  console.error('Please set VITE_API_URL environment variable');
  process.exit(1);
}

async function registerOrLogin() {
  const email = process.env.TEST_USER_EMAIL || 'seeduser@example.com';
  const password = process.env.TEST_USER_PASS || 'password';
  try {
    // try login first
    const loginRes = await axios.post(`${apiUrl}/auth/login`, { email, password });
    return loginRes.data.token;
  } catch (err) {
    console.log('Login failed, attempting registration');
    const regRes = await axios.post(`${apiUrl}/auth/register`, { name: 'Seed User', email, password });
    return regRes.data.token;
  }
}

async function main() {
  try {
    const token = await registerOrLogin();
    console.log('Using token:', token.slice(0,20) + '...');
    const headers = { Authorization: `Bearer ${token}` };

    const sample = [];
    for (let i = 0; i < 5; i++) {
      sample.push({
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(2),
        category: faker.random.arrayElement(['technology','education','health','art','environment']),
        goal_amount: faker.finance.amount(1000, 50000, 0),
        end_date: faker.date.soon(60).toISOString().split('T')[0],
      });
    }

    for (const proj of sample) {
      const res = await axios.post(`${apiUrl}/projects`, proj, { headers });
      console.log('created project', res.data.id, proj.title);
    }
    console.log('Done seeding projects.');
  } catch (err) {
    console.error('Error seeding:', err.response?.data || err.message);
  }
}

main();
