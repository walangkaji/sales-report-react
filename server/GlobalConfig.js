const config = require('../config')

const PRODUCTION = {
  Hostname: 'https://m.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_'
  },
  Ace: {
    Hostname: 'https://ace.tokopedia.com'
  },
  Accounts: {
    Hostname: 'https://accounts.tokopedia.com',
    Callback: 'https://m.tokopedia.com/appauth/code'
  },
  Lite: {
    Hostname: 'https://m.tokopedia.com'
  },
  Saldo: {
    Hostname: 'http://192.168.16.110'
  },
  Mojito: {
    Hostname: 'https://mojito.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://orderapp.tokopedia.local/'
  },
  Points: {
    Hostname: 'https://points.tokopedia.com',
    Secret: '4lclover'
  },
  Redis: {
    host: '',
    port: ''
  },
  WS: {
    Hostname: 'https://ws.tokopedia.com'
  }
}

const TEST = {
  Hostname: 'https://m-staging.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_Coba_'
  },
  Ace: {
    Hostname: 'https://ace-staging.tokopedia.com'
  },
  Accounts: {
    Hostname: 'https://accounts-staging.tokopedia.com',
    Callback: 'https://lite-staging.tokopedia.com/appauth/code'
  },
  Lite: {
    Hostname: 'https://lite-staging.tokopedia.com'
  },
  Saldo: {
    Hostname: 'https://saldoapp-staging.tokopedia.com'
  },
  Mojito: {
    Hostname: 'https://mojito-staging.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://10.0.11.60'
  },
  Points: {
    Hostname: 'https://points-staging.tokopedia.com',
    Secret: '4lclover'
  },
  Redis: {
    host: '10.0.11.50',
    port: 6381
  },
  WS: {
    Hostname: 'https://ws-staging.tokopedia.com'
  }
}

const DEVELOPMENT = {
  Hostname: 'https://m-staging.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_Coba_'
  },
  Ace: {
    Hostname: 'https://ace-alpha.tokopedia.com'
  },
  Accounts: {
    Hostname: 'http://192.168.100.160:8009',
    Callback: 'http://localhost:3000/appauth/code'
  },
  Lite: {
    Hostname: 'http://localhost:3000'
  },
  Saldo: {
    Hostname: '192.168.100.160:9093'
  },
  Mojito: {
    Hostname: 'https://mojito-alpha.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://172.16.20.88:9000' // contact vicky.sukarma @mattermost if it's down
  },
  Points: {
    Hostname: 'http://192.168.100.160:8005',
    Secret: '4lclover'
  },
  Redis: {
    host: '127.0.0.1',
    port: 6379
  },
  WS: {
    Hostname: 'https://ws-alpha.tokopedia.com'
  }
}

let globalConfig = DEVELOPMENT
if (config.globals.__DEV__) {
  globalConfig = DEVELOPMENT
} else if (config.globals.__TEST__) {
  globalConfig = TEST
} else if (config.globals.__PROD__) {
  globalConfig = PRODUCTION
}

globalConfig['AppSecret'] = process.env.TOPED_LITE_APP_SECRET || 'no-secret'
globalConfig['Accounts']['ClientID'] = process.env.TOPED_LITE_CLIENT_ID || '0001'
globalConfig['Accounts']['SecretKey'] = process.env.TOPED_LITE_SECRET_KEY || 'no-secret'
globalConfig['Accounts']['AuthorizePath'] = '/authorize'
globalConfig['Accounts']['TokenPath'] = '/token'
globalConfig['Cookie']['Domain'] = '.tokopedia.com'
globalConfig['Cookie']['MaxAge'] = 259200

module.exports = globalConfig