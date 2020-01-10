import hello from '../handler.js';
const request = require('supertest');

// test('two plus two is four', () => {
// 	expect(2 + 2).toBe(4);
// });

// test('hello', async () => {
// 	const event = 'event';
// 	const context = 'context';
// 	const callback = (error, response) => {
// 		expect(response.statusCode).toEqual(200);
// 		expect(typeof response.body).toBe('string');
// 	};

// 	await hello.hello(event, context, callback);
// });

describe('get Endpoints', () => {
	const server = request(`http://localhost:3005`);
	test('should run get example', async () => {
		const res = await server.get('/example');
		console.log('res', res.body);
	});
});
