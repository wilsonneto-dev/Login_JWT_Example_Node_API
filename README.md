## Login JWT on a Node API
#### Simple example of a JWT authentication on a Node API.

- Encript user's password in registration
- Generate a JWT token on login route
- Protect routes verifying JWT token

#### Routes:

| ENDPOINT 	| POST            | GET       | PUT         | DELETE |
| ------------	| --------------- | --------- | ----------- | ------ |
| /user		  	| register user |       |       |  |
| /auth/login 	| login |  |  |  |
| /auth/refresh	| refresh token |    |  |  |
| 	|            |    |  |  |
| /test	|            | protected route   |  |  |


#### Using libs:

- jsonwebtoken
- bcrypt

- dotenv
- Mongoose
- Express
- Cors
- Nodemon


-----  
:relaxed:  
by: Wilson Neto  
[Linkedin](https://linkedin.com/in/wilsonnetobr/)
[Blog](http://wilsonneto.com.br)
[Github](https://github.com/wilsonneto-dev)  
