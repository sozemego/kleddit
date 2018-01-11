package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyDto;
import com.soze.kleddit.subkleddit.events.ReplyPostedEvent;
import com.soze.kleddit.utils.json.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@ApplicationScoped
public class ReplyTypingServiceImpl implements ReplyTypingService {

  private static final Logger LOG = LoggerFactory.getLogger(ReplyTypingServiceImpl.class);

  private static final String REGISTER = "REGISTER";
  private static final String UNREGISTER = "UNREGISTER";
  private static final String START_TYPING = "START_TYPING";
  private static final String STOP_TYPING = "STOP_TYPING";
  private static final String REPLY = "REPLY";

  private final Map<String, Session> idSessionMap = new ConcurrentHashMap<>();
  private final Map<String, Set<String>> submissionSessionIdMap = new ConcurrentHashMap<>();
  /**
   * Reversed mapping to submissionSessionIdMap to make removing registered sessions
   * easier when they disconnect.
   */
  private final Map<String, Set<String>> sessionSubmissionsMap = new ConcurrentHashMap<>();

  /**
   * To manage synchronization between all maps.
   */
  private final Object lock = new Object();

  @Override
  public void addSession(final Session session) {
    idSessionMap.put(session.getId(), session);
  }

  @Override
  public void removeSession(final Session session) {
    idSessionMap.remove(session.getId());
    //need to remove registered sessions
    synchronized (lock) {
      Set<String> submissionIds = sessionSubmissionsMap.getOrDefault(session.getId(), new HashSet<>());
      submissionIds.forEach(id -> {
        Map<String, String> message = new HashMap<>();
        message.put("type", UNREGISTER);
        message.put("submissionId", id);
        handleUnregister(message, session);
      });
      if(submissionIds.isEmpty()) {
        sessionSubmissionsMap.remove(session.getId());
      }
    }
  }

  @Override
  public void onMessage(final Map<String, String> message, final Session session) {
    String messageType = message.get("type");
    switch (messageType) {
      case REGISTER: handleRegister(message, session); break;
      case UNREGISTER: handleUnregister(message, session); break;
      case START_TYPING: handleStartTyping(message, session); break;
      case STOP_TYPING: handleStopTyping(message, session); break;
    }
  }

  @Override
  public void onReply(@Observes final ReplyPostedEvent event) {
    SubmissionReplyDto dto = event.getSubmissionReplyDto();
    handleReply(dto);
  }

  private void handleRegister(Map<String, String> json, Session session) {
    synchronized (lock) {
      String submissionId = json.get("submissionId");
      LOG.info("Registering [{}] for submission [{}]", session.getId(), submissionId);
      submissionSessionIdMap.compute(submissionId, (k, v) -> {
        if(v == null) {
          v = new HashSet<>();
        }
        v.add(session.getId());
        return v;
      });
      sessionSubmissionsMap.compute(session.getId(), (k, v) -> {
        if(v == null) {
          v = new HashSet<>();
        }
        v.add(submissionId);
        return v;
      });
    }
  }

  private void handleUnregister(Map<String, String> json, Session session) {
    synchronized (lock) {
      String submissionId = json.get("submissionId");
      LOG.info("Unregistering [{}] from submission [{}]", session.getId(), submissionId);
      submissionSessionIdMap.compute(submissionId, (k, v) -> {
        if(v != null) {
          v.remove(session.getId());
        }
        return v;
      });
      sessionSubmissionsMap.compute(session.getId(), (k, v) -> {
        if(v != null) {
          v.remove(submissionId);
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

  private void handleReply(SubmissionReplyDto dto) {
    Set<Session> sessions = getSessions(dto.getSubmissionId());
    sendToAll(getReplyMessage(dto), sessions);
  }

  private Set<Session> getSessions(String submissionId) {
    synchronized (lock) {// dont need this?
      return submissionSessionIdMap.get(submissionId)
        .stream()
        .map(idSessionMap::get)
        .collect(Collectors.toSet());
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

  private String getReplyMessage(SubmissionReplyDto dto) {
    Map<String, SubmissionReplyDto> message = new HashMap<>();
    message.put(REPLY, dto);
    return JsonUtils.objectToJson(message);
  }

  private void sendToAll(String message, Set<Session> sessions) {
    LOG.info("Sending [{}] to [{}] sessions", message, sessions.size());
    sessions.forEach(s -> {
      try {
        if(!s.isOpen()) {
          return;
        }
        s.getBasicRemote().sendText(message);
      } catch (IOException e) {
        e.printStackTrace();
      }
    });
  }

}
