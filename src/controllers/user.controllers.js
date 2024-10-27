import UserService from "../services/user.service.js";

const userService = new UserService();

export const CreateUser = async (req, res) => {
  try {
    const body = req.body;

    const result = await userService.CreateUser(body);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error to post users", err.message);
  }
};

export const ReadUsers = async (req, res) => {
  try {
    const result = await userService.ReadUsers();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error to get users");
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = req.params;
    const body = req.body;

    const result = await userService.UpdateUser(id, body);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error to put users", err.message);
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = req.params;

    const result = await userService.DeleteUser(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error to delete users", err.message);
  }
};
