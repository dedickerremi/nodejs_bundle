const statusMsg = {
    STATUS_OK: 'OK',
    STATUS_KO: 'KO',
};
const userMsg = {
    USER_ALREADY_EXIST: 'user_already_exist',
    USER_PASSWORD_NOT_MATCH: 'wrong_password_user',
    USER_EMAIL_NOT_EXIST: 'email_not_registed',
    USER_CREATED: 'user_created'
};

module.exports = {
    status: statusMsg,
    user: userMsg
}
