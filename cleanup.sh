#!/bin/sh

current_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ "$current_directory" != '' ]; then
	cd $current_directory
	find . -type f -name '.DS_Store' -exec rm -v {} \;
	rm -rfv $current_directory/.git
	rm -v $current_directory/README.md
	mv -v $current_directory/README.DIST.md $current_directory/README.md
	rm -rfv $current_directory/cleanup.sh
fi

# EOF
