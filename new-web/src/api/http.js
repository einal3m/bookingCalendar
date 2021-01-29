
const BASE_URL = 'http://localhost:9292/moggs-booking-calendar/api/v1';

const fetchUrl = (path) => {
  return BASE_URL + '/' + path;
};

export const get = async (path) => {
  try {
    let response = await fetch(fetchUrl(path));
    let json = await response.json();

    return json;
  }
  catch(e) {
    console.log('Error!', e);
  }
}

export const post = async (path, body) => {
  try {
    let response = await fetch(fetchUrl(path), {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return { status: "unauthorized" };
    } else {
      let json = await response.json();
      return { status: "ok", response: json };
    }
  }
  catch(e) {
    console.log('Error!', e);
  }
}
