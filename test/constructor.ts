import test from 'ava';
import {Cashify} from '../dist';

const rates = {
	GBP: 0.92,
	EUR: 1.00,
	USD: 1.12
};

const cashify = new Cashify({base: 'EUR', rates});

test('basic conversion', t => {
	t.is(cashify.convert(12, {from: 'USD', to: 'GBP'}), 9.857142857142856);
});

test('`from` equals `base`', t => {
	t.is(cashify.convert(10, {from: 'EUR', to: 'GBP'}), 9.2);
});

test('`to` equals `base`', t => {
	t.is(cashify.convert(10, {from: 'GBP', to: 'EUR'}), 10.869565217391303);
});

test('`from` equals `to`', t => {
	t.is(cashify.convert(10, {from: 'USD', to: 'USD'}), 10);
});

test('`from` equals `to`, but `base` is different', t => {
	const cashify = new Cashify({base: 'USD', rates});

	t.is(cashify.convert(10, {from: 'EUR', to: 'EUR'}), 10);
});

test('`rates` without `base` currency', t => {
	const rates = {
		GBP: 0.92,
		USD: 1.12
	};

	const cashify = new Cashify({base: 'EUR', rates});

	t.is(cashify.convert(10, {from: 'EUR', to: 'GBP'}), 9.2);
});

test('`rates` object does not contain either `from` or `to` currency', t => {
	const error = t.throws(() => {
		cashify.convert(10, {from: 'CHF', to: 'EUR'});
	}, Error);

	t.is(error.message, '`rates` object does not contain either `from` or `to` currency!');
});
