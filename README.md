## Introduction
This is a web app showing latest data from mik4el's gadgets using Django, Angular2 and Docker. The app is currently available at https://m4bd.se.

The web app is separated into a backend `web/gadget_board_backend` using Django and a frontend `web/gadget_board_frontend` using Angular2. 

The stack running in Docker containers consists of nginx for web server and serving static files, postgres for database and Django served by gunicorn.

This is also my way to learn what can be considered to be efficient development and deployment workflows in 2016. My goal's for the workflow is:

* Closely mimick development environment and production environment
* Quick feedback loop from code change to feature in development
* Fast deployment to production of the entire stack as well as small updates
* Entire stack is in repo
* Easy to add services
* Deployment agnostic for hosting providers

Suggested reading and inspiration for this repo:
https://realpython.com/blog/python/django-development-with-docker-compose-and-machine/ (Good concept and introduction but some code is out-of-date and following instructions will not give a working setup, see blog comments for more info)

## Quickstart
This will start a local development environment and serve the web app on your machine.

2. Fork or clone repo: `git clone git@github.com:mik4el/gadget_board.git`
1. Install Docker-Compose (https://docs.docker.com/compose/install/)
1. `cd gadget_board`
2. `docker-machine create -d virtualbox dev`
3. `eval $(docker-machine env dev)`
4. `docker-compose build`
1. `docker-compose up -d`
1. `docker-compose run web python manage.py migrate`
1. `docker-compose run web python manage.py createsuperuser`
1. Open a browser at the ip from `docker-machine ip dev`
  
## Development workflow Django
For normal development work, I suggest this workflow:

1. Make change in Django related code, run `manage.py` command using `docker-compose run web python manage.py startapp` etc...
2. Reload browser.

Special cases:

* Make sure no old code is running if you are changing e.g. `settings.py` or `urls.py` by re-creating the web container. Do this with `docker-compose up -d web`.
* Run `manage.py` commands using `docker-compose run`, e.g. `docker-compose run web python manage.py makemigrations`.

### Adding a dependency
When you add a dependency to `web/requirements.txt` you need to build a new container image and restart the container with this new image, this is done by:

1. `docker-compose build web`
2. `docker-compose up -d`
3. Possibly run `docker-compose run web python manage.py collectstatic` or other commands your dependency requires. NB: collectstatic needs to be run in the development workflow for static files to be saved in the static-dir, this is not possible to do on deployed containers.

## Development workflow Angular2
For normal development work, I suggest this workflow:

1. Make change in 

### Adding a dependency
Add Angular2 dependency.

## First deployment
Doing the first deployment.
### Setting up SSL
How to setup SSL.

## Deploying
How to deploy the next time.

## Testing
How to test.

## Limitations
* Stack not optimized for performance, uses sensible defaults atm.
* Non optimized frontend build system. No cache busting for frontend files, lots of requests, no template caching etc.
* App and stack not thourougly tested on lots of devices over long time
* Development and deploy workflow not thouroughly tested by lots of developers over long time

## Todos
1. Finish first version of README
2. Make deployable release
3. Frontend: Nicer bundling of gadget_board_frontend
3. Frontend: Cache busting for gadget_board_frontend
4. Backend: Backend for saving and getting gadget data, 
  1. Backend: Save data with admin
  1. Backend Save data with external script authed by JWT
6. Frontend: Show gadget data
7. Frontend: Clean out Heroes-app
8. Frontend: Fix design
9. Frontend: Use latest angular2-router
10. Frontend: Redirect to login if unauthed when accessing protectad view
11. Refresh JWT tokens in background
