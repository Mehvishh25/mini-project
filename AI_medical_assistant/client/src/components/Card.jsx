function Card({ heading, paraHeading, para }) {
  return (
    <div className="rounded-xl Service-Card m-5 p-5 bg-white shadow-2xl transition-shadow w-80 h-auto">
      {heading && (
        <h2 className="text-teal-700 font-bold text-2xl text-center pb-3">
          {heading}
        </h2>
      )}
      {paraHeading && (
        <h3 className="text-teal-800 -mt-3 font-semibold text-lg pb-3">
          {paraHeading}
        </h3>
      )}
      <p className="text-gray-800 text-sm text-center whitespace-pre-wrap">
        {para}
      </p>
    </div>
  );
}

export default Card;
