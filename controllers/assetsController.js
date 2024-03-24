import Category from "../models/category.js";
import Assets from "../models/assets.js";
import { sequelize } from '../database/connection.js';
import Employee from '../models/employee.js'
import { Op } from "sequelize";
import Transaction from "../models/transaction.js";


export const getAllAssets = async (req, res) => {
    try {
        const assets = await Assets.findAll({ include: { model: Category } });
        if (assets) {
            return res.render('assets/index', { assets });
        } else {
            return res.status(404).json({ message: 'Assets not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const getAddAssetsForm = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.render('assets/add', { categories })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const getcategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories)
            return res.status(200).send({ status: true, data: categories });
        else
            return res.status(200).send({ status: true, data: [] });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const addAsset = async (req, res) => {
    try {
        const { serial_number, name, model, category_id, purchase_date, status, branch } = req.body;

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({ error: 'category not found' });
        }

        const asset = await Assets.create({
            serial_number,
            name,
            model,
            category_id,
            purchase_date,
            branch,
            status
        });
        return res.status(200).send({ status: true, message: "Asstes Add successfully", data: asset });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const getEditAssetsForm = async (req, res) => {
    try {
        const { id } = req.params;
        const assets = await Assets.findByPk(id, { include: { model: Category } });
        if (assets) {
            console.log(assets);
            res.render('assets/view', { assets });
        } else {
            return res.status(404).json({ message: 'Assets not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const editAssets = async (req, res) => {
    try {
        const { id } = req.params;
        const assets = await Assets.findByPk(id, { include: { model: Category } });
        const categories = await Category.findAll();
        if (assets) {
            res.render('assets/edit', { assets, categories });
        } else {
            return res.status(404).json({ message: 'Assets not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const updateAssets = async (req, res) => {
    const { id } = req.params;
    try {
        const asset = await Assets.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        const { serial_number, name, model, category_id, purchase_date, status, branch } = req.body;

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({ error: 'Asset category not found' });
        }

        await asset.update({
            serial_number,
            name,
            model,
            category_id,
            purchase_date,
            branch,
            status
        });

        res.status(200).json(asset);
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteAssets = async (req, res) => {
    const { id } = req.params;
    try {
        const asset = await Assets.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        await asset.destroy();

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const stockAssets = async (req, res) => {
    try {
        console.log('llll');
        const assetsInStock = await Assets.findAll({ where: { status: 'Available' } });

        const totalsByBranch = await Assets.findAll({
            attributes: [
                'branch',
                [sequelize.fn('COUNT', sequelize.col('id')), 'totalAssets'],
            ],
            where: { status: 'Available' },
            group: ['branch']
        });
        const totalValue = totalsByBranch.reduce((acc, branch) => acc + parseInt(branch.dataValues.totalAssets), 0);

        res.render('common/stock', {
            assetsInStock,
            totalsByBranch,
            totalValue
        });
    } catch (error) {
        console.error('Error fetching stock details:', error);
        res.status(500).send('Internal server error');
    }

}

export const issueAssets = async (req, res) => {
    try {
        const assets = await Assets.findAll({ where: { status: 'Available' } });
        const employees = await Employee.findAll();

        res.render('common/issue', { assets, employees })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const scrapAssets = async (req, res) => {
    try {
        const assets = await Assets.findAll({ where: { status: { [Op.or]: ['Available', 'Issued'] } } });
        res.render('common/scrap', { assets })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const historyAssets = async (req, res) => {
    try {
        const { id } = req.params;

        const asset = await Assets.findByPk(id);

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        const assetHistory = await Transaction.findAll({
            where: {
                asset_id: id
            },
            include: [{
                model: Employee,
                attributes: ['employee_id', 'name'] 
              }],
            order: [['createdAt', 'ASC']]
        });
        console.log(assetHistory, 'assetHistory');

        res.render('common/history', { asset, history: assetHistory })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const returnAssets = async (req, res) => {
    try {
        const assets = await Assets.findAll({ where: { status: 'Issued' } });
        const employees = await Employee.findAll();
        res.render('common/return', { assets, employees })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};