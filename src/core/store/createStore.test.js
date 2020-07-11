import { createStore } from './createStore';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'add') {
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe('createStore', () => {
  let store;
  let handler;
  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });
  test('creates store object correctly', () => {
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test('returns correct initial state', () => {
    expect(store.getState()).toEqual({ count: 0 });
  });

  test('returns correct state after action is dispatched', () => {
    store.dispatch({ type: 'add' });
    expect(store.getState().count).toBe(1);
  });

  test('returns default state when non-existent action dispatched', () => {
    store.dispatch({ type: '__noSuchAction__' });
    expect(store.getState().count).toBe(0);
  });

  test('calls listeners after action dispatched', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'add' });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('does not call listeners after unsubscription', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({ type: 'add' });
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
