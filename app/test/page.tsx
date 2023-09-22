export default async function Home() {
  const apiKey = process.env.API_KEY;

  const res = await fetch("http://localhost:3000/api/collections", {
    method: "GET", // This line is technically optional since GET is the default
    headers: {
      Authorization: `${apiKey}`,
    },
  });
  const data = await res.json();
  console.log(data.data);

  return (
    <div className="">
      <div className="">List of Filters</div>

      <div className="">
        <div className="">Map</div>

        <div className="">Timeline // scrubber</div>
      </div>

      {/* Hero Section */}
      <div className="w-full p-9 grid grid-cols-2 gap-8 uppercase font-bold">
        <div className="">
          <div className="text-h3">Account</div>
        </div>
      </div>
      {/* Collection Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">search</div>
        <div className="col-span-3">
          {data.data.map((item) => (
            <div key={item.name} className="">
              <div>
                <div className="cursor-pointer pr-8 hover:underline hover:underline-offset-4 hover:decoration-2">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
