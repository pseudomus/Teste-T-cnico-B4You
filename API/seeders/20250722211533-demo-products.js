'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        name: 'iPhone 14',
        price: 4999.99,
        category: 'Eletrônicos',
        description: 'Último modelo da Apple com câmera avançada e tela OLED.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tênis de Corrida Adidas',
        price: 299.90,
        category: 'Esportes e Lazer',
        description: 'Leve e confortável, ideal para atividades físicas.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'O Poder do Hábito',
        price: 39.90,
        category: 'Livros e Papelaria',
        description: 'Livro best-seller sobre formação de hábitos.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        category: 'Eletrônicos',
        description: 'Som de alta qualidade e cancelamento de ruído.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bolsa Feminina de Couro',
        price: 450.00,
        category: 'Beleza e Cuidados Pessoais',
        description: 'Elegante e espaçosa, perfeita para o dia a dia.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});

  }
};
