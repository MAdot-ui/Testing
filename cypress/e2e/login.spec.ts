/// <reference types="cypress" />

describe('Login specs', () => {
  beforeEach(() => {
    // Visit the login page before each test (with hash for HashRouter)
    cy.visit('/#/');
  });

  it('should visit the login page', () => {
    // Arrange & Act - Already done in beforeEach

    // Assert
    cy.url().should('include', '#/');
    cy.location('hash').should('equal', '#/');
    cy.get('input[name="user"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should have focus on user input when it clicks on it', () => {
    // Arrange & Act
    cy.get('input[name="user"]').click();

    // Assert
    cy.get('input[name="user"]').should('have.focus');
    cy.focused().should('have.attr', 'name', 'user');
  });

  it('should show an error message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';

    // Act
    cy.get('input[name="user"]').type(user);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Assert - Wait for the snackbar/error message to appear
    cy.get('input[name="user"]').should('have.value', user);
    cy.get('input[name="password"]').should('have.value', password);
    // Check for MUI Snackbar (it shows error messages)
    cy.get('[role="alert"]', { timeout: 2000 }).should('be.visible');
  });

  it('should navigate to submodule-list when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.get('input[name="user"]').type(user);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Assert - Wait for navigation (login API has 1 second delay)
    cy.url({ timeout: 3000 }).should('include', '#/submodule-list');
    cy.location('hash').should('equal', '#/submodule-list');
  });
});
