#!/usr/bin/env bash

ng build ng-logging
cp ./LICENSE dist/ng-logging
cp ./README.md dist/ng-logging

cd dist/ng-logging && npm pack && cd ../..
