async function request(endpoint, params, method = "GET") {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (params) {
      if (method === "GET") {
        endpoint += "?" + objectToQueryString(params);
      } else {
        options.body = JSON.stringify(params);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/${endpoint}`,
      options
    );
    const result = await response.json();

    if (response.status !== 200) {
      return createApiError(result);
    }

    return result;
  } catch (error) {
    return createApiError({ error });
  }
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}

function createApiError(error) {
  return {
    status: "error",
    message: error.message || "Unkown error",
  };
}

function get(endpoint, params) {
  return request(endpoint, params);
}

function post(endpoint, params) {
  return request(endpoint, params, "POST");
}

function update(endpoint, params) {
  return request(endpoint, params, "PUT");
}

function remove(endpoint, params) {
  return request(endpoint, params, "DELETE");
}

export default {
  get,
  post,
  update,
  remove,
  createApiError,
};
