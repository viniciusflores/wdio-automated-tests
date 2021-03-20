# WDIO Automated Tests

This is a project to test web interfaces and api requests

[![Tested with webdriver.io](https://img.shields.io/badge/tested%20with-webdriver.io-%23ea5906)](https://webdriver.io/)
[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=WEJ2a1JYU1NBOUJBSWRlNGtWNDhXenpqVng0Z1Fmam4rcUYrSUdrQSt1RT0tLTl1bG85ZkFzWXVqeER4b2ZnK0IvZmc9PQ==--15b5fd73e3e9445d6b0a7815b8fc3ef45ecb4243)](https://automate.browserstack.com/public-build/WEJ2a1JYU1NBOUJBSWRlNGtWNDhXenpqVng0Z1Fmam4rcUYrSUdrQSt1RT0tLTl1bG85ZkFzWXVqeER4b2ZnK0IvZmc9PQ==--15b5fd73e3e9445d6b0a7815b8fc3ef45ecb4243)

### Requirements

[Git](https://git-scm.com/)

[Node](https://nodejs.org/en/)

[Yarn](https://yarnpkg.com/)

### Features

[WebDriverIO](https://webdriver.io/) is a Selenium abstraction to set up and runs your web tests;

[Mocha](https://mochajs.org/) framework to execute and describe your tests;

[Chai](https://www.chaijs.com/) assertion library;

[Browserstack](https://www.browserstack.com/) powerful cloud to run web tests;

[Page Objects Pattern](https://martinfowler.com/bliki/PageObject.html)

[Jenkins](https://www.jenkins.io/)

[Allure Reports](http://allure.qatools.ru/)

[Husky](https://typicode.github.io/husky/)

## Getting Started

> :bangbang: **To start developmentt**: Consider to use [vscode](https://code.visualstudio.com/download) as editor to development. In this project is configured the integration to automatic auto-fix code in vscode as configured at eslint!

Clone project:

```git
git clone <https://github.com/viniciusflores/wdio-automated-tests.git>
```

Install dependencies

```js
yarn
```

Run  web tests locally

```js
yarn test
```

Run web tests at Browserstack

```js
yarn test.bs
```

Run api tests

```js
yarn test.api
```

## Reports

### Allure

Run this command to generate the allure report in the directory `./test-report/allure-report`:

```js
yarn report:generate
```

You can run this command to start a server on your machine and open the allure report on the browser:

```js
yarn report:open
```
