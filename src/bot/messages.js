const prs = require('../pull_requests/prs');

function formatPR(pr) {
    return {
        "fallback": `Pull Request for ${ pr.repository.full_name }: <${ pr.pull_request.html_url }|${ pr.pull_request.title }> by ${ pr.sender.login }`,
        "fields": [
            {
                "title": "Pull Request",
                "value": `<${ pr.pull_request.html_url }|${ pr.pull_request.title }>`,
                "short": false
            },
            {
                "title": "Repository",
                "value": `<${ pr.repository.html_url }|${ pr.repository.full_name }>`,
                "short": true
            },
            {
                "title": "Sender",
                "value": `<${ pr.sender.html_url }|${ pr.sender.login }>`,
                "short": true
            }
        ],
        "color": "good",
        "footer": "Updated:",
        "ts": Date.parse(pr.pull_request.updated_at) / 1000
    };
}

function formatOpened(pr) {
    return [formatPR(pr)];
}

function formatAll(channel) {
    let allPRs = prs.getAll(channel);
    return allPRs.map(formatPR);
}

function formatAllAssigned(channel) {
    const assignedPRs = prs.getAssigned(channel);
    return assignedPRs.map(formatPR);
}

function formatAllUnassigned(channel) {
    const unassignedPRs = prs.getAssigned(channel);
    return unassignedPRs.map(formatPR);
}

exports = module.exports = {
    formatOpened: formatOpened,    
    formatAll: formatAll,
    formatAllAssigned: formatAllAssigned,
    formatAllUnassigned: formatAllUnassigned
}