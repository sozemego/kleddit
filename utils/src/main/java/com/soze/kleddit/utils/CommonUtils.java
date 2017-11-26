package com.soze.kleddit.utils;

import java.util.concurrent.ThreadLocalRandom;

/**
 * Miscellaneous utils which do not fit in any category so far.
 */
public class CommonUtils {

  public static String generateRandomString(int length) {
    if(length < 0) {
      throw new IllegalArgumentException("Length cannot be negative.");
    }

    StringBuilder sb = new StringBuilder(length);
    for(int i = 0; i < length; i++) {
      sb.append(generateRandomCharacterAlphanumeric());
    }

    return sb.toString();
  }

  public static Character generateRandomCharacterAlphanumeric() {
    String availableCharacters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";

    return availableCharacters.charAt(randomNumber(0, availableCharacters.length()));
  }

  /**
   * Generates a random number between min and max. Min is inclusive, max is exclusive.
   * @param min min
   * @param max max
   * @return random number between min and max
   */
  public static int randomNumber(int min, int max) {
    if(max < min) {
      throw new IllegalArgumentException("Max cannot be less than min.");
    }

    return ThreadLocalRandom.current().nextInt(min, max);
  }

}
