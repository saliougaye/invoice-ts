import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	FastifyServerOptions,
} from 'fastify';

export default async function (
	fastify: FastifyInstance,
	opts: FastifyServerOptions,
) {
	fastify.post('/', async (req: FastifyRequest, res: FastifyReply) => {
		res.status(200).send({
			hello: 'World',
		});
	});
}
