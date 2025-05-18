import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { render } from "ejs";

export default async function landingPage(req, res) {
  // get token from cookies
  try {
    const token = req.cookies.jwt || "";
    if (!token) return res.render("index", { isLogged: false });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie("jwt");
      return res.render("index", { isLogged: false });
    }
    user.id = user._id;
    delete user._id;
    delete user.createdAt;
    delete user.mot_de_passe;
    console.log(user);
    return res.render("index", { user, isLogged: true });
  } catch (error) {
    console.log(error);
    res.clearCookie("jwt");
    return res.render("index", { isLogged: false });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  res.redirect("/");
}
