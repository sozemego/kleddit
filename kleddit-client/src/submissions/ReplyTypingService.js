import _ from 'lodash';
import { networkConfig } from '../config/network';

const subkledditBase = 'subkleddit';
const repliesTyping = 'replies/typing';
const timeouts = {};

let socket = null;
let onStartTyping = _.noop;
let onStopTyping = _.noop;
let onReply = _.noop;

export const ReplyTypingService = {};

ReplyTypingService.connect = function () {
  if (socket && socket.readyState !== WebSocket.CLOSED) {
    console.warn('Already connected or connecting or closing. Either way, cannot connect right now.');
    return;
  }

  const { wsProtocol, base, port, version } = networkConfig;
  socket = new WebSocket(`${wsProtocol}://${base}:${port}${version}/${subkledditBase}/${repliesTyping}`);

  socket.onopen = () => {

  };

  socket.onclose = () => {

  };

  socket.onmessage = (message) => {
    const parsed = JSON.parse(message.data);
    if (parsed['START_TYPING']) {
      onStartTyping(parsed['START_TYPING']);
    }
    if (parsed['STOP_TYPING']) {
      onStopTyping(parsed['STOP_TYPING']);
    }
    if (parsed['REPLY']) {
      onReply(parsed['REPLY']);
    }
  };
};

ReplyTypingService.disconnect = function () {
  if(socket) {
    socket.close();
  }
};

ReplyTypingService.register = function (submissionId) {
  if(isConnecting()) {
    return setTimeout(() => this.register(submissionId), 125);
  }
  if(!isOpen()) {
    return;
  }
  socket.send(registerMessage(submissionId));
};

ReplyTypingService.unregister = function (submissionId) {
  if (!isOpen()) {
    return;
  }
  socket.send(unregisterMessage(submissionId));
};

ReplyTypingService.startTyping = function (submissionId) {
  if (!isOpen()) {
    return;
  }
  socket.send(startTypingMessage(submissionId));
  clearTimeout(timeouts[submissionId]);
  timeouts[submissionId] = setTimeout(() => this.stopTyping(submissionId), 5000);
};

ReplyTypingService.stopTyping = function (submissionId) {
  if (!isOpen()) {
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

ReplyTypingService.setOnReply = function (func) {
  onReply = func;
};

const isOpen = () => {
  return (socket && socket.readyState === WebSocket.OPEN);
};

const isConnecting = () => {
  return (socket && socket.readyState === WebSocket.CONNECTING);
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

