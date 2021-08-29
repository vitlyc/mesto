export default class UserInfo {
    constructor(userName, userProfession, userAvatar) {
        this._userName = userName;
        this._userProfession = userProfession;
        this._userAvatar = userAvatar;
    }
    getUserInfo() {
        const userInformation = {};
        userInformation.job = this._userProfession.textContent;
        userInformation.name = this._userName.textContent;
        userInformation.avatar = this._userAvatar.src;
        return userInformation;
    };

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userProfession.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }

}