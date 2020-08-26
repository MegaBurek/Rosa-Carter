const functions = require('firebase-functions');

function sendMessage() {
  const accountSid = 'ACffe2973f0443836365a4bfd09189d377';
  const authToken = '5ec67fd54f0f5853dd9c0b74d02db780';
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      from: '+12512996383',
      to: '+381649384725'
    })
    .then(message => console.log('Success' + message.sid))
    .done();
}
