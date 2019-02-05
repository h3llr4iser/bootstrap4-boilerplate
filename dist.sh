#!/bin/sh

# prepare the deliverables for distribution

# get current directory name
result=${PWD##*/}
directory=$(printf '%q\n' "${PWD##*/}")

# validate directory name variable
if [ "$directory" == "" ]; then
  echo "This script requires a value for the directory variable. Aborting." >&2; exit 1;
fi

# exit if the ditto command is not found
echo "Checking requirements..."
command -v ditto >/dev/null 2>&1 || { echo "This script requires ditto but it's not installed. Aborting." >&2; exit 1; }
echo "All requirements are met. Proceeding."

# remove old version of files
echo "Removing previous distribution files..."
if [ -d "../$directory-dist/" ]; then
  rm -rfv "../$directory-dist/"
fi
if [ -f "../$directory-dist.zip" ]; then
  rm -rv "../$directory-dist.zip"
fi

# pause a moment to let the files finish deleting
sleep 1

# create the directory structure
echo "Creating directory structure..."
if [ ! -d "../$directory-dist/" ]; then
  mkdir -p ../$directory-dist/
fi
if [ ! -d "../$directory-dist/images/" ]; then
  mkdir -p ../$directory-dist/images/
fi
if [ ! -d "../$directory-dist/css/" ]; then
  mkdir -p ../$directory-dist/css/
fi
if [ ! -d "../$directory-dist/js/" ]; then
  mkdir -p ../$directory-dist/js/
fi
if [ ! -d "../$directory-dist/fonts/" ]; then
  mkdir -p ../$directory-dist/fonts/
fi

# copy over the required files for the distribution directory
echo "Copying files..."
cp -v ./*.html ../$directory-dist/
cp -Rv ./images/* ../$directory-dist/images
cp -Rv ./css/* ../$directory-dist/css
cp -Rv ./js/* ../$directory-dist/js
cp -Rv ./fonts/* ../$directory-dist/fonts
cp -Rv ./*.png ../$directory-dist/
cp -Rv ./favicon.ico ../$directory-dist/
cp -Rv ./browserconfig.xml ../$directory-dist/
cp -Rv ./manifest.json ../$directory-dist/

# remove files not required
echo "Removing files..."
find "../$directory-dist/" -name '.DS_Store' -type f -exec rm -v {} \;
find "../$directory-dist/" -name '.gitkeep' -type f -exec rm -v {} \;
rm -v "../$directory-dist/css/style.css"
rm -v "../$directory-dist/js/script.js"

# rename home.html document to index.html
#mv ../$directory-dist/home.html ../$directory-dist/index.html

# adjust home.html url path in markup
#find ../$directory-dist/*.html -type f -exec sed -i '' -e 's#home.html#index.html#' {} \;

# add files to a PKzip archive
echo "Creating ZIP archive..."
curdate=$(date +"%Y-%m-%d")
ditto -c -k --sequesterRsrc --keepParent "../$directory-dist" "../$directory-$curdate.zip"

echo "Created ../$directory-$curdate.zip"
echo "Done."

# eof
