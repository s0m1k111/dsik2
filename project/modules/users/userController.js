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

async function searchUsers(req, res) {
  try {
    const query = (req.query.query || "").toLowerCase();
    const currentUserId = req.user.id;

    if (!query.trim()) {
      return res.json({ results: [] });
    }

    const users = await userService.getAllUsers();

    const results = users
      .filter((u) => u.id !== currentUserId && (u.username.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)))
      .map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        avatar: u.avatar,
      }));

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "Ошибка поиска пользователей" });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getUserById,
  searchUsers,
};
