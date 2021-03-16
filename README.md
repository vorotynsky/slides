# Slides

Create a presentation with a speech!

This app finds important words in your speech and searches images for them [from pexels](https://www.pexels.com/).
Choose one from twelve images for a slide or select prepared slides.

## Build and Run

Before running specify the jwt secret and pexels api key in `server/config/default.json`.

1. Prepare ssl certificate to `./cert.pem` and `./key.pem`, set env-variables

```
HTTPS=true
SSL_CRT_FILE=./cert.pem
SSL_KEY_FILE=./key.pem
```

2. Install dependencies for `./server/` and `./client` using `npm install`.
3. Run `mongo`.
4. Configure `./server/config/default.json`.
5. Run server and client `npm run start` in `./server` and `./client`.
