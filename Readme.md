Project is written in JS (with babel), React, PostCSS and json-server

To run application, first install dependencies:

``npm run install``

Then, there are two ways to start.

1. With development mode: ``npm run start``

2. With production mode: ``npm run start:prod``

After start, go to ``http://localhost:5000`` to use application.

There is a simple json-server started in background with which UI application is communicating to fetch and update data.
Data is persisted on filesystem, so nothing gets lost.

**Tests**

To run tests: 

``npm run test``

Tests are written with Jest and Enzyme libraries.

**Lint**

ESLint is used in this project, to run it: ``npm run lint``, however, linting is done automatically when building application in production mode.

**NOTE:**

- Node 9+ is required to build project / run tests.
- Project is not yet working on IE11 (or lower), best to use Chrome or Firefox
