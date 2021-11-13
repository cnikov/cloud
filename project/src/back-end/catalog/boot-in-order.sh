#!/bin/bash -
#===============================================================================
#
#          FILE: boot-in-order.sh
#
#         USAGE: ./boot-in-order.sh
#
#   DESCRIPTION:
#     Waits until the deamon of CouchDB starts to create a database. The
#     environment variable DB_URL contains more details of such DB
#     (name, authentication information of administrator, etc).
#       OPTIONS: ---
#  REQUIREMENTS: This script makes use of the environment variables DB_NAME and
#     DB_URL, be sure that such variables were defined before running this script.
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Raziel Carvajal-Gomez (), raziel.carvajal@uclouvain.be
#  ORGANIZATION:
#       CREATED: 10/08/2018 09:20
#      REVISION:  ---
#===============================================================================

echo "Wait (indefenitly) until the DB creation (name: ${DB_NAME_C})."
echo "The DB URL is: ${DB_URL_C}"
until curl --request PUT ${DB_URL_C} ; do
  echo -e "\t DB (${DB_NAME_C}) wasn't created - trying again later..."
  sleep 2

echo "DB (${DB_NAME_C}) was created!"
echo "Start users service..."
npm start
cd jsons
source post_db.sh ${DB_URL_C}
cd ..

echo "Apply a formatter for each view"
mkdir formatter_output
DEBUG=views* node func_to_string.js
if [[ ${?} != 0 ]]; then
  echo -e "ERROR: during the creation of views\nEND OF \{0}"
  exit 1
fi
echo -e "\tDONE"

cd formatter_output
echo "Creation of views for users DB"
for view in `ls *.js`; do
  curl --request PUT "${DB_URL_C}/_design/queries" --upload-file ${view}
  if [[ ${?} != 0 ]]; then
    echo -e "ERROR: during the creation of view ${view}\nEND OF \{0}"
    exit 1
  fi
done
echo -e "\tDONE"

echo "END OF ${0}"
