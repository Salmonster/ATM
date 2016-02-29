# Angular ATM

A very simple automated teller machine implementation with front-end and back-end test suite. Only accepts the PINS 1111, 2222, 3333, and 4444. Supports deposits and withdrawals. The tech stack is AngularJS, Node, Express, and a SQLite database. The test suite uses Karma, PhantomJS, Mocha, Chai, and Sinon.

## Installation

Clone the repo, cd into the root directory in your terminal and run "npm install" to load all dependencies. Then run "npm start" to start the server. Navigate to localhost:4000 in your browser. Enter one of the abovementioned PINS and click the "Submit PIN" button to see the balance associated with that PIN from the database. Upon entering amounts to deposit or withdraw and clicking the appropriate button, the balance change in the browser view will be reflected in the database. This can be verified by running "sqlite3 ATM.db" in the terminal followed by "select * from pins;". Exit SQLite3 with the command ".quit".

## Testing

To run the test suite, exit the server and run "npm test". In addition to the test results in the terminal, you will notice in the repo's root directory a folder named "coverage". If you open the html files contained therein you will see the karma-coverage reports for code coverage.