import {Product} from "../../model/product";

export class CreateProduct {
  static readonly type = '[Product API] Create Product';

  constructor(public product: Product){

  }
}

export class GetAllBras {
  static readonly type = '[Product API] Get All Bras';
  constructor(){}
}

export class GetAllSets {
  static readonly type = '[Product API] Get All Sets';
  constructor(){}
}

export class GetAllUndies {
  static readonly type = '[Product API] Get All Undies';
  constructor(){}
}

export class GetProductById {
  static readonly type = '[Product API] Get Product ById';

  constructor(public id: string){}
}

export class DeleteProduct {
  static readonly type = '[Product API] Delete Product';

  constructor(public id: string){

  }
}

export class UpdateProduct {
  static readonly type = '[Product API] Update Product';
  constructor(public product: Product, public id: string){}
}
