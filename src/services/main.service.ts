import { Sailing } from "@/domain/sailing.interface";
import axios from "axios";

const getSailings = async (): Promise<{ items: Sailing[]; total: number }> => {
  const response = await axios.get("/api/sailings");
  return response.data;
};

export const MainService = {
  getSailings,
};
