import { useContext } from "react";
import { MessagesContext } from "../context/MessagesContext";

export const useMessages = () => useContext(MessagesContext);