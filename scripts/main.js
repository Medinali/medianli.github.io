const myImage = document.querySelector("img");

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  console.log(mySrc, "123");
  const defaultImgPath = "./images/solar-system-montage.jpg";
  if (mySrc === defaultImgPath) {
    myImage.setAttribute("src", "./images/memem.jpg");
  } else {
    myImage.setAttribute("src", defaultImgPath);
  }
  let myButton = document.querySelector("button");
  let myHeading = document.querySelector("h1");
  function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
      setUserName();
    } else {
      localStorage.setItem("name", myName);
      myHeading.textContent = `Medina is genius, ${myName}`;
    }
  }
  if (!localStorage.getItem("name")) {
    setUserName();
  } else {
    let storedName = localStorage.getItem("name");
    myHeading.innerHTML = "Medina is genius, " + storedName;
  }

  myButton.addEventListener("click", () => {
    setUserName();
  });
});
