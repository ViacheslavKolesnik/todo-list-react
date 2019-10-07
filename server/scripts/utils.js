var Utils = {
    validateUserData: function (userData) {
        return userData !== undefined &&
            userData.name !== undefined &&
            userData.email !== undefined &&
            userData.email.includes('@') &&
            userData.notes !== undefined &&
            userData.notes instanceof Array;
    },

    getFileName: function (userData) {
        let email = userData.email;
        return email.substring(0, email.indexOf('@'))
    }
}

module.exports = Utils;