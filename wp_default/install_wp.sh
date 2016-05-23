#!/bin/bash

# Installation:

# Install the script in one of the folders in your PATH. Make sure it has execute permissions (i.e. chmod +x wp-install-core-sub-dir).

#Usage:

# $ mkdir mysite
# $ cd mysite
# $ wp-install-core-sub-dir

# This is a simple script as an example, it could be improved by accepting parameters etc.

DB_NAME=wpclitest
DB_USER=db
DB_PASS=

SITE_TITLE='WordPress CLI Test Site'
SITE_USER=admin
SITE_PASS=password
SITE_EMAIL=your@email.com

# download WordPress files
wp core download

# create the wp-config.php file
wp core config --dbname=$DB_NAME --dbuser=$DB_USER --dbpass=$DB_PASS

# create the dabase
wp db create

# install WordPress (less than 5 mins)
wp core install --url=$SITE_URL --title="$SITE_TITLE" --admin_user=$SITE_USER --admin_password=$SITE_PASS --admin_email=$SITE_EMAIL

echo "require __DIR__ . '/vendor/autoload.php';" >> index.php

echo 'Install finished!'
