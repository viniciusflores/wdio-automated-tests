# wdio-automated-tests

Boilerplate project to run Web tests with WebdriverIO v7 for:

[![Tested with webdriver.io](https://img.shields.io/badge/tested%20with-webdriver.io-%23ea5906)](https://webdriver.io/)
[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=<YOUR-BADGE-KEY>)](https://automate.browserstack.com/public-build/<YOUR-BADGE-KEY>)

### Requirements

[Git](https://git-scm.com/)

[Node](https://nodejs.org/en/) v14

[Yarn](https://yarnpkg.com/)

> If you want to see the report, you will also need [Java 8](https://www.oracle.com/java/technologies/downloads/#java8) or higher. This is a prerequisite of allure reports.

> Consider use [NVM](https://github.com/nvm-sh/nvm) to configure and set you Node version.

### Features

[WebDriverIO](https://webdriver.io/) is a Selenium abstraction to set up and runs your web tests;

[Mocha](https://mochajs.org/) framework to execute and describe your tests;

[Chai](https://www.chaijs.com/) assertion library;

[Browserstack](https://www.browserstack.com/) powerful cloud to run web tests;

[Page Objects Pattern](https://martinfowler.com/bliki/PageObject.html)

[Github Actions](https://docs.github.com/en/actions)

[Allure Reports](http://allure.qatools.ru/)

[Husky](https://typicode.github.io/husky/)

## Getting Started

> ‼️ **To start developmentt**: Consider to use [vscode](https://code.visualstudio.com/download) as editor to development. In this project is configured the integration to automatic auto-fix code in vscode as configured at eslint! Also, remember that is necessary your vscode has an Eslint plugin installed.

Clone project:

```git
git clone <https://github.com/viniciusflores/wdio-automated-tests.git>
```

Install dependencies

```js
yarn
```

Run all web tests locally

```js
yarn test
```

Run all web tests at Browserstack

```js
yarn test.bs
```

Run specific test

```js
yarn test --spec <PATH OF TEST FILE>
```

Run a test suite

```js
yarn test --suite <NAME OF TEST SUITE>
```

Run a test using filter by suite name or test name -> this command executes all tests and in runtime time, filter the results to run. Avoid this option if is possible.

```js
yarn test --mochaOpts.grep "<string/REGEX to search>"
```

## Reports

### Allure

Run this command to generate the allure report in the directory `./allure-results`:

```js
yarn report:generate
```

You can run this command to start a server on your machine and open the allure report on the browser:

```js
yarn report:open
```

## Points to Attention

- For run localy tests, take a look in you [binary drivers](https://webdriver.io/docs/driverbinaries)
