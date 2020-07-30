const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Here is the weather forcast for ${data.location}`;
        messageTwo.textContent = ` 
            The temprature is ${data.temprature} 
            but feels like ${data.feelslike}
            and there is ${data.precip} % chance for rain`;
      }
    });
  });
});
