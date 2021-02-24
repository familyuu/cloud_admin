import {
  getAutomation,
  getRegistration,
  getRepository,
  getInstallation,
  getInventory
} from '@/services/api';

export default {
  namespace: 'platform',

  state: {
    automation: [],
    registration: [],
    repository: [],
    installation: [],
    inventory: []
  },

  effects: {
    *fetchAutomation(_, { call, put }) {
      const response = yield call(getAutomation);
      yield put({
        type: 'save',
        name: 'automation',
        data: Array.isArray(response) ? response : [],
      });
    },
    *fetchRegistration(_, { call, put }) {
      const response = yield call(getRegistration);
      yield put({
        type: 'save',
        name: 'registration',
        data: Array.isArray(response) ? response : [],
      });
    },
    *fetchRepository(_, { call, put }) {
      const response = yield call(getRepository);
      yield put({
        type: 'save',
        name: 'repository',
        data: Array.isArray(response) ? response : [],
      });
    },
    *fetchInstallation(_, { call, put }) {
      const response = yield call(getInstallation);
      yield put({
        type: 'save',
        name: 'installation',
        data: Array.isArray(response) ? response : [],
      });
    },
    *fetchInventory(_, { call, put }) {
      const response = yield call(getInventory);
      yield put({
        type: 'save',
        name: 'inventory',
        data: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    save(state, action) {
      const { name, data } = action;
      switch (name) {
        case 'automation':
          return {
            ...state,
            automation: data,
          };
        case 'registration':
          return {
            ...state,
            registration: data,
          };
        case 'repository':
          return {
            ...state,
            repository: data,
          };
        case 'installation':
          return {
            ...state,
            installation: data,
          };
        case 'inventory':
          return {
            ...state,
            inventory: data,
          };
      }
    },
  },
};
