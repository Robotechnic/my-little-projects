#! /bin/sh

# This script generates the json page for the website based on all project in
# the projects folder.

echoJSon() {
	echo -n $1 >> projects/projects.json
}

echo "" > projects/projects.json

echoJSon "["


first="1"
for project in projects/*; do
	if [ -d "$project" ]; then
		name=$(basename "$project")
		description=$(cat "$project/readme.html")

		if [ $first == "1" ]; then
			first="0"
		else
			echoJSon ","
		fi

		echoJSon "	{"
		echoJSon "		\"name\":\"$name\","
		echoJSon "		\"description\":\"$description\""
		echoJSon "	}"
	fi
done

echoJSon "]"
