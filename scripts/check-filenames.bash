#!/bin/bash

# Check if script is called with the '--fix' parameter
if [ "$1" == "--fix" ]; then FIX=1; else FIX=0; fi

# Get the folder where the script is located
SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# cd into the parent folder to reference folders relative to it
pushd $SELFDIR/.. > /dev/null 2>&1

if [ `ls -1 ./nominees/*.json 2>/dev/null | wc -l` -gt 0 ]; then
	for f in ./nominees/*.json; do
	    filename=`grep -Eo -m 1 '"name":.*?[^\\]",' "$f" | awk -F':' '{print $2}' | sed -e 's/"//g' -e 's/,//g' -e 's/^[[:space:]]*//' -e 's/[[:space:]]/-/g' -e 's/---/-/g' -e 'y/āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙÜǕǗǙǛ@/aaaaeeeeiiiioooouuuuuuuuuAAAAEEEEIIIIOOOOUUUUUUUUUa/'| tr '[:upper:]' '[:lower:]'`
	    if [ "$filename.json" = "$(basename -- "$f")" ]; then
	    	echo "Filename is valid: $filename.json"
	    else
	    	if [ $FIX = 1 ]; then
				git mv "$f" "./nominees/$filename.json"
				echo "Filename has been renamed: $filename.json"
	    	else
	    		echo "Filename is not valid: $(basename -- "$f"), it should be $filename.json, where the filename must match the 'name' field in kebab case."
	    		echo "Run this script with --fix to rename the file(s) automatically."
	    		popd > /dev/null 2>&1
				exit 1
			fi
	    fi
	done
fi

# return to the folder where this script was called from
popd > /dev/null 2>&1