import * as mspService from '../services/msp';

export default {
  namespace: 'msp',
  state: {
    list: [],
    total: null,
    index: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, index } }) {
      return { ...state, list, total, index };
    },
  },
  effects: {
    *query({ payload: {} }, { call, put }) {
      const { data } = yield call(mspService.query, {});
      yield put({
        type: 'save',
        payload: {
          data: data,
        },
      });
    },

    *queryLeagueById({payload : {id,values}}, {call, put, select}){
      yield call(mspService.queryLeagueById , id, values);
      const league = yield select(state => state.list);
      yield put({
        type: 'featch', payload: {league}
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/msp') {
          dispatch({ type: 'query', payload: query });
        }
      });
    },
  },
};
