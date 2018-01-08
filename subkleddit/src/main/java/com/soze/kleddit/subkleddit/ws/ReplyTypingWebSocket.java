package com.soze.kleddit.subkleddit.ws;

import com.soze.kleddit.subkleddit.service.ReplyTypingService;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;

@ServerEndpoint("/replies/typing")
@ApplicationScoped
public class ReplyTypingWebSocket {

  @Inject
  private ReplyTypingService replyTypingService;

  @OnOpen
  public void open(Session session) {
    replyTypingService.addSession(session);
  }

  @OnClose
  public void close(Session session) {
    replyTypingService.removeSession(session);
  }

  @OnError
  public void onError(Throwable error) {
    error.printStackTrace();
  }

  @OnMessage
  public void onMessage(String message, Session session) {
    Map<String, String> json = JsonUtils.jsonToMap(message, String.class, String.class);
    replyTypingService.onMessage(json, session);
  }

}
