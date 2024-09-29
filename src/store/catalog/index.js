import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        page,
        limit,
        total: json.result.total,
      },
      'Загружены товары из АПИ',
    );
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        product: json.result,
      },
      'Загружен товар',
    );
  }
}

export default Catalog;
