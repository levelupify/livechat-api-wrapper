# LiveChat API wrapper

This modules __single purpose__ is to do API calls to the [LiveChat REST-API](https://developers.livechatinc.com/docs/rest-api/)

## Local development (when included into another service)

Ex: If you want to use the module in another local repo, and automatically get it updated. Go into the other repo and run:

1. `npm link <path-to-this-repo>`
2. `npm link livechat-api-wrapper`

Now the modules contents should automatically get updated in the external repo(service)

##  Setup

```javascript
const LiveChatAPIWrapper = require('livechat-api-wrapper')
const LiveChatAPIClient = new LiveChatAPIWrapper({login: '', apiKey: ''})
```

## Usage

Detailed documentation is available under `out/`. Docs are made using JSDoc (regenerate with command `npm run generate:docs`).