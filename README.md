# Xswap Interface

[![Lint](https://github.com/xswap/xswap-interface/workflows/Lint/badge.svg)](https://github.com/xswap/xswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/xswap/xswap-interface/workflows/Tests/badge.svg)](https://github.com/xswap/xswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Xswap -- a protocol for decentralized exchange of Ethereum tokens.

- Interface: [xswap.io](https://xswap.io)
- Discord: [Xswap](https://discord.gg/yFsjhuQ7Kj)
- Telegram: [Xswap](https://telegram.org/@XSwap)
- Twitter: [@XSwap2020](https://twitter.com/XSwap2020?s=09)
- Whitepaper: [Link](https://uniswap.org/whitepaper.pdf)

## Accessing Xswap Interface

[latest release](https://github.com/xswap/xswap-interface/releases/latest), 
or visit [https://xswap.io](https://xswap.io).

## Listing a token

Please see the
[@xswap/default-token-list](https://github.com/xswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Xswap V2 Factory](https://github.com/xswap/xswap-v2-core/blob/master/contracts/XswapV2Factory.sol) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

