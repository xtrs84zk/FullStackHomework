# Full Stack Engineer HOMEWORK

This project is an implementation of web pages and authentication usign AWS SAM, AWS Lambda Layers and React.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed:

- Node.js 18x
- AWS SAM CLI
- AWS CLI

A file for automatic node version change is included at the root of the project. You can automate it with [nvm](https://github.com/nvm-sh/nvm#nvmrc) or simply run 
```bash
nvm use
```

You can install AWS CLI with the instructions in https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

You can install AWS SAM CLI with the instructions in https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

The secrets have to be defined in AWS Secrets Manager. The following secrets are needed:
```bash
MONGODB_URI # The URI to connect to the MongoDB database
MONGODB_USER # The user to connect to the MongoDB database
MONGODB_PASSWORD # The password to connect to the MongoDB database
JWT_SECRET # The secret to sign the JWT tokens
``````

### Installing

```bash
cd backend
npm install
cd ../frontend
npm install
```

### Running in development mode

For the lambda functions
```bash
cd backend
sam build
sam local start-api
```

For the frontend
```bash
cd frontend
npm start
```

### Deployment

```bash
sam build
sam deploy --guided
```
Note: I couldn't figure out how to deploy the frontend with SAM, but the current progress can be seen in backend/buildspec.yml and the website section of the template.yml file.

### Questions to answer after implementation
1. What is a JWT and how is it used in the context of authentication?
```
A JWT is a JSON Web Token. It is a standard for creating tokens that assert some number of claims. It is used to authenticate users in a stateless way. The server doesn't need to keep track of the user session, it just needs to verify the token.
```
2. What is the difference between a serverless architecture and a traditional server-based architecture?
```
In a traditional server-based architecture, the server is always running and waiting for requests. In a serverless architecture, the server is only running when it is needed. This allows for a more efficient use of resources. However, that same 'only when needed' implies that the first request (the warmup) will take longer. Also, sometimes the parts of a system have to share so much information that it would be simpler to have them all in a single server for context sharing.
```
3. What is a "layer" in the context of AWS Lambda and what is its purpose?
```
It's a way to share code between functions. It's useful to share code that is used by multiple functions, like a database connection or common utilities.
```
4. Why is it important to protect an application against XSS attacks, and what measures can be taken to prevent them?
```
Cross Site Scripting attacks are a way to inject malicious code into the website, sometimes it can be leveraged to alter the website displayed to other users, or to steal information from the user. To prevent them, the user input should be sanitized before being displayed in the website. Setting the correct headers can also help prevent them.
```
5. What are the advantages and disadvantages of using a NoSQL database like MongoDB compared to a relational database?
```
Authentication was weird. The advantages are the speed to develop and the flexibility.
```
6. What are some best practices for handling HTTP status codes in a RESTful API?
```
DELETE operations should return a 204 most of the time, as it is an idempotent operation.
GET operations should return a 200 or a 404 if the resource is not found.
POST operations should return a 201 if the resource was created, and a 400 if the request was malformed.
```
7. How can pagination be implemented in a long list of rewards to improve performance and user experience?
```
It can be implemented both in the frontend and the backend, frontend can leverage virtualized sets to display only a range of a big array, and the backend can return only a range of the results. If having access to modify both, the frontend can be configured in a way so that the button to display more actually requests more data from the backend.
```

## Built With
- Typescript
- React
- Redux Toolkit
- AWS SAM
- AWS Lambda Layers
- AWS Secrets Manager
- Makefile
- MongoDB
- Mongoose
- Mui
- React Router
- Sonner