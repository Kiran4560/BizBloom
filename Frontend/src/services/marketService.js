import axios from "axios";
// import { deleteMarket } from "../../../Backend/controllers/markets.controller";

/**************  /api/market/ ******************/
export class MarketService {
  async createMarket(
    {
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
    },
    token
  ) {
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: createMarket :: ", error);
    }
  }

  async getAllMarkets(
    token,
    search = "",
    profession = "",
    rating = "",
    lat = "",
    lng = ""
  ) {
    try {
      const res = await axios.get(
        `/api/market/get-all-market?search=${search}&rating=${rating}&profession=${profession}&lat=${lat}&lng=${lng}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: getAllMarkets :: ", error);
    }
  }

  async getUserMarket(token) {
    try {
      const res = await axios.get("/api/market/get-user-market", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    },
    token
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: updateMarket :: ", error);
    }
  }

  async deleteMarket(marketId, token) {
    try {
      const res = await axios.delete(`/api/market/delete-market/${marketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService :: deleteMarket :: ", error);
    }
  }

  async reviewMarket(marketId, token, rating, review) {
    try {
      const res = await axios.post(
        `/api/market/rating-review`,
        {
          marketId,
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("MarketService ::  reviewMarket :: ", error);
    }
  }
}

const marketService = new MarketService();

export default marketService;
