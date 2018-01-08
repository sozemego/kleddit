package com.soze.kleddit.subkleddit.ws;

import com.soze.kleddit.utils.json.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/replies/typing")
@ApplicationScoped
public class ReplyTypingWebSocket {

  private static final Logger LOG = LoggerFactory.getLogger(ReplyTypingWebSocket.class);

  private static final String REGISTER = "REGISTER";
  private static final String UNREGISTER = "UNREGISTER";
  private static final String START_TYPING = "START_TYPING";
  private static final String STOP_TYPING = "STOP_TYPING";

  private final Map<String, Set<Session>> submissionSessionMap = new ConcurrentHashMap<>();

  @OnOpen
  public void open(Session session) {
  }

  @OnClose
  public void close(Session session) {
  }

  @OnError
  public void onError(Throwable error) {
    error.printStackTrace();
  }

  @OnMessage
  public void onMessage(String message, Session session) {
    Map<String, String> json = JsonUtils.jsonToMap(message, String.class, String.class);
    System.out.println(json);
    String messageType = json.get("type");
    switch (messageType) {
      case REGISTER: handleRegister(json, session); break;
      case UNREGISTER: handleUnregister(json, session); break;
      case START_TYPING: handleStartTyping(json, session); break;
      case STOP_TYPING: handleStopTyping(json, session); break;
    }
  }

  private void handleRegister(Map<String, String> json, Session session) {
    synchronized (submissionSessionMap) {
      String submissionId = json.get("submissionId");
      LOG.info("Registering [{}] for submission [{}]", session.getId(), submissionId);
      submissionSessionMap.compute(submissionId, (k, v) -> {
        if(v == null) {
          v = new HashSet<>();
        }
        v.add(session);
        return v;
      });
    }
  }

  private void handleUnregister(Map<String, String> json, Session session) {
    synchronized (submissionSessionMap) {
      String submissionId = json.get("submissionId");
      LOG.info("Unregistering [{}] from submission [{}]", session.getId(), submissionId);
      submissionSessionMap.compute(submissionId, (k, v) -> {
        if(v != null) {
          v.remove(session);
        }
        return v;
      });
    }
  }

  private void handleStartTyping(Map<String, String> json, Session initiator) {
    String submissionId = json.get("submissionId");
    Set<Session> sessions = getSessions(submissionId);
    sessions.remove(initiator);
    String message = getStartTypingMessage(submissionId);
    sendToAll(message, sessions);
  }

  private void handleStopTyping(Map<String, String> json, Session initiator) {
    String submissionId = json.get("submissionId");
    Set<Session> sessions = getSessions(submissionId);
    sessions.remove(initiator);
    String message = getStopTypingMessage(submissionId);
    sendToAll(message, sessions);
  }

  private Set<Session> getSessions(String submissionId) {
    synchronized (submissionSessionMap) {
      return new HashSet<>(submissionSessionMap.getOrDefault(submissionId, new HashSet<>()));
    }
  }

  private String getStartTypingMessage(String submissionId) {
    Map<String, String> message = new HashMap<>();
    message.put(START_TYPING, submissionId);
    return JsonUtils.objectToJson(message);
  }

  private String getStopTypingMessage(String submissionId) {
    Map<String, String> message = new HashMap<>();
    message.put(STOP_TYPING, submissionId);
    return JsonUtils.objectToJson(message);
  }

  private void sendToAll(String message, Set<Session> sessions) {
    LOG.info("Sending [{}] to [{}] sessions", message, sessions.size());
    sessions.forEach(s -> {
      try {
        s.getBasicRemote().sendText(message);
      } catch (IOException e) {
        e.printStackTrace();
      }
    });
  }

}
