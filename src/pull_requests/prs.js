const channels = require("../channels/channels");
const mapFilter = require("../utils/mapFilter");

function trimPayload(payload){
    return payload;
}

function add(channel, payload){
    var pr = trimPayload(payload);    
    switch(pr.action){
        case "opened": 
        case "reopened":
        case "assigned":
        case "unassigned":
            updatePR(channel, pr);
            break;
        case "closed":
            closePR(channel, pr); 
            break;
        default:
            console.log("Unhandled PR action: ", pr.action);
    }
    return pr;
}

function updatePR(channel, pr){
    channels.get(channel)[pr.id] = pr;
}

function closePR(channel, pr){
    delete channels.get(channel)[pr.id];
}

function getAll(channel){
    return filterPRs(channel, pr => true);
}

function getAssigned(channel){
    return filterPRs(channel, pr => pr.pull_request.assignee );
}

function getUnassigned(channel){
    return filterPRs(channel, pr => !pr.pull_request.assignee );
}

function getCustom(channel, filter){
    return filterPRs(channel, filter);
}

function filterPRs(channel, filter){
    return mapFilter(channels.get(channel), filter);
}

exports = module.exports = {
    add: add,
    getAll: getAll,
    getAssigned: getAssigned,
    getUnassigned: getUnassigned,
    getCustom: getCustom
}