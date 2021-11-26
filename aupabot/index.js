require('dotenv').config();
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const got = require('got');

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
    try {
        got.get(process.env.GENERATE_URL_BR).then(res => {
            let body = JSON.parse(res.body);
            return postRequest(body.word);
        });
    } catch (err) {
        console.error(`Palavra não gerada! Erro: ${err.message}`);
        next(err);
    }
}

async function postRequest(word) {
    try {
        const data = {
            "text": `${word}`
        };

        const authHeader = oauth.toHeader(oauth.authorize({
            url: process.env.TWEETS_ENDPOINT,
            method: 'POST'
        }, token));


        //const request = await got.post(process.env.TWEETS_ENDPOINT, {
        await got.post(process.env.TWEETS_ENDPOINT, {
            json: data,
            responseType: 'json',
            headers: {
                Authorization: authHeader["Authorization"],
                'user-agent': "v2CreateTweetJS",
                'content-type': "application/json",
                'accept': "application/json"
            }
        });
        return console.log(`Tweet realizado! Palavra publicada: ${word}`)
    } catch (err) {
        console.error(`Requisição falhou! Erro: ${err.message}`);
        next(err);
    }
}
generateWord();