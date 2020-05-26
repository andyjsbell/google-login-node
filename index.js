const {google} = require('googleapis');

// Tokens shared from app service for az func
// X-MS-TOKEN-GOOGLE-ID-TOKEN
// X-MS-TOKEN-GOOGLE-ACCESS-TOKEN
// X-MS-TOKEN-GOOGLE-EXPIRES-ON
// X-MS-TOKEN-GOOGLE-REFRESH-TOKEN

// https://developers.google.com/gmail/api/quickstart/nodejs
// Build the sample using the credentials file downloaded from Google API console to see how
// the token JSON is formatted. The access token we get from AZ would then be used here
// {
//   "access_token": "ya29.a0AfH6SMCL5K8YEsf_iljs6i2QC5drDFwjDAs5_qBoIzlB236KzH5T6rqjk705v1kMozTv3au_a1KJyd41f5PjoYTvQVsfgG4lqYxtFezgyzL6p-cH-w8y9Z-DzDcMn1QoahEAy8PNWgA2vMCxdk4wLEfCMw-10-BS4ak",
//   "refresh_token": "1//038roGX5mmYQmCgYIARAAGAMSNwF-L9IrH8_3EjfJdExs6jI_i4YivAEIq9ELarJ4V3vRReVx5zky0NUtr1u7oCE8BGef5MakshY",
//   "scope": "https://www.googleapis.com/auth/gmail.readonly",
//   "token_type": "Bearer",
//   "expiry_date": 1590071356008
// }
const str = '{"web":{"client_id":"37849417082-c8eg9a7c78j02d6195se3ir832hitfgf.apps.googleusercontent.com","project_id":"flamingo-274511","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"RH53vMjTZIfoRPng1NgecqNS","redirect_uris":["https://func-flamingo.azurewebsites.net/.auth/login/google/callback","https://flamingo-app.azurewebsites.net","https://flamingo-app.azurewebsites.net/.auth/login/google/callback"],"javascript_origins":["https://flamingo-app.azurewebsites.net","https://func-flamingo.azurewebsites.net"]}}';
const token = {
  access_token: "ya29.a0AfH6SMBbIHbzR0yCr0LTQWaWm9y5PH66GVjFXp0Frbua28AwQa5GUnTuIUM2h9en4LndPCuiGtoJlJtcOhYniwUkFJ4aj7E1VxIL4gfRMkscZS7E9CpoXEwQCKaineGPPBF6Lze_-N3ydKC7fUy6olITN7zbvVxZ5zaFxA",
  scope: "https://www.googleapis.com/auth/gmail.readonly",
  token_type: "Bearer",
  expiry_date: 1590470423000
};

const auth = () => {
  const json = JSON.parse(str);
  const client_secret = json.web.client_secret;
  const client_id = json.web.client_id;
  const redirect_uris = json.web.redirect_uris;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  try {
    oAuth2Client.setCredentials(token);

    // Get list of labels
    const gmail = google.gmail({version: 'v1', oAuth2Client});
    gmail.users.labels.list({
      userId: 'me',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log('Labels:');
        labels.forEach((label) => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log('No labels found.');
      }
    });
  } catch (e) {
    console.error(e);
  }

};

auth();