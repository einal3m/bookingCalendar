
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
