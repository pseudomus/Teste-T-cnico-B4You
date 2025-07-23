'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [[
            'Eletrônicos',
            'Moda e Acessórios',
            'Casa e Decoração',
            'Beleza e Cuidados Pessoais',
            'Livros e Papelaria',
            'Esportes e Lazer',
            'Brinquedos e Jogos',
            'Música e Filmes',
            'Saúde e Bem-estar',
            'Alimentos e Bebidas',
            'Automotivo',
            'Pets',
        ]],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      bought: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }, 
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
    }
  );

  return Product;
};
