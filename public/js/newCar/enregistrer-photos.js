document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imageInput").files[0];
  console.log(imageInput);
  if (!imageInput) return;
  const formData = new FormData();
  formData.append("images", imageInput);

  const res = await fetch("/api/car/image", {
    method: "POST",
    body: formData,
  });
  if (res.status === 201) {
    console.log("hello")
    window.location.href = "enregistrer-tarification";
    return;
  } else {
    console.error(res.status);
  }
});
