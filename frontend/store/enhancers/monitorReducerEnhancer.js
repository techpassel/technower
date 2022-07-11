const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer =
  createStore => (reducer, initialState, enhancer) => {
    const monitoredReducer = (state, action) => {
      const start = null;
      if (typeof performance !== 'undefined') {
        start = performance.now()
      }

      const newState = reducer(state, action)
      if (typeof performance !== 'undefined') {
        const end = performance.now()
        const diff = round(end - start)
        console.log('Reducer process time:', diff)
      }

      return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
  }

export default monitorReducerEnhancer