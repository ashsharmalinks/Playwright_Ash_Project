Feature: Get user list from Reqres API

  @api
  Scenario: Successfully retrieve user list from page 2
    Given the Reqres API is available
    When I send a GET request to "api/users?page=10"
    Then the response status should be 200
    And the response should contain a list of users
