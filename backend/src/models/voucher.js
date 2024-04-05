const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Voucher = sequelize.define('Voucher', {
    voucher_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    discount: { type: DataTypes.INTEGER, allowNull: false },
    limit: { type: DataTypes.INTEGER, allowNull: false },
    used:{ type: DataTypes.INTEGER, allowNull: false },
    discount_type: DataTypes.STRING,
}, 
{
    timestamps : false
})

module.exports = Voucher;
