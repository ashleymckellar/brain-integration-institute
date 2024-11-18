const  Notify  = require("../models/notify");
// const { upload } = require("./cdn");

const createNotification = async (data) => {
    const notification = new Notify(data);
    await notification.save();
    return notification;
};

module.exports = {
    createNotification
};