const products = [
    { name: "Symphony CTRM", verifyText: "Symphony CTRM"},
    { name: "Alchemy CTRM", verifyText: "Alchemy CTRM" },
    { name: "VaR Module", verifyText: "VaR Module" },
    { name: "Trade confirmations manager", verifyText: "Trade confirmations manager" },
    { name: "Freight manager", verifyText: "Freight manager" },
    { name: "Claims manager", verifyText: "Claims manager" },
    { name: "Symphony Credit", verifyText: "Symphony Credit" },

];
class ProductsPage{
    clickonProdutsDropDownfrommenu(){
         cy.get('.page-header__hamburger').find('>span').contains('MENU').click({ force: true });
            cy.wait(2000);
           // cy.get('.cky-consent-container.cky-banner-bottom').find('>div>div>div>div>button').contains('Accept All').should('be.visible').click();
           // cy.contains('Accept All').should('be.visible').click();
           cy.get("a").contains('Products').should('be.visible').click();
            
            cy.get("nav").find('>div>ul>li>ul').first().invoke('show');
    }

    selectalltheProductsAndAssert(){
         products.forEach(product => {
                cy.get("nav").find('>div>ul>li>ul>li').contains(product.name).click({ force: true });
                cy.wait(2000);
                cy.get('h1').contains(product.verifyText).should('be.visible');
                cy.go("back");
                });
    }
}

export default new ProductsPage();