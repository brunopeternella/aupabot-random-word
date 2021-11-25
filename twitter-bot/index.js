require('dotenv').config();
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const got = require('got');
const endpointURL = `https://api.twitter.com/2/tweets`;
const wordGeneratorURL = 'https://random-word-api.herokuapp.com/word';

const consumerKeys = {
    key: process.env.CONSUMER_KEY,
    secret: process.env.CONSUMER_SECRET
}

const token = {
    key: process.env.ACCESS_TOKEN,
    secret: process.env.ACCESS_TOKEN_SECRET,
}

const oauth = OAuth({
    consumer: consumerKeys,
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    }
})

function generateWord(){
    got.get(wordGeneratorURL).then(res => {
        let _word = JSON.parse(res.body);
        return postRequest(_word[0]);
       })
}

async function postRequest(word) {

    const data = {
        "text": `The word of the day is: ${word}`
    };

    console.log(data);

    const authHeader = oauth.toHeader(oauth.authorize({
        url: endpointURL,
        method: 'POST'
    }, token));

    const request = await got.post(endpointURL, {
        json: data,
        responseType: 'json',
        headers: {
            Authorization: authHeader["Authorization"],
            'user-agent': "v2CreateTweetJS",
            'content-type': "application/json",
            'accept': "application/json"
        }
    });
    if (request.body) {
        return request.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

generateWord();