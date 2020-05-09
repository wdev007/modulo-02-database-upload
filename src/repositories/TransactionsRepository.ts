import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.filter(
      transaction => transaction.type === 'income',
    ).length;

    const outcome = transactions.filter(
      transaction => transaction.type === 'outcome',
    ).length;

    const total = transactions
      .map(({ type, value }) => ({
        type,
        value: type === 'outcome' ? value * -1 : value,
      }))
      .reduce((prev, current) => prev + current.value, 0);

    return {
      total,
      income,
      outcome,
    };
  }
}

export default TransactionsRepository;
