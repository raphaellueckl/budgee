export class Transaction {
  title: string;
  category: string;
  period: Period;
  value: number;
  isIncome: boolean;
}

export enum Period {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Quarter = 'Quarterly',
  SixMonths = '6 Months',
  Yearly = 'Yearly'
}
