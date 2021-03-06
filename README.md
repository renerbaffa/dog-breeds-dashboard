
# Dog Breeds Dashboard

Technical assessment: Dog Breeds Web Dashbar that allows user to consult random images of dogs selected by breed.

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
- Local data was stored in the component's state level
- Redux was used in order to store and manage the data that is shared among the app
- Using `react-redux` for data storage and `redux-thunk` to allow actions to return functions instead of actions
- `redux-devtools-extension` configured to run only on dev environment
- Total time spent: 24 hours (configuring webpack: ~6 hours, documenting: ~1 hour, coding: ~8 hours, testing: ~9 hours)

## Features developed
[X] View all breeds
[X] Filter breeds
[X] Select breed
[X] Check random dog image according to breed selected
[X] Get new random dog image

### Automated tests
- Every single file created in the project has its own testing file which can be found in the same folder level as the source code. Two main extensions were used:
  1.  `.spec` files test React Components. In order to guarantee the resulting HTML structure of components the tests were made through snapshots and they do not have logic.
  2.  `.test` files test `actions`, `reducers`, `sources` and `utils` files. As they have logic the tests were made to guarantee that their behavior did not change (same for smart components or containers).
- Frameworks used for testing:
  1. `enzyme` to render and manipulate rendered React components
  2. `react-test-renderer` to generate snapshots of dumb/stateless components
  3. `axios-mock-adapter` to mock and simulate requests and HTTP responses
- Current coverage:
	- **100%** Statements `159/159`
	- **100%** Branches `48/48`
	- **100%** Functions `56/56`
	- **100%** Lines `156/156`

### Architecture details
- `communication` redux state were created in order to store loading flags. Those flags are retrieved from meta tag inserted in the action payload (see `reducers/communication`).
- `normalizers` are the files responsible for get raw data and convert it to expected pattern
- `sources` are the files responsible for request information from backend, decoupling the request code from the actions and components.
- `adapter` concept were applied for basic components (see all components in `components/shared` folder).

### Next steps
If I had more time, I would consider the following options:
- Integrate the app with docker in order to provide a more completed solution
- Adopt Progressive Web App (PWA) concepts
- Work to improve production build
- Configure webpack to allow imports relativly from `src/` and not use relative
  - `babel-plugin-module-resolver` and `eslint-import-resolver-babel-module` would help
