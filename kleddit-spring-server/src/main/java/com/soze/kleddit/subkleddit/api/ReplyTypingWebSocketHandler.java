package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.service.ReplyTypingService;
import com.soze.kleddit.utils.json.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

@Service
public class ReplyTypingWebSocketHandler extends TextWebSocketHandler {

  @Autowired
  private ReplyTypingService replyTypingService;

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    replyTypingService.addSession(session);
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    replyTypingService.removeSession(session);
  }

  @Override
  public void handleTransportError(WebSocketSession session, Throwable error) {
    error.printStackTrace();
  }

  public void handleTextMessage(WebSocketSession session, TextMessage message) {
    Map<String, String> json = JsonUtils.jsonToMap(message.getPayload(), String.class, String.class);
    replyTypingService.onMessage(json, session);
  }

}
