/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
    };
    this.listeners = []; // Слушатели изменений состояния
    this.removedCodes = new Set();
    this.codesSet = new Set(initState.list.map(item => item.code));
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
   * Генерация уникального кода
   * @returns {Number} Новый уникальный код
   */
  generateUniqueCode() {
    if (this.removedCodes.size > 0) {
      const [restoredCode] = this.removedCodes;
      this.removedCodes.delete(restoredCode);
      return restoredCode;
    } else {
      let newCode = 1;
      while (this.codesSet.has(newCode)) {
        newCode++;
      }
      this.codesSet.add(newCode);
      return newCode;
    }
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateUniqueCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectedCount = (item.selectedCount || 0) + 1;
          }
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
