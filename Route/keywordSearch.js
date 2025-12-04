const express = require("express");
const router = express.Router();
const ProductAdvertisingAPIv1 = require("../src/index");
const googleTrends = require("google-trends-api"); // Ensure this is required
const axios = require("axios");
const SerpApi = require("google-search-results-nodejs");
const { GoogleSearch } = require("google-search-results-nodejs");
const User = require("../Model/Peoples/user");

const Payment = require("../Model/Payment/Payment");

const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
defaultClient.accessKey = "AKIAI6AQCWTYXLQE5EAQ";
defaultClient.secretKey = "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";
defaultClient.host = "webservices.amazon.in";
defaultClient.region = "eu-west-1";

const api = new ProductAdvertisingAPIv1.DefaultApi();

// router.route("/amazon/affiliatekeyword").get(async (req, res) => {

//   console.log("req.query.keywords", req.query.keywords);

//   const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
//   searchItemsRequest["PartnerTag"] = "ecomgyan07-21";
//   searchItemsRequest["PartnerType"] = "Associates";
//   searchItemsRequest["Keywords"] = req.query.keywords;
//   searchItemsRequest["ItemCount"] = 10;
//   searchItemsRequest["Resources"] = [
//     "Images.Primary.Medium",
//     "ItemInfo.Title",
//     "Offers.Listings.Price",
//     "BrowseNodeInfo.BrowseNodes",
//     "BrowseNodeInfo.BrowseNodes.SalesRank",
//     "BrowseNodeInfo.WebsiteSalesRank",
//     "ItemInfo.ByLineInfo",
//     "ItemInfo.ProductInfo",
//     "Offers.Listings.MerchantInfo",
//     "CustomerReviews.Count",
//     "CustomerReviews.StarRating",
//   ];

//   try {
//     const data = await api.searchItems(searchItemsRequest);
//     const searchItemsResponse =
//       ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);

//     if (searchItemsResponse["Errors"]) {
//       console.error(
//         "Amazon API Errors:",
//         JSON.stringify(searchItemsResponse["Errors"], null, 2)
//       );
//       return res.status(500).json({
//         error: "Error fetching data from Amazon API",
//         details: searchItemsResponse["Errors"],
//       });
//     }
//     res.status(200).json({
//       amazonData: searchItemsResponse,
//     });

//     const options = {
//       method: "GET",
//       url: "https://twinword-keyword-suggestion-v1.p.rapidapi.com/suggest/",
//       params: {
//         phrase: req.query.keywords,
//         lang: "en",
//         loc: "IN",
//       },
//       headers: {
//         "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
//         "x-rapidapi-host": "twinword-keyword-suggestion-v1.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       console.log("RapidAPI response:", response.data);

//       res.status(200).json({
//         amazonData: searchItemsResponse,
//         keywordSuggestions: response.data,
//       });
//     } catch (rapidApiError) {
//       console.error("RapidAPI Error:", rapidApiError);
//       res
//         .status(500)
//         .json({ error: "Failed to fetch keyword suggestions from RapidAPI" });
//     }
//   } catch (amazonApiError) {
//     console.error("Amazon API Error:", amazonApiError);
//     res.status(500).json({ error: "Failed to fetch data from Amazon API" });
//   }
// });

// router.route("/amazon/affiliatekeyword").get(async (req, res) => {
//   const { keywords, userId } = req.query;

//   console.log("req.query.keywords", keywords);

//   try {
//     // Fetch user data
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if user has reached the search limit and requires payment
//     if (user.count >= 10) {
//       return res.status(403).json({
//         error: "Free search limit reached. Please make a payment.",
//         showPaymentModal: true,
//       });
//     }

//     // Increment the search count
//     user.count += 1;
//     await user.save();

//     // Set up Amazon API request
//     const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
//     searchItemsRequest["PartnerTag"] = "ecomgyan07-21";
//     searchItemsRequest["PartnerType"] = "Associates";
//     searchItemsRequest["Keywords"] = keywords;
//     searchItemsRequest["ItemCount"] = 10;
//     searchItemsRequest["Resources"] = [
//       "Images.Primary.Medium",
//       "ItemInfo.Title",
//       "Offers.Listings.Price",
//       "BrowseNodeInfo.BrowseNodes",
//       "BrowseNodeInfo.BrowseNodes.SalesRank",
//       "BrowseNodeInfo.WebsiteSalesRank",
//       "ItemInfo.ByLineInfo",
//       "ItemInfo.ProductInfo",
//       "Offers.Listings.MerchantInfo",
//       "CustomerReviews.Count",
//       "CustomerReviews.StarRating",
//     ];

