// const express = require("express");
// const router = express.Router();
// const ProductAdvertisingAPIv1 = require("../src/index");
// // const userSchema = require("../../Model/Peoples/user");

// router.route("/amazon/getitems").get(async (req, res) => {
//   console.log(req.query.asinNo);

//   const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
//   defaultClient.accessKey = "AKIAI6AQCWTYXLQE5EAQ";
//   defaultClient.secretKey = "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";
//   defaultClient.host = "webservices.amazon.in";
//   defaultClient.region = "eu-west-1";

//   const api = new ProductAdvertisingAPIv1.DefaultApi();

//   const getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();
//   getItemsRequest["PartnerTag"] = "ecomgyan07-21";
//   getItemsRequest["PartnerType"] = "Associates";
//   getItemsRequest["ItemIds"] = [req.query.asinNo];
//   getItemsRequest["Condition"] = "New";
//   getItemsRequest["Resources"] = [
//     "Images.Primary.Medium",
//     "ItemInfo.Title",
//     "Offers.Listings.Price",
//     "BrowseNodeInfo.BrowseNodes",
//     "BrowseNodeInfo.BrowseNodes.SalesRank",
//     "BrowseNodeInfo.WebsiteSalesRank",
//     "ItemInfo.ByLineInfo",
//     "ItemInfo.ProductInfo",
//     "ItemInfo.ProductInfo",
//     "Offers.Listings.MerchantInfo",
//     "CustomerReviews.Count",
//     "CustomerReviews.StarRating",
//   ];

//   function parseResponse(itemsResponseList) {
//     const mappedResponse = {};
//     for (const i in itemsResponseList) {
//       if (itemsResponseList.hasOwnProperty(i)) {
//         mappedResponse[itemsResponseList[i]["ASIN"]] = itemsResponseList[i];
//       }
//     }
//     return mappedResponse;
//   }
//   try {
//     const data = await api.getItems(getItemsRequest);

//     const getItemsResponse =
//       ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);

//     if (getItemsResponse["ItemsResult"] !== undefined) {
//       const response_list = parseResponse(
//         getItemsResponse["ItemsResult"]["Items"]
//       );

//       getItemsRequest["ItemIds"].forEach((itemId) => {
//         console.log("\nPrinting information about the Item with Id: " + itemId);
//         if (response_list[itemId]) {
//           const item = response_list[itemId];
//           if (item["ASIN"]) console.log("ASIN: " + item["ASIN"]);
//           if (item["DetailPageURL"])
//             console.log("DetailPageURL: " + item["DetailPageURL"]);
//           if (item["ItemInfo"]?.["Title"]?.["DisplayValue"])
//             console.log("Title: " + item["ItemInfo"]["Title"]["DisplayValue"]);
//           if (item["Offers"]?.["Listings"]?.[0]?.["Price"]?.["DisplayAmount"]) {
//             console.log(
//               "Buying Price: " +
//                 item["Offers"]["Listings"][0]["Price"]["DisplayAmount"]
//             );
//           }
//         } else {
//           console.log("Item not found, check errors");
//         }
//       });
//     }

//     if (getItemsResponse["Errors"] !== undefined) {
//       console.log("\nErrors:");
//       console.log(
//         "Complete Error Response: " +
//           JSON.stringify(getItemsResponse["Errors"], null, 1)
//       );
//       const error_0 = getItemsResponse["Errors"][0];
//       console.log("Error Code: " + error_0["Code"]);
//       console.log("Error Message: " + error_0["Message"]);
//     }

//     res.status(200).json(getItemsResponse);
//   } catch (error) {
//     console.error("Error calling the API:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const ProductAdvertisingAPIv1 = require("../src/index");
// const userSchema = require("../Model/Peoples/user"); // Ensure this path is correct

// router.route("/amazon/getitems").get(async (req, res) => {
//   const { asinNo, userId } = req.query;

//   // Configure Amazon API
//   const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
//   defaultClient.accessKey = "AKIAI6AQCWTYXLQE5EAQ";
//   defaultClient.secretKey = "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";
//   defaultClient.host = "webservices.amazon.in";
//   defaultClient.region = "eu-west-1";

//   const api = new ProductAdvertisingAPIv1.DefaultApi();
//   const getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();

//   getItemsRequest["PartnerTag"] = "ecomgyan07-21";
//   getItemsRequest["PartnerType"] = "Associates";
//   getItemsRequest["ItemIds"] = [req.query.asinNo];
//   getItemsRequest["Condition"] = "New";
//   getItemsRequest["Resources"] = [
//     "Images.Primary.Medium",
//     "ItemInfo.Title",
//     "Offers.Listings.Price",
//     "BrowseNodeInfo.BrowseNodes",
//     "BrowseNodeInfo.BrowseNodes.SalesRank",
//     "BrowseNodeInfo.WebsiteSalesRank",
//     "ItemInfo.ByLineInfo",
//     "ItemInfo.ProductInfo",
//     "ItemInfo.ProductInfo",
//     "Offers.Listings.MerchantInfo",
//     "CustomerReviews.Count",
//     "CustomerReviews.StarRating",
//   ];

//   try {
//     // Retrieve user data
//     const user = await userSchema.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Check search count and enforce payment if necessary
//     if (user.searchCount >= 10 && !user.isPaid) {
//       return res.status(403).json({
//         message: "Free search limit reached. Please make a payment.",
//         showPaymentModal: true,
//       });
//     }

//     // If the user hasn't exceeded their free searches or has paid, proceed with Amazon API request
//     const data = await api.getItems(getItemsRequest);
//     const getItemsResponse =
//       ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);

//     // Process response
//     if (getItemsResponse["ItemsResult"]) {
//       // Increment search count for user
//       user.searchCount += 1;
//       await user.save();

