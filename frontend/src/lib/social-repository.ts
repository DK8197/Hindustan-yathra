const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

export async function getSocialLinks() {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/social/links`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    // console.log(
    //   'Social feed:',
    //   data
    // );

    return {
      youtube:
        data.youtube ?? [],
      instagram:
        data.instagram ?? [],
    };
  } catch (error) {
    console.error(
      'getSocialLinks error:',
      error
    );

    return {
      youtube: [],
      instagram: [],
    };
  }
}