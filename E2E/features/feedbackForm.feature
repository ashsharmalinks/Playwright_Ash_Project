Feature: Validation of feedback form
  As a user 
  I want to validate the form

  @feedbackForm
  Scenario: Validation of feedback form
    Given I open the login page
    And I have clicked the feedback form button
    When I fill in the feedback form with valid data    
    Then I should see the feedback confirmation message
