// import React from "react";
// import { styled } from "@mui/system";
// import TablePagination, {
//   tablePaginationClasses as classes,
// } from "@mui/base/TablePagination";

// const Dashboard = () => {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   return (
//     <div>
//       {" "}
//       <Root sx={{ maxWidth: "100%", width: 500 }}>
//         <table aria-label="custom pagination table">
//           <thead>
//             <tr>
//               <th>Dessert</th>
//               <th>Calories</th>
//               <th>Fat</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(rowsPerPage > 0
//               ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : ""
//             ).map((row) => (
//               <tr
//               //   key={}
//               >
//                 <td>{}</td>
//                 <td style={{ width: 160 }} align="right">
//                   {}
//                 </td>
//                 <td style={{ width: 160 }} align="right">
//                   {}
//                 </td>
//               </tr>
//             ))}

//             {emptyRows > 0 && (
//               <tr style={{ height: 41 * emptyRows }}>
//                 <td colSpan={3} />
//               </tr>
//             )}
//           </tbody>
//           <tfoot>
//             <tr>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
//                 colSpan={3}
//                 // count={}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 slotProps={{
//                   select: {
//                     "aria-label": "rows per page",
//                   },
//                   actions: {
//                     showFirstButton: true,
//                     showLastButton: true,
//                   },
//                 }}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </tr>
//           </tfoot>
//         </table>
//       </Root>
//     </div>
//   );
// };

// export default Dashboard;
