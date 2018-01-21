
# Dog Breeds Dashboard

Technical assessment: Dog Breeds Web Dashbar that allows user to consult random images of dogs selected by breed

## Running the project
You can use either npm or yarn to run the project and the tests

```
npm|yarn install
npm|yarn start
```

To check test coverage:
```
npm|yarn test:coverage
```

To generate build:
```
npm|yarn release
```

## Development details
### Coding and Config
- IDE used for coding: Visual Studio Code
- Project started from scratch
  - [X] Webpack development config
  - [X] Webpack production config
  - [X] Minifying
  - [X] Testing environment
  - [X] Eslint
  - [X] Postcss
- Using `react-redux` for data storage and `redux-thunk` to allow actions to return functions instead of actions
- `redux-devtools-extension` configured to run only on dev environment

## Features developed

### Automated tests
- Every single file created in the project has its own testing file which can be found in the same folder level as the source code. Two main extensions were used:
	1.  `.spec` files test React Components. In order to guarantee the resulting HTML structure of components the tests were made through snapshots and they do not have logic.
	2.  `.test` files test `actions`, `reducers`, `sources` and `utils` files. As they have logic the tests were made to guarantee that their behavior did not change (same for smart components or containers).
- Frameworks used for testing:
	1. `enzyme` to render and manipulate rendered React components
	2. `react-test-renderer` to generate snapshots of dumb/stateless components
- Total time spent: 6 hours (configuring webpack: ~5 hours, documenting: ~1 hour)
