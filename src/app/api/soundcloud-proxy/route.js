export async function POST(request) {
  const { url, token } = await request.json();

  if (!url || !token) {
    return new Response(JSON.stringify({ error: "Falta url o token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const soundcloudResponse = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      headers: {
        Authorization: `OAuth ${token}`,
        Accept: "*/*",
      },
    });

    const location = soundcloudResponse.headers.get("location");
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: "No se recibió Location en el HEAD redirect" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ url: location }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
