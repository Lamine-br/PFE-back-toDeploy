#!/bin/bash

# Détection des changements dans les répertoires des microservices
CHANGED_DIRS=$(git diff --name-only $BEFORE $SHA | awk -F'/' '{print $1}' | uniq)

# Exposer les changements pour l'utiliser dans le workflow
echo "changed_dirs=$CHANGED_DIRS" >> $GITHUB_ENV
