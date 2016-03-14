

const a = "kenode blog";

console.log(a);

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
  $('#app-left, #left-tools a, #well').on('click', () => {
    if ($('#app-left:hidden').size() > 0) {
      return;
    }
    if ($('#left-tools').attr('class') === 'app-left-move') {
      $('#left-tools').attr('class', 'app-left');
      $('#well').attr('class', 'app-well-hidden');
    }
    else {
      $('#left-tools').attr('class', 'app-left-move');
      $('#well').attr('class', 'app-well');
    }
  });
  $('[name="deng-checkbox"]').bootstrapSwitch({
    onSwitchChange:  (evt, state) => {
      evt.preventDefault(); 
      setDarkpage(state);
    }
  });
  $('#left-tools-plus a').on('click', (evt) => {
    let $target = $(evt.currentTarget);
    setDarkpage(!$target.hasClass('active'));
  });

});

function setDarkpage (state) {
  if (state) {
    $('#left-tools-plus a').addClass('active');
    $('[name="deng-checkbox"]').bootstrapSwitch('state', true);
    $('body').addClass('dark-page');
  }
  else {
    $('#left-tools-plus a').removeClass('active');
    $('[name="deng-checkbox"]').bootstrapSwitch('state', false);
    $('body').removeClass('dark-page');

  }
}
