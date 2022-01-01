// Fetch issues from api
const testAccess = async (e) => {
    e.preventDefault();

    const url = document.querySelector('#url').value;
    console.log(url);

    if( url === '' ) {
        alert('Please enter a valid url');
    } else {
        setLoading();

        const response = await fetch(`/api/test?url=${url}`);

        if(response.status !== 200) {
            setLoading(false);
            alert('Something went wrong');
        } else {
            const {issues} = await response.json();
            addIssuesToDom(issues);
            setLoading(false);
        }

    }

}
// Add issues to DOM
const addIssuesToDom = (issues) => {
    const issuesOutput = document.querySelector('#issues');
    issuesOutput.innerHTML = '';
    if (issues.length === 0) {
        issuesOutput.innerHTML = '<h4 class="text-center">No issues found!</h4><br>';
    } else {
        let count = 1; 
        console.log(typeof issues);
        // get length of issues
        const issuesLength = issues.length;
        issuesOutput.innerHTML = `<h4 class="text-center">${issuesLength} issues found!</h4><br>`;

        // loop through issues
        issues.forEach(issue => {
            const output = `
                <div class="card mb-5"> 
                    <div class="card-body">
                        <h4>${count}: ${issue.message}</h4>

                        <p class="bg-light p-3 my-3">
                            ${escapeHTML(issue.context)}
                        </p>

                        <p class="bg-secondary text-light p-2"> 
                            CODE: ${issue.code}
                        </p>
                    </div>
                </div>
            `;

            issuesOutput.innerHTML += output;
            count++;

        });
    }

}
// Set loading state

const setLoading = (isLoading = true) => {
    const loader = document.querySelector('.loader');
    if(isLoading) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}

// Escape HTML

function escapeHTML(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
document.querySelector('#form').addEventListener('submit', testAccess);
