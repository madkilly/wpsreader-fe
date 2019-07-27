import * as certservice from '../services/cert';

export default {
  namespace: 'cert',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list};
    },
  },
  effects: {
    *querybyid({ payload: { chainid} }, { call, put }) {
      const { data } = yield call(certservice.queryById, {chainid});
      yield put({
        type: 'save',
        payload: {
          data: data.data,
        },
      });
    },
  },
  subscriptions: {
  },
};
