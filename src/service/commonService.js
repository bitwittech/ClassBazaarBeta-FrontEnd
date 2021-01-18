import axios from 'axios';
import { API } from '../config.json'

export const eduTest = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
        // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
    };
    console.log(user);
    const data = {
      "user_id": '123456789',
      "name": "krishnahari1",
      "gender": "male",
      "email_address": "krishnahari321@gmail.com",
      "school_or_college_name": "Waterview Dr",
      "class_year": "college_5",
      "city": "hyderabad",
      "mobile_no": "7842706731",
      "password": "2412"
    }
    // e.preventDefault();
    const url = 'https://edubuk.co.in/User/loginApi?user_id=123456789&name=krishnahari1&gender=male&email_address=krishnahari321@gmail.com&school_or_college_name=Waterview Dr&class_year=college_5&city=hyderabad&mobile_no=7842706731&password=12456';
    // const res = await axios.get(url).then((res) => {console.log(res)})
    window.open(url, '_blank');

  };

  export const newregister = async (userId, request) => {
      debugger;
      const res = await axios.post(API + '/api/newregistration', request).then((res) => {console.log(res)});
      // return new Promise((resolve, reject) => {
      //   this._start()
      //       .uri('/api/newregistration')
      //       .urlSegment(userId)
      //       .setJSONBody(request)
      //       .post()
      //       .go(this._responseHandler(resolve, reject));
      // });
  }