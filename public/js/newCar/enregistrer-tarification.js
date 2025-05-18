document
  .getElementById("pricing-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let prix = document.getElementById("prix-jour").value;
    // ! handle error
    if (isNaN(prix)) {
      return;
    }
    const remiseSemaine =
      document.getElementsByName("reduction-hebdo")[0].value;
    const remiseMois = document.getElementsByName("reduction-mensuelle")[0]
      .value;

    // get all data from local storage

    let information = localStorage.getItem("vehiculeInformation");
    // ! handle error
    if (!information) return;
    information = JSON.parse(information);

    const body = {
      ...information,
      prix,
      remiseMois,
      remiseSemaine,
    };

    try {
      const res = await fetch("/api/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        localStorage.clear();
        window.location.href = "/enregistrer-confirmation";
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  });
