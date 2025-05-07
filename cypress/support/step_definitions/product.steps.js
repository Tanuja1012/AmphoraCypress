import { Given,When,Then } from '@badeball/cypress-cucumber-preprocessor';
import newsletterPage from '../../pageObjects/newsletterPage';
import ProductPage from '../../pageObjects/ProductsPage';






Given('Open Amphora Homepage', () => {
    cy.visit('https://amphora.net/');
});

When('Click on Produts Dropdown and Select each product', () => {
   
   ProductPage.clickonProdutsDropDownfrommenu();
});
Then('Respective product page is loaded', () => {
   ProductPage.selectalltheProductsAndAssert();
});

When('click On Resources SignUp and Submit', () => {
   newsletterPage.signUpNewsletter();

});

Then('the message "Thank you for signing up for our newsletter" should be visible', () => {
   
 cy.get('.fs-notifier.success').find('>span').contains('Thank you for signing up for our newsletter. We are thrilled to have you join our community. Every quarter, you will receive exclusive content designed to keep you informed about generic topics within the CTRM industry.').should('be.visible');
 //cy.get('#newsletter-sign-up').find('>a').contains('Close').should('be.visible').click({ force: true });
 

});
    
