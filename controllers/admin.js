import Admin from "../models/Admin.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

export async function gotoAdminPage(req, res) {
  try {
    const { user, userId, isLogged } = req;
    // * get users length
    let users = await User.find();
    users = users.length;
    // * get annonce length
    let cars = await Car.find({ status: "publiee" });
    cars = cars.length;
    // ! get litige length
    const litiges = 0;
    // ! get plaints length
    const plaints = 0;
    res.render("admin/dashboard", { user, users, cars, litiges, plaints });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoAdminUsersPage(req, res) {
  try {
    const { user, userId } = req;
    // * get users length
    let users = await User.find();
    console.log(users[0]);
    res.render("admin/users", { user, users });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export default async function accessAdmin(req, res, next) {
  try {
    const { userId, user } = req;
    const isAdmin = await Admin.findOne({ user_id: userId });
    if (!isAdmin) return res.render("503");
    next();
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function accountStatus(req, res) {
  try {
    const { accountId } = req.body;
    const user = await User.findById(accountId);
    if (!user) return res.status(404).send();
    const newStatus = user.statut_compte === "activé" ? "en_attente" : "activé";
    await User.findByIdAndUpdate(accountId, { statut_compte: newStatus });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
