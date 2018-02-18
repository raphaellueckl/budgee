import {Period, Transaction} from './model/transaction';

export class Budget {

  data: Transaction[] = [
    {
      title: 'Fuel',
      category: 'Car',
      period: Period.Monthly,
      value: 150,
      isIncome: false
    }, {
      title: 'Health-Insurance',
      category: 'Insurance',
      period: Period.Monthly,
      value: 300,
      isIncome: false
    }, {
      title: 'Repairs',
      category: 'Car',
      period: Period.Yearly,
      value: 500,
      isIncome: false
    }, {
      title: 'Mobile Subscription',
      category: 'Life',
      period: Period.Monthly,
      value: 50,
      isIncome: false
    }
  ];

}
