Bootstrap 4 Boilerplate
=======================

Starter project for Bootstrap 4 landing pages.

## Clean Up The Boilerplate Project

Run the cleanup script to start a new project:

    ./cleanup.sh

The cleanup script command will:

* Remove the `.git/` directory
* Remove this `README.md` file and replace it with the `README.DIST.md` file
* Remove the `cleanup.sh` script

## Install Instructions

### Prerequisites

You must have `grunt` and `npm` installed.

### Node Packages

Install the node packages:

    yarn install

## Usage Instructions

Build the JS and CSS with GruntJS:

    grunt build

Or to run as a filewatcher, just run `grunt`:

    grunt
