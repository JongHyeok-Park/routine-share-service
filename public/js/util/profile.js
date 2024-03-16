document.addEventListener("DOMContentLoaded", () => {
  const profile = document.querySelector("#profile");
  const userImg = document.querySelector("#user-img");
  const userId = document.querySelector("#user-id");
  const detailProfile = document.querySelector("#detail-profile");
  const detailClose = document.querySelector("#detail-close");
  const detailModify = document.querySelector("#detail-modify");
  const detailUserId = document.querySelector("#detail-user-id");
  const detailUserImg = document.querySelector("#detail-user-img");
  const pencilIcon = document.querySelector("#pencil-icon");

  let isModifying = false;
  let oldId = "";

  profile.addEventListener("click", () => {
    detailProfile.style.display = "block";
  });

  detailClose.addEventListener("click", () => {
    isModifying = false;
    detailModify.style.color = "#797979";
    detailProfile.style.display = "none";
  });

  detailModify.addEventListener("mouseover", function () {
    detailModify.style.color = "white";
  });

  detailModify.addEventListener("mouseout", function () {
    detailModify.style.color = "#797979";
  });

  detailModify.addEventListener("click", () => {
    isModifying = true;
    detailUserId.removeAttribute("readonly");
    oldId = detailUserId.value;
    detailUserId.focus();
    detailUserId.value = "";
  });

  //user-id 변경
  detailUserId.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      let newId = detailUserId.value.trim();
      isModifying = false;
      if (newId !== "") {
        newId = newId.replace(/ /g, "");
        detailUserId.value = newId;
        userId.textContent = newId;
        detailUserId.placeholder = newId;
      } else {
        detailUserId.value = oldId;
      }
      detailUserId.setAttribute("readonly", true);
      detailUserId.blur();
    }
  });

  //화면 줄이면 profile 사라짐
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      isModifying = false;
      detailProfile.style.display = "none";
    }
  });

  //프로필 변경
  pencilIcon.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
          detailUserImg.src = e.target.result;
          userImg.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
      }
    });
  });
});
