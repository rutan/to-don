export async function fetchInstance(domain: string) {
  try {
    return await fetchV1InstanceApi(domain);
  } catch (e) {
    throw e;
  }
}

function fetchV1InstanceApi(domain: string) {
  return fetch(`https://${domain}/api/v1/instance`)
    .then((response) => response.json())
    .then((data) => {
      return {
        domain,
        title: data.title,
        description: data.short_description || data.description,
        thumbnail_url: data.thumbnail,
      };
    });
}
