const userService = require("./userService");

async function getProfile(req, res) {
  try {
    const user = req.user; // authCheck уже положил сюда данные
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения профиля" });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const updatedUser = await userService.updateUser(userId, updates);

    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Ошибка обновления профиля" });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения пользователя" });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getUserById,
};
