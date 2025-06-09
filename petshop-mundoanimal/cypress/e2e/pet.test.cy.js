describe('Fluxo completo de pets', () => {
  const loginEmail = 'nathan@gmail.com';
  const loginPassword = '123';

  const loginEmailADM = 'adm@gmail.com';
  const loginPasswordADM = '123';

  const originalPet = {
    name: 'Bolinho',
    type: 'Cachorro',
    breed: 'Vira-lata',
    age: '4'
  };
  const updatedPet = {
    name: 'Bolinha Editada',
    type: 'Gato',
    breed: 'Siamês',
    age: '2'
  };

  before(() => {
    cy.on('window:confirm', () => true);
  });

  it('Faz login', () => {
    cy.visit('http://localhost:5173/');

    cy.get('.btn-cliente').click();
    cy.get('input[type="email"]').type(loginEmail);
    cy.get('input[type="password"]').type(loginPassword);
    cy.get('button[type="submit"]').click();
  
    cy.get('.edit-btn').click();
    cy.get('#name').clear().type(originalPet.name);
    cy.get('#type').select(originalPet.type);
    cy.get('#breed').clear().type(originalPet.breed);
    cy.get('#age').clear().type(originalPet.age);

    cy.get('.submit-btn').click();
    cy.get('.swal2-confirm').click();

    cy.get('.delete-btn').click();
    cy.get('.swal2-confirm').click();
    cy.get('.swal2-confirm').click();

    cy.get('.register-btn').click();
    cy.get('#name').type(updatedPet.name);
    cy.get('#type').select(updatedPet.type);
    cy.get('#breed').type(updatedPet.breed);
    cy.get('#age').type(updatedPet.age);

    cy.get('.submit-btn').click();
    cy.get('.swal2-confirm').click();

    cy.get('.user-button').click();
    cy.get('.logout').click();

    cy.get('.btn-cliente').click();
    cy.get('input[type="email"]').type(loginEmailADM);
    cy.get('input[type="password"]').type(loginPasswordADM);
    cy.get('button[type="submit"]').click();

    cy.get(':nth-child(1) > input').click();
    cy.get(':nth-child(1) > input').click();
    cy.get('.filter-group > :nth-child(2) > input').click();
    cy.get('.filter-group > :nth-child(2) > input').click();

    cy.get('.btn-alterar').click();
    
    cy.get('#name')
    .invoke('val')           // pega o valor atual do input
    .then((currentValue) => {
      if (currentValue === 'Nathan') {
      cy.get('#name').clear().type('Allan');
    } else {
      cy.get('#name').clear().type('Nathan');
    }
  });

    cy.get('.submit-btn').click();
    cy.get('.swal2-confirm').click();

    cy.reload(); 

    cy.get('[href="/funcionario/pets"]').click();
    cy.get('.search-input').click().type(updatedPet.name);

    cy.get('.view-client-btn').click();
    cy.get('.user-button').click();
    cy.get('.logout').click();
  });
});
