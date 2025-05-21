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
    res.render("admin/users", { user, users });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoModel(req, res) {
  try {
    const { user, userId } = req;
    const { carId } = req.params;
    if (!carId) return res.redirect("/listings");
    // * get cars data
    let cars = await Car.find();
    // * get car owner'information
    let carsFormat = [];
    let model = null;
    for (const car of cars) {
      const user = await User.findById(car.userId);
      if (!user) continue;
      car.ownerAccount = user;
      carsFormat.push(car);
      // * select the special model
      if (car._id.toString() === carId) model = car;
    }
    if (model === null) return res.render("404")
    res.render("admin/listings", { user, cars: carsFormat, model });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoAnnonce(req, res) {
  try {
    const { user, userId } = req;

    // * get cars data
    let cars = await Car.find();
    // * get car owner'information
    let carsFormat = [];
    for (const car of cars) {
      const user = await User.findById(car.userId);
      if (!user) continue;
      car.ownerAccount = user;
      carsFormat.push(car);
    }
    res.render("admin/listings", { user, cars: carsFormat, model: null });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminDisputes(req, res) {
  try {
    const { user } = req;

    res.render("admin/disputes", { user });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminReports(req, res) {
  try {
    const { user } = req;

    res.render("admin/reports", { user });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminPlaints(req, res) {
  try {
    const { user } = req;

    res.render("admin/complaints", { user });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
// apis and middle wars
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
export async function carStatus(req, res) {
  try {
    const { type, carId } = req.body;
    console.log(type);
    console.log(carId);
    if (!type || !carId) return res.status(400).send();
    const car = await Car.findById(carId);
    if (!car) return res.status(404).send();
    const status =
      type === "rejected"
        ? "refusée"
        : type === "approved"
        ? "publiee"
        : "en_attente";
    await Car.findByIdAndUpdate(carId, { status });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
