var Utils = {
    validateUserData: function (userData) {
        return this.validateUser(userData) &&
            userData.notes !== undefined &&
            userData.notes instanceof Array;
    },
    validateUser: function (user) {
        return user !== undefined &&
            user.name !== undefined &&
            user.email !== undefined &&
            user.email.includes('@');
    },

    getFileName: function (userData) {
        let email = userData.email;
        return email.substring(0, email.indexOf('@'))
    }
}

module.exports = Utils;