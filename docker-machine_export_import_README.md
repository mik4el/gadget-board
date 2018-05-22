From: https://gist.github.com/schickling/2c48da462a7def0a577e

# `docker-machine` import/export
Script to import and export docker-machine configurations to sync between hosts/collaborators

## Export (on host A)

```sh
$ docker-machine ls
NAME       ACTIVE   DRIVER         STATE     URL                            SWARM   DOCKER    ERRORS
dev        -        digitalocean   Running   tcp://example.com:2376                 v1.10.1

$ ./docker-machine-export.sh dev
Exported machine to dev.zip

$ ls
docker-machine-import.sh
docker-machine-export.sh
dev.zip
```

## Import (on host B)

```sh
$ docker-machine ls
NAME       ACTIVE   DRIVER         STATE     URL                            SWARM   DOCKER    ERRORS

$ ./docker-machine-import.sh dev.zip
Exported machine to dev.zip

$ docker-machine ls
NAME       ACTIVE   DRIVER         STATE     URL                            SWARM   DOCKER    ERRORS
dev        -        digitalocean   Running   tcp://example.com:2376                 v1.10.1
```

### Note

This script requires you to have the same `$MACHINE_STORAGE_PATH/certs` available on all host systems