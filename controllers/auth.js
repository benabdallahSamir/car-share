import { generateToken } from "../middlewars/token.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/bcryptControll.js";

// get request for login and register
export async function login(req, res) {
  res.render("connexion");
}

export async function register(req, res) {
  res.render("inscription");
}

// post request for login and register
export async function postLogin(req, res) {
  let { email, password, rememberMe } = req.body;
  rememberMe = rememberMe ? true : false;
  try {
    if (!email || !password) {
      // todo : goto login page with error message
      res.redirect("/connexion");
    }
    // check if email already exists
    const user = await User.findOne({ email });
    if (!user) {
      // todo : goto login page with error message
      res.redirect("/connexion");
    }
    // check if password is correct
    const isPasswordCorrect = await comparePassword(
      password,
      user.mot_de_passe
    );
    if (!isPasswordCorrect) {
      // todo : goto login page with error message
      res.redirect("/connexion");
    }
    generateToken(user._id, res);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    // todo : goto login page with error message
    res.redirect("/connexion");
  }
}

export async function postRegister(req, res) {
  let { confirmPassword, email, password, telephone, nom, prenom } = req.body;
  try {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !telephone ||
      !nom ||
      !prenom
    ) {
      // todo : goto register page with error message
      res.redirect("/inscription");
    }
    if (password !== confirmPassword) {
      // todo : goto register page with error message
      res.redirect("/inscription");
    }
    // check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      // todo : goto register page with error message
      res.redirect("/inscription");
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      // todo : goto register page with error message
      res.redirect("/inscription");
    }
    // create new user
    const newUser = await new User({
      prenom,
      nom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
    }).save();
    generateToken(newUser._id, res);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    // todo : goto register page with error message
    res.redirect("/inscription");
  }
}
