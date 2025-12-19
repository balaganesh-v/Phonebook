import * as contactRepo from "../repositories/contactRepository.js";
import User from "../models/User.js";

export const createNewContact = async (data, user) => {
    if (!data.phone || !data.name) {
        throw new Error("Name and phone number are required");
    }

    // ✅ Check if phone already exists for this user
    const existingContact = await contactRepo.findByPhoneAndUser(
        data.phone,
        user.id
    );

    if (existingContact) {
        throw new Error("This phone number already exists in your contacts");
    }

    // Link contact to registered user if phone matches
    const linkedUser = await User.findOne({ phone: data.phone });

    return contactRepo.createContact({
        ...data,
        user: user.id,
        linkedUser: linkedUser ? linkedUser._id : null
    });
};

export const getUserContacts = (user) =>
    contactRepo.getContactsByUser(user.id);

export const getUserContactById = (id, user) =>
    contactRepo.getContactById(id, user.id);

export const updateUserContact = async (id, data, user) => {
    // Optional: prevent updating to a duplicate phone
    if (data.phone) {
        const duplicate = await contactRepo.findByPhoneAndUser(
            data.phone,
            user.id
        );

        if (duplicate && duplicate._id.toString() !== id) {
            throw new Error("This phone number already exists in your contacts");
        }
    }

    return contactRepo.updateContactById(id, user.id, data);
};

export const deleteUserContact = (id, user) =>
    contactRepo.deleteContactById(id, user.id);
