const axios = require("axios");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const image = body.image;

    if (!image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No image provided" })
      };
    }

    const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      new URLSearchParams({ image }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed" })
    };
  }
};
