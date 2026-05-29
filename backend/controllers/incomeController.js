const Income = require('../models/Income');

exports.getAll = async (req, res) => {
  try {
    const items = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    const item = new Income(data);
    await item.save();
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, data: { id: req.params.id } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
