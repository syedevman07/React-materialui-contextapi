import axios from 'axios';

const Axios = axios.create({
  baseURL: (() => {
    let protocol = 'https://';
    if (process.env.NODE_ENV === 'development') {
      protocol = 'http://';
      return `http://localhost:8000/api`;
    }
    return `${protocol}${window.location.host}/api`;
  })(),
});

export default (data, needsToken = false) => {
  if(!needsToken) {
    return Axios(data);
  }
  return Axios({
    ...data,
    headers: {
      ...data.headers,
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
  });
}
