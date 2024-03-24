import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';
import  Category  from "./category.js";

const Asset = sequelize.define('Asset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    serial_number: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Available', 'Issued', 'Scrapped'),
        allowNull: false,
        defaultValue: 'Available'
    },
    branch: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'assets'
});

Asset.belongsTo(Category, { foreignKey: 'category_id' });

export default Asset;