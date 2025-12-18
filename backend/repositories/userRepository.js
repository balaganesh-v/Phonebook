import User from "../models/User.js";

export const createUser = async (data) => {
    return User.create(data);
};

export const findUserByEmail = async (email) => {
    return User.findOne({ email });
};

export const findUserByPhone = async (phone) => {
    return User.findOne({ phone });
};

export const findUserByEmailOrPhone = async (email, phone) => {
    return User.findOne({ $or: [{ email }, { phone }] });
};

export const findUserById = async (id) => {
    return User.findById(id);
};

export const updateUserById = async (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteUserById = async (id) => {
    return User.findByIdAndDelete(id);
};

export default {
    createUser,
    findUserByEmail,
    findUserByPhone,
    findUserByEmailOrPhone,
    findUserById,
    updateUserById,
    deleteUserById
};
