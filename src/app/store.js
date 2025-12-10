import { configureStore } from "@reduxjs/toolkit";
import powerReducer from "../features/power/powerSlice";
import alarmReducer from "../features/alarms/alarmSlice";
import siteReducer from "../features/site/siteSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";

const store = configureStore({
  reducer: {
    power: powerReducer,
    alarms: alarmReducer,
    site: siteReducer,
    maintenance: maintenanceReducer,
  },
});

export default store;