//       // Send response
//       res.status(200).json({
//         data: getItemsResponse,
//         searchCount: user?.searchCount,
//         showPaymentModal: false,
//       });
//     } else if (getItemsResponse["Errors"]) {
//       const error = getItemsResponse["Errors"][0];
//       console.error("Amazon API Error:", error.Message);
//       res.status(500).json({ error: "Error from Amazon API" });
//     }
//   } catch (error) {
//     console.error("Error calling Amazon API:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

// const { default: axios } = require("axios");
// const express = require("express");
// const router = express.Router();

// const User = require("../Model/Peoples/user");

// router.route("/amazon/getitems1").get(async (req, res) => {
//   const {
//     query = "iphone",
//     page = "1",
//     country = "IN",
//     sort_by = "BEST_SELLERS",
//     product_condition = "ALL",
//     is_prime = "false",
//     deals_and_discounts = "NONE",
//   } = req.query;

//   // Assume you have the user ID in the request, e.g., from middleware or query params
//   const userId = req.user?.id || req.query.userId;

//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     // Fetch the user from the database
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check the search count
//     if (user.count >= user.searchLimit) {
//       return res.status(403).json({
//         error: "Search limit reached. Please pay to increase your limit.",
//       });
//     }

//     // Increment the search count
//     user.count += 1;
//     await user.save();

//     // Proceed with the API call
//     const options = {
//       method: "GET",
//       url: "https://real-time-amazon-data.p.rapidapi.com/search",
//       params: {
//         query,
//         page,
//         country,
//         sort_by,
//         product_condition,
//         is_prime,
//         deals_and_discounts,
//       },
//       headers: {
//         "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
//         "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
//       },
//     };

//     const response = await axios.request(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error fetching Amazon data:", error.message);
//     res.status(500).json({
//       error: "Failed to fetch Amazon data",
//       details: error.response?.data || error.message,
//     });
//   }
// });

// module.exports = router;

const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const User = require("../Model/Peoples/user");

router.route("/amazon/getitems1").get(async (req, res) => {
  const {
    query = "iphone",
    page = "1",
    country = "IN",
    sort_by = "RELEVANCE",
    product_condition = "ALL",
    is_prime = "false",
    deals_and_discounts = "NONE",
  } = req.query;

  const userId = req.user?.id || req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const now = new Date();

    if (user.expiryDate && now > user.expiryDate) {
      return res.status(403).json({
        error: "Your plan has expired. Please renew your subscription.",
      });
    }

    if (user.searchcount >= user.searchLimit) {
      return res.status(403).json({
        error: `You have reached your search limit of ${user.searchLimit}. Please upgrade your plan.`,
      });
    }

    user.searchcount += 1;
    await user.save();

    // Proceed with the API call
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: {
        query,
        page,
        country,
        sort_by,
        product_condition,
        is_prime,
        deals_and_discounts,
      },
      headers: {
        "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching Amazon data:", error.message);
    res.status(500).json({
      error: "Failed to fetch Amazon data",
      details: error.response?.data || error.message,
    });
  }
});

router.route("/amazon/keywords").get(async (req, res) => {
  const { phrase = "yoga mat", lang = "en", loc = "IN" } = req.query;

  try {
    const options = {
      method: "GET",
      url: "https://twinword-keyword-suggestion-v1.p.rapidapi.com/suggest/",
      params: { phrase, lang, loc },
      headers: {
        "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
        "x-rapidapi-host": "twinword-keyword-suggestion-v1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching keyword suggestions:", error.message);
    res.status(500).json({
      error: "Failed to fetch keyword suggestions",
      details: error.response?.data || error.message,
    });
  }
});

router.route("/amazon/getitems2").get(async (req, res) => {
  const {
    query = "iphone",
    page = "1",
    country = "IN",
    sort_by = "RELEVANCE",
    product_condition = "ALL",
    is_prime = "false",
    deals_and_discounts = "NONE",
    min_price = "0", // Default minimum price
    max_price = "0",
    sales_min_price = "0",
    sales_max_price = "0",
    category_id = "",
  } = req.query;

  const userId = req.query.userId || req.user?.id ;
   console.log("userId",userId);
  if (isNaN(min_price) || isNaN(max_price)) {
    return res
      .status(400)
      .json({ error: "min_price and max_price must be numeric." });
  }

  if (parseInt(min_price) > parseInt(max_price)) {
    return res
      .status(400)
      .json({ error: "min_price cannot be greater than max_price." });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const now = new Date();

    if (user.expiryDate && now > user.expiryDate) {
      return res.status(403).json({
        error: "Your plan has expired. Please renew your subscription.",
      });
    }

    if (user.searchcount >= user.searchLimit) {
      return res.status(403).json({
        error: `You have reached your search limit of ${user.searchLimit}. Please upgrade your plan.`,
      });
    }

    user.searchcount += 1;
    await user.save();

    // Proceed with the API call
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: {
        query,
        page,
        country,
        sort_by,
        product_condition,
        is_prime,
        deals_and_discounts,
        min_price, // Add minimum price to API call
        max_price,
        sales_min_price,
        sales_max_price,
        category_id,
      },
      headers: {
        "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching Amazon data:", error.message);
    res.status(500).json({
      error: "Failed to fetch Amazon data",
      details: error.response?.data || error.message,
    });
  }
});

router.route("/amazon/categories").get(async (req, res) => {
  const { country = "IN" } = req.query;

  try {
    const options = {
      method: "GET",
      url: `https://real-time-amazon-data.p.rapidapi.com/product-category-list`,
      params: { country },
      headers: {
        "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching product categories:", error.message);
    res.status(500).json({
      error: "Failed to fetch product categories",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
