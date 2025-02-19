import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors);

app.post(
	"/subscriptions",
	{
		schema: {
			body: z.object({
				name: z.string(),
				email: z.string().email(),
			}),
		},
	},
	async (request, reply) => {
		const { name, email } = request.body;
		console.log(name, email);

		return reply.status(201).send({ name, email });
	},
);

app.listen({ port: 3333 }).then(() => {
	console.log("Server is running on port 3333");
});
