

const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

/**
 * @author Tanuja
 */

// Store test data globally
let testData = {
  petId: null,
  petResponse: null
};

Given('I create a new pet with name {string} and status {string}', (name, status) => {
  const requestBody = {
    // Using a smaller, more manageable ID
    id: Math.floor(Math.random() * 1000000), // Generate a random ID between 0 and 999999
    name: name,
    status: status,
    category: {
      id: 1,
      name: "dogs"
    },
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "Tanuja"
      }
    ]
  };

  cy.log('Creating pet with request body:', JSON.stringify(requestBody));

  cy.request({
    method: 'POST',
    url: 'https://petstore.swagger.io/v2/pet',
    failOnStatusCode: false,
    body: requestBody
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id');
    testData.petId = response.body.id;
    testData.petResponse = response.body;
    
    cy.log(`Successfully created pet with ID: ${testData.petId}`);
    cy.log('Create response:', JSON.stringify(response.body));
  });
});

Then('the pet should be created successfully', () => {
  expect(testData.petResponse).to.have.property('id');
  expect(testData.petId).to.be.a('number');
  cy.log(`Verified pet creation with ID: ${testData.petId}`);
});

Then('the response should contain the name {string} and status {string}', (name, status) => {
  expect(testData.petResponse.name).to.equal(name);
  expect(testData.petResponse.status).to.equal(status);
  cy.log(`Verified pet name and status for ID: ${testData.petId}`);
});

When('I update the pet name to {string} and status to {string}', (newName, newStatus) => {
  const updateBody = {
    ...testData.petResponse,
    name: newName,
    status: newStatus
  };

  cy.log(`Updating pet ${testData.petId} with:`, JSON.stringify(updateBody));

  cy.request({
    method: 'PUT',
    url: 'https://petstore.swagger.io/v2/pet',
    failOnStatusCode: false,
    body: updateBody
  }).then((response) => {
    expect(response.status).to.eq(200);
    testData.petResponse = response.body;
    cy.log('Update response:', JSON.stringify(response.body));
  });
});

Then('the pet should be updated successfully', () => {
  expect(testData.petResponse.id).to.equal(testData.petId);
  cy.log(`Verified pet update for ID: ${testData.petId}`);
});

Then('the response should reflect the updated name {string} and status {string}', (name, status) => {
  expect(testData.petResponse.name).to.equal(name);
  expect(testData.petResponse.status).to.equal(status);
  cy.log(`Verified updated name and status for ID: ${testData.petId}`);
});

When('I delete the pet', () => {
  cy.log(`Attempting to delete pet with ID: ${testData.petId}`);

  // Try deletion with both methods
  const deleteWithHeader = () => {
    return cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/pet/${testData.petId}`,
      headers: {
        'api_key': 'special-key'
      },
      failOnStatusCode: false
    });
  };

  const deleteWithQueryParam = () => {
    return cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/pet/${testData.petId}?api_key=special-key`,
      failOnStatusCode: false
    });
  };

  // First try with header
  deleteWithHeader().then((response) => {
    cy.log(`First delete attempt response status: ${response.status}`);
    
    if (response.status !== 200) {
      // If first attempt fails, try with query parameter
      deleteWithQueryParam().then((response2) => {
        cy.log(`Second delete attempt response status: ${response2.status}`);
        // Store the final response status for verification
        testData.deleteStatus = response2.status;
      });
    } else {
      testData.deleteStatus = response.status;
    }
  });
});

Then('the pet should be deleted successfully', () => {
  // Verify that one of our delete attempts was successful
  expect(testData.deleteStatus).to.be.oneOf([200, 204]);
  cy.log(`Verified delete operation completed with status: ${testData.deleteStatus}`);
});

Then('the pet should not be retrievable from the API', () => {
  // Add retry logic for the verification
  const verifyDeletion = (retryCount = 0) => {
    if (retryCount >= 3) {
      throw new Error(`Pet ${testData.petId} still retrievable after ${retryCount} attempts`);
    }

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${testData.petId}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log(`Get deleted pet response (attempt ${retryCount + 1}): ${response.status}`);
      
      if (response.status !== 404) {
        cy.wait(1000); // Wait 1 second before retry
        verifyDeletion(retryCount + 1);
      } else {
        expect(response.status).to.eq(404);
      }
    });
  };

  verifyDeletion();
}); 