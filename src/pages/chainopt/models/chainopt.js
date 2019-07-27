import * as chainoptService from '../services/chainopt';

export default {
  namespace: 'chainopt',
  state: {
    list: [],
    total: null,
    index: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, index } }) {
      return { ...state, list, total, index };
    },
    del(state, { payload: { index } }) {
      state.list.splice(index,1);
      var list= JSON.parse(JSON.stringify(state.list));
      return {...state,list};
    },
  },
  effects: {
    *query({ payload: { index = 0 , pagesize = 10} }, { call, put }) {
      const { data } = yield call(chainoptService.queryByStr, { index,pagesize});
      yield put({
        type: 'save',
        payload: {
          data: data.data,
          total: parseInt(data.total, 10),
          index: parseInt(data.index, 10),
        },
      });
    },
    *querybyid({ payload: { chainid} }, { call, put }) {
      const { data } = yield call(chainoptService.queryById, {chainid});
      yield put({
        type: 'save',
        payload: {
          data: data.data,
          total: parseInt(data.total, 10),
          index: parseInt(data.index, 10),
        },
      });
    },
    *startchain({ payload: { chainid} }, { call }) {
      yield call(chainoptService.startchain, {chainid});
    },
    *stopchain({ payload: { chainid} }, { call }) {
      yield call(chainoptService.stopchain, {chainid});
    },
    *initchain({ payload: { chainid} }, { call }) {
      yield call(chainoptService.initchain, {chainid});
    },
    *delchain({ payload: { chainid,index} }, { call,put}) {
      yield call(chainoptService.delchain, {chainid});
      yield put({
        type: 'del',
        payload: {
          index: index,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chainopt') {
          dispatch({ type: 'query', payload: query });
        }
      });
    },
  },
};
