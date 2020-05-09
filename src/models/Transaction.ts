import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionTypes {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: TransactionTypes,
  })
  type: TransactionTypes;

  @Column('integer')
  value: number;

  @CreateDateColumn()
  category_id: string;

  @UpdateDateColumn()
  created_at: Date;

  updated_at: Date;
}

export default Transaction;
