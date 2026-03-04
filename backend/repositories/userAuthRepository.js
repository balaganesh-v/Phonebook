import Users from "../models/Users.js";

export const findByEmailOrPhone = async (email, phone) => {
    return await Users.findOne({
        $or: [
            { email },
            { phone }
        ]
    }).lean();
};

export const findByPhone = async (phone) => {
    return await Users.findOne({ phone }).lean(); // return plain JS object
};

export const createUser = async (data) => {
    const user = await Users.create(data);
    return user.toObject(); // convert mongoose document to plain object
};

export default {
    findByEmailOrPhone,
    findByPhone,
    createUser
};
