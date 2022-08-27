// function Pagination(props) {
//   const { previous, next, searchOffset, searchLimit, setSearchOffset } = props;

//   return (
//     <div className="flex items-center justify-center">
//       <div className="flex items-center justify-center">
//         {previous && (
//           <button
//             className="px-4 py-2 font-bold text-white bg-gray-800 rounded-l hover:bg-gray-900"
//             onClick={() => setSearchOffset(searchOffset - searchLimit)}
//           >
//             Previous
//           </button>
//         )}
//         {next && (
//           <button
//             className="px-4 py-2 font-bold text-white bg-gray-800 rounded-r hover:bg-gray-900"
//             onClick={() => setSearchOffset(searchOffset + searchLimit)}
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Pagination;
