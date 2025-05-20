document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imageInput").files[0];
  if (!imageInput) return;
  const formData = new FormData();
  formData.append("images", imageInput);
  try {
    const res = await fetch("/api/car/image", {
      method: "POST",
      body: formData,
    });
    if (res.status === 201) {
      window.location.href = "enregister-options";
      return;
    } else {
      console.error(res.status);
    }
  } catch (error) {
    console.log(error)
  }
});
