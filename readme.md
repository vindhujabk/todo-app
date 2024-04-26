# Installation
Run the following command to clone the repository
```
git clone https://github.com/vindhujabk/todo-app.git
```
Go to ```frontend``` and ```backend``` directory to install packages
```
cd frontend
npm install
```
```
cd backend
npm install
```
# Configuration
Create ```.env``` file inside ```backend``` directory and copy the following code

```
MONGO_URI=Your mongodb URI
PORT=8000
JWT_SECRET=a random secret key eg. arandomsecretkey
REACT_APP_GITHUB_TOKEN=github personal access token
```
# Run the App
Go to ```backend``` and ```frontend``` directory and start the server
```
cd backend
nodemon server
```
```
cd frontend
npm start
```


