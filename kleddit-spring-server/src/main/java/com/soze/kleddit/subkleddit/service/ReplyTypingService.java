package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.events.ReplyPostedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface ReplyTypingService extends ApplicationListener<ReplyPostedEvent> {

  void addSession(WebSocketSession session);

  void removeSession(WebSocketSession  session);

  void onMessage(Map<String, String> message, WebSocketSession session);

}
