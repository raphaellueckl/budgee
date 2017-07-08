export class Transaction {

  title: string;
  category: string;
  period: string;
  value: string;

  constructor(title: string, category: string, period: string, value: string) {
    this.title = title;
    this.category = category;
    this.period = period;
    this.value = value;
  }

  domain(): string {
    try {
      const link: string = this.category.split('//')[1];
      return link.split('/')[0];
    } catch (err) {
      return null;
    }
  }

}
