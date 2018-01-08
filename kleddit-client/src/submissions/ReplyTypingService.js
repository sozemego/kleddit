import _ from 'lodash';
import { networkConfig } from '../config/network';

const subkledditBase = 'subkleddit';
const repliesTyping = 'replies/typing';

let socket = null;
let connected = false;
let onStartTyping = _.noop;
let onStopTyping = _.noop;

const timeouts = {};

export const ReplyTypingService = {};

ReplyTypingService.connect = function () {
  if (connected) {
    console.warn('Already connected');
    return;
  }

  const { wsProtocol, base, port, version } = networkConfig;
  socket = new WebSocket(`${wsProtocol}://${base}:${port}${version}/${subkledditBase}/${repliesTyping}`);

  socket.onopen = () => {
    connected = true;
  };

  socket.onclose = () => {
    connected = false;
  };

  socket.onmessage = (message) => {
    const parsed = JSON.parse(message.data);
    if (parsed['START_TYPING']) {
      onStartTyping(parsed['START_TYPING']);
    }
    if (parsed['STOP_TYPING']) {
      onStopTyping(parsed['STOP_TYPING']);
    }
  };
};

ReplyTypingService.disconnect = function () {
  if (connected) {
    socket.close();
    connected = false;
  }
};

ReplyTypingService.register = function (submissionId) {
  if(!checkIsConnected()) {
    return;
  }
  socket.send(registerMessage(submissionId));
};

ReplyTypingService.unregister = function (submissionId) {
  if(!checkIsConnected()) {
    return;
  }
  socket.send(unregisterMessage(submissionId));
};

ReplyTypingService.startTyping = function (submissionId) {
  if(!checkIsConnected()) {
    return;
  }
  socket.send(startTypingMessage(submissionId));
  clearTimeout(timeouts[submissionId]);
  timeouts[submissionId] = setTimeout(() => this.stopTyping(submissionId), 5000);
};

ReplyTypingService.stopTyping = function (submissionId) {
  if(!checkIsConnected()) {
    return;
  }
  socket.send(stopTypingMessage(submissionId));
  clearTimeout(timeouts[submissionId]);
};

ReplyTypingService.setOnStartTyping = function (func) {
  onStartTyping = func;
};

ReplyTypingService.setOnStopTyping = function (func) {
  onStopTyping = func;
};

const checkIsConnected = () => {
  if (!connected) {
    console.warn('You are not connected.');
    return false;
  }
  return true;
};

const registerMessage = (submissionId) => {
  return JSON.stringify({ type: 'REGISTER', submissionId });
};

const unregisterMessage = (submissionId) => {
  return JSON.stringify({ type: 'UNREGISTER', submissionId });
};

const startTypingMessage = (submissionId) => {
  return JSON.stringify({ type: 'START_TYPING', submissionId });
};

const stopTypingMessage = (submissionId) => {
  return JSON.stringify({ type: 'STOP_TYPING', submissionId });
};

