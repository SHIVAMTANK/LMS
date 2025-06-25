import type React from "react";
import DashboardHeader from './DashboardHeader';
import { useState } from "react";
import DashboardWidgets from '../../component/Admin/Widgets/DashboardWidgets';

type Props = {
  isDashboard: boolean;
};

const DashboardHero: React.FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState<boolean>(false); 

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;
