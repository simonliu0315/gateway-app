export interface IDealer {
  id?: number;
  make2?: string;
  brand2?: string;
}

export class Dealer implements IDealer {
  constructor(public id?: number, public make2?: string, public brand2?: string) {}
}
