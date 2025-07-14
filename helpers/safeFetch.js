export async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (res.status === 500) {
      throw new Error('Internal Server Error');
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
