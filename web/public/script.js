window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementsByTagName("form")[0];

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const traceId = uuid.v4(),
      spanId = uuid.v4();

    fetch("/api/v1/inviteUser", {
      method: "POST",
      headers: {
        "trace-id": traceId,
        "parent-id": spanId,
      },
    })
      .then((data) => {
        console.log("Success!");
      })
      .catch((err) => {
        console.log("Something bad happened", `[traceId: ${traceId}]`);
      });
  });
});
