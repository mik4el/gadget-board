## Introduction
This is a web app showing latest data from mik4el's gadgets using Django, Angular2 and Docker. The app is currently available at https://m4bd.se.

The web app is separated into a backend `web/gadget_board_backend` using Django and a frontend `web/gadget_board_frontend` using Angular2. 

The full stack is running in Docker containers and consists of: 

1. "nginx_dev" or "nginx_prod": nginx for web server and serving static files.
4. "web": Django served by gunicorn.
2. "postgres": the postgres database. 
3. Persisting data volumes "postgres_data_dev" or "postgres_data" for the database.

This is also my way to learn what can be considered to be efficient development and deployment workflows in 2016. My goal's for the workflow is:

* Closely mimick development environment and production environment
* Quick feedback loop from code change to feature in development
* Fast deployment to production of the entire stack as well as small updates
* Entire stack is in repo
* Easy to add services
* Deployment agnostic for hosting providers

Suggested reading and inspiration for this repo:
https://realpython.com/blog/python/django-development-with-docker-compose-and-machine/ (Good concept and introduction but some code is out-of-date and following instructions will not give a working setup, see blog comments for more info)

## Requirements
* Docker-Toolbox with Docker-Compose >1.7.1 (https://www.docker.com/products/docker-toolbox)
* At least node v5.x.x and npm 3.x.x 
* gulp installed globally (`sudo npm install --global gulp-cli`)

## Setting up a development environment
This will start a new development environment and serve the web app on your machine. This requires the download of all depedencies which will take some time.

1. `docker-machine create -d virtualbox dev`
1. `eval $(docker-machine env dev)`
1. Make your own `.env`-file with credentials e.g. `cp .env_template .env`
1. `docker-compose build`
1. `docker-compose up -d`
1. `docker-compose run web python manage.py migrate`
1. `docker-compose run web python manage.py createsuperuser`
1. `cd web`
1. `npm install`
1. `gulp build`
1. Open a browser at the ip from `docker-machine ip dev`
  
## Development workflow Django
For normal development work, I suggest this workflow:

1. Make change in Django related code, run `manage.py` commands using `docker-compose run web python manage.py startapp` etc...
2. Reload browser, run tests etc.

Special cases:

* Make sure no old code is running if you are changing e.g. `settings.py` or `urls.py` by restarting the web container. Do this with `docker-compose restart web`.
* Run `manage.py` commands using `docker-compose run`, e.g. `docker-compose run web python manage.py makemigrations`.
* If you restart your computer etc, you may need to restart the machine running the containers, do so by:
  1. `docker-machine start dev`
  1. `eval $(docker-machine env dev)`(also when you open a new terminal)

### Adding a dependency
When you add a dependency to `web/requirements.txt` you need to build a new container image and restart the container with this new image, this is done by:

1. `docker-compose build web`
1. `docker-compose up -d`
1. Possibly run `docker-compose run web python manage.py collectstatic` or other commands your dependency requires. NB: collectstatic needs to be run in the development workflow for static files to be saved in the static-dir, this is not possible to do on deployed containers.

## Development workflow Angular2
For normal development work, I suggest this workflow:

1. Make change in source file in `gadget_board_frontend`
1. `gulp build`
1. Reload browser

### Adding a dependency
Angular2 dependencies are handled by npm, built by gulp and loaded by systemjs, therefore:

1. Add dependency in `package.json`.
1. If the dependency should be used in the app and served as a static file:
  1. Add path to node_module for dependency in gulpfile.js either as file or dir in tasks `copy:lib_dirs` or `copy:lib_files` 
  1. Add path to dependency in `systemjs.config.dev.js` and if necessary in `systemjs.config.prod.js` 
1. `npm install`
1. `gulp build`
1. Reload browser

## First deployment
Now we need to set up the production environment to which you are deploying. By using Docker the production environment is very agnostic to what provider you choose. I like DigitalOcean for small projects that can grow but there are many options. Doing the first deployment requires you to migrate the database for the first time, also we use a different docker-compose file so you need to rebuild the container images.

1. Get working SSL certs e.g. by following the steps below.
1. Get an access token for your DigitalOcean account.
1. `docker-machine create -d digitalocean --digitalocean-access-token=<token> --digitalocean-region=fra1 production` (use same region where your floating ip is for the domain you use in SSL)
1. `eval $(docker-machine env production)`
1. `docker-compose -f production.yml build`
1. `docker-compose -f production.yml up -d`
1. `docker-compose -f production.yml run web python manage.py migrate`

### Setting up SSL
Since the app handles user data securing traffic using SSL is a requirement for production. To set it up on the production nginx container I followed these steps:

1. Have a domain ready that you control. It is nice to point the domain towards a floating ip from e.g. DigitalOcean so you can change the production environment without needing to update your dns.
1. Find a suitable SSL certificate authority (CA), I use positivessl from namecheap.com. For SSL certs with short expiration dates there are also free options but that is a hassle so I value buying an SSL cert.
1. Make a csr-file by running `openssl req -newkey rsa:2048 -nodes -keyout example.com.key -out example.com.csr` and go through the process of obtaining the cert. Save the key and csr file safely on your local machine.
1. When you have got all the cert files back from your CA, prepare the cert for nginx by following e.g. `https://www.namecheap.com/support/knowledgebase/article.aspx/9419/0/nginx`. Store the files safely on your local machine.
1. Download root certificate from your CA, e.g. `https://www.namecheap.com/support/knowledgebase/article.aspx/9393/69/where-do-i-find-ssl-ca-bundle`, save it as `PositiveSSLBundle.cer`
1. Make a dhparam.pem file by running `openssl dhparam 2048` and store safely.
1. Copy over the files to a new directory `ssl`in folder `nginx`. They will not be added to git.

## Deploying
When you are deploying the next time we also need to rebuild the container that has changed files since the production environment does not mount your local machines files.

1. `gulp build-prod`
1. `docker-compose -f production.yml build`
1. `docker-compose -f production.yml down`
1. `docker-compose -f production.yml up -d`

NB: If in a new terminal remember `eval $(docker-machine env production)`.


## Testing
Testing in Django is handled by the default Django test system, so running tests is easy, e.g:

* `docker-compose run web python manage.py test`

Testing in Angular2 is handled by jasmine, run the tests by:

* Going to `/unit-tests.html`in your browser.
* Add a test by following e.g. https://angular.io/docs/ts/latest/guide/testing.html and then import the spec-file in `unit-tests.html`

## Backing up
A deployed environment can be backed up by your hosting provider, e.g. DigitalOcean. Since this is a very stateless deployment you can also make a scripted backup of your database and make it possible to easily restore the database from a backup. This will save some on hosting costs and make for a cleaner more controllable solution.

## Limitations
* Stack not optimized for performance, uses sensible defaults atm.
* Non optimized frontend build system. No cache busting for frontend files, lots of requests, no template caching etc.
* App and stack not thourougly tested on lots of devices over long time
* Development and deploy workflow not thouroughly tested by lots of developers over long time
* https://cli.angular.io/ is coming but not stable yet, this should be the favored build system for angular2.

## Known issues
* https://github.com/gulpjs/gulp/issues/1571

## Todos
1. Backend: Backend for gadget data
  1. Backend: Make and test gadget data get endpoint
  1. Backend: Make and test gadget data post endpoint, only users with permission can post
  1. Backend: Post data from gadget with external script authed by JWT
1. Frontend: Show gadget data
1. Frontend: Clean out Heroes-app
1. Frontend: Fix design
1. Frontend: Use latest angular2-router
1. Frontend: Redirect to login if unauthed when accessing protectad view
1. Refresh JWT tokens in background
1. Use new ngForm https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN_7B4meyWK0Y/pub
1. Neat css builds with less and bootstrap
1. Suggest simple script for backup.
1. Add fields thumbnail, image to `gadget` and persist uploaded files