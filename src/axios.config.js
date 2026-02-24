import axios from 'axios';
import { BASE_URL } from './PS-Instellingen/constants';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

export default axios;
