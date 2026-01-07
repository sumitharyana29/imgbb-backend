exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);
    const image = body.image;

    if (!image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Image missing" })
      };
    }

    const apiKey = process.env.IMGBB_API_KEY;

    const form = new URLSearchParams();
    form.append("image", image);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=" + apiKey,
      {
        method: "POST",
        body: form
      }
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    };
  }
};
