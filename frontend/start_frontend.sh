#!/bin/bash

pwd

cd /app/upfront_frontend || exit
npm install

# Wait for the database to be ready
sleep 15

npm run serve
