import api from './Api';

export const login = async (username, password) => {
  const response = await api.post('user/login', {
    username,
    password,
  });

  const user = response.data.user;
  if (user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data.user;
};

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    return {};
  }
  return JSON.parse(user);
};

