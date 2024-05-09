const fetch = require('node-fetch');

// Route handler to create a secret gist
app.post('/export-gist', async (req, res) => {
    try {
        // Get data to export from request body
        const { project, todos } = req.body;

        // GitHub Gist API endpoint
        const apiUrl = 'https://api.github.com/gists';

        // Access token for GitHub authentication
        const accessToken = req.user.githubAccessToken; // Assuming user object contains GitHub access token

        // Format project and todo data as markdown content
        const markdownContent = generateMarkdown(project, todos);

        // Data to be sent to GitHub Gist API
        const requestData = {
            description: 'Project Summary', // You can customize the gist description
            public: false,
            files: {
                'project-summary.md': {
                    content: markdownContent
                }
            }
        };

        // Make POST request to GitHub Gist API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `token ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Handle response from GitHub API
        if (response.ok) {
            const data = await response.json();
            const gistUrl = data.html_url; // URL of the newly created gist
            res.json({ success: true, gistUrl });
        } else {
            const errorMessage = await response.text();
            res.status(response.status).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error exporting gist:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Function to generate markdown content from project and todos data
function generateMarkdown(project, todos) {
    // Implement logic to format project and todo data as markdown content
    // You'll need to convert project and todos into markdown format
    // Example:
    let markdownContent = `# Project: ${project.title}\n\n`;

    markdownContent += '## Todos\n\n';
    todos.forEach((todo, index) => {
        markdownContent += `**Todo ${index + 1}:** ${todo.description}\n`;
        markdownContent += `Status: ${todo.status}\n`;
        markdownContent += `Created Date: ${todo.createdDate}\n`;
        markdownContent += `Updated Date: ${todo.updatedDate}\n\n`;
    });

    return markdownContent;
}
