// components/Settings/OrderHistory.jsx
import React from "react";
import styles from "./Settings.module.css";

const OrderHistory = () => {
  return (
    <div className={`settings-section ${styles.settingsSection}`}>
      <div className={styles.emptyState}>
        <h2 className={`settings-Group `}>Order History</h2>
        <p>No orders yet</p>
        <p>
          Your order history will appear here after you place your first order.
        </p>
      </div>
    </div>
  );
};

export default OrderHistory;

// import React from "react";
// import "./Settings.css";

// const mockOrders = [
//   {
//     id: "ORD123456",
//     date: "July 25, 2025",
//     items: ["Traditional Injera Platter", "Spiced Lamb Stew"],
//     total: "830 ETB",
//     status: "Delivered",
//   },
//   {
//     id: "ORD123457",
//     date: "July 20, 2025",
//     items: ["Fresh Injera Bread"],
//     total: "80 ETB",
//     status: "Cancelled",
//   },
// ];

// const OrderHistory = () => {
//   return (
//     <div className="tab-content">
//       <h3>Order History</h3>
//       {mockOrders.length === 0 ? (
//         <p>No past orders found.</p>
//       ) : (
//         <ul className="order-list">
//           {mockOrders.map((order) => (
//             <li key={order.id} className="order-card">
//               <div className="order-row">
//                 <span className="order-label">Order ID:</span>
//                 <span>{order.id}</span>
//               </div>
//               <div className="order-row">
//                 <span className="order-label">Date:</span>
//                 <span>{order.date}</span>
//               </div>
//               <div className="order-row">
//                 <span className="order-label">Items:</span>
//                 <span>{order.items.join(", ")}</span>
//               </div>
//               <div className="order-row">
//                 <span className="order-label">Total:</span>
//                 <span>{order.total}</span>
//               </div>
//               <div className="order-row">
//                 <span className="order-label">Status:</span>
//                 <span className={`order-status ${order.status.toLowerCase()}`}>
//                   {order.status}
//                 </span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
