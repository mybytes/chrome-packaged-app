#!/bin/bash

# build bootstrap to target folder "bootstrap"
rm -r bootstrap
make bootstrap

# copy built css to app destination
rm -f -r ../app/css/vendor/bootstrap
mkdir ../app/css/vendor/bootstrap
cp bootstrap/css/*.* ../app/css/vendor/bootstrap

# copy built js to app destination
rm -f -r ../app/js/vendor/bootstrap
mkdir ../app/js/vendor/bootstrap
cp bootstrap/js/*.* ../app/js/vendor/bootstrap
