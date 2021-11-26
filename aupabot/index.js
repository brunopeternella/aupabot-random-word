require('dotenv').config();
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const got = require('got');
const endpointURL = `https://api.twitter.com/2/tweets`;

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

function generateWord() {
    got.get(process.env.GENERATE_URL_BR).then(res => {
        if (res.statusCode === 200) {
            let body = JSON.parse(res.body);
            return postRequest(body.word);
        } else {
            throw new Error('Palavra não gerada!');
        }
    });
}

async function postRequest(word) {

    const data = {
        "text": `${word}`
    };

    const authHeader = oauth.toHeader(oauth.authorize({
        url: process.env.TWEETS_ENDPOINT,
        method: 'POST'
    }, token));

    const request = await got.post(process.env.TWEETS_ENDPOINT, {
        json: data,
        responseType: 'json',
        headers: {
            Authorization: authHeader["Authorization"],
            'user-agent': "v2CreateTweetJS",
            'content-type': "application/json",
            'accept': "application/json"
        }
    });

    if (request.statusCode === 201) {
        return console.log(`Tweet realizado! Palavra publicada: ${word}`);
    } else {
        throw new Error('Request Inválida!');
    }
}

try {
    generateWord();
} catch (e) {
    console.error(`Ocorreu um erro: ${e.message}`);
}