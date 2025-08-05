export function convertArrayParams(data: any) {
    const params = new URLSearchParams();
    // Iterate over the keys of the original object
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: string) => params.append(key, item));
      } else {
        params.append(key, data[key]);
      }
    }
  
    const queryString = params.toString();
  
    const decodedQueryString = decodeURIComponent(queryString);
  
    return {
      paramsUrl: decodedQueryString,
    };
  }
  