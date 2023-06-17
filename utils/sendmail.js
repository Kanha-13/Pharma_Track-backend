const ElasticEmail = require('@elasticemail/elasticemail-client');

const sendEmail = async (to, otp,callback) => {
  let defaultClient = ElasticEmail.ApiClient.instance;
  let apikey = defaultClient.authentications['apikey'];
  apikey.apiKey = process.env.ELASTIC_MAIL_API

  let api = new ElasticEmail.EmailsApi()

  let email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [
      new ElasticEmail.EmailRecipient(to)
    ],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: `<p> ${otp} is your otp for Pharmacy app. And is valid for 10 min only!</p>`
        })
      ],
      Subject: 'Verification code',
      From: 'kanha.agr13@gmail.com'
    }
  });

  api.emailsPost(email, callback)
};

module.exports = { sendEmail }