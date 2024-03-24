import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import Employee from './employee.js'
const Transaction = sequelize.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('issue', 'return', 'scrap'),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
Transaction.belongsTo(Employee, { foreignKey: 'employee_id' });


export default Transaction;