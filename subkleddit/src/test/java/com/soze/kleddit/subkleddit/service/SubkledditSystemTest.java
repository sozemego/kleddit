package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.json.JsonUtils;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsBadRequest;
import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsNotFound;
import static org.junit.Assert.assertEquals;

public class SubkledditSystemTest {

  private final String getAllSubkleddits = "all/";
  private final String getByName = "single/";
  private final String search = "search/";

  private HttpClient client;

  @Before
  public void setup() {
    DatabaseReset.resetDatabase();
    //TODO extract path to file
    client = new HttpClient("http://localhost:8180/api/0.1/subkleddit/");
  }

  @Test
  public void testGetAllSubkledditsShouldReturnListOfDefaultSubkleddits() throws Exception {
    Response response = client.get(getAllSubkleddits);
    List<SubkledditSimpleDto> subkledditSimpleDtos = getSubkledditDtos(response);
    assertEquals(7, subkledditSimpleDtos.size());
  }

  @Test
  public void testGetSubkledditByName() throws Exception {
    Response response = client.get(getByName + "General");
    SubkledditSimpleDto dto = getSubkledditDto(client.get(getByName + "General"));
    assertEquals("General", dto.getName());
    assertEquals(0, dto.getSubscribers());
  }

  @Test
  public void testGetSubkledditByNameNotExists() throws Exception {
    Response response = client.get(getByName + "CANNOT EVER EXIST MAYBE");
    assertResponseIsNotFound(response);
  }

  @Test
  public void testGetSubkledditNameTooLong() throws Exception {
    String longName = CommonUtils.generateRandomString(250);

    Response response = client.get(getByName + longName);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testSearchSubkleddits() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "General"));

    assertEquals(1, dtos.size());
    assertEquals("General", dtos.get(0).getName());
  }

  @Test
  public void testSearchSubkledditsCaseInsensitive() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "GeNeRal"));

    assertEquals(1, dtos.size());
    assertEquals("General", dtos.get(0).getName());
  }

  @Test
  public void testSearchSubkledditsDoesNotExist() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "dupka pupka"));

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsManyExist() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "G"));

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsEmptyString() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search));

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsWhitespace() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "         "));

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditsWhitespaceCharacters() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "    \n \t \r     "));

    assertEquals(0, dtos.size());
  }

  @Test
  public void testSearchSubkledditEmojiCharacters() throws Exception {
    List<SubkledditSimpleDto> dtos = getSubkledditDtos(client.get(search + "\uD83D\uDE02"));

    assertEquals(0, dtos.size());
  }

  private SubkledditSimpleDto getSubkledditDto(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubkledditSimpleDto.class);
  }

  private List<SubkledditSimpleDto> getSubkledditDtos(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubkledditSimpleDto.class);
  }
  
}
