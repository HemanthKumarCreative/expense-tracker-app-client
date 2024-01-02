import React from "react";
import classes from "./SideBar.module.css";
import basicUser from "../../assets/basic.png";
import proUser from "../../assets/pro.png";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SideBar({ isPremiumUser = true }) {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const { wrapper, sidebar, profile, active, item, logOutBtn } = classes;
  return (
    <div className={wrapper}>
      <div className={sidebar}>
        <div className={profile}>
          <img
            src={isPremiumUser ? proUser : basicUser}
            alt={isPremiumUser ? "Pro" : "Basic"}
          />
          <h3>Expense Tracker</h3>
          <p>{isPremiumUser ? "Premium User" : "Upgrade"}</p>
        </div>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={splitLocation[1] === "home" ? `${active}` : ""}
            >
              <span className={item}>Add Expense</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expense-list"
              className={splitLocation[1] === "expense-list" ? `${active}` : ""}
            >
              <span className={item}>Expense List</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leader-board"
              className={splitLocation[1] === "leader-board" ? `${active}` : ""}
            >
              <span className={item}>Leader Board</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/generate-report"
              className={
                splitLocation[1] === "generate-report" ? `${active}` : ""
              }
            >
              <span className={item}>Generate Report</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/report-history"
              className={
                splitLocation[1] === "report-history" ? `${active}` : ""
              }
            >
              <span className={item}>Reports History</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
