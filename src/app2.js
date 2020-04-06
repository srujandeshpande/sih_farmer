document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems, { accordion: false });
});

var x = document.getElementById("jey");
x.addEventListener(
  "click",
  () => {
    var y = document.querySelector(".formlmao");
    if (y.style.display === "none") y.style.display = "";
    else y.style.display = "none";
  },
  1
);
