/// <reference types="cypress" />

describe("Teste do filtro de pesquisa e requisições", () => {
  it("Deve retornar resultados da pesquisa com 12 livros", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="bookListItem"]').should("have.length", 12);
  });

  it("Teste de conteúdo do livro", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="bookListItem"]').contains("Título");
  });

  it("Deve retornar resultados da pesquisa com de acordo com o filtro", () => {
    cy.visit("http://localhost:5173/");
    cy.get("input[type='text']").type("ga");
    cy.get('[data-cy="bookListItem"]').should("have.length", 2);
  });
});
