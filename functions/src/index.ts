// import * as functions from 'firebase-functions';
//
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
//
// const twilio = require('twilio');
// const accountSid = functions.config().twilio.sid;
// const authToken = functions.config().twilio.token;
//
// const client = new twilio(accountSid, authToken);
//
// const twilioNumber = '+12512996383';
//
// const textMessage = {
//
//   body: 'Some message',
//   to: '+381649384725',
//   from: twilioNumber
// }
//
// export function sendMessage(){
//   return client.messages.create(textMessage);
// }
