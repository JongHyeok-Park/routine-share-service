class UserProfile extends Observer {
  constructor() {
    super();
    this.userImg = document.querySelector("#user-img");
    this.userId = document.querySelector("#user-id");
    this.detailUserImg = document.querySelector("#detail-user-img");
    this.detailUserId = document.querySelector("#detail-user-id");
    this.userInfo = null;
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(user) {
    this.userInfo = user;
    this.render();
  }

  render() {
    if (this.userInfo) {
      this.userImg.src = this.userInfo.image;
      this.userId.textContent = this.userInfo.id;
      this.detailUserImg.src = this.userInfo.image;
      this.detailUserId.textContent = this.detailUserId.id;
    }
  }
}
