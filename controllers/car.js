import { Car, TemporaryDocuments } from "../models/models.js";
import { deleteFile } from "../utils/files.js";

// get
export async function gotoNewCarPage(req, res) {
  // const {user , isLogged} = req
  res.render("newCar/enregister-vehicule", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoTraficationCarPage(req, res) {
  // const {user , isLogged} = req
  res.render("newCar/enregistrer-tarification", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoPhotoCarPage(req, res) {
  res.render("newCar/enregistrer-photo", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoDocumentCarPage(req, res) {
  res.render("newCar/enregistrer-document", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoConfirmationCarPage(req, res) {
  res.render("newCar/enregistrer-confirmation", {
    user: req.user,
    isLogged: req.isLogged,
  });
}

export async function addCarImg(req, res) {
  let carImg = req.file;
  const { userId } = req;
  if (!carImg) return res.status(400).send();
  carImg = carImg.path;
  try {
    const isExist = await TemporaryDocuments.findOne({ userId });
    if (!isExist) {
      await new TemporaryDocuments({
        userId,
        carImg,
      }).save();
      return res.status(201).send();
    }
    // deleting the current files
    if (isExist.carImg) deleteFile(isExist.carImg);

    await TemporaryDocuments.findByIdAndUpdate(isExist._id, {
      carImg,
    });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export async function addDocuments(req, res) {
  let [cartGris, permis] = req.files;
  const { userId } = req;
  if (!cartGris || !permis) return res.status(400).send();
  cartGris = cartGris.path;
  permis = permis.path;

  // return res.status(201).send();

  try {
    const isExist = await TemporaryDocuments.findOne({ userId });
    if (!isExist) {
      await new TemporaryDocuments({
        userId,
        cartGris,
        permis,
      }).save();
      return res.status(201).send();
    }
    // deleting the current files
    if (isExist.permis) deleteFile(isExist.permis);
    if (isExist.cartGris) deleteFile(isExist.cartGris);

    await TemporaryDocuments.findByIdAndUpdate(isExist._id, {
      permis,
      cartGris,
    });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export async function createNewCard(req, res) {
  const {
    marque,
    modele,
    prix,
    kilometrage,
    ville,
    description,
    annee,
    remiseSemaine = 0,
    remiseMois = 0,
  } = req.body;
  const { userId } = req;
  if (
    !marque ||
    !modele ||
    prix < 0 ||
    kilometrage < 0 ||
    !ville ||
    !description ||
    +annee < 1950
  )
    return res
      .status(422)
      .send({ message: "one of priciple information are missing " });
  try {
    const files = await TemporaryDocuments.findOne({ userId });
    if (!files)
      return res.status(400).send({ message: "you need to upload file " });
    if (!files.cartGris || !files.permis)
      return res
        .status(400)
        .send({ message: "you need to upload cardgris and permis " });
    if (!files.carImg)
      return res.status(400).send({ message: "you need to upload car img " });

    await new Car({
      marque,
      modele,
      prix,
      kilometrage,
      ville,
      description,
      carImg: files.carImg,
      cartGris: files.cartGris,
      permis: files.permis,
      annee,
      remiseSemaine,
      remiseMois,
      userId,
    }).save();

    await TemporaryDocuments.findByIdAndDelete(files._id);

    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
