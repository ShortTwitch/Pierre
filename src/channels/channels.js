var channels = {}

function setOrGetChannel(channel){
    channels[channel] = channels[channel] || {};
}

function getChannel(channel){
    setOrGetChannel(channel);
    return channels[channel];
}

function clearChannel(channel){
    setOrGetChannel(channel);
    channels[channel] = null;
}

function deleteChannel(channel){
    delete channels[channel];
}

exports = module.exports = {
    get: getChannel,
    clear: clearChannel,
    delete: deleteChannel
}