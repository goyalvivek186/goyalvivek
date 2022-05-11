screen.orientation.addEventListener("change", function () {
  if (screen.orientation.type == "portrait-primary") {
    alert("For better experience, change the screen orientation to Landscape");
  }
  console.log("Current orientation is " + screen.orientation.type);
});

if (screen.orientation.type == "portrait-primary") {
  alert("For better experience, change the screen orientation to Landscape");
}
