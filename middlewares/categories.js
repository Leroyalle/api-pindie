const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  next();
};

const createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    req.category = await categories.create(req.body);
    next();
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Ошибка создания категории' }));
  }
};

const findCategoryById = async (req, res, next) => {
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify({ message: 'Категория не найдена' }));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Ошибка обновления категории' }));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Ошибка удаления категории' }));
  }
};

const checkIsCategoryExits = async (req, res, next) => {
  try {
    const isInArray = await req.categoriesArray.find((category) => req.body.name === category.name);
    if (isInArray) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).send(JSON.stringify({ message: 'Категория уже существует' }));
    } else {
      next();
    }
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Произошла ошибка при проверке категории' }));
  }
};

const checkEmptyName = (req, res, next) => {
  if (!req.body.name) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Заполни имя категории' }));
  } else {
    next();
  }
};

module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExits,
  checkEmptyName,
};
