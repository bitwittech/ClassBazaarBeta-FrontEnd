import axios from 'axios';
import { store } from '../App';
import { API } from '../config.json'

export const eduTest = async (user, val) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
        // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
    };
    console.log(user, val);
    const url = `https://edubuk.co.in/mitest/User/loginApi?user_id=${user.id}&name=${val.name}&gender=${val.gender}&email_address=${val.email_address}&school_or_college_name=${val.school_or_college_name}&class_year=${val.class_year}&city=${val.city}&mobile_no=${val.mobile_no}&password=${val.password}`;
//     const url = `https://edubuk.co.in/User/loginApi?user_id=${user.id}&name=${val.name}&gender=${val.gender}&email_address=${val.email_address}&school_or_college_name=${val.school_or_college_name}&class_year=${val.class_year}&city=${val.city}&mobile_no=${val.mobile_no}&password=${val.password}`;
    const res = await axios.get(url).then((res) => {console.log(res)})
    window.open(url, '_blank');

  };

  export const newregister = async (userId, request) => {
//       const res = await axios.post(API + '/api/newregistration', request).then((res) => {console.log(res)});
      var emailVal = request.email_address;
      console.log('Hit up ')
      const ress = await axios.post(API + '/api/newregistration', request).then((ress) => {console.log('response',ress)});
      const res = await axios.post(API + '/api/newLoginDetails', {email: emailVal}).then((res) => {
        console.log(res.data.data)
        store.setItem('newUserLogin', res.data.data);
        localStorage.setItem('user', JSON.parse(JSON.stringify(res.data.data.email_address)));
        console.log('consoledata',res.data.data.email_address);

        // Edubuk commented by yashwant 

        console.log("EDU DATA :: ",res.data.data)

        let val = res.data.data;
        if(val.school_or_college_name !== null)
        {
          var id = "id" + Math.random().toString(16).slice(2);
          const url = `https://edubuk.co.in/mitest/User/loginApi?user_id=${id}&name=${val.name}&gender=${val.gender}&email_address=${val.email_address}&school_or_college_name=${val.school_or_college_name}&class_year=${val.class_year}&city=${val.city}&mobile_no=${val.mobile_no}&password=${val.password}`;
          window.open(url, '_blank');
          // window.location = "http://localhost:3000/edubuk"

        }
        

          
      });
       
      // return new Promise((resolve, reject) => {
      //   this._start()
      //       .uri('/api/newregistration')
      //       .urlSegment(userId)
      //       .setJSONBody(request)
      //       .post()
      //       .go(this._responseHandler(resolve, reject));
      // });
  }

  export const newLogin = async (emailVal) => {
    const res = await axios.post(API + '/api/newLoginDetails', {email: emailVal}).then((res) => {
      console.log(res.data.data)
      store.setItem('newUserLogin', res.data.data);
      localStorage.setItem('newLogin', JSON.parse(JSON.stringify(res.data.data)));
        
    });
  }
