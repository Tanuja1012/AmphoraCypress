class newsletterPage
{
    signUpNewsletter(){
        cy.get('.page-header__hamburger').find('>span').contains('MENU').click({ force: true });
        cy.wait(2000);
        cy.get('.cky-consent-container.cky-banner-bottom').find('>div>div>div>div>button').contains('Accept All').should('be.visible').click();
        //cy.contains('Accept All').should('be.visible').click();
        
       cy.get("nav").find('>div>ul>li>ul').last().invoke('show');
       cy.get("nav").find('>div>ul>li>ul>li').contains('Newsletter sign-up').click({ force: true });
       cy.get('h2').contains('Newsletter Sign Up').should('be.visible');
       cy.get('.fserv-form').find('>div>input[type="email"]').type("firstemail@gmail.com");
       cy.get('.fserv-form').find('>div>input[name="contact[first_name]"]').type("Tanuja");
       cy.get('.fserv-form').find('>div>input[name="contact[last_name]"]').type("Thota");
       cy.get('.fserv-form').find('>div>button[type="submit"]').click({ force: true });
    }
}

export default new newsletterPage();