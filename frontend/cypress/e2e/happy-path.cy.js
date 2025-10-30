describe('Add to cart and checkout', () => {
  it('happy path', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add').first().click();
    cy.contains('Cart').click();
    cy.contains('Checkout').click();
    cy.get('input#name').type('Sukhvir');
    cy.get('input#email').type('sukh@example.com');
    cy.contains('Submit').click();
    cy.contains('Receipt');
  });
});


