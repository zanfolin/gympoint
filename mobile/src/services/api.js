import axios from 'axios';
import adress from '~/config/Server';

const api = axios.create({
  // baseURL: 'http://192.168.0.155:3333',
  baseURL: `http://${adress.server_ip}:${adress.server_port}`,
});

export default api;