//     // Fetch data from Amazon API
//     const data = await api.searchItems(searchItemsRequest);
//     const searchItemsResponse =
//       ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);

//     // Check for errors in Amazon API response
//     if (searchItemsResponse["Errors"]) {
//       console.error(
//         "Amazon API Errors:",
//         JSON.stringify(searchItemsResponse["Errors"], null, 2)
//       );
//       return res.status(500).json({
//         error: "Error fetching data from Amazon API",
//         details: searchItemsResponse["Errors"],
//       });
//     }

//     // Set up RapidAPI request for keyword suggestions
//     const options = {
//       method: "GET",
//       url: "https://twinword-keyword-suggestion-v1.p.rapidapi.com/suggest/",
//       params: {
//         phrase: keywords,
//         lang: "en",
//         loc: "IN",
//       },
//       headers: {
//         "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
//         "x-rapidapi-host": "twinword-keyword-suggestion-v1.p.rapidapi.com",
//       },
//     };

//     // Fetch data from RapidAPI
//     const response = await axios.request(options);
//     console.log("RapidAPI response:", response.data);

//     res.status(200).json({
//       amazonData: searchItemsResponse,
//       keywordSuggestions: response.data,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.route("/amazon/rapidkeyword").get(async (req, res) => {
//   console.log("req.query.keywords", req.query.keywords);

//   try {
//     const options = {
//       method: "GET",
//       url: "https://twinword-keyword-suggestion-v1.p.rapidapi.com/suggest/",
//       params: {
//         phrase: req.query.keywords,
//         lang: "en",
//         loc: "IN",
//       },
//       headers: {
//         "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a",
//         "x-rapidapi-host": "twinword-keyword-suggestion-v1.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);

//       res.status(200).json({
//         keywordSuggestions: response.data,
//       });
//     } catch (rapidApiError) {
//       console.error("RapidAPI Error:", rapidApiError);
//       res
//         .status(500)
//         .json({ error: "Failed to fetch keyword suggestions from RapidAPI" });
//     }
//   } catch (amazonApiError) {
//     console.error("Amazon API Error:", amazonApiError);
//     res.status(500).json({ error: "Failed to fetch data from Amazon API" });
//   }
// });

// router.route("/amazon/keyword").get(async (req, res) => {
//   console.log("req.query.keywords", req.query.keywords);

//   const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
//   searchItemsRequest["PartnerTag"] = "ecomgyan0tes";
//   searchItemsRequest["Keywords"] = req.query.keywords;
//   searchItemsRequest["ItemCount"] = 10;7-21";
//   searchItemsRequest["PartnerType"] = "Associa
//   searchItemsRequest["Resources"] = [
//     "Images.Primary.Medium",
//     "ItemInfo.Title",
//     "Offers.Listings.Price",
//     "BrowseNodeInfo.BrowseNodes",
//     "BrowseNodeInfo.BrowseNodes.SalesRank",
//     "BrowseNodeInfo.WebsiteSalesRank",
//     "ItemInfo.ByLineInfo",
//     "ItemInfo.ProductInfo",
//     "Offers.Listings.MerchantInfo",
//     "CustomerReviews.Count",
//     "CustomerReviews.StarRating",
//   ];

//   try {
//     const data = await api.searchItems(searchItemsRequest);
//     const searchItemsResponse =
//       ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);

//     if (searchItemsResponse["Errors"]) {
//       console.error(
//         "Amazon API Errors:",
//         JSON.stringify(searchItemsResponse["Errors"], null, 2)
//       );
//       return res.status(500).json({
//         error: "Error fetching data from Amazon API",
//         details: searchItemsResponse["Errors"],
//       });
//     }

