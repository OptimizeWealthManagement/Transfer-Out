# Account Transfer Out Module

Recently HubSpot has released "CMS JS Building Blocks" for general availability. Read documentation and [view examples here](https://github.com/HubSpot/cms-js-building-block-examples). The "building blocks" feature directly integrates React on the server and the client with HubSpot and enables building HubSpot modules in React. Further, it builds on the [HubSpot Developer Projects](https://developers.hubspot.com/docs/platform/create-a-project) system which provides CI/CD build and deploy functionality.

## About

When a user wishes to swap out from using Optimize to another institution we need to retrieve a few things
- Using the users ```contact_id``` we should retrieve all of their accounts and information regarding their Wealth Planner and Portfolio Manager
- After retriving their information the user fills out a form that kicks off a [ticket creation job](https://app.hubspot.com/design-manager/7515101/file/168397616141) in hubspot 

## Getting Started

For more information on local development tools, see [Local Development Tooling: Getting Started](https://designers.hubspot.com/docs/tools/local-development)

### Configuration

#### Set up HubSpot CMS CLI ([`@hubspot/cli`](https://www.npmjs.com/package/@hubspot/cli))
- A config file named `hubspot.config.yml` will also be needed.  The config can be at the project level or higher up in the directory tree.
- Be sure to set a `defaultPortal` in your `hubspot.config.yml` to which you'd like the built app files to sync.

### Install
- Run `npm install` or `yarn install` to install needed dependencies.

### Running
- Run `npm start` or `yarn start` to automatically upload your project to `defaultPortal`.
- Create a page from default theme, or any drag-and-drop (`dnd_area`) enabled template in your portal, and add the `app (label: React app boilerplate)` module.
- Note: Once you run npm start, your changes will sync with the module on hubspot. If you don't want changes to go through, revert on hubspot, stop your server and do not publish

### package.json scripts
- `start` : Builds project with webpack, uploads to your `defaultPortal` specified in `hubspot.config.yml` and watches for changes via [`@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin`](https://www.npmjs.com/package/@hubspot/webpack-cms-plugins).
- `build` : Clears `/dist` contents and builds project into `/dist`.
- `deploy` : Clears `/dist` contents, builds project into `/dist`, and uploads to via [`@hubspot/cli`](https://www.npmjs.com/package/@hubspot/cli).
- `lint` : Lints CSS, JS, and JSON files via `eslint` ([documentation](https://eslint.org/docs/user-guide/configuring)) and checks for formatting via `prettier`([documentation](https://prettier.io/docs/en/configuration.html)) in `src`.
  - For configs, see `prettier.config.js` and `eslintrc.js`.
- `prettier:write` : Formats JS and JSON files in `src`.
  - For configs, see `prettier.config.js`.
