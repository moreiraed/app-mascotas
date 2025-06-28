import { useContext } from "react";
import { AuthContext } from "@/src/utils/contexts/AuthContext";

export const useAuth = () => useContext(AuthContext);