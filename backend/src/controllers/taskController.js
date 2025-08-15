const TaskModel = require('../models/taskModel');
const bigintToInt = require('../utils/bigintToInt');

// Create task
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      status: status || 'pendiente',
      priority: priority || 2,
      due_date: due_date || null,
    });

    res.json(bigintToInt(newTask));
  } catch (error) {
    next(error)
  }
};

// Get tasks with pagination, filters, and sorting
const getTasks = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = parseInt(priority);
    if (search) {
      filters.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const total = await TaskModel.count(filters);

    const tasks = await TaskModel.findMany({
      where: filters,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      tasks: bigintToInt(tasks),
    });
  } catch (error) {
    next(error);
  }
};

// Get task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(bigintToInt(task));
  } catch (error) {
    next(error);
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const task = await TaskModel.update(req.params.id, req.body);
    res.json(bigintToInt(task));
  } catch (error) {
    next(error);
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    await TaskModel.delete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };