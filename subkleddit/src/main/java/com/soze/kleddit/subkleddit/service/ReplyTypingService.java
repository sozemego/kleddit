package com.soze.kleddit.subkleddit.service;

import javax.websocket.Session;
import java.util.Map;

public interface ReplyTypingService {

  void addSession(Session session);

  void removeSession(Session session);

  void onMessage(Map<String, String> message, Session session);

}
