#! /bin/sh

prefix=""

# This script generates the index page for the website based on all project in
# the projects folder.

replaceTemplateLiterals() {
	sed -i "s~$1~$2~" ./mainTemplates/.temp.html
	if [ $? -ne 0 ]; then
		echo "Error: Could not generate project page for "$project" with template literal "$1"."
		rm ./mainTemplates/.temp.html
		exit 1	
	fi
}

echo "<!-- This file is generated by indexPageGenerator.sh -->" > index.html

cat ./mainTemplates/head.html >> ./index.html

# for each folder, generate a link to the project page and replace title, and url in the template
for project in projects/"*"
do
	description=$(cat $project/description.html)
	name=$(basename $project)
	echo "Generate project page for project '"$name"'."
	cat ./mainTemplates/project.html > ./mainTemplates/.temp.html
	replaceTemplateLiterals "{{LINK}}" "$prefix/projects/$name/index.html"
	replaceTemplateLiterals "{{TITLE}}" "$name"
	replaceTemplateLiterals "{{GIT}}" "https://github.com/Robotechnic/my-little-projects/projects/$name"
	replaceTemplateLiterals "{{DESCRIPTION}}" "$description"

	cat ./mainTemplates/.temp.html >> ./index.html
done

rm ./mainTemplates/.temp.html

cat ./mainTemplates/end.html >> ./index.html