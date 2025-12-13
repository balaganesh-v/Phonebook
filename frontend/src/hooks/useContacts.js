import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

export const useContacts = () => {
  return useContext(ContactContext);
};
