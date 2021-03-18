#!/bin/bash

set -e

git add .
read -p "Enter commit message: " msg
git commit -m "$msg"
git push