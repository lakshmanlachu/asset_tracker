import Category from "../models/category.js";

export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories) {
            return res.render('category/index', { categories });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const getAddCategoryForm = async (req, res) => {
    try {
        res.render('category/add')
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const addCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Asset category already exists' });
        }
        const category = await Category.create({ name: name, description: description });
        if (category) {
            const categories = await Category.findAll();
            return res.render('category/index', { categories });
        } else {
            return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const getEditCategoryForm = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (category) {
            res.render('category/view', { category });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (category) {
            res.render('category/edit', { category });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            category.name = name;
            category.description = description;
            await category.save();
            return res.status(200).send({ status: true, message: "Add Category Successfully" });
        } else {
            res.status(404).send({ message: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.destroy();
        return res.status(200).send({ status: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting Category:", error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};