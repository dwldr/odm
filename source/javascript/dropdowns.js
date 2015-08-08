$(function(){
  $(".dropdown-toggle").click(function(){
    self = $(this);
    self.addClass("fade-out");
    function removeFade(self){
      self.removeClass('fade-out');
    }
    setTimeout(function() {
      removeFade(self);
    }, 800);
  });
});
