const withTM = require('next-transpile-modules')(['@i3m/wallet-protocol','@i3m/wallet-protocol-utils','@i3m/wallet-protocol-api', '@i3m/non-repudiation-library']);

module.exports = withTM({
  reactStrictMode: true
})
