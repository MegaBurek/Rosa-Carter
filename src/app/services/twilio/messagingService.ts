import * as Twilio from 'twilio';

const twilioNumber = '+12512996383';
const accountSid = 'ACffe2973f0443836365a4bfd09189d377';
const authToken = '5ec67fd54f0f5853dd9c0b74d02db780';

const client = Twilio(accountSid, authToken);

export function sendMessage() {

  client.messages.create({
    body: 'Hello',
    from: twilioNumber,
    to: '+381649384725'
  })
    .then(message => console.log('Success' + message.sid));
}
