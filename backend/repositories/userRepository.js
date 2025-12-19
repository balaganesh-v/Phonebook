import User from "../models/User.js";

const findByEmailOrPhone = async (email, phone) => {
    return User.findOne({ $or: [{ email }, { phone }] });
};

const findByPhone = async (phone) => {
    return User.findOne({ phone });
};

const createUser = async (data) => {
    return User.create(data);
};

export default {
    findByEmailOrPhone,
    findByPhone,
    createUser
};
