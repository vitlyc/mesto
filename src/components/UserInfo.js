export default class UserInfo {
    constructor(userNameSelector, userProfessionSelector) {
        this._userName = document.querySelector(userNameSelector)
        this._userProfession = document.querySelector(userProfessionSelector)

    }
    getUserInfo() {
        const userInformation = {
            name: this._userName.textContent,
            profession: this._userProfession.textContent
        };
        return userInformation;
    }
    setUserInfo(name, profession) {
        // console.log(profession);
        this._userName.textContent = name;
        this._userProfession.textContent = profession;
    }


};