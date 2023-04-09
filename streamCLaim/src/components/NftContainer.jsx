export default function NftContainer({ name, desc, address, image }) {
  return (
    <div className="card w-[24%] h-[500px] bg-base-100 shadow-xl bg-gray-100">
      <figure className="px-10 pt-10" style={{ height: "50%" }}>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100%",
            width: "100%",
            borderRadius: "20px",
          }}
        ></div>
      </figure>
      <div
        className="card-body items-center text-center"
        style={{ height: "30%" }}
      >
        <h2 className="card-title">{name}</h2>
        <p>{desc}</p>
        <div className="card-actions w-full">
          <a href={`/?modal=true&address=${address}`} className="btn w-full">
            View
          </a>
        </div>
      </div>
    </div>
  );
}
