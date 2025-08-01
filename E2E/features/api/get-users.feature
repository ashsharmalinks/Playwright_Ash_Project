Feature: Get user list from Reqres API

  @api
  Scenario: Successfully retrieve user list from page 2
    When I request the list of users
    Then the response status should be 200
    And the response should contain a list of users

