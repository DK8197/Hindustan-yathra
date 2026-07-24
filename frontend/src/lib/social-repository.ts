const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

export async function getSocialLinks() {
  try {
    const response = await fetch(
  `${API_URL}/api/v1/social/links`,
  {
    headers: {
      "X-App-Key": process.env.API_SECRET!,
    },
    next: {
      revalidate: 60 * 60 * 24 * 30, // 30 days
    },
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