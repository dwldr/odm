function delayedLoad() {
  NProgress.done();
}

NProgress.start();

$(window).load(function(){
  this.setTimeout(delayedLoad, 250);
});
