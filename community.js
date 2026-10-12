"use strict";

(() => {
  const form = document.getElementById("creator-form");
  const video = document.getElementById("video-url");
  const review = document.getElementById("email-review");
  const bodyPreview = document.getElementById("email-body");
  const emailLink = document.getElementById("email-link");
  const editButton = document.getElementById("edit-details");

  video.addEventListener("input", () => video.setCustomValidity(""));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let url;
    try {
      url = new URL(video.value.trim());
    } catch {
      video.setCustomValidity(
        "Please enter the full https:// link to your published video.",
      );
      video.reportValidity();
      return;
    }
    if (!["https:", "http:"].includes(url.protocol)) {
      video.setCustomValidity(
        "Please enter an http:// or https:// link to your published video.",
      );
      video.reportValidity();
      return;
    }

    const name = form.elements.name.value.trim();
    if (!name) {
      form.elements.name.setCustomValidity("Please enter your name.");
      form.elements.name.reportValidity();
      return;
    }
    const profile = form.elements.profile.value.trim();
    const note = form.elements.note.value.trim();
    const body = [
      "Assalamu alaykum,",
      "",
      `My name is ${name}. I'd like to join the Sutrah creator community.`,
      "",
      `My published Sutrah video: ${url.href}`,
      ...(profile ? [`My social profile: ${profile}`] : []),
      "",
      "Please send me the redemption instructions for my six months of Sutrah Pro free and the three-month free offer for my audience.",
      ...(note ? ["", `My note: ${note}`] : []),
      "",
      "Thank you!",
      name,
    ].join("\n");

    bodyPreview.textContent = body;
    emailLink.href = `mailto:singhanhad78@gmail.com?subject=${encodeURIComponent("Sutrah creator community — my video")}&body=${encodeURIComponent(body)}`;
    form.hidden = true;
    review.hidden = false;
    review.focus();
  });

  form.elements.name.addEventListener("input", () =>
    form.elements.name.setCustomValidity(""),
  );
  editButton.addEventListener("click", () => {
    review.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
  form.hidden = false;
})();
