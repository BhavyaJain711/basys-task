import axios from 'axios';
import {store} from './store';
import {setAccessToken, setLogout} from './state/index';

// let store

// export const injectStore = _store => {
//   store = _store
// }
async function newAccessToken(){
  //get new token via refresh token
  try {
    await axios.post('auth/refresh', {
      refreshToken: store.getState().refreshToken
    })
    .then((res)=>{
      console.log(res.data.accessToken);
      store.dispatch(setAccessToken({token: res.data.accessToken}));
    }).catch((err)=>{
      console.log(err);
      console.log('error in newAccessToken logout');
      store.dispatch(setLogout());
      // redirect to login page
      window.location.href = '/login';
      
    });

      //change token in store
//   if(newAccessToken.data.accessToken){
//     store.dispatch(setAccessToken({token: newAccessToken.data.accessToken}));
//     return newAccessToken.data.accessToken;
// }
// else{
//     store.dispatch(setLogout());
//     console.log('Refresh token expired, please log in again');
//     return null;
// }
    
  } catch (error) {
    console.log("in error"+error,newAccessToken);
  }

}
const authAxios= axios.create({
    
    headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': `Bearer `+ store.getState().token
    }

});
// Add a request interceptor
authAxios.interceptors.request.use((request)=> {
    request.headers.Authorization = `Bearer ${store.getState().token}`;
    //if token is expired, refresh token
    // Do something before request is sent
    
    return request;
  }, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  });

// Add a response interceptor
authAxios.interceptors.response.use(function (response) {
    return response;
  }, async function  (error) {
    console.log(error);
    if(!error.response){
      console.log('no response');
      alert("TOO MANY REQUESTS, PLEASE TRY AGAIN LATER")
      return Promise.reject(error);
    }
    if(error.response.status === 401){
      console.log('inside 401')
      if(error.response.data.error === "jwt expired"){
        console.log('inside jwt expired');
        try {
          await newAccessToken();
          authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getState().token;
          return authAxios(error.config);
          
        } catch (error) {
          console.log(error);
        }
      }
      else if(error.response.data.error==='refreshToken expired'){
        store.dispatch(setLogout());
        console.log('Refresh token expired, please log in again');


      }
      else{
        console.log(error);
      }
    }

    return Promise.reject(error);
  });

  

  export default authAxios;