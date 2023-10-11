import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@mui/lab";
import { useState } from "react";
import { MenuItem } from "../../interface/commons/interface-commons";
import "./commons.scss";
interface PropMenuRouter {
  menuData: MenuItem[];
}

function MenuHeader(props: PropMenuRouter) {
  const { menuData } = props;

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: { backgroundColor: "#9083D5" },
            }}
          >
            {menuData.map((item, index) => (
              <Tab
                className="fw-bolder text-capitalize"
                key={index}
                label={item.title}
                value={(index + 1).toString()}
                style={{ color: "#9083D5" }}
              />
            ))}
          </TabList>
        </Box>
        {menuData.map((item, index) => (
          <TabPanel value={(index + 1).toString()}>{item.content()}</TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default MenuHeader;
