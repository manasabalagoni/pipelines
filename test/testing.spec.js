/// <reference types="cypress" />

describe("Conduit Validations", () => {
  

  
  it("invalid login", () => {
    cy.visit("http://react-redux.realworld.io/#/login");
    cy.get("input[type=email]").type("hjgdh@gg.com");
    cy.get("input[type=password]").type("hjghg");
    cy.get("button[type=submit]").click();
    cy.get(".error-messages").should("be.visible");
  });

  it("valid login", () => {
    cy.visit("https://react-redux.realworld.io/#/login");
    cy.title().should("eq", "Conduit");
    cy.location("protocol").should("eq", "https:");
    cy.get("input[type=email]").type("testinguser@gmail.com");
    cy.get("input[type=password]").type("Password@123");
    cy.get("button[type=submit]").click();
    cy.get(".error-messages").should("not.be.visible");
    cy.get(".article-preview")
      .contains("No articles are here... yet.", { timeout: 10000 })
      .should("be.visible");
    cy.contains("New Post").click();
    cy.hash().should("be.include", "#/editor");
    cy.location("hash").should("be.include", "#/editor");
    cy.get('input[placeholder="What\'s this article about?"]').type(
      "escape characters"
    );
    cy.url().should("be.include", "editor");
    cy.go(-1);
    cy.go(1);
    cy.reload();
    cy.custom();
  });


  it("login to app", () => {
   cy.get('ul.navbar-nav').children().contains('Home').click();
   cy.contains('Global Feed').click(); 
   cy.get('.btn-outline-primary').eq(1).then(($value)=>{
return $value.text().trim();
   }).as('favcount');
   cy.get('@favcount').then(($count)=>{
     expect($count).to.eq('1')
   })
  });
});
