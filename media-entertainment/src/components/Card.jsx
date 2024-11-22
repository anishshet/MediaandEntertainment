const Card = ({ platform, info }) => (
    <div className="bg-[#1F2937] p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-[#374151] transition duration-300 h-full flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-4">{platform}</h2>
      <ul className="space-y-2 text-sm text-gray-300">
        {info.map((item, index) => (
          <li key={index} className="list-disc list-inside">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default Card;
  