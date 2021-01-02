/* eslint-env jquery, browser */
$(document).ready(() => {
  $('.DTdpicker').each(function (index) {
    var defaultDate = $(this).data('defaultDate') || new Date();
    $(this).datepicker();
    $(this).datepicker({ dateFormat: 'dd/mm/yy', defaultDate });
  });
});

function openModal(bodyId) {
  const body = $('#' + bodyId).clone();
  $('#modal-body').html(body);
  $('#mainModal').modal();
  return false;
}
