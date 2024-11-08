import UserService from "../services/user.service.js";

const userService = new UserService();

export const Login = async (req, res) => {
  try {
    const body = req.body;

    const result = await userService.Login(body);

    res.status(200).json(result);
    // res.cookie("jwt", result);
    // res.redirect("http://localhost:5173");
  } catch (err) {
    res.status(500).json({ message: "Error to login", error: err.message });
  }
};

export const CreateUser = async (req, res) => {
  try {
    const body = req.body;

    const result = await userService.CreateUser(body);

    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error to post users", error: err.message });
  }
};

export const ReadUsers = async (req, res) => {
  try {
    const result = await userService.ReadUsers();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error to get users", error: err.message });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = req.params;
    const body = req.body;

    const result = await userService.UpdateUser(id, body);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error to put users", error: err.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = req.params;

    const result = await userService.DeleteUser(id);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error to delete users", error: err.message });
  }
};
