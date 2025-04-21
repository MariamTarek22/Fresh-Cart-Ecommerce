export default function RatingStars({productRate}) {
  return (
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const starNumber = index + 1;
            let width = "0%";
            if (starNumber <= Math.floor(productRate)) {
              width = "100%";
            } else if (starNumber === Math.ceil(productRate) && !Number.isInteger(productRate)) {
                const decimalPart = productRate % 1;
                width = `${decimalPart * 100}%`;
            }
            return (
              <div key={starNumber} className="relative text-lg">
                <span className="text-gray-400">★</span>
                <span
                  className="absolute top-0 left-0 text-yellow-400 overflow-hidden h-full"
                  style={{ width }}
                >
                  ★
                </span>
              </div>
            );
          })}
        </div>
      );
}