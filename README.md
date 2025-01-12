# Grid Mini-App Template

A template project demonstrating how to build mini-apps interacting with Universal Profiles on Universal Everything, using the [up-provider package](https://github.com/lukso-network/tools-up-provider).

## Overview

This template showcases:
- [UP-Provider](https://github.com/lukso-network/tools-up-provider) implementation and wallet connection on the Grid
- Profile search functionality using Envio integration for fast querying
- Integrates the [@lukso/web-components](https://www.npmjs.com/package/@lukso/web-components) library for ready-to-use branded components
- Uses the [erc725js](https://docs.lukso.tech/tools/dapps/erc725js/getting-started) library to fetch profile data from the blockchain

## Key Features

### UP-Provider Integration
The template demonstrates how to:
- Connect to Universal Profile browser extension from the Grid
- Manage UP contexts on the Grid

### Envio Integration
Shows how to:
- Query the LUKSO Envio indexer
- Search for Universal Profiles
- Display profile information and images

### Web Components
Shows how to:
- Use the [@lukso/web-components](https://www.npmjs.com/package/@lukso/web-components) library to display profile images

### ERC-725.js
Shows how to:
- Use the [erc725js](https://docs.lukso.tech/tools/dapps/erc725js/getting-started) library to fetch profile data from the blockchain

## Getting Started

1. Install dependencies:
```bash
yarn install
```
2. Run the development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.(Note that the Grid context is not available in the local environment)

## Project Structure

- `components/GridProvider.tsx`: Core UP Provider implementation and wallet connection logic
- `components/Search.tsx`: Example of Envio integration for profile search
- `components/Donate.tsx`: Example use-case of this template. Uses the client from the up-provider package to interact with the blockchain
- `components/LuksoProfile.tsx`: Example of using the [@lukso/web-components](https://www.npmjs.com/package/@lukso/web-components) library to display profile images that is fetched using the [erc725js](https://docs.lukso.tech/tools/dapps/erc725js/getting-started) library
- `components/LuksoUsername.tsx`: Example of using the [@lukso/web-components](https://www.npmjs.com/package/@lukso/web-components) library to display profile images that is gathered from the Envio indexer

## Learn More

- [LUKSO Documentation](https://docs.lukso.tech/) - Learn about LUKSO ecosystem
- [UP Browser Extension](https://docs.lukso.tech/guides/browser-extension/install) - Install the Universal Profile Browser Extension
- [erc725js](https://docs.lukso.tech/tools/dapps/erc725js/getting-started) - Learn about the erc725js library 
- [@lukso/web-components](https://www.npmjs.com/package/@lukso/web-components) - Learn about the @lukso/web-components library


## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
