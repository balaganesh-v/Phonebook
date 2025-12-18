import * as contactRepo from "../repositories/contactRepository.js";
import User from "../models/User.js";

//Create a new contact for a Logged in User
export const createNewContact = async (data, user) => {
    const linkedUser = await User.findOne({ phone: data.phone });

    return contactRepo.createContact({
        ...data,
        user: user.id,
        linkedUser: linkedUser ? linkedUser._id : null
    });
};

//Get All contacts for a Logged in User
export const getUserContacts = (user) =>
    contactRepo.getContactsByUser(user.id);

//Get a single contact by ID for a Logged in User
export const getUserContactById = (id, user) =>
    contactRepo.getContactById(id, user.id);

//Update a contact by ID for a Logged in User
export const updateUserContact = (id, data, user) =>
    contactRepo.updateContactById(id, user.id, data);

//Delete a contact by ID for a Logged in User
export const deleteUserContact = (id, user) =>
    contactRepo.deleteContactById(id, user.id);
