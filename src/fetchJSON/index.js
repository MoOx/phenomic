export default function(url, data) {
  return fetch(url, data)
    .then((res) => {

      // get response fields has a raw object
      const response = {}
      // using spread or Object.keys do not return computed properties
      // hasOwnProperty doesn't help
      // so good old `for in` that checks simple types
      for (const key in res) {
        if (typeof res[key] !== "function") {
          response[key] = res[key]
        }
      }

      // for both http ok/not ok, we try to parse as JSON
      // or reject if json parsing failed

      // http OK
      if (res.status >= 200 && res.status < 300) {
        return new Promise((resolve, reject) => res.json().then(
          (data) => resolve({ response, data }),
          (exception) => reject({ response, exception }),
        ))
      }

      // http not ok
      return new Promise((resolve, reject) => res.json().then(
        (data) => reject({ response, data }),
        (exception) => reject({ response, exception }),
      ))
    })
}
