package com.soze.kleddit;

import com.soze.kleddit.subkleddit.api.ReplyTypingWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class KledditWebSocketConfiguration implements WebSocketConfigurer {

  @Autowired
  private ReplyTypingWebSocketHandler replyTypingWebSocketHandler;

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(replyTypingWebSocketHandler, "/api/0.1/subkleddit/replies/typing").setAllowedOrigins("*");
  }

}
