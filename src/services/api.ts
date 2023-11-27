import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3333'
})

// 1º(config)=>{} informações da requisição que esta sendo feita,
// 2º(error)=>{} Parametro, recuperar o erro se der erro, e então o que iremos fazer.
// api.interceptors.request.use((config) => {
//   console.log("INTERCEPTOR RESQUEST=> ", config)
//   return config; // Tenho que da return, pq ele intercepta mas que não tiver o return não envia os dados para os back-end.
// }, (error) => {
//   return Promise.reject(error);
// });

api.interceptors.response.use((response) => {
  //console.log("INTERCEPTOR RESPONSE=> ", response)
  return response; // Tenho que da return, pq ele intercepta mas que não tiver o return não envia os dados para os front-end.
}, (error) => {
  console.log("INTERCEPTOR RESPONSE ERROR=> ", error)
  if (error.response && error.response.data) { // Mensagem tratada
    return Promise.reject(new AppError(error.response.data.message));
  } else {
    return Promise.reject(error);
  }
  return Promise.reject(error);
});


export { api };