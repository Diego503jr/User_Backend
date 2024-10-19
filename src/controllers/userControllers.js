import UserService from "../services/userService.js";

const userService = new UserService();

export const ReadUsers = async () => {
  try {
    const users = await userService.ReadUsers();
    return users;
  } catch (err) {
    console.log("Error in controller", err.message);
  }
};

export const CreateUser = async (req) => {
  try {
    const { nombre, correo, clave } = req.body;

    const newUser = { nombre, correo, clave };
    await userService.CreateUser(newUser);
  } catch (err) {
    console.log("Error in controller", err.message);
  }
};
