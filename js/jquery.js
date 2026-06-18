import $ from "jquery";

$(function () {
  const form = $("#form");
  enableFastFeedback(form);

  const userName = $("#userName");
  const email = $("#email");
  const password = $("#password");
  const confirmPassword = $("#confirmPassword");

  form.submit(function (event) {
    event.preventDefault();

    let isValid = true;

    if (!validateUsername()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;

    if (!isValid) return;

    const data = {
      userName: formatName(userName.val()),
      email: formatEmail(email.val()),
      password: formatPassword(password.val()),
    };

    $.ajax({
      url: "http://localhost:3001/users",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (res) {
        $("#form")[0].reset();

        $("#form input").each(function () {
          $(this).parent().css({
            "border-color": "",
            "box-shadow": "",
          });
        });
        $("#passwordFeedback").text("");
        console.log("Saved:", res);
      },
      error: function (err) {
        console.log("Error", err);
      },
    });
  });
});

function highlight(element, isValid) {
  if (isValid) {
    element.css({
      "border-color": "#097609",
      "box-shadow": "0 0 0 3px rgba(0, 136, 0, 0.8)",
    });
  } else {
    element.css({
      "border-color": "#ae0d0d",
      "box-shadow": "0 0 0 3px rgba(230, 0, 0, 0.7)",
    });
  }
}

function formatName(name) {
  return name.trim().toLowerCase();
}

function formatEmail(email) {
  return email.trim().toLowerCase();
}

function formatPassword(password) {
  return password.trim();
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

function validateUsername() {
  const input = $("#userName");
  const value = input.val().trim();

  const valid = value.length > 3;

  highlight(input.parent(), valid);

  return valid;
}

function validateEmail() {
  const input = $("#email");
  const value = input.val();

  const valid = isValidEmail(value);

  highlight(input.parent(), valid);

  return valid;
}

function validatePassword() {
  const input = $("#password");
  const value = input.val();

  const valid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);

  if (!valid) {
    $("#passwordFeedback").text(
      "Password must contain at least on letter and one number",
    );
  } else {
    $("#passwordFeedback").text("");
  }

  highlight(input.parent(), valid);

  return valid;
}

function validateConfirmPassword() {
  const input = $("#confirmPassword");

  const valid = input.val() === $("#password").val() && input.val() !== "";

  highlight(input.parent(), valid);

  return valid;
}

function enableFastFeedback(form) {
  form.find("#userName").blur(validateUsername);

  form.find("#email").blur(validateEmail);

  form.find("#password").blur(validatePassword);

  form.find("#confirmPassword").blur(validateConfirmPassword);
}
