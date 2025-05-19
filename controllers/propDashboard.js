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
