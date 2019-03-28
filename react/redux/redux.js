/**
 * Created by mapbar_front on 2019-03-27.
 */
export function createStore (fun) {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = fun(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({});

    return {
        getState,
        dispatch,
        subscribe
    }
}
