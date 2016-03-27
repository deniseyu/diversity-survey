$(document).ready(function() {
  $('#gender-input').focusout(function() {
    var genderInput = $(this).val();
    $('#gender-option').val(genderInput).prop('checked', true);
  });
});
