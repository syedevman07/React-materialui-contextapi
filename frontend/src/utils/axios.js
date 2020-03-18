import axios from 'axios';

const Axios = axios.create({
  baseURL: (() => {
    let protocol = 'https://';
    if (process.env.NODE_ENV === 'local') {
      protocol = 'http://';
    }
    if (typeof window !== 'undefined') {
      return `${protocol}${window.location.host}/api`;
    }
    return `http://localhost:8000/api`;
  })(),
});

export default Axios;
