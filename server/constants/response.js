const statusMsg = {
    STATUS_OK: 'OK',
    STATUS_KO: 'KO',
};
const userMsg = {
    USER_ALREADY_EXIST: 'user_already_exist',
    USER_PASSWORD_NOT_MATCH: 'wrong_password_user',
    USER_EMAIL_NOT_EXIST: 'email_not_registed',
    USER_CREATED: 'user_created',
    USER_NOT_AUTHORIZED: 'user_not_authorized'
};

const server = {
    INTERNAL_ERROR : "An error occured"
}

module.exports = {
    status: statusMsg,
    user: userMsg,
    server: server
}
