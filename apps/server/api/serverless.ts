import * as dotenv from 'dotenv';
import Fastify from 'fastify';

dotenv.config();

const app = Fastify({
	logger: true,
});

app.register(import('../functions/create-receiver'), {
	prefix: '/api/create-receiver',
});

export default async (req, res) => {
	await app.ready();
	app.server.emit('request', req, res);
};
