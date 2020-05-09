import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateCategoryService from './CreateCategorySerivce';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    category,
    value,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const createCategory = new CreateCategoryService();

    const findTransaction = await transactionRepository.findOne({
      where: {
        title,
      },
    });

    if (findTransaction) {
      throw new AppError('transaction already exists', 400);
    }

    const { id } = await createCategory.execute({
      title: category,
    });

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
