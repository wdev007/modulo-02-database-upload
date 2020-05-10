import path from 'path';
import fs from 'fs';
import csvParse from 'csv-parse';
import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

import { pathDestination } from '../config/upload';

import CreateTransactionService from './CreateTransactionService';

interface Request {
  csvFilename: string;
}

class ImportTransactionsService {
  async execute({ csvFilename }: Request): Promise<Transaction[]> {
    const transactionRepository = getRepository(Transaction);
    const createTransaction = new CreateTransactionService();
    const csvFilePath = path.join(pathDestination, csvFilename);
    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const transactions: Array<Transaction> = [];

    const parseCSV = readCSVStream.pipe(parseStream);

    // eslint-disable-next-line no-restricted-syntax
    for await (const record of parseCSV) {
      const transaction = await createTransaction.execute({
        title: record[0],
        type: record[1],
        value: record[2],
        category: record[3],
      });

      transactions.push(transaction);
    }

    await transactionRepository.save(transactions);

    return transactions;
  }
}

export default ImportTransactionsService;
