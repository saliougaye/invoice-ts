import { Command } from 'commander';
import { createCli } from './cli';

const program = new Command();

const cli = createCli();

program
	.name('invoice-ts')
	.description('CLI to add invoice rows')
	.version('0.0.1-alpha');

program
	.command('create-receiver')
	.description('Add a new invoice receiver')
	.action(async () => {
		console.log('-- Invoicer --');
		const invoicer = await cli.createInvoicer();

		console.log('-- Invoice to --');
		const invoiceTo = await cli.createInvoiceTo();

		console.log('Great!');

		const email = await cli.createReceiverEmail();

		console.log({
			invoicer,
			invoiceTo,
			email,
		});
	});

program
	.command('add')
	.description('Add a new invoice row')
	.action(async () => {
		const row = await cli.createInvoiceRow();

		console.log(row);
	});

program
	.command('generate')
	.description('Generate a invoice pdf and send to receiver')
	.requiredOption('-s, --start <day>', 'Start date to start invoice')
	.requiredOption('-e, --end <day>', 'End date to start invoice')
	.action(async (v) => {
		const invoicers = [
			{ name: 'Invoicer 1', id: 'id-1' },
			{ name: 'Invoicer 2', id: 'id-2' },
		];

		const invoicer = await cli.selectInvoicer(invoicers);
		const isRangeValid = cli.isGenerateDateRangeValid(v.start, v.end);
		if (!isRangeValid) {
			console.error('range not valid');
			return;
		}
		console.log({
			invoicer,
			...v,
		});
	});

program.parse();
