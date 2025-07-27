export default function HeaderActions({ onNewClick, total }) {
    return (
      <div className="mt-[100px] max-w-5xl mx-auto px-4 pt-5 flex justify-between items-center">
        <button
          onClick={onNewClick}
          className="inline-block bg-[#7F60FF] text-white text-xl px-4 py-3 rounded-full max-w-max font-semibold cursor-pointer hover:bg-[#6f50e0]"
        >
          Novo item
        </button>
  
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          Total R${" "}
          <span className="text-[#7F60FF] dark:text-[#7F60FF]">
            {total.toFixed(2)}
          </span>
        </span>
      </div>
    );
  }
  