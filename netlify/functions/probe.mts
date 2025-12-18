export default async (req: Request, context) => {
  const body = { status: 'ok', time: new Date().toISOString(), path: req.url };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = {
  path: "/.netlify/functions/probe"
};
