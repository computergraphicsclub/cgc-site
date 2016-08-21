# Website project


## Setting Up

### Prerequisites

Download and install the items listed below

1. [Node.js ^v.5 and NPM ^v.3](https://nodejs.org)
2. [MongoDB ^v.3](https://www.mongodb.com/)

### Installation
1. `git clone` this repository
2. `cd` into repository and run `npm install`

### Dealing with Environment Variables

Environment variables are loaded by [dotenv](https://www.npmjs.com/package/dotenv) package. This means a `.env` file must be in root directory of the repository.  A proper `CLOUDINARY_URL` environment variable is required to use Gallery.

1. Run `touch .env`
2. Open `.env` with your text editor and place in necessary variables

### Starting MongoDB

MongoDB is required to be running before starting up the site.  You must first, create a directory for your database path.

1. Select a destination for your database (preferably ~)
2. Run `mkdir data && cd ./data && mkdir db && cd ..`
3. Then, start MongoDB by running `mongod --dbpath ./data/db`


### Starting up the Site

As previously stated, have MongoDB running in the background and then:

1. `cd` into repository
2. Run `node keystone.js`

Go to http://localhost:3000 in your browser to view the site

## Deploy to Heroku

While on master branch `git push heroku master`.
If remote is not yet added, run:

`git remote add heroku https://git.heroku.com/<YOUR-HEROKU-APP-NAME>.git`


## References

1. [KeystoneJS Documentation](http://keystonejs.com/docs/)
2. Here's a good set of [deployment instructions](http://www.infocinc.com/blog/deploy-keystonejs-to-heroku/)
