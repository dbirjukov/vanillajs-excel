export default class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  subscribeToStore(components) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (this.prevState[key] !== state[key]) {
          components.forEach((comp) => {
            if (comp.isWatching(key)) {
              const changes = { [key]: state[key] };
              comp.stateChanged(changes);
            }
          });
        }
      });
      this.prevState = state;
    });
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
