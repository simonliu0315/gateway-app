export interface IMainStock {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
}

export class MainStock implements IMainStock {
  constructor(public id?: number, public name?: string, public description?: string, public type?: string) {}
}
