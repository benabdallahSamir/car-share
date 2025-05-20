import Car from "../models/Car.js";

export async function getoMainPropDashboard(req, res) {
  const { user, userId } = req;
  try {
    let myCars = await Car.find({ userId });

    // ! make reservation logic return max 4
    // ! make statistique logic in externel function

    const statistique = {
      moisPayment: 12000,
      moisPaymentpercent: {
        isHigher: true,
        number: 12,
      },
      moisReservation: 20,
      moisReservationpercent: {
        isHigher: false,
        number: 25,
      },
      newLocataire: 4,
      newLocatairepercent: {
        isHigher: true,
        number: 3,
      },
      tauxOccupation: 80,
      tauxOccupationpercent: {
        isHigher: false,
        number: 3,
      },
    };

    const reservations = [];
    myCars = myCars.map((ele) => {
      const reservation = 10;
      const total = 2500;
      ele.reservation = reservation;
      ele.total = total;
      return ele;
    });
    console.log(myCars);
    res.render("prop dashboard/dashboard", {
      user,
      myCars,
      reservations,
      statistique,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function gotoPropDisponibility(req, res) {
  const { user } = req;
  try {
    res.render("prop dashboard/disponibilite", {
      user,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropReservations(req, res) {
  const { user } = req;
  try {
    const reservations = [];
    res.render("prop dashboard/reservations", {
      user,
      reservations,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function getoPropRevenu(req, res) {
  const { user, userId } = req;
  try {
    const statistique = {
      totalAnnuel: 120000,
      annuelMoyenne: 10000,
      annuelMoyennePercent: {
        isHigher: true,
        number: 0,
      },
      annulation: 0,
      annulationPercent: {
        isHigher: true,
        number: 0,
      },
      reservationTotalPercent: {
        isHigher: true,
        number: 0,
      },
    };
    let myCars = await Car.find({ userId });
    myCars = myCars.map((car) => {
      const reservationTotalPrix = 182030;
      const reservationPercent = 100;
      car.reservationTotalPrix = reservationTotalPrix;
      car.reservationPercent = reservationPercent;
      return car;
    });
    res.render("prop dashboard/revenus", {
      user,
      myCars,
      statistique,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropChat(req, res) {
  const { user, isLogged } = req;
  try {
    res.render("prop dashboard/chat", {
      user,
      isLogged,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropMyCars(req, res) {
  const { user, userId } = req;
  try {
    let myCars = await Car.find({ userId, est_enable: true });
    myCars = myCars.map((car) => {
      const reservations = 0;
      const total = 0;
      car.reservations = reservations;
      car.total = total;
      return car;
    });
    res.render("prop dashboard/mes-vehicules", {
      user,
      myCars,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
