export default class UserInfo {
    constructor(userName, userProfession) {
        this._userName = userName;
        this._userProfession = userProfession;

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