function get_font_size() {
    return parseFloat($("html").css('font-size'));
}

function set_disabled(font_size) {
  if (font_size >= 11) {
    $('.text-size-larger').parent().addClass('disabled');
  } else {
    $('.text-size-larger').parent().removeClass('disabled');
  }
}

$(function(){
  $('.text-size-larger').click(function(e){
    e.preventDefault();
    var font_size = get_font_size();
    if (font_size < 11) {
      $("html").css({'font-size': '+=0.5'});
      font_size = get_font_size();
      set_disabled(font_size);
    }
  });
  $('.text-size-smaller').click(function(e){
    e.preventDefault();
    $("html").css({'font-size': '-=0.5'});
    var font_size = get_font_size();
    set_disabled(font_size);
  });
});
