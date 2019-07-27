import * as createService from '../services/chaincreate';

export default {
  namespace: 'chaincreate',
  state: {
    status:"wait",
  },
  reducers: {
    save(state, { payload: {blockid:status} }) {
      return { ...state, status };
    },
  },
  effects: {
    *create({ payload: chainbody }, {call, put}) {
      const {data} =yield call(createService.create, chainbody);
      yield put({
        type: 'save',
        payload: {
          blockid:data.blockid
        },
      });
    },

    *init({}, {put}) {
      yield put({
        type: 'save',
        payload: {
          status:"wait"
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname  }) => {
        if (pathname === '/chaincreate') {
          dispatch({ type: 'init', payload: {} });
        }
      });
    },
  },
};
