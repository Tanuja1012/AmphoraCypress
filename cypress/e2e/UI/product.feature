Feature: Amphora Website UI Testing

  Scenario: Products DropDown
    Given Open Amphora Homepage
    When Click on Produts Dropdown and Select each product
    Then Respective product page is loaded

Scenario: Sign up for newsletter from Resources dropdown
    Given Open Amphora Homepage
    When  click On Resources SignUp and Submit
    Then the message "Thank you for signing up for our newsletter" should be visible