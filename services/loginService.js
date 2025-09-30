const loginRepo = require("../repositories/loginRepo");

const login = async (inputUserName, inputEmail) => {
  try {
    const { data: users } = await loginRepo.getAllUsers();

    const user = users.find(
      ({ username, email }) =>
        username.toLowerCase().trim() === inputUserName.toLowerCase().trim() &&
        email.toLowerCase().trim() === inputEmail.toLowerCase().trim()
    );

    if (!user) throw new Error("User does not exist");

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { login };
