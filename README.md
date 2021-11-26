# AupaBot
Estou aqui: twitter.com/aupabot

<h1>Primeiros passos!</h1>
É necessário criar uma conta na Developer Plataform do Twitter: https://developer.twitter.com/en

<h1>Como gerar as Keys para a autenticação (OAuth 1.0)?</h1>
Documentação oficial: https://developer.twitter.com/en/docs/authentication/oauth-1-0a

Após criar sua conta de developer, é possível gerar as Keys necessárias para a execução. Tais Keys são:
* consumer_key - sua API Key
* consumer_secret - sua API Key Secret
* access_token - seu Access Token
* token_secret - seu Access Token Secret

Depois, é só colocar elas em seus respectivos campos no arquivo .env do repositório.

<h1>Como funciona o endPoint para realizar o tweet?</h1>
Documentação oficial: https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/quick-start

Para definir a mensagem personalizada que irá ser 'tweetada', você deve atribuir ela à chave "text".
