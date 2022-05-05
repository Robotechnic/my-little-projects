const origin = window.origin + window.location.pathname

const projectContainer = document.querySelector(".projectContainer")

const gitHubLogo = document.createElement("svg")
gitHubLogo.setAttribute("src", `${window.origin}/images/gitHubLogo.svg`)
gitHubLogo.setAttribute("class", "git-hub-logo")


function generateGitHubButton(projectName) {
	const gitHubButton = document.createElement("a")
	gitHubButton.setAttribute("class", "git-hub-link")
	gitHubButton.setAttribute("href", 
		`https://github.com/Robotechnic/my-little-projects/tree/master/projects/${projectName}`
	)
	gitHubButton.appendChild(gitHubLogo.cloneNode(gitHubLogo))
	const text = document.createElement("span")
	text.appendChild(document.createTextNode("See on GitHub"))
	gitHubButton.appendChild(text)
	return gitHubButton;
}

function upperCaseFisrt(text) {
	text = text[0].toUpperCase() + text.slice(1)
	return text
}

function generateProjectCard(projectName, projectDescription) {
	const card = document.createElement("div")
	card.setAttribute("class", "project")
	const title = document.createElement("h2")
	title.setAttribute("class","project__title")
	const projectNameElement = document.createElement("span")
	projectNameElement.setAttribute("class", "project__title__text")
	projectNameElement.appendChild(document.createTextNode(upperCaseFisrt(projectName)))
	title.appendChild(projectNameElement)
	title.appendChild(generateGitHubButton(projectName))
	card.appendChild(title)

	const description = document.createElement("p")
	description.setAttribute("class", "project__description")
	description.innerHTML = projectDescription
	card.append(description)

	const iframeOutline = document.createElement("div")
	iframeOutline.setAttribute("class", "project__iframe-outline")
	iframeOutline.appendChild(document.createTextNode("Click to see the project"))

	iframeOutline.addEventListener("click", () => {
		const iframe = document.createElement("iframe")
		iframe.setAttribute("class", "project__iframe")
		iframe.setAttribute("src", `projects/${projectName}/index.html`)
		iframe.setAttribute("frameborder", "0")
		iframe.setAttribute("allowfullscreen", "")
		iframeOutline.replaceWith(iframe)
	})
	
	card.appendChild(iframeOutline)

	projectContainer.appendChild(card)
}


// load all projects (temporary code)
async function loadProjects() {
	try {
		const result = await fetch(`projects/projects.json`)
		return await result?.json()
	} catch (error) {
		console.error("Failled to load projects")
	}
	return {}
}

loadProjects().then(result => {
	result.forEach(project => {
		generateProjectCard(project.name, project.description)
	})
})