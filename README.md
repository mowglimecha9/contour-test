# Contour Test Submission: Mowgli Mecha

## Available Scripts

In the project directory, you can run:


## FIRST THINGS FIRST
`npm installl` to install all the packages

### `yarn start`

This command will run 2 scripts
`node server.js` and `create-react-app start`
they are ran together using `concurrently`

`node server.js` is an express js file that will provide the endpoints. If a specific endpoint is accessed on the client side application it will send a json response.

`create-react-app start` running the client side application


## How to Use

After the build is done. The user will be redirected to the account list page. Provided by the `/accounts` endpoint. It will display 4 accounts. Once an account is clicked It will transition into the Transaction list. Once a Transaction is clicked a pop-up will show for the transaction details.

