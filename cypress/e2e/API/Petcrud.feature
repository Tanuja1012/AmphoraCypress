Feature: Petstore API - Pet CRUD Operations
  @author=Tanuja
  Scenario: Create, Update, and Delete a Pet
    Given I create a new pet with name "TanuTestPet" and status "available"
    Then the pet should be created successfully
    And the response should contain the name "TanuTestPet" and status "available"
    When I update the pet name to "TanuTestPetUpdated" and status to "sold"
    Then the pet should be updated successfully
    And the response should reflect the updated name "TanuTestPetUpdated" and status "sold"
    When I delete the pet
    Then the pet should be deleted successfully
    And the pet should not be retrievable from the API
