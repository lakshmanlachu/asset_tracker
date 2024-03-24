import Transaction from "../models/transaction.js";
import Employee from "../models/employee.js";
import Asset from "../models/assets.js";

export const addIssue = async (req, res) => {
    try {
        const { asset_id, employee_id } = req.body;

        const asset = await Asset.findByPk(asset_id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found or not available' });
        }

        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await Asset.update({ status: 'Issued' }, { where: { id: asset_id } });
        await Transaction.create({ asset_id, employee_id, type: 'issue' });

        res.status(200).json({ message: 'Asset issued successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const returnIssue = async (req, res) => {
    try {
        const { asset_id, employee_id, reason } = req.body;

        const asset = await Asset.findByPk(asset_id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        await Asset.update({ status: 'Available' }, { where: { id: asset_id } });
        await Transaction.create({ asset_id, employee_id, type: 'return', reason });

        res.status(200).json({ message: 'Asset returned successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const scrapIssue = async (req, res) => {
    try {
        const { asset_id, reason } = req.body;

        const asset = await Asset.findByPk(asset_id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        await Asset.update({ status: 'Scrapped' }, { where: { id: asset_id } });

        res.status(200).json({ message: 'Asset returned successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};