const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Supplier = sequelize.define('Supplier', {
    supplier_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    note: DataTypes.STRING,
}, 
{
    timestamps : false
})

module.exports = Supplier;
