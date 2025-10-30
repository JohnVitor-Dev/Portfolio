async function fetchProjects() {
    const url = "https://cdn.jsdelivr.net/gh/JohnVitor-Dev/Portfolio@main/projects.json";
    const projectsGrid = document.getElementById("projects-grid");


    const GitHubIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>`;
    const ExternalLinkIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125-1.125h-4.5A1.125 1.125 0 019 10.5z" />
        </svg>`;


    const res = await fetch(url);
    const projects = await res.json();

    for (const project of projects) {
        const repoFullName = project.repo_url.split("github.com/")[1];
        const repoName = repoFullName.split('/')[1];

        const projectDescription = project.description || "Nenhuma descrição disponível. Clique no link do GitHub para saber mais.";

        const statusClass = project.status === "done" ? "done" : "in-progress";
        const statusText = project.status === "done" ? "Concluído" : "Em Progresso";
        const statusBadgeContent = project.status === "done" ? "✅" : "🚧";

        const techBadges = project.techs.map(tech => `<span class="tech-badge">${tech}</span>`).join('');

        const deployLink = project.deploy_url
            ? `<a href="${project.deploy_url}" target="_blank" rel="noopener noreferrer" aria-label="Live deployment of ${project.name}">${ExternalLinkIcon}<span>Live Demo</span></a>`
            : '';

        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="project-status ${statusClass}">
                ${statusBadgeContent} <span class="status-text">${statusText}</span>
            </div>
            <div class="project-card-content">
                <h3>${repoName}</h3>
                <p>${projectDescription}</p>
            </div>
            <div class="project-card-footer">
                <div class="tech-badges">
                    ${techBadges}
                </div>
                <div class="project-links">
                    <a href="${project.repo_url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository for ${repoName}">
                        ${GitHubIcon}
                        <span>Fonte</span>
                    </a>
                    ${deployLink}
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    }
}

fetchProjects().catch(err => {
    console.error("Erro ao carregar projetos:", err);

    const projectsGrid = document.getElementById("projects-grid");
    if (projectsGrid && projectsGrid.innerHTML === "") {
        projectsGrid.innerHTML = `<p style="text-align: center; color: var(--red-color);">Falha ao carregar os projetos. Por favor, tente novamente mais tarde.</p>`;
    }
});
