package com.soze.kleddit.subkleddit.service;

import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface ReplyTypingService {

  void addSession(WebSocketSession session);

  void removeSession(WebSocketSession  session);

  void onMessage(Map<String, String> message, WebSocketSession session);

//  void onReply(@Observes ReplyPostedEvent event);

}
