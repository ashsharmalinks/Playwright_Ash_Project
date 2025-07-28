Feature: Login

  Scenario: Successful login
    Given I open the login page
    And I have clicked the sign-in button
    When I enter valid credentials
    Then I should be redirected to the account summary page
    Then the account summary should have Cash Accounts with two savings accounts
    Then all naviagtion links should be working on account summary page

    # And the account summary should have Investment Accounts with one brokerage account  
    # And the account summary should have Credit Accounts with credit card account