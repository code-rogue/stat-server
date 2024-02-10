# stat-server

# To run app

nest start

# to run tests

npx jest --watchAll

# Migration How-To
node migrate --help # show CLI help

node migrate up # apply migrations
node migrate down # revert the last migration
node migrate down --to 0 # revert all migrations
node migrate up --step 2 # run only two migrations

node migrate create --name new-migration.ts # create a new migration file

# Testing Auth Route
$authUrl = "http://localhost:5000/auth/login"
$authJsonData = '{\"username\": \"admin\", \"password\": \"admin\"}'
curl.exe -s -H "Content-Type: application/json" -d $authJsonData -X POST $authUrl

$profileUrl = "http://localhost:5000/auth/profile"
curl.exe $profileUrl
$token = "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDU1MjU0NjcsImV4cCI6MTcwNjEzMDI2N30.T8Xor82G5qkwZe9ibcpaVRcbuMZS_BOCxGnYhHJXCS0"
curl.exe $profileUrl -H $token


