import * as service from '../services/service';

export default {
  namespace: 'service',
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
      const { data } = yield call(service.queryexpose, {chainid});
      yield put({
        type: 'save',
        payload: {
          data: data,
        },
      });
    },
  },
  subscriptions: {
  },
};
