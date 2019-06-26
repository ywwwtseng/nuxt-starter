import ms from 'ms';
import Cookie from 'js-cookie';
import get from 'lodash.get';

export const state = () => ({
  token: null,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },

  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  authenticateUser(vuexContext) {
    const token = 'c80d3694-3a7b-4ca4-98e6-cd7404913848';
    const result = {
      isAuthenticated: true,
      token,
      expiresIn: '1h',
    };
    const expirationDate = new Date().getTime() + ms(result.expiresIn);

    vuexContext.commit('setToken', result.token);

    localStorage.setItem('token', result.token);
    localStorage.setItem('tokenExpiration', expirationDate);

    Cookie.set('jwt', result.token);
    Cookie.set('expirationDate', expirationDate);

    return result;
  },

  initAuth(vuexContext, req) {
    let token;
    let expirationDate;

    if (req) {
      const jwtCookie = get(req, 'headers.cookie').split(';').find(c => c.trim().startsWith('jwt='));
      const expirationDateCookie = get(req, 'headers.cookie').split(';').find(c => c.trim().startsWith('expirationDate='));

      token = jwtCookie && jwtCookie.split('=')[1];
      expirationDate = expirationDateCookie && +expirationDateCookie.split('=')[1];
    } else {
      token = localStorage.getItem('token');
      expirationDate = +localStorage.getItem('tokenExpiration');

      if (new Date().getTime() > expirationDate || !token) {
        vuexContext.dispatch('logout');
      }
    }

    if (token) vuexContext.commit('setToken', token);
  },

  logout(vuexContext) {
    vuexContext.commit('clearToken');
    Cookie.remove('jwt');
    Cookie.remove('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token !== null;
  }
};
