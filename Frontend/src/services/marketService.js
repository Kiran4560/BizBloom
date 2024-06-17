import axios from "axios";
// import { deleteMarket } from "../../../Backend/controllers/markets.controller";
const token = localStorage.getItem("token");
const configOptions = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
/**************  /api/market/ ******************/
export class MarketService {
  async createMarket({
    title,
    phonenum,
    imageURL,
    address,
    lat = "",
    lng = "",
    description = "",
    openingTime,
    closingTime,
    profession,
  }) {
    try {
      const res = await axios.post(
        "/api/market/addMarket",
        {
          title,
          phonenum,
          imageURL,
          address,
          lat,
          lng,
          description,
          openingTime,
          closingTime,
          profession,
        },
        configOptions
      );
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: createMarket :: ", error);
    }
  }

  async getAllMarkets() {
    try {
      const res = await axios.get("/api/market/get-all-market", configOptions);
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: getAllMarkets :: ", error);
    }
  }

  async getUserMarket() {
    try {
      const res = await axios.get("/api/market/get-user-market", configOptions);
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: getUserMarket :: ", error);
    }
  }

  async updateMarket(
    marketId,
    {
      title,
      phonenum,
      imageURL,
      address,
      lat,
      lng,
      description,
      openingTime,
      closingTime,
      profession,
    }
  ) {
    try {
      const res = await axios.put(
        `/api/market/update-market/${marketId}`,
        {
          title,
          phonenum,
          imageURL,
          address,
          lat,
          lng,
          description,
          openingTime,
          closingTime,
          profession,
        },
        configOptions
      );
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: updateMarket :: ", error);
    }
  }

  async deleteMarket({ marketId }) {
    try {
      const res = await axios.delete(
        `/api/market/delete-market/${marketId}`,
        configOptions
      );
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: deleteMarket :: ", error);
    }
  }
}

const marketService = new MarketService();

export default marketService;
