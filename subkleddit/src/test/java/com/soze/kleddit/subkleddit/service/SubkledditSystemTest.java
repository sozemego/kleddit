package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.test.SubkledditTest;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsBadRequest;
import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsNotFound;
import static org.junit.Assert.assertEquals;

public class SubkledditSystemTest extends SubkledditTest {

  private final String search = "search/";

  @Before
  public void setup() {
    DatabaseReset.resetDatabase();
  }

  @Test
  public void testGetAllSubkledditsShouldReturnListOfDefaultSubkleddits() throws Exception {
    List<SubkledditSimpleDto> subkledditSimpleDtos = getAllSubkleddits();
    assertEquals(7, subkledditSimpleDtos.size());
  }

  @Test
  public void testGetSubkledditByName() throws Exception {
    SubkledditSimpleDto dto = getSubkledditByName("General");
    assertEquals("General", dto.getName());
    assertEquals(0, dto.getSubscribers());
  }

  @Test
  public void testGetSubkledditByNameNotExists() throws Exception {
    Response response = getSubkledditByNameResponse("CANNOT EVER EXIST MAYBE");
    assertResponseIsNotFound(response);
  }

  @Test
  public void testGetSubkledditNameTooLong() throws Exception {
    String longName = CommonUtils.generateRandomString(250);

    Response response = getSubkledditByNameResponse(longName);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testSearchSubkleddits() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("General");

    assertEquals(1, dtos.size());
    assertEquals("General", dtos.get(0).getName());
  }

  @Test
  public void testSearchSubkledditsCaseInsensitive() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("GeNeRal");

    assertEquals(1, dtos.size());
    assertEquals("General", dtos.get(0).getName());
  }

  @Test
  public void testSearchSubkledditsDoesNotExist() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("dupka pupka");

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsManyExist() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("G");

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsEmptyString() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName(search);

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsWhitespace() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("         ");

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsWhitespaceCharacters() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("    \n \t \r     ");

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditEmojiCharacters() throws Exception {
    List<SubkledditSimpleDto> dtos = searchSubkledditsByName("\uD83D\uDE02");

    assertEquals(0, dtos.size());
  }

}
