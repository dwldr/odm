$(function(){
  $("#overlay").hide();

  var toggle = document.getElementById("navbar-menu-toggle");

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      if (this.classList.contains("is-active") === true){ 
        this.classList.remove("is-active");
      } else {
        this.classList.add("is-active");
      }
    });
  }

  toggleHandler(toggle);

  $("#navbar-menu-toggle").click(function(){
    $("#navbar-menu-toggle").addClass("fade-out");
    $("#content-wrapper").toggleClass("blur");
    $("body").toggleClass("overflow-hidden");
    $("#overlay").fadeToggle();
    setTimeout(function() {
      $("#navbar-menu-toggle").removeClass('fade-out');
    }, 800);
  });

  $("#overlay").click(function(){
    $("#navbar-menu-toggle").click();
  });

});