//     const options = {
//       method: "GET",
//       url: "https://twinword-keyword-suggestion-v1.p.rapidapi.com/suggest/",
//       params: {
//         phrase: req.query.keywords,
//         lang: "en",
//         loc: "IN",
//       },
//       headers: {
//         "x-rapidapi-key": "ddc9f38417msh28f4ad994945f15p14da43jsna1cbc9a48777",
//         "x-rapidapi-host": "twinword-keyword-suggestion-v1.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       console.log("RapidAPI response:", response.data);

//       res.status(200).json({
//         amazonData: searchItemsResponse,
//         keywordSuggestions: response.data,
//       });
//     } catch (rapidApiError) {
//       console.error("RapidAPI Error:", rapidApiError);
//       res
//         .status(500)
//         .json({ error: "Failed to fetch keyword suggestions from RapidAPI" });
//     }
//   } catch (amazonApiError) {
//     console.error("Amazon API Error:", amazonApiError);
//     res.status(500).json({ error: "Failed to fetch data from Amazon API" });
//   }
// });

// router.route("/test/seoranking").get(async (req, res) => {
//   try {
//     const serpApiKey =
//       "a6f706a325cf0733b2e9cf7bfca3ef8ae2511f541b6e7ac79a8060c79bf585ad";
//     const query = "https://nakshatranamahacreations.com/";
//     const apiUrl = `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${serpApiKey}`;
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         const results = response.data.organic_results;
//         results.forEach((result, index) => {
//           console.log(`${index + 1}: ${result.title} - ${result.link}`);
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   } catch (error) {}
// });

// router.route("/suggestion/trends").get((req, res) => {
//   const googleSearch = new GoogleSearch(
//     "a6f706a325cf0733b2e9cf7bfca3ef8ae2511f541b6e7ac79a8060c79bf585ad"
//   );

//   const params = {
//     engine: "google_trends",
//     q: req.query.keywords,
//     data_type: "RELATED_QUERIES",
//     num: 150,
//   };

//   googleSearch.json(params, (data) => {
//     if (data.error) {
//       res
//         .status(500)
//         .json({ error: "Failed to fetch data from Google Trends" });
//     } else {
//       const relatedQueries = data.related_queries;
//       res.status(200).json({ googleTrendsData: relatedQueries });
//     }
//   });
// });

// router.route("/amazon/affiliatekeyword1").get(async (req, res) => {
//   const { asin, country } = req.query;

//   // Validate the required query parameters
//   if (!asin || !country) {
//     return res
//       .status(400)
//       .json({ error: "asin and country parameters are required" });
//   }

//   const options = {
//     method: "GET",
//     url: "https://real-time-amazon-data.p.rapidapi.com/product-details",
//     params: {
//       asin,
//       country,
//     },
//     headers: {
//       "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a", // Ensure RAPIDAPI_KEY is in environment variables
//       "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
//     },
//   };

//   try {
//     // Make the API call
//     const response = await axios.request(options);

