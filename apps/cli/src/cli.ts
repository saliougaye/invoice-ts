import { input, select } from '@inquirer/prompts';
import validator from 'validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const createCli = () => ({
	createInvoicer: async () => {
		const firstName = await input({
			message: "What's the first name?",
			validate: (value) => validator.isLength(value, { min: 1 }),
		});

		const lastName = await input({
			message: "What's the last name?",
			validate: (value) => validator.isLength(value, { min: 1 }),
		});

		const address = await input({
			message: "What's the address?",
		});

		const city = await input({
			message: "What's the city? (e.g. Milan (MI)",
		});

		const phone = await input({
			message: "What's the phone?",
			validate: validator.isMobilePhone,
		});

		const pIva = await input({
			message: "What's the P.IVA?",
			validate: validator.isNumeric,
		});

		const iban = await input({
			message: "Wha'ts the IBAN?",
			validate: (value) => validator.isIBAN(value),
		});

		return {
			firstName,
			lastName,
			address,
			city,
			phone,
			pIva,
			iban,
		};
	},
	createInvoiceTo: async () => {
		const company = await input({
			message: "What's the company name?",
			validate: async (value) =>
				validator.isLength(value, {
					min: 1,
				}),
		});

		const address = await input({
			message: "What's the address?",
		});

		const city = await input({
			message: "What's the city? (e.g. Milan (MI)",
		});

		const pIva = await input({
			message: "What's the P.IVA?",
			validate: async (value) => validator.isNumeric(value),
		});

		return {
			company,
			address,
			city,
			pIva,
		};
	},
	createReceiverEmail: async () => {
		const email = await input({
			message: "What's the email where you want to receive the invoices?",
			validate: (value) => validator.isEmail(value),
		});

		return email;
	},
	createInvoiceRow: async () => {
		const description = await input({
			message: 'Give me a description of the invoice row',
			validate: (value) => value.length > 5,
		});

		const day = await input({
			message: 'Date of the invoice row (DD/MM/YYYY)',
			validate: (value) =>
				validator.isDate(value, {
					format: 'DD/MM/YYYY',
				}),
		});

		const amount = await input({
			message: 'Amount of the invoice row (€)',
			validate: (value) => validator.isNumeric(value),
		});

		return {
			description,
			day,
			amount,
		};
	},
	selectInvoicer: async (
		invoicers: {
			id: string;
			name: string;
		}[],
	) => {
		const invoicer = await select({
			message: 'Select invoicer',
			choices: invoicers.map((invoicer) => ({
				name: invoicer.name,
				value: invoicer.id,
			})),
		});

		return invoicer;
	},
	isGenerateDateRangeValid: (start: any, end: any) => {
		if (typeof start !== 'string' || typeof end !== 'string') {
			return false;
		}

		return (
			validator.isDate(start, {
				format: 'DD/MM/YYYY',
			}) &&
			validator.isDate(end, {
				format: 'DD/MM/YYYY',
			}) &&
			dayjs(end, 'DD/MM/YYYY').isAfter(dayjs(start, 'DD/MM/YYYY'))
		);
	},
});
