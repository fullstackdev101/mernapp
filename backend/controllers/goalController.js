const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @Desc Get goals
// @Route   GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @Desc   Set goal
// @Route  POST /api/goal
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @Desc   Update goal
// @Route  PUT /api/goal/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @Desc   Delete goal
// @Route  DELETE /api/goal/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  await goal.remove();

  res.status(200).json({ message: `DELETED Goal ${goal}` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
