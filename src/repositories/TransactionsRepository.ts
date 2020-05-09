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

    const total = transactions
      .map(({ type, value }) => ({
        type,
        value: type === 'outcome' ? value * -1 : value,
      }))
      .reduce((prev, current) => prev + current.value, 0);
    console.log(total);
    return {
      total: 0,
      income: 1,
      outcome: 1,
    };
  }
}

export default TransactionsRepository;
