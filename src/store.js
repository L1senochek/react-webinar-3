/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой позиции
   * @param code
   */
  addToCart(code) {
    const { cart } = this.state;
    const existingItem = cart.find(item => item.code === code);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const item = this.state.list.find(item => item.code === code);
      if (item) {
        cart.push({ ...item, quantity: 1 });
      }
    }
    this.setState({ ...this.state, cart });
  }

  /**
   * Удаление позиции по коду
   * @param code
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }
}

export default Store;