//     // Return the fetched data to the client
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(
//       "Error fetching product details:",
//       error.response?.data || error.message
//     );

//     // Handle error response
//     res.status(500).json({
//       error: "Failed to fetch product details",
//       details: error.response?.data || error.message,
//     });
//   }
// });

// Currently working code
router.route("/amazon/affiliatekeyword1").get(async (req, res) => {
  const { asin, country, userId } = req.query;

  // Validate the required query parameters
  if (!asin || !country) {
    return res
      .status(400)
      .json({ error: "asin and country parameters are required" });
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

    // const expiryDate = new Date(user.expiryDate);

    // console.log("user.searchcount >= 10", user.searchcount >= 10);
    // console.log("expiryDate", !expiryDate);
    // console.log(
    //   "user.searchcount >= 10 && !expiryDate",
    //   user.searchcount >= 10 && !expiryDate
    // );
    // console.log(
    //   "!user.expiryDate || new Date(user.expiryDate) < new Date()",
    //   !user.expiryDate || new Date(user.expiryDate) < new Date()
    // );

    // const freeLimit = 10;

    // const maxLimit = 500; // Maximum limit for paid users

    // if (
    //   user.searchcount >= freeLimit &&
    //   (!user.expiryDate || new Date(user.expiryDate) < new Date())
    // ) {
    //   // Case 1: Free limit reached and no active paid plan
    //   return res.status(403).json({
    //     error: `Search limit of ${freeLimit} reached. Please pay to increase your limit.`,
    //   });
    // } else if (
    //   user.searchcount >= maxLimit &&
    //   new Date(user.expiryDate) < new Date()
    // ) {
    //   // Case 2: Paid plan limit reached and expiry date has passed
    //   return res.status(403).json({
    //     error: `Search limit has expired or been reached. Please renew your plan.`,
    //   });
    // } else if (user.searchcount >= maxLimit) {
    //   // Case 3: Paid plan limit exceeded while the plan is still valid
    //   return res.status(403).json({
    //     error: `You have reached the maximum search limit of ${maxLimit}. Please upgrade your plan.`,
    //   });
    // } else {
    //   console.log("he has limit");
    // }

    // Check if the plan has expired
    // if (now > expiryDate) {
    //   return res.status(403).json({
    //     error: "Your plan has expired. Please renew your subscription.",
    //   });
    // }

    // Increment the search count
    // user.searchcount += 1;
    // await user.save();

    // Prepare options for the API call
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/product-details",
      params: { asin, country },
      headers: {
        "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a", // Use environment variable for API key
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    // Make the API call
    const response = await axios.request(options);

    // Return the fetched data to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching product details:", error.message);

    // Handle error response
    res.status(500).json({
      error: "Failed to fetch product details",
      details: error.response?.data || error.message,
    });
  }
});

router.route("/amazon/affiliatekeyword2").get(async (req, res) => {
  const { asin, country, userId } = req.query;

  // Validate the required query parameters
  if (!asin || !country) {
    return res
      .status(400)
      .json({ error: "asin and country parameters are required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const now = new Date();

    // if (user.expiryDate && now > user.expiryDate) {
    //   return res.status(403).json({
    //     error: "Your plan has expired. Please renew your subscription.",
    //   });
    // }

    // if (user.searchcount >= user.searchLimit) {
    //   return res.status(403).json({
    //     error: `You have reached your search limit of ${user.searchLimit}. Please upgrade your plan.`,
    //   });
    // }

    // user.searchcount += 1;
    // await user.save();

    // const expiryDate = new Date(user.expiryDate);

    // console.log("user.searchcount >= 10", user.searchcount >= 10);
    // console.log("expiryDate", !expiryDate);
    // console.log(
    //   "user.searchcount >= 10 && !expiryDate",
    //   user.searchcount >= 10 && !expiryDate
    // );
    // console.log(
    //   "!user.expiryDate || new Date(user.expiryDate) < new Date()",
    //   !user.expiryDate || new Date(user.expiryDate) < new Date()
    // );

    // const freeLimit = 10;

    // const maxLimit = 500; // Maximum limit for paid users

    // if (
    //   user.searchcount >= freeLimit &&
    //   (!user.expiryDate || new Date(user.expiryDate) < new Date())
    // ) {
    //   // Case 1: Free limit reached and no active paid plan
    //   return res.status(403).json({
    //     error: `Search limit of ${freeLimit} reached. Please pay to increase your limit.`,
    //   });
    // } else if (
    //   user.searchcount >= maxLimit &&
    //   new Date(user.expiryDate) < new Date()
    // ) {
    //   // Case 2: Paid plan limit reached and expiry date has passed
    //   return res.status(403).json({
    //     error: `Search limit has expired or been reached. Please renew your plan.`,
    //   });
    // } else if (user.searchcount >= maxLimit) {
    //   // Case 3: Paid plan limit exceeded while the plan is still valid
    //   return res.status(403).json({
    //     error: `You have reached the maximum search limit of ${maxLimit}. Please upgrade your plan.`,
    //   });
    // } else {
    //   console.log("he has limit");
    // }

    // Check if the plan has expired
    // if (now > expiryDate) {
    //   return res.status(403).json({
    //     error: "Your plan has expired. Please renew your subscription.",
    //   });
    // }

    // Increment the search count
    // user.searchcount += 1;
    // await user.save();

    // Prepare options for the API call
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/product-details",
      params: { asin, country },
      headers: {
        "x-rapidapi-key": "e7a03153d1msh5b1b666f4f58d28p19bd5cjsn1c70346efd2a", // Use environment variable for API key
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    // Make the API call
    const response = await axios.request(options);

    // Return the fetched data to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching product details:", error.message);

    // Handle error response
    res.status(500).json({
      error: "Failed to fetch product details",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
